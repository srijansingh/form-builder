import React from "react";

interface Props {
  id: string;
  value: boolean;
  label: string;
  onChange: (id: string, val: boolean) => void;
}

export const CheckboxField: React.FC<Props> = ({
  id,
  label,
  value,
  onChange,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <input
      id={id}
      type="checkbox"
      checked={!!value}
      onChange={(e) => onChange(id, e.target.checked)}
    />
    <label htmlFor={id}>{label}</label>
  </div>
);
