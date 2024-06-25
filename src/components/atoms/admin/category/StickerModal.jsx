import iconList from "../../../../utils/json/iconData.json";

const StickerModal = ({ show, onClose, onSelect }) => {
  //   const iconList = JSON.parse(iconData);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white txt-primary rounded-lg shadow-lg p-6 w-3/4 max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Selecciona un ícono</h2>
          <span className="cursor-pointer text-xl font-bold" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {iconList.map((icon, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => onSelect(icon)}
            >
              <i
                className={`fa-solid fa-${icon} txt-quaternary text-4xl hover:text-[#db324d] focus:outline-none`}
              ></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickerModal;
