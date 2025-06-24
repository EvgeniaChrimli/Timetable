import type { Employee, ServiceCategory } from "../types/types";

export const employees: Employee[] = [
  {
    id: 1,
    name: "Старцев Иван Иванович",
    specialtyIds: [101, 102],
  },
  {
    id: 2,
    name: "Петрова Мария Сергеевна",
    specialtyIds: [201, 203],
  },
  {
    id: 3,
    name: "Романов Алексей Николаевич",
    specialtyIds: [301, 303],
  },
  {
    id: 4,
    name: "Кузнецова Анна Владимировна",
    specialtyIds: [202, 204],
  },
  {
    id: 5,
    name: "Морозов Дмитрий Павлович",
    specialtyIds: [307, 308],
  },
  {
    id: 6,
    name: "Васильева Елена Андреевна",
    specialtyIds: [205, 203],
  },
  {
    id: 7,
    name: "Никитин Артём Евгеньевич",
    specialtyIds: [304, 305, 306],
  },
  {
    id: 8,
    name: "Фёдорова Татьяна Михайловна",
    specialtyIds: [302],
  },
];

export const services: ServiceCategory[] = [
  {
    id: 1,
    category: "Пластическая хирургия",
    subcategories: [
      { id: 101, name: "Ринопластика", duration: 60 },
      { id: 102, name: "Блефаропластика", duration: 75 },
      { id: 103, name: "Липосакция", duration: 90 },
    ],
  },
  {
    id: 2,
    category: "Косметология",
    subcategories: [
      { id: 201, name: "Увеличение губ", duration: 30 },
      { id: 202, name: "Чистка лица", duration: 45 },
      { id: 203, name: "Биоревитализация", duration: 60 },
      { id: 204, name: "Биорепарация", duration: 60 },
      { id: 205, name: "Коррекция носогубных складок", duration: 30 },
    ],
  },
  {
    id: 3,
    category: "Хирургическое отделение",
    subcategories: [
      {
        name: "Гинекология",
        services: [
          { id: 301, name: "Лечение кисты", duration: 105 },
          { id: 302, name: "Эстетическая гинекология", duration: 60 },
          { id: 303, name: "Удаление миомы", duration: 60 },
        ],
      },
      {
        name: "ЛОР",
        services: [
          { id: 304, name: "Удаление миндалин", duration: 45 },
          { id: 305, name: "Лечение тонзиллита", duration: 45 },
          { id: 306, name: "Пластика носового клапана", duration: 105 },
        ],
      },
      {
        name: "Флебология",
        services: [
          { id: 307, name: "Склеротерапия", duration: 60 },
          { id: 308, name: "Абляция вен", duration: 75 },
        ],
      },
    ],
  },
];
