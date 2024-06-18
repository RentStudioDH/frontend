import { useState, useRef, useEffect } from 'react'
import { useContextGlobal } from '../../../contexts/global.context'
import SearchSuggestions from './SearchSuggestions'

const SearchText = ({ onSearchTextChange }) => {
  const { fetchSuggestions } = useContextGlobal()
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [debouncedSearchText, setDebouncedSearchText] = useState('')

  const wrapperRef = useRef(null)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(inputValue)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [inputValue])

  const handleChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    onSearchTextChange(value)
  }

  const clearInput = () => {
    setInputValue('')
    onSearchTextChange('')
    fetchSuggestions({ searchText: '' })
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.relatedTarget)) {
      setIsFocused(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  useEffect(() => {
    if (debouncedSearchText) {
      fetchSuggestions({ searchText: debouncedSearchText })
    }
  }, [debouncedSearchText, fetchSuggestions])

  return (
    <div ref={wrapperRef} className="relative grid searchText" onBlur={handleBlur}>
      <label htmlFor="text" className='btn'><strong>Escribe</strong></label>
      <input 
        type="text" 
        id='text' 
        value={inputValue} 
        onChange={handleChange} 
        onFocus={handleFocus} 
        placeholder="Buscar por..." 
        className="bg-transparent w-full btn focus:outline-none focus:outline-none focus:border-0 txt-tertiary" 
      />
      {inputValue && (
        <button onClick={clearInput} className="absolute bg-back md:bg-white h-full px-1 right-0 text-gray-500 focus:outline-none">
          <i className="txt-primary fa-solid fa-xmark"></i>
        </button>
      )}
      {isFocused && (
        <SearchSuggestions searchText={debouncedSearchText} onSuggestionClick={(suggestion) => {
          setInputValue(suggestion.name)
          onSearchTextChange(suggestion.name)
          fetchSuggestions({ searchText: suggestion.name })
          setIsFocused(false)
        }} />
      )}
    </div>
  )
}

export default SearchText