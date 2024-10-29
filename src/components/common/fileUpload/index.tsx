import React from "react";
import IconButton from "../../../components/common/iconButton/Index";
import { MdDelete } from "react-icons/md";

interface FileUploadProps {
  imageSrc: string | ArrayBuffer | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  imageSrc,
  onImageUpload,
  onImageDelete,
}) => {
  return (
    <div className="uploadFile">
      {imageSrc ? (
        <div className="image_preview">
          <img src={imageSrc as string} alt="Uploaded product" />
          <IconButton
            variant="contained"
            color="error"
            className="delete_button"
            icon={<MdDelete />}
            onClick={onImageDelete}
          />
        </div>
      ) : (
        <label className="button outlined upload_button">
          Add Image
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            style={{ display: "none" }}
          />
        </label>
      )}
    </div>
  );
};

export default FileUpload;
