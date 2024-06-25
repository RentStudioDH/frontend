import StandardInput from "./StandardInput.jsx";

const PolicyInput = ({ onAddPolicy, onDeletePolicy }) => {
  const initialPolicy = {
    title: "",
    description: "",
  };

  const placeholders = {
    title: "Título",
    description: "Descripción",
  };

  return (
    <StandardInput
      item={initialPolicy}
      onAddItem={onAddPolicy}
      buttonText="+ Agregar Política"
      placeholders={placeholders}
    />
  );
};

export default PolicyInput;
