import React from "react";
import type { Employee } from "../types/types";
interface Props {
  value: string;
  onChange: (e: string) => void;
  options: Employee[];
}
const SelectPerson = ({ value, onChange, options }: Props) => {
  return (
    <div>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(({ name, id }) => (
          <option key={id} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectPerson;
