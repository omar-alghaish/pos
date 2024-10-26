import React, { useState } from "react";
import Input from "../../../components/common/input/Indext";
import Typography from "../../../components/common/typography/Index";
import { FaBarcode } from "react-icons/fa";
import { Select } from "antd";
import { categories } from "../../pos/Index";
import IconButton from "../../../components/common/iconButton/Index";
import { MdDelete } from "react-icons/md";
import Divider from "../../../components/common/divider/Index";

const AddProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);

  const handleCategoryChange = (value: React.SetStateAction<string>) => {
    setSelectedCategory(value);
  };

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
    setImageSrc(null); // Reset imageSrc to null to remove the image
  };

  return (
    <div className="add_product_page">
      <div className="left_sidebar">
        <div className="product_img">
          {imageSrc ? (
            <div className="image_preview">
              <img src={imageSrc as string} alt="Uploaded product" />
              <IconButton
                variant="contained"
                color="error"
                className="delete_button"
                icon={<MdDelete />}
                onClick={handleImageDelete} // Attach the delete function here
              />
            </div>
          ) : (
            <label className="upload_button">
              Add Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>
          )}
        </div>
        <div className="bottom">
          <div className="category item">
            <div className="category_input item_input">
              <Typography>Choose Category</Typography>
              <Select
                style={{ width: "100%" }}
                placeholder="Select a category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </div>
          </div>
          <div className="supliar item">
            <div className="supliar_input item_input">
              <Typography>Choose Supliar</Typography>
              <Select
                style={{ width: "100%" }}
                placeholder="Select a supliar"
                value={selectedCategory}
                onChange={handleCategoryChange}
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </div>
          </div>
          <div className="barcode">
            <div className="barcode_input">
              <Typography>Barcode</Typography>
              <Input
                prefix={<FaBarcode />}
                placeholder="Enter barcode number"
                value={""}
                onChange={(e) => {
                  // Implement barcode change logic
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="add_product_form">
        <div className="input_item">
          <Typography>Product name</Typography>
          <Input
            value={""}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <Divider />
         <div className="input_item">
          <Typography>Product name</Typography>
          <Input
            value={""}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <Divider /> <div className="input_item">
          <Typography>Product name</Typography>
          <Input
            value={""}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <Divider /> <div className="input_item">
          <Typography>Product name</Typography>
          <Input
            value={""}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <Divider /> <div className="input_item">
          <Typography>Product name</Typography>
          <Input
            value={""}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <Divider /> <div className="input_item">
          <Typography>Product name</Typography>
          <Input
            value={""}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <Divider />
      </div>
    </div>
  );
};

export default AddProduct;
