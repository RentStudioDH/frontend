import { useState } from "react";
import StandardInput from "./StandardInput.jsx";
import StickerModal from "./StickerModal.jsx";

const FeatureInput = ({ onAddFeature, onDeleteFeature }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [errors, setErrors] = useState({});

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    setShowModal(false);
  };

  const initialFeature = {
    name: "",
    description: "",
  };

  const placeholders = {
    name: "Nombre",
    description: "Descripción",
  };

  const validateFeature = (feature) => {
    let featureErrors = {};
    if (feature.name.length > 30) {
      featureErrors.name = "El nombre no puede tener más de 30 caracteres";
    }
    if (feature.description.length > 300) {
      featureErrors.description =
        "La descripción no puede tener más de 300 caracteres";
    }
    if (!selectedIcon) {
      featureErrors.icon = "Por favor seleccione un ícono";
    }

    setErrors(featureErrors);
    return Object.keys(featureErrors).length === 0;
  };

  const handleAddFeature = (feature) => {
    if (validateFeature(feature)) {
      if (selectedIcon) {
        feature.icon = selectedIcon;
      }
      onAddFeature(feature);
      setSelectedIcon(null);
      setErrors({});
    }
  };

  return (
    <div>
      <div className="grid grid-flow-col grid-cols-[80px_auto] gap-4">
        <div>
          <div
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
            className="grid place-items-center bg-white txt-primary w-full border rounded min-h-20"
          >
            {selectedIcon ? (
              <div className="grid place-items-center">
                <i
                  className={`fa-solid fa-${selectedIcon} txt-primary text-4xl`}
                ></i>
              </div>
            ) : (
              <i className={`fa-solid fa-smile txt-quaternary text-4xl`}></i>
            )}
          </div>
          {!selectedIcon && (
            <p className="text-red-500 text-xs italic">{errors.icon}</p>
          )}
        </div>
        <div>
          <StandardInput
            item={initialFeature}
            onAddItem={handleAddFeature}
            buttonText="+ Agregar Característica"
            placeholders={placeholders}
            errors={errors}
          />
        </div>
      </div>
      <StickerModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleIconSelect}
      />
    </div>
  );
};

export default FeatureInput;
