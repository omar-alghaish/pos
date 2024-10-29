import React from "react";
import { Button } from "antd";
import IconButton from "../../../components/common/iconButton/Index";
import { MdDelete } from "react-icons/md";
import Typography from "../../../components/common/typography/Index";
import InputField from "../../../components/common/inputField";

interface Option {
  name: string;
  price: string;
}

interface OptionsSectionProps {
  options: Option[];
  onOptionChange: (index: number, field: keyof Option, value: string) => void;
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
}

const OptionsSection: React.FC<OptionsSectionProps> = ({
  options,
  onOptionChange,
  onAddOption,
  onRemoveOption,
}) => {
  return (
    <div className="options_section">
      <Typography>Options</Typography>
      {options.map((option, index) => (
        <div key={index} className="item">
          <div className="option_item">
            <InputField
              placeholder="Option Name"
              value={option.name}
              onChange={(e) => onOptionChange(index, "name", e.target.value)}
              label={""}
            />
            <InputField
              type="number"
              placeholder="Option Price"
              value={option.price}
              onChange={(e) => onOptionChange(index, "price", e.target.value)}
              label={""}
            />
            <div style={{width:"max-content"}}>
              <IconButton
              variant="contained"
              color="error"
              className="delete_button"
              icon={<MdDelete />}
              onClick={() => onRemoveOption(index)}
            />  
            </div>
          
          </div>

          {option.name === "" && (
            <div className="error_message">Option name is required</div>
          )}
          {option.price === "" && (
            <div className="error_message">Option price is required</div>
          )}
        </div>
      ))}
      <Button onClick={onAddOption}>Add Option</Button>
    </div>
  );
};

export default OptionsSection;
