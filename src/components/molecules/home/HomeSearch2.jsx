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

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Buscar con:', {
      category: selectedCategory,
      dates,
      searchText,
    })
  }

  useEffect(() => {
    if (selectedCategory || dates.startDate || dates.endDate || searchText) {
      setButtonText('Buscar')
    } else {
      setButtonText('')
    }
  }, [selectedCategory, dates, searchText])

  // console.log(selectedCategory)

  return (
    <div className="grid g-15">
      <h2 className='txt-primary text-center bigtitle'><strong>{title}</strong></h2>
      <form onSubmit={handleSearch} className="flex bg-white search p-search g-5">
        <SearchCategory onSelectCategory={setSelectedCategory} data={state} />
        <SearchDate onDatesChange={setDates} />
        <SearchText onSearchTextChange={setSearchText} />
        <button type="submit" className="p-2 bg-primary text-white rounded-full"><i className="fa-solid fa-magnifying-glass"></i> {buttonText}</button>
      </form>
    </div>
  )
}

export default HomeSearch2