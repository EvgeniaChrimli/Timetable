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
    specialtyIds: [304, 306],
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
      { id: 101, name: "Ринопластика" },
      { id: 102, name: "Блефаропластика" },
      { id: 103, name: "Липосакция" },
    ],
  },
  {
    id: 2,
    category: "Косметология",
    subcategories: [
      { id: 201, name: "Увеличение губ" },
      { id: 202, name: "Чистка лица" },
      { id: 203, name: "Биоревитализация" },
      { id: 204, name: "Биорепарация" },
      { id: 205, name: "Коррекция носогубных складок" },
    ],
  },
  {
    id: 3,
    category: "Хирургическое отделение",
    subcategories: [
      {
        name: "Гинекология",
        services: [
          { id: 301, name: "Лечение кисты" },
          { id: 302, name: "Эстетическая гинекология" },
          { id: 303, name: "Удаление миомы" },
        ],
      },
      {
        name: "ЛОР",
        services: [
          { id: 304, name: "Удаление миндалин" },
          { id: 305, name: "Лечение тонзиллита" },
          { id: 306, name: "Пластика носового клапана" },
        ],
      },
      {
        name: "Флебология",
        services: [
          { id: 307, name: "Склеротерапия" },
          { id: 308, name: "Абляция вен" },
        ],
      },
    ],
  },
];
