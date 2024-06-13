import { useState, useEffect } from 'react';

const SearchCategory = ({ onSelectCategory, data }) => {
  const { categories } = data;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [buttonText, setButtonText] = useState('Elige una categoría');

  useEffect(() => {
    if (!selectedCategory) {
      setButtonText('Elige una categoría');
    } else {
      const selectedName = categories.find(category => category.id === selectedCategory)?.name;
      setButtonText(selectedName || 'Elige una categoría');
    }
  }, [selectedCategory, categories]);

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
    setShowDropdown(false); // Close the dropdown after selection
  };

  const handleButtonClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <button
        type="button"
        className="flex items-center txt-tertiary btn g-5"
        onClick={handleButtonClick}
      >
        <i className="txt-primary fa-solid fa-tags title"></i>
        <span className="grid place-items-start truncate">
          <strong>Elige</strong> {buttonText}
        </span>
      </button>
      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            zIndex: 1010,
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '15px',
            padding: '15px',
            marginTop: '5px',
            width: '250px', // Adjust width to fit long category names
          }}
        >
          {categories.map((category) => (
            <label key={category.id} className="block">
              <input
                type="radio"
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={() => handleCheckboxChange(category.id)}
                className="mr-2"
              />
              {category.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCategory;
