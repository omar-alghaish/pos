// Header.tsx
import React from "react";
import Typography from "../../../common/typography/Index";
import Input from "../../../common/input/Indext";
import { IoIosSearch } from "react-icons/io";
import Button from "../../../common/button/Index";
import ViewSelect from "../../../viewSelect";
import { MdAddCircle, MdFilterListAlt } from "react-icons/md";

interface HeaderProps {
  title: string;
  filteredCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFilterToggle: () => void;
  onAddProduct: () => void;
  allowViewMode?: boolean;
  onViewChange: (mode: "grid" | "list") => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  filteredCount,
  searchQuery,
  setSearchQuery,
  onFilterToggle,
  onAddProduct,
  allowViewMode,
  onViewChange,
}) => {
  return (
    <div className="header">
      <div className="title">
        <Typography variant="h5">{title}:</Typography>
        <Typography variant="body2" color="secondary">
          {filteredCount}
        </Typography>
        <div className="search">
          <Input
            prefix={<IoIosSearch />}
            variant="outlined"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="buttons">
        <Button
          className="filter_button"
          variant="outlined"
          onClick={onFilterToggle}
        >
          <MdFilterListAlt /> Filters
        </Button>
        <Button
          variant="contained"
          className="add_button"
          onClick={onAddProduct}
        >
          <MdAddCircle /> Add product
        </Button>
        {allowViewMode && <ViewSelect onChangeView={onViewChange} />}
      </div>
    </div>
  );
};

export default Header;
