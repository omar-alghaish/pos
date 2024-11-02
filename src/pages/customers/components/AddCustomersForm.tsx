import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/common/inputField";
import DatePickerField from "../../../components/common/datePickerField";
import Button from "../../../components/common/button/Index";
import moment from "moment";
import SwitchButton from "../../../components/common/switchButton";
import Typography from "../../../components/common/typography/Index";
import { CustomerDataSourceItem } from "../pages/CustomersList";


const validationSchema = Yup.object().shape({
  name: Yup.string().required("Category name is required"),
  address: Yup.string().required("address is required"),
  dateAdded: Yup.date().required("Date is required"),
  phoneNumber1: Yup.date().required("Phone number 1 is required"),
  phoneNumber2: Yup.date().required("Phone number 2 is required"),

  status: Yup.boolean().required("Status is required"),
  visibility: Yup.boolean().required("Visibility is required"),
});

interface IAddCustomerForm {
  type: "update" | "add";
  title: string;
  values?: CustomerDataSourceItem;
}

const AddCustomerForm: React.FC<IAddCustomerForm> = ({
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
      name: type === "update" && values ? values.name : "",
      address: type === "update" && values ? values.address : "",
      dateAdded: dateAdded.toISOString(),
      phoneNumber1: type === "update" && values ? values.phoneNumber1 : "",
      phoneNumber2: type === "update" && values ? values.phoneNumber2 : "",
      status: type === "update" && values ? values.status : true,
      visibility: type === "update" && values ? values.visibility : true,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const productData = {
        ...values,
        // status: values.status ? "Active" : "Inactive",
        // visibility: values.visibility ? "Visible" : "Hidden",
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
          label="Customer Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
          name="name"
        />

        <InputField
          label="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.errors.address}
          name="address"
        />
        <InputField
          label="phone number 1"
          value={formik.values.phoneNumber1}
          onChange={formik.handleChange}
          error={formik.errors.phoneNumber1}
          name="phoneNumber1"
        />
        <InputField
          label="phone number 2"
          value={formik.values.phoneNumber2}
          onChange={formik.handleChange}
          error={formik.errors.phoneNumber2}
          name="phoneNumber2"
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

export default AddCustomerForm;
