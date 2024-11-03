import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/common/inputField";
import DatePickerField from "../../../components/common/datePickerField";
import Button from "../../../components/common/button/Index";
import moment from "moment";
import SwitchButton from "../../../components/common/switchButton";
import Typography from "../../../components/common/typography/Index";
import { EmpolyeeDataSourceItem } from "../pages/EmployeesList";
import RolesSelect from "./RolesSelect";
import FileUpload from "../../../components/common/fileUpload";
import RadioButtonGroup from "../../../components/common/radioButtonGroup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Category name is required"),
  address: Yup.string().required("Address is required"),
  dateAdded: Yup.date().required("Date is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string().required("Email is required"),
  status: Yup.boolean().required("Status is required"),
  visibility: Yup.boolean().required("Visibility is required"),
  role: Yup.string().required("Role is required"),
  gender: Yup.string().required("Gender is required"),
  age: Yup.string().required("Age is required"),

});

interface IAddEmployeesForm {
  type: "update" | "add";
  title: string;
  values?: EmpolyeeDataSourceItem;
}

const AddEmployeesForm: React.FC<IAddEmployeesForm> = ({
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

  // Role options
  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
    { value: "staff", label: "Staff" },
  ];
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const formik = useFormik({
    initialValues: {
      name: type === "update" && values ? values.name : "",
      address: type === "update" && values ? values.address : "",
      dateAdded: dateAdded.toISOString(),
      phoneNumber: type === "update" && values ? values.phoneNumber : "",
      email: type === "update" && values ? values.email : "",
      status: type === "update" && values ? values.status : true,
      visibility: type === "update" && values ? values.visibility : true,
      role: type === "update" && values ? values.role : "",
      gender: type === "update" && values ? values.gender : "male",
      age: type === "update" && values ? values.age : "",

    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      // Submit form data to server or perform other actions
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={`add_product_form ${type}`}>
      <Typography variant="h3">{title}</Typography>

      <div className="inputs_container">
        <FileUpload
          imageSrc={null}
          onImageUpload={function (
            e: React.ChangeEvent<HTMLInputElement>
          ): void {
            console.log(e)
          }}
          onImageDelete={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <InputField
          label="Employee Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
          name="name"
        />

        <InputField
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.errors.address}
          name="address"
        />

        <InputField
          label="Phone Number"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          error={formik.errors.phoneNumber}
          name="phoneNumber"
        />

        <InputField
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
          name="email"
        />

        <DatePickerField
          label="Date Added"
          value={
            formik.values.dateAdded
              ? moment(formik.values.dateAdded)
              : undefined
          }
          onChange={(date) =>
            formik.setFieldValue("dateAdded", date ? date.toISOString() : null)
          }
          error={formik.errors.dateAdded}
        />

        <RolesSelect
          label="Role"
          selectedValue={formik.values.role}
          options={roleOptions}
          onChange={(value) => formik.setFieldValue("role", value)}
        />
        <RadioButtonGroup
          name="gender"
          label="Gender"
          options={genderOptions}
          value={formik.values.gender}
          onChange={(value) => formik.setFieldValue("gender", value)}
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

export default AddEmployeesForm;
