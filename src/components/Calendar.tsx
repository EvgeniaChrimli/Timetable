import React from "react";
import "../styles/_calendar.scss";

const Calendar = () => {
  return (
    <div className="calendar">
      <div className="header">
        <div className="month"></div>
      </div>
      <div className="weekDays">
        <div>Пн</div>
        <div>Вт</div>
        <div>Ср</div>
        <div>Чт</div>
        <div>Пт</div>
        <div>Сб</div>
        <div>Вс</div>
      </div>
      <div className="days"></div>
    </div>
  );
};

export default Calendar;
