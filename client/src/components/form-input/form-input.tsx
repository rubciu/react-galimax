import React from 'react';

interface FormInputProps {
  field: string;
  label: string;
  defaultValue: (string | number);
  type?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  field, type, defaultValue, label, handleChange 
}) => {
  return (
    <p>
      <label htmlFor={field}>{label}</label>&nbsp;&nbsp;
      <input
        id={field}
        name={field}
        type={type || 'text'}
        value={defaultValue}
        onChange={handleChange}
      />
    </p>
  );
}

export default FormInput;