import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "./dayPicker.css";

export const DatePicker = ({
  task,
  setTimeUntill,
  setIsDatePicking,
  dateIdToEdit,
}) => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {dateIdToEdit === task.id && (
        <div>
          {selected && <p>Until {selected.toLocaleDateString()}</p>}
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (date) {
                setSelected(date);
                setTimeUntill(date.toLocaleDateString());
                setIsDatePicking(false);
              }
            }}
          />
        </div>
      )}
    </>
  );
};
