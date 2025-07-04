export interface Employee {
  id: number;
  name: string;
  specialtyIds: number[];
}

export interface SubCategiriesSimple {
  id: number;
  name: string;
  duration: number;
}
export interface SubCategoryGroup {
  //например подгруппа лор
  name: string;
  services: SubCategiriesSimple[];
}

export interface ServiceCategorySimple {
  //главная категория
  id: number;
  category: string;
  subcategories: SubCategiriesSimple[];
}

export interface ServiceCategoryGroup {
  id: number;
  category: string;
  subcategories: SubCategoryGroup[];
}

//объединенный тип для всего массива
export type ServiceCategory = ServiceCategorySimple | ServiceCategoryGroup;

export type InfoCard = {
  id: string;
  service: string;
  time: string;
  date: string;
  employee: string;
  employeeId: number;
  duration: number;
};
