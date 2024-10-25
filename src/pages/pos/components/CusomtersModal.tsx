import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/common/button/Index";
import { editOrder } from "../../../features/order/orderSlice";
import { RootState } from "../../../app/store";
import Input from "../../../components/common/input/Indext";
interface CustomersModalProps {
  onClose: () => void;
}

const CustomersModal: React.FC<CustomersModalProps> = ({ onClose }) => {
  const { order } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState<ICustomer[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  interface ICustomer {
    id: string;
    name: string;
    phone: string;
    address: string;
  }

  const customers: ICustomer[] = [
    {
      id: "1",
      name: "Omar Alghaish",
      phone: "01024897599",
      address: "8 Elsayed Hassen Street",
    },
    {
      id: "2",
      name: "Ismail",
      phone: "01024897598",
      address: "8 Elsayed Hassen Street",
    },
    {
      id: "3",
      name: "Belal",
      phone: "01024897597",
      address: "8 Elsayed Hassen Street",
    },
    {
      id: "4",
      name: "Mohammed",
      phone: "01024897596",
      address: "8 Elsayed Hassen Street",
    },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);

    if (value) {
      const filteredResults = customers
        .filter((customer) =>
          Object.values(customer).some((field) =>
            field.toLowerCase().includes(value)
          )
        )
        .slice(0, 10); // Get the top 10 results
      setSearchResult(filteredResults);
    } else {
      setSearchResult([]); // Clear results when input is empty
    }
  };

  const highlightText = (text: string, highlight: string) => {
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={i}>{part}</mark>
      ) : (
        part
      )
    );
  };

  const handleClick = (customer: ICustomer) => {
    dispatch(editOrder({ ...order, customer: customer.name }));
    onClose(); // Close the modal after selection
    setInputValue(""); // Clear input field
    setSearchResult([]); // Clear search results
  };

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <div>
      {/* Replace the normal input with our custom Input component */}
      <Input
        label="Search for customers"
        value={inputValue}
        onChange={handleInputChange}
        variant="filled" // You can switch to "filled" or "standard"
        placeholder="Enter customer name or phone"
        fullWidth
      />
      <div className="customers_results">
        {inputValue && searchResult.length > 0 ? (
          searchResult.map((item, index) => (
               <Button key={index} onClick={() => handleClick(item)}>
             {index + 1}-  {highlightText(item.name, inputValue)} -{" "}
              {highlightText(item.phone, inputValue)}
            </Button>
           
        
          ))
        ) : inputValue ? (
          <p>No results found</p>
        ) : null} {/* Do not display anything when input is empty */}
      </div>
    </div>
  );
};

export default CustomersModal;
