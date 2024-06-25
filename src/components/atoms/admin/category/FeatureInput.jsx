import { useState } from "react";
import StandardInput from "./StandardInput.jsx";
import StickerModal from "./StickerModal.jsx";

const FeatureInput = ({ onAddFeature, onDeleteFeature }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
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

  const handleAddFeature = (feature) => {
    if (selectedIcon) {
      feature.icon = selectedIcon;
    }
    onAddFeature(feature);
    setSelectedIcon(null);
  };

  return (
    <div>
      <div className="grid grid-flow-col grid-cols-[80px_auto] gap-4">
        <div
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
          className=" grid place-items-center bg-white txt-primary w-full border rounded"
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
        <div>
          <StandardInput
            item={initialFeature}
            onAddItem={handleAddFeature}
            buttonText="+ Agregar Característica"
            placeholders={placeholders}
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
