import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { generateTimeSlots } from "../utils/genereteTimeSlots";
import { removeCard } from "../redux/createCardSlice";
import delet from "/images/delet.svg";
import "../styles/_table.scss";

interface Props {
  value: string;
  calendarDay: string;
}
const Table = ({ value, calendarDay }: Props) => {
  const cards = useSelector((state: RootState) => state.createCardSlice.cards);
  const dispatch: AppDispatch = useDispatch();
  const workingHours = generateTimeSlots(9, 21, 15);

  React.useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const rows = [];
  let i = 0;
  while (i < workingHours.length) {
    const hour = workingHours[i];

    const deleteCard = (id: string) => {
      dispatch(removeCard(id));
    };
    const filteredCard = cards.find((elem) => {
      return (
        elem.employee === value &&
        elem.time === hour &&
        elem.date === calendarDay
      );
    });

    if (filteredCard) {
      const slots = filteredCard.duration / 15;
      rows.push(
        <div key={hour} className="scheduleTable_row">
          <div className="scheduleTable_row-time">{hour}</div>
          <div
            style={{ height: `${slots * 40}px` }}
            className="scheduleTable_row-appointment filled"
          >
            {filteredCard.employee} — {filteredCard.service}
            <img
              className="delete-btn"
              src={delet}
              onClick={() => deleteCard(filteredCard.id)}
            />
          </div>
        </div>
      );

      i += slots;
    } else {
      rows.push(
        <div key={hour} className="scheduleTable_row">
          <div className="scheduleTable_row-time">{hour}</div>
          <div className="scheduleTable_row-appointment emptytime">
            Свободно
          </div>
        </div>
      );
      i++;
    }
  }
  return <div className="scheduleTable">{rows}</div>;
};

export default Table;
