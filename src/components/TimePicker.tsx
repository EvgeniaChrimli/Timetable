import { generateTimeSlots } from "../utils/genereteTimeSlots";
import "../styles/_timePicker.scss";

interface Props {
  value: string;
  handleChangeTime: (value: string) => void;
}
const TimePicker = ({ value, handleChangeTime }: Props) => {
  const timeSlots = generateTimeSlots(9, 21, 15);
  return (
    <>
      <label className="timepick" htmlFor="timepicker">
        Выберите время:
      </label>
      <select
        className="timepick_select"
        id="timepicker"
        value={value}
        onChange={(e) => handleChangeTime(e.target.value)}
      >
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
