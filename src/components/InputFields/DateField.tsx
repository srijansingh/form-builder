import React from "react";

interface Props {
  id: string;
  value?: string;
  required: boolean;
  label: string;
  onChange: (id: string, val: string) => void;
}

export const DateField: React.FC<Props> = ({
  id,
  value,
  label,
  required,
  onChange,
}) => {
  return (
    <>
      <label className="field-label" htmlFor={id}>
        {label}
        {required ? " *" : null}
      </label>
      <input
        id={id}
        className="input"
        type="date"
        value={value ?? ""}
        onChange={(e) => onChange(id, e.target.value)}
      />
    </>
  );
};
