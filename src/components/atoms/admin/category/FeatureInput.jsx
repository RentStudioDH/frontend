import StandardInput from "./StandardInput.jsx";

const FeatureInput = ({ onAddFeature, onDeleteFeature }) => {
  const initialFeature = {
    name: "",
    description: "",
    icon: "",
  };

  const placeholders = {
    name: "Nombre",
    description: "Descripción",
    icon: "Ícono",
  };

  return (
    <StandardInput
      item={initialFeature}
      onAddItem={onAddFeature}
      buttonText="+ Agregar Característica"
      placeholders={placeholders}
    />
  );
};

export default FeatureInput;
