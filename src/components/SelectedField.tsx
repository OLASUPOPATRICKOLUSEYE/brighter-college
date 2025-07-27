// components/SelectField.tsx
import React from "react";

interface Option {
  _id: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  register: any;
  error?: any;
  options: Option[];
  placeholder?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  register,
  error,
  options,
  placeholder = "Select an option",
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-[16px] font-medium text-black mb-1">
        {label}
      </label>
      <select
        {...register(name)}
        className="p-2 border rounded-md text-sm"
        defaultValue=""
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt._id} value={opt.value}>
            {opt.value}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-red-400">{error.message}</span>
      )}
    </div>
  );
};

export default SelectField;
