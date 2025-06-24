import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import "../styles/_table.scss";
import { generateTimeSlots } from "../utils/genereteTimeSlots";

interface Props {
  value: string;
}
const Table = ({ value }: Props) => {
  const cards = useSelector((state: RootState) => state.createCardSlice.cards);

  const workingHours = generateTimeSlots(9, 21, 15);

  return (
    <div className="schedule-table">
      {workingHours.map((hour) => {
        const workHour = cards.find(
          (el) => el.time === hour && el.employee === value
        );

        return (
          <div key={hour} className="schedule-row">
            <div className="time-label">{hour}</div>
            {workHour ? (
              <div className="appointment filled">
                {workHour.employee} — {workHour.service}
              </div>
            ) : (
              <div className="appointment empty">Свободно</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Table;
