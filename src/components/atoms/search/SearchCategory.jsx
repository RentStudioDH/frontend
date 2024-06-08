import { useState, useEffect } from 'react'

const SearchCategory = ({ onSelectCategory, data }) => {
  const { categories } = data
  const [selectedCategories, setSelectedCategories] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [buttonText, setButtonText] = useState('Una o más categorías')

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setButtonText('Una o más categorías')
    } else {
      const selectedNames = categories
        .filter(category => selectedCategories.includes(category.id))
        .map(category => category.name)
      if (selectedNames.length > 1) {
        setButtonText(`${selectedNames.slice(0, 1).join(', ')}, ...`)
      } else {
        setButtonText(selectedNames.join(', '))
      }
    }
  }, [selectedCategories, categories])

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    )
  }

  const handleButtonClick = () => {
    setShowDropdown(!showDropdown)
    onSelectCategory(selectedCategories)
  }

  return (
    <div className="relative searchCategory">
      <button type="button" className="flex items-center txt-tertiary btn g-5" onClick={handleButtonClick}>
        <i className="txt-primary fa-solid fa-tags title"></i>
        <span className='grid place-items-start truncate'>
          <strong>Elige</strong> {buttonText}
        </span>
      </button>
      {showDropdown && (
        <div className="absolute w-fit shadow-lg bg-white br-15 p-15 listcategory">
          {categories.map((category) => (
            <label key={category.id} className="block">
              <input type="checkbox" value={category.id} checked={selectedCategories.includes(category.id)} onChange={() => handleCheckboxChange(category.id)} className="mr-2" />
              {category.name}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchCategory