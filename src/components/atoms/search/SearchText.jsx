import { useState } from 'react'

const SearchText = ({ onSearchTextChange }) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    onSearchTextChange(value) // Pasar el valor directamente al componente padre
  }

  const clearInput = () => {
    setInputValue('')
    onSearchTextChange('') // Pasar el valor vacío al componente padre al limpiar
  }

  return (
    <div className="relative grid">
      <label htmlFor="text" className='btn'><strong>Escribe</strong></label>
      <input type="text" id='text' value={inputValue} onChange={handleChange} placeholder="Buscar por ..." className="bg-white w-full btn focus:outline-none focus:outline-none focus:border-0 txt-tertiary" />
      {inputValue && (
        <button onClick={clearInput} className="absolute bg-white h-full p-1 right-0 text-gray-500 focus:outline-none"><i className="txt-primary fa-solid fa-xmark"></i></button>
      )}
    </div>
  )
}

export default SearchText