import React from "react";

interface Props {
  value: string;
  handleChange: (value: string) => void;
}
const TimePicker = ({ value, handleChange }: Props) => {
  //   const [selectedTime, setSelectedTime] = React.useState<string>("");
  const generateTimeSlots = (start: number, end: number, step: number) => {
    const slots = [];
    for (let hour = start; hour < end; hour++) {
      for (let min = 0; min < 60; min += step) {
        const hh = hour.toString().padStart(2, "0");
        const mm = min.toString().padStart(2, "0");
        slots.push(`${hh}:${mm}`);
      }
    }
    return slots;
  };
  const timeSlots = generateTimeSlots(9, 21, 15);
  return (
    <>
      <label htmlFor="time-select">Выберите время:</label>
      <select
        id="time-select"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
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
