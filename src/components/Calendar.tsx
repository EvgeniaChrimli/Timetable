import React, { type JSX } from "react";
import "../styles/_calendar.scss";
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

interface Props {
  onDaySelect?: (date: string) => void;
}

const Calendar = ({ onDaySelect }: Props) => {
  const today = new Date();
  const [selectMonth, setSelectMonth] = React.useState<number>(
    today.getMonth()
  );
  const [selectYear, setSelectYear] = React.useState<number>(
    today.getFullYear()
  );
  const [selectDay, setSelectDay] = React.useState<string>(() => {
    return localStorage.getItem("day") || "";
  });

  const getDayMonth = (year: number, month: number): JSX.Element[] => {
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days: JSX.Element[] = [];

    const offSet = (firstDayOfWeek + 6) % 7;
    for (let i = 0; i < offSet; i++) {
      days.push(<div key={`empty-${i}`} className="empty" />);
    }

    for (let i = 1; i <= totalDays; i++) {
      const isToday =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const isSelected =
        selectDay ===
        `${selectYear}-${(selectMonth + 1).toString().padStart(2, "0")}-${i
          .toString()
          .padStart(2, "0")}`;

      days.push(
        <div
          key={i}
          onClick={() => handleDayClick(i)}
          className={`calendar_day ${isToday ? "today" : ""} ${
            isSelected ? "selected" : ""
          }`}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const handleDayClick = (day: number) => {
    const month = (selectMonth + 1).toString().padStart(2, "0");
    const dayStr = day.toString().padStart(2, "0");
    const formattedDate = `${selectYear}-${month}-${dayStr}`;
    setSelectDay(formattedDate);

    localStorage.setItem("day", formattedDate);

    onDaySelect?.(formattedDate);
  };

  const handleMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setSelectMonth(Number(e.target.value));
    const newMonth = Number(e.target.value);
    setSelectMonth(newMonth);
    if (newMonth === 0) {
      setSelectYear(today.getFullYear());
    }
  };

  return (
    <div className="calendar">
      <div className="calendar_header">
        <select
          className="calendar_select"
          value={selectMonth}
          onChange={handleMonth}
        >
          {months.map((month, index) => (
            <option className="calendar_option" key={month} value={index}>
              {month} {selectYear}
            </option>
          ))}
        </select>
      </div>
      <div className="calendar_body">
        <div className="calendar_weekDays">
          <div className="calendar_dayofweek">Пн</div>
          <div className="calendar_dayofweek">Вт</div>
          <div className="calendar_dayofweek">Ср</div>
          <div className="calendar_dayofweek">Чт</div>
          <div className="calendar_dayofweek">Пт</div>
          <div className="calendar_dayofweek">Сб</div>
          <div className="calendar_dayofweek">Вс</div>
        </div>
        <div className="calendar_days">
          {getDayMonth(selectYear, selectMonth)}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
