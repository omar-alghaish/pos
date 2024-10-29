import React from "react";
import { DatePicker } from "antd";
import Typography from "../../../components/common/typography/Index";
import moment from "moment";

interface DatePickerFieldProps {
  label: string;
  onChange: (date: moment.Moment | null) => void;
  error?: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  onChange,
  error,
}) => {
  return (
    <div className="input_item" style={{display:'flex',flexDirection:'column',alignItems:"flex-start"}}>
      <Typography>{label}</Typography>
      <DatePicker
        format="YYYY-MM-DD"
        style={{ width: "100%" }}
        onChange={onChange}
      />
      {error && <div className="error_message">{error}</div>}
    </div>
  );
};

export default DatePickerField;
