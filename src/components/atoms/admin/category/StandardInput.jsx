import { useState } from "react";
import Buttons from "../../Buttons";

const StandardInput = ({
  item,
  onAddItem,
  buttonText,
  placeholders,
  errors,
}) => {
  const [currentItem, setCurrentItem] = useState(item);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    onAddItem(currentItem);
    setCurrentItem(item);
  };

  return (
    <div className="standard-input">
      {Object.keys(item).map((key) => (
        <div key={key}>
          <input
            type="text"
            name={key}
            placeholder={placeholders[key]}
            value={currentItem[key]}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded bg-white txt-tertiary"
          />
          {errors[key] && (
            <p className="text-red-500 text-xs italic">{errors[key]}</p>
          )}
        </div>
      ))}
      <div className="col-span-1 md:col-span-2 flex justify-start btn btn-primary mt-2">
        <Buttons
          onClick={handleAddItem}
          text={buttonText}
          type="button"
          bColor="#000"
          color="#000"
        />
      </div>
    </div>
  );
};

export default StandardInput;
