// //

// import React, { useState } from "react";
// import Typography from "../../../components/common/typography/Index";
// import { FaBarcode } from "react-icons/fa";
// import { Select, DatePicker, Input, Button } from "antd";
// import { categories } from "../../pos/Index";
// import IconButton from "../../../components/common/iconButton/Index";
// import { MdDelete } from "react-icons/md";
// import moment from "moment";
// import * as Yup from "yup";
// import { useFormik } from "formik";

// interface Option {
//   name: string;
//   price: string;
// }

// const validationSchema = Yup.object().shape({
//   productName: Yup.string().required("Product name is required"),
//   productCode: Yup.string().required("Product code is required"),
//   dateAdded: Yup.date().required("Date is required"),
//   price: Yup.number().required("Price is required"),
//   stockQuantity: Yup.number().required("Stock quantity is required"),
//   unitType: Yup.string().required("Unit type is required"),
//   discount: Yup.number().min(0).max(100, "Discount must be between 0 and 100"),
//   expirationDate: Yup.date(),
//   description: Yup.string(),
//   notes: Yup.array().of(Yup.string().required("Note cannot be empty")),
//   options: Yup.array().of(
//     Yup.object().shape({
//       name: Yup.string().required("Option name is required"),
//       price: Yup.number().required("Option price is required"),
//     })
//   ),
// });

// const AddProduct = () => {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSupplier, setSelectedSupplier] = useState("");
//   const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
//   const [description, setDescription] = useState("");
//   const [notes, setNotes] = useState<string[]>([]);
//   const [options, setOptions] = useState<Option[]>([{ name: "", price: "" }]);

//   const addProductForm = useFormik({
//     initialValues: {
//       productName: "",
//       productCode: "",
//       dateAdded: moment(),
//       price: "",
//       stockQuantity: "",
//       unitType: "",
//       discount: "",
//       expirationDate: null,
//       description: "",
//       notes: [""],
//       options: [{ name: "", price: "" }],
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       console.log("Form values", values);
//     },
//   });

//   const handleCategoryChange = (value: React.SetStateAction<string>) =>
//     setSelectedCategory(value);
//   const handleSupplierChange = (value: React.SetStateAction<string>) =>
//     setSelectedSupplier(value);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageSrc(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageDelete = () => setImageSrc(null);

//   const handleNoteChange = (index: number, value: string) => {
//     const updatedNotes = [...notes];
//     updatedNotes[index] = value;
//     setNotes(updatedNotes);
//   };

//   const addNote = () => setNotes([...notes, ""]);
//   const removeNote = (index: number) =>
//     setNotes(notes.filter((_, i) => i !== index));

//   const handleOptionChange = (
//     index: number,
//     field: keyof Option,
//     value: string
//   ) => {
//     const updatedOptions = [...options];
//     updatedOptions[index][field] = value;
//     setOptions(updatedOptions);
//   };

//   const addOption = () => setOptions([...options, { name: "", price: "" }]);
//   const removeOption = (index: number) =>
//     setOptions(options.filter((_, i) => i !== index));

