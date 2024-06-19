import { useState, useEffect } from 'react'
import { useContextGlobal } from '../../../contexts/global.context'

const SearchCategory = ({ onSelectCategory, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [buttonText, setButtonText] = useState('Una categoría')

  useEffect(() => {
    if (selectedCategory === null) {
      setButtonText('Una categoría')
    } else {
      const selectedName = categories.find(category => category.id === selectedCategory)?.name || 'Una categoría'
      setButtonText(selectedName)
    }
  }, [selectedCategory, categories])

  const handleRadioChange = (category) => {
    setSelectedCategory(category)
    setShowDropdown(false)
    onSelectCategory(category)
  }

  const handleButtonClick = () => {
    setShowDropdown(!showDropdown)
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
        <div className="w-fit shadow-lg bg-white br-15 p-15 listcategory">
          {categories.map((category) => (
            <label key={category.id} className="block">
              <input type="radio" value={category.id} checked={selectedCategory === category.id} onChange={() => handleRadioChange(category.id)} className="mr-2" />
              {category.name}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchCategory