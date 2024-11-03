// // AddRoleForm.tsx
// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import InputField from "../../../components/common/inputField";
// import CheckboxGroupField from "../../../components/common/checkBoxGroup";
// import Button from "../../../components/common/button/Index";
// import Typography from "../../../components/common/typography/Index";
// import { message } from "antd";

// const permissionsOptions = [
//   { label: "Dashboard Access", value: "dashboard" },
//   { label: "Add Product", value: "addProduct" },
//   { label: "Get Product", value: "getProduct" },
//   { label: "Update Product", value: "updateProduct" },
//   { label: "Delete Product", value: "deleteProduct" },
// ];

// const validationSchema = Yup.object().shape({
//   roleName: Yup.string().required("Role name is required"),
//   permissions: Yup.array().min(1, "At least one permission must be selected"),
// });

// const AddRoleForm: React.FC = () => {
//   const formik = useFormik({
//     initialValues: {
//       roleName: "",
//       permissions: [] as string[],
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       const newRole = {
//         roleName: values.roleName,
//         permissions: values.permissions,
//       };

//       console.log("New Role:", newRole);
//       message.success("Role added successfully!");

//       // Reset form
//       formik.resetForm();
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit} className="add-role-form form">
//       <Typography variant="h3">Add New Role</Typography>

//       <div className="inputs_container">
//         <InputField
//           label="Role Name"
//           value={formik.values.roleName}
//           onChange={formik.handleChange}
//           error={formik.touched.roleName ? formik.errors.roleName : undefined}
//           name="roleName"
//         />

//         <CheckboxGroupField
//           label="Permissions"
//           options={permissionsOptions}
//           selectedValues={formik.values.permissions}
//           onChange={(values) => formik.setFieldValue("permissions", values)}
//         />
//         {formik.touched.permissions && formik.errors.permissions && (
//           <div style={{ color: "red" }}>{formik.errors.permissions}</div>
//         )}
//       </div>

//       <Button variant="contained" type="submit">
//         Save Role
//       </Button>
//     </form>
//   );
// };

// export default AddRoleForm;

// AddRoleForm.tsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/common/inputField";
import CheckboxGroupField from "../../../components/common/checkBoxGroup";
import Button from "../../../components/common/button/Index";
import Typography from "../../../components/common/typography/Index";
import { message } from "antd";
import { RoleSourceItem } from "../pages/RolesList";

const permissionsOptions = [
  { label: "Dashboard Access", value: "dashboard" },
  { label: "Add Product", value: "addProduct" },
  { label: "Get Product", value: "getProduct" },
  { label: "Update Product", value: "updateProduct" },
  { label: "Delete Product", value: "deleteProduct" },
];

const validationSchema = Yup.object().shape({
  roleName: Yup.string().required("Role name is required"),
  permissions: Yup.array().min(1, "At least one permission must be selected"),
});

interface IAddRoleForm {
  type: "update" | "add";
  title: string;
  values?: RoleSourceItem;
}

const AddRoleForm: React.FC<IAddRoleForm> = ({
  type = "add",
  title,
  values,
}) => {
  const formik = useFormik({
    initialValues: {
      roleName: type === "update" && values ? values.name : "",
      permissions: type === "update" && values ? values.permissions : [],
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const newRole = {
        roleName: values.roleName,
        permissions: values.permissions,
      };

      if (type === "update") {
        console.log("Updated Role:", newRole);
        message.success("Role updated successfully!");
      } else {
        console.log("New Role:", newRole);
        message.success("Role added successfully!");
      }

      // Reset form
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="add-role-form form">
      <Typography variant="h3">{title}</Typography>

      <div className="inputs_container">
        <InputField
          label="Role Name"
          value={formik.values.roleName}
          onChange={formik.handleChange}
          error={formik.touched.roleName ? formik.errors.roleName : undefined}
          name="roleName"
        />

        <CheckboxGroupField
          label="Permissions"
          options={permissionsOptions}
          selectedValues={formik.values.permissions}
          onChange={(values) => formik.setFieldValue("permissions", values)}
        />
        {formik.touched.permissions && formik.errors.permissions && (
          <div style={{ color: "red" }}>{formik.errors.permissions}</div>
        )}
      </div>

      <Button variant="contained" type="submit">
        {type === "update" ? "Update Role" : "Save Role"}
      </Button>
    </form>
  );
};

export default AddRoleForm;
