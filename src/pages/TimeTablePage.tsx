import React from "react";
import { v4 as uuidv4 } from "uuid";
import { employees, services } from "../constants/constants";
import type { ServiceCategory, ServiceCategorySimple } from "../types/types";
import type { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createCard } from "../redux/createCardSlice";
import TimePicker from "../components/TimePicker";
import Table from "../components/Table";
import SelectPerson from "../components/SelectPerson";
import { getServiceDuration } from "../utils/getServiceDuration";
import Calendar from "../components/Calendar";
import Modal from "../components/Modal";

type FlatService = {
  id: number;
  name: string;
  parent: string | null;
};

const TimeTablePage = () => {
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
  const [employee, setEmployee] = React.useState<string>(() => {
    return localStorage.getItem("employee") || "";
  });
  const [selectedTime, setSelectedTime] = React.useState<string>("");

  const [fullDoctorList, setFullDoctorList] = React.useState<string>(() => {
    return localStorage.getItem("allperson") || "";
  });
  const [selectCaledarDate, setSelectCaledarDate] = React.useState(() => {
    return localStorage.getItem("day") || "";
  });

  const [openModal, setOpenModal] = React.useState(false);

  const handleModal = () => {
    setOpenModal(() => !openModal);
  };

  const dispatch: AppDispatch = useDispatch();
  const card = useSelector((state: RootState) => state.createCardSlice.cards);

  const allEmployees = employees.map((item) => item);
  React.useEffect(() => {
    const storedValue = localStorage.getItem("allperson");
    if (!storedValue && allEmployees.length > 0) {
      const defaultDoctor = allEmployees[0].name;
      setFullDoctorList(defaultDoctor);
      localStorage.setItem("allperson", defaultDoctor);
    }
  }, [allEmployees]);

  const handleChangeTime = (value: string) => {
    setSelectedTime(value);
  };
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

    const selectedEmployee = doctors.find((el) => el.name === employee);
    const employeeId = selectedEmployee?.id;
    if (!currentService || !selectedTime || !date || !employee) {
      alert("Заполните все поля");
      return;
    }

    const durationTime = getServiceDuration(
      selectedServiceId,
      selectedCategoryId
    );

    // 🔍 Проверка на пересечение записи
    const conflictExists = card.some((card) => {
      if (card.employee !== employee || card.date !== date) return false;

      const toMinutes = (t: string) => {
        const [h, m] = t.split(":").map(Number);
        return h * 60 + m;
      };

      const cardStartMin = toMinutes(card.time);
      const cardEndMin = cardStartMin + card.duration;

      const newStartMin = toMinutes(selectedTime);
      if (durationTime) {
        const newEndMin = newStartMin + durationTime;
        // Пересекаются ли интервалы

        return newStartMin < cardEndMin && cardStartMin < newEndMin;
      }
    });

    if (conflictExists) {
      alert("У этого сотрудника уже есть запись в это время.");
      return;
    }

    const infoCard = {
      id: uuidv4(),
      service: currentService?.name,
      time: selectedTime,
      date,
      employee,
      employeeId,
      duration: durationTime,
    };
    dispatch(createCard(infoCard));
    handleModal();
    setSelectedCategoryId(null);
    setSelectedServiceId(null);
    setAvaliableService([]);
    setDate("");
    setEmployee("");
    setSelectedTime("");
  };
  const handleCalendarDay = (date: string) => {
    setSelectCaledarDate(date);
  };

  return (
    <section className="table">
      <div className="container">
        <div className="table_body">
          <div className="table_body-left">
            <div className="table_filter">
              <Calendar onDaySelect={handleCalendarDay} />
            </div>
            <div className="table_form">
              <p className="table_form-title">Запись на прием</p>
              <div className="table_form-body">
                <select
                  className="table_form-select select-arrow"
                  onChange={(e) =>
                    setSelectedCategoryId(Number(e.target.value))
                  }
                >
                  <option>Выберите категорию</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.category}
                    </option>
                  ))}
                </select>
                <select
                  className="table_form-select select-arrow"
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
                <SelectPerson
                  value={employee}
                  onChange={setEmployee}
                  options={doctors}
                  storageKey="employee"
                />
                <div>
                  <TimePicker
                    value={selectedTime}
                    handleChangeTime={(value: string) =>
                      handleChangeTime(value)
                    }
                  />
                </div>
                <input
                  className="table_form-input"
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                />
                <button className="table_form-btn" onClick={sendDataForCard}>
                  Отправить
                </button>
                <Modal
                  text="Запись успешно внесена!"
                  isOpen={openModal}
                  onClose={() => setOpenModal(false)}
                />
              </div>
            </div>
          </div>
          <div className="table_body-right">
            <SelectPerson
              value={fullDoctorList}
              onChange={setFullDoctorList}
              options={allEmployees}
              storageKey="allperson"
            />
            <Table value={fullDoctorList} calendarDay={selectCaledarDate} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeTablePage;
