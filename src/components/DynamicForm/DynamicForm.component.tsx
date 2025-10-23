/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import type { FormSchema } from "./DynamicForm.type";
import { TextField } from "../InputFields/TextField";
import { NumberField } from "../InputFields/NumberField";
import { SelectField } from "../InputFields/SelectField";
import { CheckboxField } from "../InputFields/CheckboxField";
import { DateField } from "../InputFields/DateField";
import { isVisible, validateField } from "./DynamicForm.helper";

interface Props {
  schema: FormSchema;
  onSubmit?: (data: Record<string, unknown>) => Promise<void> | void;
}

export const DynamicForm: React.FC<Props> = ({ schema, onSubmit }) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (id: string, val: string | number | boolean) => {
    setValues((prev) => {
      const next = { ...prev, [id]: val };
      const newErrors = { ...errors };
      const field = schema.fields.find((f) => f.id === id);
      if (field) {
        newErrors[id] = validateField(field, val);
      }

      for (const f of schema.fields) {
        if (f.dependsOn?.fieldId === id) {
          if (!isVisible(f, next)) {
            newErrors[f.id] = null;
          } else {
            newErrors[f.id] = validateField(f, next[f.id]);
          }
        }
      }

      setErrors(newErrors);
      return next;
    });
  };

  const validateAll = () => {
    const nextErrors: Record<string, string | null> = {};
    let ok = true;
    for (const f of schema.fields) {
      if (!isVisible(f, values)) {
        nextErrors[f.id] = null;
        continue;
      }
      const err = validateField(f, values[f.id]);
      nextErrors[f.id] = err;
      if (err) ok = false;
    }
    setErrors(nextErrors);
    return ok;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validateAll()) {
      return;
    }
    const payload: Record<string, unknown> = {};
    schema.fields.forEach((f) => {
      if (isVisible(f, values)) payload[f.id] = values[f.id];
    });

    try {
      setSubmitting(true);
      await onSubmit?.(payload);
      if (!onSubmit) console.log("Form submit:", payload);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setValues({});
    setErrors({});
  };

  return (
    <section>
      {schema.title && <h2 className="form-title">{schema.title}</h2>}

      <form
        className="form-card"
        onSubmit={handleSubmit}
        onReset={handleReset}
        noValidate
      >
        {schema.fields.map((field) => {
          if (!isVisible(field, values)) return null;

          const fieldError = errors[field.id] ?? null;
          const common = {
            id: field.id,
            label: field.label,
            value: values[field.id],
            required: !!field.required,
            placeholder: field.placeholder,
            onChange: handleChange,
          };

          return (
            <div key={field.id} className="field-row">
              {field.type === "text" && <TextField {...common} />}
              {field.type === "number" && <NumberField {...common} />}
              {field.type === "select" && (
                <SelectField {...common} options={field.options} />
              )}
              {field.type === "checkbox" && <CheckboxField {...common} />}
              {field.type === "date" && <DateField {...common} />}
              {fieldError && <span className="error">{fieldError}</span>}
            </div>
          );
        })}

        <div className="actions">
          <button
            className="button button-primary"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? schema.submitButton?.loadingText ?? "Submitting..."
              : schema.submitButton?.text ?? "Submit"}
          </button>

          <button
            type="button"
            className="button button-secondary"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};
