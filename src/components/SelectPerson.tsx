import React from "react";
import type { Employee } from "../types/types";
interface Props {
  value: string;
  onChange: (e: string) => void;
  options: Employee[];
  storageKey?: string;
}
const SelectPerson = ({ value, onChange, options, storageKey }: Props) => {
  React.useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, value);
    }
  }, [value, storageKey]);
  return (
    <div className="selectgroup">
      <p className="selectgroup_title">Выберите сотрудника:</p>
      <select
        className="selectgroup_select select-arrow"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(({ name, id }) => (
          <option className="selectgroup_option" key={id} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectPerson;