//   return (
//     <form onSubmit={addProductForm.handleSubmit} className="add_product_page">
//       <div className="left_sidebar">
//         <div className="product_img">
//           {imageSrc ? (
//             <div className="image_preview">
//               <img src={imageSrc as string} alt="Uploaded product" />
//               <IconButton
//                 variant="contained"
//                 color="error"
//                 className="delete_button"
//                 icon={<MdDelete />}
//                 onClick={handleImageDelete}
//               />
//             </div>
//           ) : (
//             <label className="upload_button">
//               Add Image
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 style={{ display: "none" }}
//               />
//             </label>
//           )}
//         </div>
//         <div className="bottom">
//           <div className="category item">
//             <div className="category_input item_input">
//               <Typography>Choose Category</Typography>
//               <Select
//                 style={{ width: "100%" }}
//                 placeholder="Select a category"
//                 value={selectedCategory}
//                 onChange={handleCategoryChange}
//                 options={categories.map((category) => ({
//                   label: category.name,
//                   value: category.id,
//                 }))}
//                 showSearch
//                 filterOption={(input, option) =>
//                   (option?.label ?? "")
//                     .toLowerCase()
//                     .includes(input.toLowerCase())
//                 }
//               />
//             </div>
//           </div>
//           <div className="supplier item">
//             <div className="supplier_input item_input">
//               <Typography>Choose Supplier</Typography>
//               <Select
//                 style={{ width: "100%" }}
//                 placeholder="Select a supplier"
//                 value={selectedSupplier}
//                 onChange={handleSupplierChange}
//                 options={categories.map((category) => ({
//                   label: category.name,
//                   value: category.id,
//                 }))}
//                 showSearch
//                 filterOption={(input, option) =>
//                   (option?.label ?? "")
//                     .toLowerCase()
//                     .includes(input.toLowerCase())
//                 }
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="right_side">
//         <div className="add_product_form">
//           <div className="input_item">
//             <Typography>Product Name</Typography>
//             <Input
//               placeholder="Enter product name"
//               value={addProductForm.values.productName}
//               onChange={addProductForm.handleChange("productName")}
//             />
//             {addProductForm.errors.productName && (
//               <div className="error_message">
//                 {addProductForm.errors.productName}
//               </div>
//             )}
//           </div>
//           <div className="input_item">
//             <Typography>Product Code</Typography>
//             <Input
//               placeholder="Enter product code"
//               value={addProductForm.values.productCode}
//               onChange={addProductForm.handleChange("productCode")}
//             />
//             {addProductForm.errors.productCode && (
//               <div className="error_message">
//                 {addProductForm.errors.productCode}
//               </div>
//             )}
//           </div>

//           <div className="input_item">
//             <Typography>Date Added</Typography>
//             <DatePicker
//               defaultValue={moment()}
//               format="YYYY-MM-DD"
//               style={{ width: "100%" }}
//               onChange={(date) =>
//                 addProductForm.setFieldValue("dateAdded", date)
//               }
//             />
//             {addProductForm.errors.productName && (
//               <div className="error_message">
//                 {String(addProductForm.errors.productName)}
//               </div>
//             )}
//           </div>

//           <div className="input_item">
//             <Typography>Price</Typography>
//             <Input
//               type="number"
//               placeholder="Enter price"
//               value={addProductForm.values.price}
//               onChange={addProductForm.handleChange("price")}
//             />
//             {addProductForm.errors.price && (
//               <div className="error_message">{addProductForm.errors.price}</div>
//             )}
//           </div>

//           <div className="input_item">
//             <Typography>Stock Quantity</Typography>
//             <Input
//               type="number"
//               placeholder="Enter stock quantity"
//               value={addProductForm.values.stockQuantity}
//               onChange={addProductForm.handleChange("stockQuantity")}
//             />
//             {addProductForm.errors.stockQuantity && (
//               <div className="error_message">
//                 {addProductForm.errors.stockQuantity}
//               </div>
//             )}
//           </div>

//           <div className="input_item">
//             <Typography>Unit Type</Typography>
//             <Select
//               style={{ width: "100%" }}
//               placeholder="Select unit type"
//               options={[
//                 { label: "Kg", value: "kg" },
//                 { label: "Piece", value: "piece" },
//                 { label: "Box", value: "box" },
//               ]}
//               onChange={(value) =>
//                 addProductForm.setFieldValue("unitType", value)
//               }
//             />
//             {addProductForm.errors.unitType && (
//               <div className="error_message">
//                 {addProductForm.errors.unitType}
//               </div>
//             )}
//           </div>

//           <div className="input_item">
//             <Typography>Discount (%)</Typography>
//             <Input
//               type="number"
//               placeholder="Enter discount"
//               value={addProductForm.values.discount}
//               onChange={addProductForm.handleChange("discount")}
//             />
//             {addProductForm.errors.discount && (
//               <div className="error_message">
//                 {addProductForm.errors.discount}
//               </div>
//             )}
//           </div>

