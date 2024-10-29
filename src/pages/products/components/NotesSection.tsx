import React from "react";
import {  Button } from "antd";
import IconButton from "../../../components/common/iconButton/Index";
import { MdDelete } from "react-icons/md";
import Typography from "../../../components/common/typography/Index";
import InputField from "../../../components/common/inputField";

interface NotesSectionProps {
  notes: string[];
  onNoteChange: (index: number, value: string) => void;
  onAddNote: () => void;
  onRemoveNote: (index: number) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  onNoteChange,
  onAddNote,
  onRemoveNote,
}) => {
  return (
    <div className="notes_section">
      <Typography>Notes</Typography>
      {notes.map((note, index) => (
        <div key={index} className="item">
          <div className="note_item">
            <InputField
              placeholder={`Note ${index + 1}`}
              value={note}
              onChange={(e) => onNoteChange(index, e.target.value)}
              label={""}
            />
            <div style={{width:"max-content"}}>
                <IconButton
              variant="contained"
              color="error"
              className="delete_button"
              icon={<MdDelete />}
              onClick={() => onRemoveNote(index)}
            />
            </div>
          
          </div>

          {note === "" && (
            <div className="error_message">Note cannot be empty</div>
          )}
        </div>
      ))}
      <Button onClick={onAddNote}>Add Note</Button>
    </div>
  );
};

export default NotesSection;
