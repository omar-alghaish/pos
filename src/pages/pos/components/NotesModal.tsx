import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/common/button/Index";
import { editOrder } from "../../../features/order/orderSlice";
import { RootState } from "../../../app/store";
import Input from "../../../components/common/input/Indext";
import Typography from "../../../components/common/typography/Index";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import IconButton from "../../../components/common/iconButton/Index";
interface NotesModalProps {
  onClose: () => void;
}

const NotesModal: React.FC<NotesModalProps> = ({ onClose }) => {
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
  };

  const handleAddNote = () => {
    const updatedNotes = [...order.notes, {id: `${order.notes.length}`, text: inputValue }];
    dispatch(editOrder({ ...order, notes: updatedNotes }));
    setInputValue("");
  };

  const hanldeRemoveNote = (id:string) =>{
    const updatedNotes = order.notes.filter((note)=> note.id != id)
    dispatch(editOrder({ ...order, notes: updatedNotes }));

  }

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <div className="notes_modal" style={{}}>
      <div className="input_container">
        <Input
          // label="Add Note"
          value={inputValue}
          onChange={handleInputChange}
          variant="filled" // You can switch to "filled" or "standard"
          placeholder="enter note"
          fullWidth
        />
        <div>
          <Button
            variant="contained"
            disabled={inputValue ? false : true}
            onClick={handleAddNote}
          >
            Add
          </Button>
        </div>
      </div>
      <div>
        <div className="notes_container">
          {order.notes.map((item, index) => {
            return (
              <div className="note">
                <Typography>
                  {index + 1}- {item.text}
                </Typography>
                <div className="buttons_container">
                  <IconButton
                    className="edit"
                    icon={<MdOutlineModeEditOutline />}
                  />
                  <IconButton onClick={()=> hanldeRemoveNote(item.id)} className="delete" icon={<FaTrashAlt />} />
                </div>{" "}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotesModal;
