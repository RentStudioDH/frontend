import { useEffect, useState } from 'react'
import { useContextGlobal } from '../../../contexts/global.context'
import SearchCategory from '../../atoms/search/SearchCategory'
import SearchDate from '../../atoms/search/SearchDate'
import SearchText from '../../atoms/search/SearchText'

const HomeSearch2 = ({ title }) => {
  const { state } = useContextGlobal()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [dates, setDates] = useState({ startDate: null, endDate: null })
  const [searchText, setSearchText] = useState('')
  const [buttonText, setButtonText] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Buscar con:', {
      category: selectedCategory,
      dates,
      searchText,
    })
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (selectedCategory || dates.startDate || dates.endDate || searchText) {
      setButtonText('Buscar')
    } else {
      setButtonText('')
    }
  }, [selectedCategory, dates, searchText])

  const handleFocus = () => {
    if (isMobile) {
      setIsFocused(true)
    }
  }

  const handleBlur = () => {
    if (isMobile) {
      setIsFocused(false)
    }
  }

  return (
    <div className="grid g-15">
      <h2 className='txt-primary text-center bigtitle'><strong>{title}</strong></h2>
      <form 
        onSubmit={handleSearch} 
        className="flex bg-white search p-search g-5"
        onFocus={handleFocus} 
        style={{
          flexDirection: isMobile && isFocused ? 'column' : 'row',
          alignItems: isMobile && isFocused ? 'stretch' : 'center',
          justifyContent: isMobile && isFocused ? 'flex-start' : 'space-between'
        }}
      >
        <div style={{ marginBottom: isMobile && isFocused ? '15px' : '0' }}>
          <SearchText onSearchTextChange={setSearchText} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
        <div style={{ marginBottom: isMobile && isFocused ? '15px' : '0', display: isMobile && isFocused ? 'block' : isMobile ? 'none' : 'block' }}>
          <SearchDate onDatesChange={setDates} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
        <div style={{ marginBottom: isMobile && isFocused ? '15px' : '0', display: isMobile && isFocused ? 'block' : isMobile ? 'none' : 'block' }}>
          <SearchCategory onSelectCategory={setSelectedCategory} data={state} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
        <button onClick={handleBlur} type="submit" className="p-2 bg-primary text-white rounded-full">
          <i className="fa-solid fa-magnifying-glass"></i> {buttonText}
        </button>
      </form>
    </div>
  )
}

export default HomeSearch2
