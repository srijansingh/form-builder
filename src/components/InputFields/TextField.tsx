import React from "react";

interface Props {
  id: string;
  value: string;
  label: string;
  required: boolean;
  placeholder?: string;
  onChange: (id: string, val: string) => void;
}

export const TextField: React.FC<Props> = ({
  id,
  value,
  label,
  required,
  placeholder,
  onChange,
}) => (
  <>
    <label className="field-label" htmlFor={id}>
      {label}
      {required ? " *" : null}
    </label>
    <input
      id={id}
      className="input"
      type="text"
      value={value ?? ""}
      placeholder={placeholder ?? ""}
      onChange={(e) => onChange(id, e.target.value)}
    />
  </>
);
