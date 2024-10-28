import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import FileUpload from "../../../components/common/fileUpload";
import CategorySelect from "../components/CategorySelect";
import InputField from "../../../components/common/inputField";
import DatePickerField from "../../../components/common/datePickerField";
import NotesSection from "../components/NotesSection";
import OptionsSection from "../components/OptionsSection";
import { categories } from "../../pos/Index";
import { Button } from "antd";

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  productCode: Yup.string().required("Product code is required"),
  dateAdded: Yup.date().required("Date is required"),
  price: Yup.number().required("Price is required"),
  stockQuantity: Yup.number().required("Stock quantity is required"),
  unitType: Yup.string().required("Unit type is required"),
  discount: Yup.number().min(0).max(100, "Discount must be between 0 and 100"),
  expirationDate: Yup.date().nullable(),
});

const AddProductForm = () => {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const [notes, setNotes] = useState<string[]>([""]);
  const [options, setOptions] = useState<{ name: string; price: string }[]>([
    { name: "", price: "" },
  ]);

  const formik = useFormik({
    initialValues: {
      productName: "",
      productCode: "",
      dateAdded: moment(),
      price: 0,
      stockQuantity: 0,
      unitType: "",
      discount: 0,
      expirationDate: null,
    },
    validationSchema,
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
    label: category.name, // Assuming 'name' is the correct property in ICategory
    value: category.id, // Assuming 'id' is the unique identifier
  }));

  return (
    <form onSubmit={formik.handleSubmit} className="add_product_form">
      <FileUpload
        imageSrc={imageSrc}
        onImageUpload={handleImageUpload}
        onImageDelete={handleImageDelete}
      />
      <div className="inputs_container">
        <CategorySelect
          selectedValue={formik.values.unitType}
          onChange={formik.handleChange}
          options={categoryOptions}
          label="Category"
        />
        <InputField
          label="Product Name"
          value={formik.values.productName}
          onChange={formik.handleChange}
          error={formik.errors.productName}
        />
        <InputField
          label="Product Code"
          value={formik.values.productCode}
          onChange={formik.handleChange}
          error={formik.errors.productCode}
        />
        <DatePickerField
          label="Date Added"
          onChange={(date) => formik.setFieldValue("dateAdded", date)}
          error={
            typeof formik.errors.dateAdded === "string"
              ? formik.errors.dateAdded
              : undefined
          } // Ensure it's a string
        />
        <InputField
          label="Price"
          value={formik.values.price.toString()} // Convert to string
          onChange={formik.handleChange}
          type="number"
          error={formik.errors.price}
        />
        <InputField
          label="Stock Quantity"
          value={formik.values.stockQuantity.toString()} // Convert to string
          onChange={formik.handleChange}
          type="number"
          error={formik.errors.stockQuantity}
        />

        <InputField
          label="Discount (%)"
          value={formik.values.discount.toString()} // Convert to string
          onChange={formik.handleChange}
          type="number"
          error={formik.errors.discount}
        />
        <DatePickerField
          label="Expiration Date"
          onChange={(date) => formik.setFieldValue("expirationDate", date)}
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
   
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddProductForm;
