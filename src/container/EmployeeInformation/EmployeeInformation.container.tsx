import React, { useEffect, useState } from "react";
import type { FormSchema } from "../../components/DynamicForm/DynamicForm.type";
import { asyncFetchSchema } from "./EmployeeInformation.helper";
import { DynamicForm } from "../../components/DynamicForm/DynamicForm.component";

const EmployeeInformationContainer: React.FC = () => {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        setLoading(true);
        setError(false);

        const result = await asyncFetchSchema();

        if (!result) {
          setSchema(null);
        } else {
          setSchema(result);
        }
      } catch (err) {
        console.error("Error fetching form schema:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSchema();
  }, []);

  const handleFormSubmission = async (data: Record<string, unknown>) => {
    console.log("Submitting payload:", data);
    await new Promise((r) => setTimeout(r, 600));
    alert("Submitted:\n" + JSON.stringify(data, null, 2));
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        Loading form schema...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
        Something went wrong. Check server.
      </div>
    );
  }

  if (!schema) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        No schema available.
      </div>
    );
  }

  return <DynamicForm schema={schema} onSubmit={handleFormSubmission} />;
};

export default EmployeeInformationContainer;
