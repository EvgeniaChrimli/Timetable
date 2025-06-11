import React from "react";
import { employees, services } from "../constants/constants";
import plus from "/images/plus.svg";
import type { ServiceCategory, ServiceCategorySimple } from "../types/types";
import type { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createCard } from "../redux/createCardSlice";
import TimePicker from "../components/TimePicker";

type FlatService = {
  id: number;
  name: string;
  parent: string | null;
};

const TimeTablePage = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    number | null
  >(null);
  const [selectedServiceId, setSelectedServiceId] = React.useState<
    number | null
  >(null);
  const [avaliableService, setAvaliableService] = React.useState<FlatService[]>(
    []
  );
  const [date, setDate] = React.useState<string>("");
  const [employee, setEmployee] = React.useState<string>("");

  const dispatch: AppDispatch = useDispatch();
  const allEmployees = employees.map((item) => item);

  const [selectedTime, setSelectedTime] = React.useState<string>("");
  const handleChange = (value: string) => {
    setSelectedTime(value);
  };

  //   const generateTimeSlots = (start: number, end: number, step: number) => {
  //     const slots = [];
  //     for (let hour = start; hour < end; hour++) {
  //       for (let min = 0; min < 60; min += step) {
  //         const hh = hour.toString().padStart(2, "0");
  //         const mm = min.toString().padStart(2, "0");
  //         slots.push(`${hh}:${mm}`);
  //       }
  //     }
  //     return slots;
  //   };
  //   const timeSlots = generateTimeSlots(9, 21, 15);

  function isSimpleCategory(
    category: ServiceCategory
  ): category is ServiceCategorySimple {
    return (
      Array.isArray(category.subcategories) && "id" in category.subcategories[0]
    );
  }
  function flatMapServices(
    category: ServiceCategory | undefined
  ): FlatService[] {
    if (!category || !category.subcategories) return [];

    if (isSimpleCategory(category)) {
      return category.subcategories.map((service) => ({
        id: service.id,
        name: service.name,
        parent: null,
      }));
    }

    return category.subcategories.flatMap((sub) => {
      return sub.services.map((service) => ({
        id: service.id,
        name: service.name,
        parent: sub.name,
      }));
    });
  }

  React.useEffect(() => {
    const category = services.find((cat) => cat.id === selectedCategoryId);
    if (category) {
      const flat = flatMapServices(category);
      setAvaliableService(flat);
    } else {
      setAvaliableService([]);
    }
  }, [selectedCategoryId]);

  const doctors = React.useMemo(() => {
    if (!selectedServiceId) return allEmployees;
    return employees.filter((e) => e.specialtyIds.includes(selectedServiceId));
  }, [selectedServiceId]);

  React.useEffect(() => {
    if (doctors.length > 0) {
      setEmployee(doctors[0].name);
    } else {
      setEmployee("");
    }
  }, [doctors]);

  const sendDataForCard = () => {
    const currentService = avaliableService.find(
      (item) => item.id === selectedServiceId
    );
    if (!currentService || !selectedTime || !date || !employee) {
      alert("Заполните все поля");
      return;
    }
    const infoCard = {
      service: currentService?.name,
      time: selectedTime,
      date,
      employee,
    };
    dispatch(createCard(infoCard));
  };

  console.log(employee);
  return (
    <section>
      <div>
        <img
          style={{ width: 20 }}
          src={plus}
          alt="Добавить услугу в расписание"
        />
        <div className="modal-overlay">
          <div className="modal">
            <select
              onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
            >
              <option>Выберите категорию</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.category}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setSelectedServiceId(Number(e.target.value))}
            >
              <option>Выберите услугу</option>
              {avaliableService.map((service) =>
                service.parent ? (
                  <optgroup key={service.id} label={service.parent}>
                    <option value={service.id}>{service.name}</option>
                  </optgroup>
                ) : (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                )
              )}
            </select>
            <select
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
            >
              {doctors.map(({ name, id }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <div>
              <TimePicker
                value={selectedTime}
                handleChange={(value: string) => handleChange(value)}
              />
              {/* <label htmlFor="time-select">Выберите время:</label>
              <select
                id="time-select"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">-- Выберите время --</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select> */}
            </div>
            <input onChange={(e) => setDate(e.target.value)} type="date" />
            <button onClick={sendDataForCard}>Отправить</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeTablePage;
