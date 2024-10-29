import React from "react";
import Typography from "../../../components/common/typography/Index";
import { ICategory } from "../Index";

interface CategoryProps {
  item: ICategory;
  onClick?: () => void;
  className?: string;
}
const Category: React.FC<CategoryProps> = ({ item, onClick, className }) => {
  return (
    <div className={`category_container ${className}`} onClick={onClick}>
      <div className="category">{item.name}</div>
      <Typography color="secondary" variant="body2" className="quantity">
        {item.items_quantity} items
      </Typography>
    </div>
  );
};


export default Category;
