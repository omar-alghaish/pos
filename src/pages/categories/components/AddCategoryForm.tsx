import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/common/inputField";
import DatePickerField from "../../../components/common/datePickerField";
import Button from "../../../components/common/button/Index";
import moment from "moment";
import SwitchButton from "../../../components/common/switchButton";
import Typography from "../../../components/common/typography/Index";

interface categoryForm {
  categoryName: string;
  description: string;
  dateAdded: Date;
  color: string;
  status: boolean;
  visibility: boolean;
}

const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required("Category name is required"),
  description: Yup.string().required("Description is required"),
  dateAdded: Yup.date().required("Date is required"),
  color: Yup.string().required("Color is required"),
  status: Yup.boolean().required("Status is required"),
  visibility: Yup.boolean().required("Visibility is required"),
});

interface IAddCategoryForm {
  type: "update" | "add";
  title: string;
  values?: categoryForm;
}

const AddCategoryForm: React.FC<IAddCategoryForm> = ({
  type = "add",
  title,
  values,
}) => {
  const dateAdded = useMemo(() => {
    if (type === "update" && values) {
      return moment(values.dateAdded);
    }
    return moment();
  }, [type, values?.dateAdded]);
  const formik = useFormik({
    initialValues: {
      categoryName: type === "update" && values ? values.categoryName : "",
      description: type === "update" && values ? values.description : "",
      dateAdded: dateAdded.toISOString(),
      color: type === "update" && values ? values.color : "#000000",
      status: type === "update" && values ? values.status : true,
      visibility: type === "update" && values ? values.visibility : true,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const productData = {
        ...values,
        status: values.status ? "Active" : "Inactive",
        visibility: values.visibility ? "Visible" : "Hidden",
      };
      console.log(productData);
      // Submit your form data to the server or any other action
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={`add_product_form ${type}`}>
      <Typography variant="h3">{title}</Typography>

      <div className="inputs_container">
        <InputField
          label="Category Name"
          value={formik.values.categoryName}
          onChange={formik.handleChange}
          error={formik.errors.categoryName}
          name="categoryName"
        />

        <InputField
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.errors.description}
          name="description"
        />

        <DatePickerField
          label="Date Added"
          value={
            formik.values.dateAdded
              ? moment(formik.values.dateAdded)
              : undefined
          } // Format if needed
          onChange={(date) =>
            formik.setFieldValue("dateAdded", date ? date.toISOString() : null)
          }
          error={
            typeof formik.errors.dateAdded === "string"
              ? formik.errors.dateAdded
              : undefined
          }
        />

        <InputField
          type="color"
          name="color"
          value={formik.values.color}
          onChange={formik.handleChange}
          className="color_picker"
          label="Color"
        />
        {formik.errors.color && (
          <div className="error">{formik.errors.color}</div>
        )}

        <div
          className="switch_buttons_container"
          style={{ display: "flex", gap: "40px" }}
        >
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
      </div>

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default AddCategoryForm;