//           <div className="input_item">
//             <Typography>Expiration Date</Typography>
//             <DatePicker
//               format="YYYY-MM-DD"
//               style={{ width: "100%" }}
//               onChange={(date) =>
//                 addProductForm.setFieldValue("expirationDate", date)
//               }
//             />
//             {addProductForm.errors.expirationDate && (
//               <div className="error_message">
//                 {addProductForm.errors.expirationDate}
//               </div>
//             )}
//           </div>

//           <div className="input_item">
//             <Typography>Description</Typography>
//             <Input.TextArea
//               placeholder="Enter product description"
//               value={addProductForm.values.description}
//               onChange={addProductForm.handleChange("description")}
//             />
//           </div>
//         </div>
//         <div className="notes_options">
//           <div className="notes_section">
//             <Typography>Notes</Typography>
//             {notes.map((note, index) => (
//               <div key={index} className="item">
//                 <div className="note_item">
//                   <Input
//                     placeholder={`Note ${index + 1}`}
//                     value={note}
//                     onChange={(e) => handleNoteChange(index, e.target.value)}
//                   />
//                   <IconButton
//                     variant="contained"
//                     color="error"
//                     className="delete_button"
//                     icon={<MdDelete />}
//                     onClick={() => removeNote(index)}
//                   />
//                 </div>

//                 {note === "" && (
//                   <div className="error_message">Note cannot be empty</div>
//                 )}
//               </div>
//             ))}
//             <Button onClick={addNote}>Add Note</Button>
//           </div>
//           <div className="options_section">
//             <Typography>Options</Typography>
//             {options.map((option, index) => (
//               <div key={index} className="item">
//                 <div className="option_item">
//                   <Input
//                     placeholder="Option Name"
//                     value={option.name}
//                     onChange={(e) =>
//                       handleOptionChange(index, "name", e.target.value)
//                     }
//                   />
//                   <Input
//                     type="number"
//                     placeholder="Option Price"
//                     value={option.price}
//                     onChange={(e) =>
//                       handleOptionChange(index, "price", e.target.value)
//                     }
//                   />
//                   <IconButton
//                     variant="contained"
//                     color="error"
//                     className="delete_button"
//                     icon={<MdDelete />}
//                     onClick={() => removeOption(index)}
//                   />
//                 </div>

//                 {option.name === "" && (
//                   <div className="error_message">Option name is required</div>
//                 )}
//                 {option.price === "" && (
//                   <div className="error_message">Option price is required</div>
//                 )}
//               </div>
//             ))}
//             <Button onClick={addOption}>Add Option</Button>
//           </div>
//         </div>
//         <Button type="primary" htmlType="submit">
//           Add Product
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default AddProduct;

// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import moment from "moment";
// import FileUpload from "../../../components/common/fileUpload";
// import CategorySelect from "../components/CategorySelect";
// import InputField from "../../../components/common/inputField";
// import DatePickerField from "../../../components/common/datePickerField";
// import NotesSection from "../components/NotesSection";
// import OptionsSection from "../components/OptionsSection";
// import { categories } from "../../pos/Index";
// import { Button } from "antd";

// const validationSchema = Yup.object().shape({
//   productName: Yup.string().required("Product name is required"),
//   productCode: Yup.string().required("Product code is required"),
//   dateAdded: Yup.date().required("Date is required"),
//   price: Yup.number().required("Price is required"),
//   stockQuantity: Yup.number().required("Stock quantity is required"),
//   unitType: Yup.string().required("Unit type is required"),
//   discount: Yup.number().min(0).max(100, "Discount must be between 0 and 100"),
//   expirationDate: Yup.date().nullable(),
// });

// const AddProduct = () => {
//   const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
//   const [notes, setNotes] = useState<string[]>([""]);
//   const [options, setOptions] = useState<{ name: string; price: string }[]>([
//     { name: "", price: "" },
//   ]);

