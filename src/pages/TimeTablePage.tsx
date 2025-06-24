import React from "react";
import { v4 as uuidv4 } from "uuid";
import { employees, services } from "../constants/constants";
import plus from "/images/plus.svg";
import type {
  Employee,
  ServiceCategory,
  ServiceCategorySimple,
} from "../types/types";
import type { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createCard } from "../redux/createCardSlice";
import TimePicker from "../components/TimePicker";
import Table from "../components/Table";
import SelectPerson from "../components/SelectPerson";

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
  const [employee, setEmployee] = React.useState<string>("");
  const [selectedTime, setSelectedTime] = React.useState<string>("");

  const [fullDoctorList, setFullDoctorList] = React.useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  const allEmployees = employees.map((item) => item);
  React.useEffect(() => {
    setFullDoctorList(allEmployees[0].name);
  }, []);

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
    const infoCard = {
      id: uuidv4(),
      service: currentService?.name,
      time: selectedTime,
      date,
      employee,
      employeeId,
      // duration: durationTime,
    };
    dispatch(createCard(infoCard));
  };

  return (
    <section>
      <div>
        <div>
          <SelectPerson
            value={fullDoctorList}
            onChange={setFullDoctorList}
            options={allEmployees}
          />

          <div>
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
            <SelectPerson
              value={employee}
              onChange={setEmployee}
              options={doctors}
            />
            <div>
              <TimePicker
                value={selectedTime}
                handleChangeTime={(value: string) => handleChangeTime(value)}
              />
            </div>
            <input onChange={(e) => setDate(e.target.value)} type="date" />
            <button onClick={sendDataForCard}>Отправить</button>
          </div>
        </div>
      </div>
      <Table value={fullDoctorList} />
    </section>
  );
};

export default TimeTablePage;
