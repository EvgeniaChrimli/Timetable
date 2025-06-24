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

  React.useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const rows = [];
  let i = 0;
  while (i < workingHours.length) {
    const hour = workingHours[i];

    // Есть ли услуга у текущего сотрудника на этом времени?
    const workHour = cards.find(
      (elem) => elem.employee === value && elem.time === hour
    );

    if (workHour) {
      const slots = workHour.duration / 15;
      rows.push(
        <div>
          <div key={hour} className="schedule-row">
            <div className="time-label">{hour}</div>
            <div
              style={{ height: `${slots * 40}px` }}
              className="appointment filled"
            >
              {workHour.employee} — {workHour.service}
            </div>
          </div>
        </div>
      );
      i += slots; // ⬅️ Пропускаем занятые слоты
    } else {
      rows.push(
        <div key={hour} className="schedule-row">
          <div className="time-label">{hour}</div>
          <div className="appointment empty">Свободно</div>
        </div>
      );
      i++;
    }
  }
  return <div className="schedule-table">{rows}</div>;
};

export default Table;
