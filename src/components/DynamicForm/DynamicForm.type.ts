export type FieldType = "text" | "number" | "select" | "checkbox" | "date";

export type ValidationRule =
  | { type: "required"; message?: string }
  | { type: "minLength"; value: number; message?: string }
  | { type: "maxLength"; value: number; message?: string }
  | { type: "min"; value: number; message?: string }
  | { type: "max"; value: number; message?: string };

export interface FieldOption {
  value: string | number;
  label: string;
}

export interface DependsOn {
  fieldId: string;
  condition: "equals"; 
  value: string;
}

export interface FieldSchema {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean; 
  options?: FieldOption[]; 
  validation?: ValidationRule[]; 
  dependsOn?: DependsOn;
}

export interface FormSchema {
  title?: string;
  fields: FieldSchema[];
  submitButton?: { text?: string; loadingText?: string };
}
