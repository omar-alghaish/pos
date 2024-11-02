import React, { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FileUpload from "../../../components/common/fileUpload";
import CategorySelect from "../components/CategorySelect";
import InputField from "../../../components/common/inputField";
import DatePickerField from "../../../components/common/datePickerField";
import NotesSection from "../components/NotesSection";
import OptionsSection from "../components/OptionsSection";
import { categories } from "../../pos/Index";
import Button from "../../../components/common/button/Index";
import { DataSourceItem } from "../pages/ProductsTable";
import Typography from "../../../components/common/typography/Index";
import SwitchButton from "../../../components/common/switchButton";
import moment from "moment";

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  barcode: Yup.string().required("Product code is required"),
  dateAdded: Yup.date().required("Date is required"),
  price: Yup.number().required("Price is required"),
  stockQuantity: Yup.number().required("Stock quantity is required"),
  category: Yup.string().required("Unit type is required"),
  discount: Yup.number().min(0).max(100, "Discount must be between 0 and 100"),
  expirationDate: Yup.date().nullable(),
  status: Yup.boolean().required("Status is required"),
  visibility: Yup.boolean().required("Visibility is required"),
});

interface IAddProductForm {
  type: "update" | "add";
  title:string
  values?: DataSourceItem;
}

const AddProductForm: React.FC<IAddProductForm> = ({
  type = "add",
  title,
  values,
}) => {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(
    values?.img || null
  );
  const [notes, setNotes] = useState<string[]>(values?.notes || []);
  const [options, setOptions] = useState<{ name: string; price: string }[]>(
    values?.options || []
  );

  const dateAdded = useMemo(() => {
    if (type === "update" && values) {
      return moment(values.dateCreated);
    }
    return moment();
  }, [type, values?.dateCreated]); // Depend on dateCreated specifically
  

  const formik = useFormik({
    initialValues: {
      productName: type === "update" && values ? values.productName : "",
      barcode: type === "update" && values ? values.barcode : "",
      // dateAdded: type === "update" && values ? moment(values.dateCreated) : moment(),
      dateAdded: dateAdded.toISOString(),
      price: type === "update" && values ? values.price : 0,
      stockQuantity: type === "update" && values ? values.stockQuantity : 0,
      category: type === "update" && values ? values.category : "",
      discount: type === "update" && values ? values.discount : 0,
      // expirationDate: type === "update" && values ? moment(values.expirationDate) : null,
      status: type === "update" && values ? values.status : true,
      visibility: type === "update" && values ? values.visibility : true,
    },
    validationSchema,
    enableReinitialize: true, // Allows the form to reinitialize when values change
    onSubmit: (values) => {
      const productData = {
        ...values,
        imageSrc,
        notes,
        options,
      };
      console.log(productData);
      // Submit your form data to the server or any other action
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setImageSrc(null);
  };

  const handleAddNote = () => {
    setNotes([...notes, ""]);
  };

  const handleNoteChange = (index: number, value: string) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  const handleRemoveNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleAddOption = () => {
    setOptions([...options, { name: "", price: "" }]);
  };

  const handleOptionChange = (
    index: number,
    field: keyof (typeof options)[0],
    value: string
  ) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  useEffect(()=>{
 setOptions( values?.options || [])
setNotes(values?.notes || [])
console.log(values)
setImageSrc(values?.img || null)
  },[values])

  return (
    <form onSubmit={formik.handleSubmit} className={`add_product_form ${type}`}>
                    <Typography variant="h3">{title}</Typography>

      <FileUpload
        imageSrc={imageSrc}
        onImageUpload={handleImageUpload}
        onImageDelete={handleImageDelete}
      />
      <div className="inputs_container">
      <CategorySelect
  selectedValue={formik.values.category}
  onChange={(value) => formik.setFieldValue("category", value)} // Correctly set the category value
  options={categoryOptions}
  label="Category"
/>

        <InputField
          label="Product Name"
          value={formik.values.productName}
          onChange={formik.handleChange}
          error={formik.errors.productName}
          name="productName"
        />
        <InputField
          label="Barcode"
          value={formik.values.barcode}
          onChange={formik.handleChange}
          error={formik.errors.barcode}
          name="barcode"
        />
        <DatePickerField
          label="Date Added"
          value={formik.values.dateAdded ? moment(formik.values.dateAdded) : undefined} // Format if needed
          onChange={(date) => formik.setFieldValue("dateAdded", date ? date.toISOString() : null)} // Convert date back to ISO string for form values
          error={
            typeof formik.errors.dateAdded === "string"
              ? formik.errors.dateAdded
              : undefined
          }
        />
        <InputField
          label="Price"
          value={formik.values.price.toString()}
          onChange={formik.handleChange}
          type="number"
          error={formik.errors.price} name={"price"}        />
        <InputField
          label="Stock Quantity"
          value={formik.values.stockQuantity.toString()}
          onChange={formik.handleChange}
          type="number"
          error={formik.errors.stockQuantity}
          name="stockQuantity"
        />
        <InputField
          label="Discount (%)"
          value={formik.values.discount.toString()}
          onChange={formik.handleChange}
          type="number"
          error={formik.errors.discount}
          name="discount"
        />
        <DatePickerField
          label="Expiration Date"
          onChange={(date) => formik.setFieldValue("expirationDate", date)}
        />
      </div>
      <div className="switch_buttons_container" style={{ display: "flex",gap:"40px"}}>
          <SwitchButton
            label="Active Status"
            checked={formik.values.status}
            onChange={(checked) => formik.setFieldValue("status", checked)}
            error={formik.touched.status ? formik.errors.status : undefined}
          />

          <SwitchButton
            label="Visibility"
            checked={formik.values.visibility}
            onChange={(checked) => formik.setFieldValue("visibility", checked)}
            error={
              formik.touched.visibility ? formik.errors.visibility : undefined
            }
          />
        </div>
      <div className="notes_options">
        <NotesSection
          notes={notes}
          onNoteChange={handleNoteChange}
          onAddNote={handleAddNote}
          onRemoveNote={handleRemoveNote}
        />
        <OptionsSection
          options={options}
          onOptionChange={handleOptionChange}
          onAddOption={handleAddOption}
          onRemoveOption={handleRemoveOption}
        />
      </div>
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddProductForm;
