import React from "react";
import type { FieldOption } from "../DynamicForm/DynamicForm.type";

interface Props {
  id: string;
  value: string;
  label: string;
  required: boolean;
  options?: FieldOption[];
  onChange: (id: string, val: string) => void;
}

export const SelectField: React.FC<Props> = ({
  id,
  value,
  label,
  required,
  options = [],
  onChange,
}) => {
  return (
    <>
      <label className="field-label" htmlFor={id}>
        {label}
        {required ? " *" : null}
      </label>
      <select
        id={id}
        className="input"
        value={value ?? ""}
        onChange={(e) => onChange(id, e.target.value)}
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={String(o.value)} value={String(o.value)}>
            {o.label}
          </option>
        ))}
      </select>
    </>
  );
};
