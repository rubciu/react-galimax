import React from "react";

interface SelectInputProps {
  selectedValue: any;
  options: any[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ selectedValue, options, handleChange }) => {
  return (
    <select
      id="select"
      name="select"
      value={selectedValue}
      onChange={handleChange}
    >
      <option value="none">Selecciona una opción</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
