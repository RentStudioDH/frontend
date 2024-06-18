import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContextGlobal } from '../../../contexts/global.context'
import Modals from '../../atoms/Modals'
import SearchCategory from '../../atoms/search/SearchCategory'
import SearchDate from '../../atoms/search/SearchDate'
import SearchText from '../../atoms/search/SearchText'

const HomeSearch2 = ({ title }) => {
  const { state, fetchSuggestions } = useContextGlobal()
  const { categories, isDesktop } = state
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [dates, setDates] = useState({ startDate: null, endDate: null })
  const [searchText, setSearchText] = useState('')
  const [buttonText, setButtonText] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Buscar con:', {
      category: selectedCategory,
      dates,
      searchText,
    })
    fetchSuggestions({ searchText, categoryId: selectedCategory })
    navigate('/productos', { state: { searchText, categoryId: selectedCategory, useSuggestions: true } })  // Navega a la página de productos con los parámetros de búsqueda
  }

  useEffect(() => {
    if (selectedCategory || dates.startDate || dates.endDate || searchText) {
      setButtonText('Buscar')
    } else {
      setButtonText('')
    }
  }, [selectedCategory, dates, searchText])

  const openModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  const searchProps = {
    title,
    categories,
    handleSearch,
    selectedCategory,
    setSelectedCategory,
    dates,
    setDates,
    searchText,
    setSearchText,
    buttonText
  }

  return (
    <div className="grid place-items-center g-15">
      <h2 className='txt-primary text-center bigtitle'><strong>{title}</strong></h2>
      {isDesktop ? (
        <form onSubmit={handleSearch} className="flex bg-white search p-search g-5">
          <SearchText onSearchTextChange={setSearchText} />
          <SearchDate onDatesChange={setDates} />
          <SearchCategory onSelectCategory={setSelectedCategory} categories={categories} />
          <button type="submit" className="p-2 bg-primary text-white rounded-full"><i className="fa-solid fa-magnifying-glass"></i> {buttonText}</button>
        </form>
      ) : (
        <>
          <button className="p-2 bg-primary text-white rounded-full" onClick={openModal}><i className="fa-solid fa-magnifying-glass"></i></button>
          {isModalVisible && (
            <Modals type='search' visible={isModalVisible} onClose={closeModal} searchProps={searchProps} />
          )}
        </>
      )}
    </div>
  )
}

export default HomeSearch2