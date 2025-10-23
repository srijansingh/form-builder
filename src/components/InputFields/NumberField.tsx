import React from "react";

interface Props {
  id: string;
  value: number;
  label: string;
  required: boolean;
  placeholder?: string;
  onChange: (id: string, val: string | number) => void;
}

export const NumberField: React.FC<Props> = ({
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
      type="number"
      value={value ?? ""}
      placeholder={placeholder ?? ""}
      onChange={(e) =>
        onChange(id, e.target.value === "" ? "" : Number(e.target.value))
      }
    />
  </>
);