//   const formik = useFormik({
//     initialValues: {
//       productName: "",
//       productCode: "",
//       dateAdded: moment(),
//       price: 0,
//       stockQuantity: 0,
//       unitType: "",
//       discount: 0,
//       expirationDate: null,
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       const productData = {
//         ...values,
//         imageSrc,
//         notes,
//         options,
//       };
//       console.log(productData);
//       // Submit your form data to the server or any other action
//     },
//   });

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageSrc(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageDelete = () => {
//     setImageSrc(null);
//   };

//   const handleAddNote = () => {
//     setNotes([...notes, ""]);
//   };

//   const handleNoteChange = (index: number, value: string) => {
//     const updatedNotes = [...notes];
//     updatedNotes[index] = value;
//     setNotes(updatedNotes);
//   };

//   const handleRemoveNote = (index: number) => {
//     setNotes(notes.filter((_, i) => i !== index));
//   };

//   const handleAddOption = () => {
//     setOptions([...options, { name: "", price: "" }]);
//   };

//   const handleOptionChange = (
//     index: number,
//     field: keyof (typeof options)[0],
//     value: string
//   ) => {
//     const updatedOptions = [...options];
//     updatedOptions[index][field] = value;
//     setOptions(updatedOptions);
//   };

//   const handleRemoveOption = (index: number) => {
//     setOptions(options.filter((_, i) => i !== index));
//   };

//   const categoryOptions = categories.map((category) => ({
//     label: category.name, // Assuming 'name' is the correct property in ICategory
//     value: category.id, // Assuming 'id' is the unique identifier
//   }));

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <FileUpload
//         imageSrc={imageSrc}
//         onImageUpload={handleImageUpload}
//         onImageDelete={handleImageDelete}
//       />
//       <CategorySelect
//         selectedValue={formik.values.unitType}
//         onChange={formik.handleChange}
//         options={categoryOptions}
//         label="Category"
//       />
//       <InputField
//         label="Product Name"
//         value={formik.values.productName}
//         onChange={formik.handleChange}
//         error={formik.errors.productName}
//       />
//       <InputField
//         label="Product Code"
//         value={formik.values.productCode}
//         onChange={formik.handleChange}
//         error={formik.errors.productCode}
//       />
//       <DatePickerField
//         label="Date Added"
//         onChange={(date) => formik.setFieldValue("dateAdded", date)}
//         error={
//           typeof formik.errors.dateAdded === "string"
//             ? formik.errors.dateAdded
//             : undefined
//         } // Ensure it's a string
//       />
//       <InputField
//         label="Price"
//         value={formik.values.price.toString()} // Convert to string
//         onChange={formik.handleChange}
//         type="number"
//         error={formik.errors.price}
//       />
//       <InputField
//         label="Stock Quantity"
//         value={formik.values.stockQuantity.toString()} // Convert to string
//         onChange={formik.handleChange}
//         type="number"
//         error={formik.errors.stockQuantity}
//       />

//       <InputField
//         label="Discount (%)"
//         value={formik.values.discount.toString()} // Convert to string
//         onChange={formik.handleChange}
//         type="number"
//         error={formik.errors.discount}
//       />
//       <DatePickerField
//         label="Expiration Date"
//         onChange={(date) => formik.setFieldValue("expirationDate", date)}
//       />
      
//       <NotesSection
//         notes={notes}
//         onNoteChange={handleNoteChange}
//         onAddNote={handleAddNote}
//         onRemoveNote={handleRemoveNote}
//       />
//       <OptionsSection
//         options={options}
//         onOptionChange={handleOptionChange}
//         onAddOption={handleAddOption}
//         onRemoveOption={handleRemoveOption}
//       />
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </form>
//   );
// };

// export default AddProduct;


import AddProductForm from '../components/AddProductForm'

const AddProduct = () => {
  return (
    <div>
      <AddProductForm type='add' />
    </div>
  )
}

export default AddProduct
