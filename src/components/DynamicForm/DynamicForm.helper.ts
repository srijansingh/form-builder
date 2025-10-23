/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldSchema, ValidationRule } from "./DynamicForm.type";

export const runValidationRules = (
  value: unknown,
  rules?: ValidationRule[]
): string | null => {
  if (!rules || rules.length === 0) return null;

  for (const r of rules) {
    switch (r.type) {
      case "required": {
        const empty = value === undefined || value === null || value === "";
        if (empty) return r.message ?? "This field is required";
        break;
      }
      case "minLength": {
        if (
          value !== undefined &&
          value !== null &&
          String(value).length < r.value
        ) {
          return r.message ?? `Minimum length is ${r.value}`;
        }
        break;
      }
      case "maxLength": {
        if (
          value !== undefined &&
          value !== null &&
          String(value).length > r.value
        ) {
          return r.message ?? `Maximum length is ${r.value}`;
        }
        break;
      }
      case "min": {
        const num = Number(value);
        if (!isNaN(num) && num < r.value)
          return r.message ?? `Minimum value is ${r.value}`;
        break;
      }
      case "max": {
        const num = Number(value);
        if (!isNaN(num) && num > r.value)
          return r.message ?? `Maximum value is ${r.value}`;
        break;
      }
      default:
        break;
    }
  }

  return null;
};

export const isVisible = (
  field: FieldSchema,
  currentValues: Record<string, any>
) => {
  if (!field.dependsOn) return true;
  const dep = currentValues[field.dependsOn.fieldId];
  if (field.dependsOn.condition === "equals") {
    return dep === field.dependsOn.value;
  }
  return true;
};

export const validateField = (field: FieldSchema, val: unknown) => {
  const rules = field.validation ?? [];
  if (field.required && !rules.find((r) => r.type === "required")) {
    rules.unshift({
      type: "required" as const,
      message: `${field.label} is required`,
    });
  }
  return runValidationRules(val, rules);
};
