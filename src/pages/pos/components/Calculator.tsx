import { useState } from "react";
import IconButton from "../../../components/common/iconButton/Index";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleButtonClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const handleEquals = () => {
    try {
      setInput(eval(input).toString()); // Use a safer evaluation method in production
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{input || "0"}</div>
      <div className="calculator-buttons">
        {["7", "8", "9", "/"].map((val) => (
          <IconButton key={val} onClick={() => handleButtonClick(val)} icon={val} />
        ))}
        {["4", "5", "6", "*"].map((val) => (
          <IconButton key={val} onClick={() => handleButtonClick(val)} icon={val} />
        ))}
        {["1", "2", "3", "-"].map((val) => (
          <IconButton key={val} onClick={() => handleButtonClick(val)} icon={val} />
        ))}
        {["0", ".", "%", "+"].map((val) => (
          <IconButton key={val} onClick={() => handleButtonClick(val)} icon={val} />
        ))}
        <IconButton onClick={handleClear} icon="C" />
        <IconButton onClick={handleBackspace} icon="←" />
        <IconButton variant="contained" onClick={handleEquals} icon="=" />
      </div>
    </div>
  );
};

export default Calculator;
