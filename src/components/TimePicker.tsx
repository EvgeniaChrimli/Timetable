import React from "react";
import { generateTimeSlots } from "../utils/genereteTimeSlots";

interface Props {
  value: string;
  handleChangeTime: (value: string) => void;
}
const TimePicker = ({ value, handleChangeTime }: Props) => {
  const timeSlots = generateTimeSlots(9, 21, 15);
  return (
    <>
      <label htmlFor="time-select">Выберите время:</label>
      <select
        id="time-select"
        value={value}
        onChange={(e) => handleChangeTime(e.target.value)}
      >
        <option value="">-- Выберите время --</option>
        {timeSlots.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </>
  );
};

export default TimePicker;
