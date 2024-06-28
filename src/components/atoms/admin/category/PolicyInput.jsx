import { useState } from "react";
import StandardInput from "./StandardInput.jsx";

const PolicyInput = ({ onAddPolicy, onDeletePolicy }) => {
  const [errors, setErrors] = useState({});
  const initialPolicy = {
    title: "",
    description: "",
  };

  const placeholders = {
    title: "Título",
    description: "Descripción",
  };

  const validatePolicy = (policy) => {
    let policyErrors = {};

    if (policy.title.length > 50) {
      policyErrors.title = "El nombre no puede tener más de 50 caracteres";
    }
    if (policy.description.length > 1000) {
      policyErrors.description =
        "La descripción no puede tener más de 1000 caracteres";
    }

    setErrors(policyErrors);
    return Object.keys(policyErrors).length === 0;
  };

  const handleAddPolicy = (policy) => {
    if (validatePolicy(policy)) {
      onAddPolicy(policy);
      setErrors({});
    }
  };

  return (
    <StandardInput
      item={initialPolicy}
      onAddItem={handleAddPolicy}
      buttonText="+ Agregar Política"
      placeholders={placeholders}
      errors={errors}
    />
  );
};

export default PolicyInput;
