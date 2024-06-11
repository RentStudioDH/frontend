import { useEffect, useState } from 'react';
import { useContextGlobal } from '../../../contexts/global.context';
import { Link, useNavigate } from 'react-router-dom';
import SearchCategory from '../../atoms/search/SearchCategory';
import SearchDate from '../../atoms/search/SearchDate';
import SearchText from '../../atoms/search/SearchText';
import SearchSuggestions from '../../atoms/search/SearchSuggestions';  // Importa el nuevo componente

const HomeSearch2 = ({ title }) => {
  const { state } = useContextGlobal();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dates, setDates] = useState({ startDate: null, endDate: null });
  const [searchText, setSearchText] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Esto es para ponerlo en mobile
  const isMobile = !state.isDesktop;
  const handleFocus = () => isMobile && setIsFocused(true);
  const handleBlur = () => isMobile && setIsFocused(false);

  // Esta funcion deberia estar en el contexto global
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://apidh.jackmoon.dev/public/products/search/?searchText=${searchText}`);
      const data = await response.json();
      setResults(data);
      navigate('/productos', { state: { results: data } });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Esta funcion deberia estar en el contexto global
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchText) {
        try {
          const response = await fetch(`https://apidh.jackmoon.dev/public/products/search/?searchText=${searchText}`);
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchText]);


  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion.name);
    handleSearch(new Event('submit'));
  };

  useEffect(() => {
    setButtonText(selectedCategory || dates.startDate || dates.endDate || searchText ? 'Buscar' : '');
  }, [selectedCategory, dates, searchText]);

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
          justifyContent: isMobile && isFocused ? 'flex-start' : 'space-between',
          position: 'relative'
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
      <SearchSuggestions suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />
    </div>
  )
}

export default HomeSearch2;
