import { useEffect, useState, useRef } from 'react';
import { useContextGlobal } from '../../../contexts/global.context';
import { useNavigate } from 'react-router-dom';
import SearchCategory from '../../atoms/search/SearchCategory';
import SearchDate from '../../atoms/search/SearchDate';
import SearchText from '../../atoms/search/SearchText';
import SearchSuggestions from '../../atoms/search/SearchSuggestions';

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
  const suggestionsRef = useRef(null);

  const isMobile = !state.isDesktop;
  const handleFocus = () => isMobile && setIsFocused(true);
  const handleBlur = () => isMobile && setIsFocused(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let url = 'https://apidh.jackmoon.dev/public/products/search/?';
      
      if (searchText && selectedCategory) {
        url += `searchText=${searchText}&categoryId=${selectedCategory}`;
      } else if (searchText) {
        url += `searchText=${searchText}`;
      } else if (selectedCategory) {
        url += `categoryId=${selectedCategory}`;
      } else {
        return; // No hay criterios de búsqueda
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error en la solicitud al servidor');
      }
      const data = await response.json();
      setResults(data);
      navigate('/productos', { state: { results: data } });
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]); // Clear results on error
      navigate('/productos', { state: { results: [], error: error.message } });
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchText) {
        try {
          const response = await fetch(`https://apidh.jackmoon.dev/public/products/search/?searchText=${searchText}`);
          if (!response.ok) {
            throw new Error('Error en la solicitud al servidor');
          }
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchText]);

  const handleSuggestionClick = (suggestion) => {
    navigate(`/producto/${suggestion.id}`);
  };

  const handleOutsideClick = () => {
    setSuggestions([]);
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
          position: 'relative',
          padding: '10px 20px'
        }}
      >
        <div style={{ marginBottom: isMobile && isFocused ? '15px' : '0', flexGrow: 1 }}>
          <SearchText 
            onSearchTextChange={setSearchText} 
            onFocus={handleFocus} 
            onBlur={handleBlur} 
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: isMobile && isFocused ? '15px' : '0', display: isMobile && isFocused ? 'block' : isMobile ? 'none' : 'block', flexGrow: 1 }}>
          <SearchDate 
            onDatesChange={setDates} 
            onFocus={handleFocus} 
            onBlur={handleBlur} 
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: isMobile && isFocused ? '15px' : '0', display: isMobile && isFocused ? 'block' : isMobile ? 'none' : 'block', flexGrow: 1 }}>
          <SearchCategory 
            onSelectCategory={setSelectedCategory} 
            data={state} 
            onFocus={handleFocus} 
            onBlur={handleBlur} 
            style={{ width: '100%' }}
          />
        </div>
        <button onClick={handleBlur} type="submit" className="p-2 bg-primary text-white rounded-full">
          <i className="fa-solid fa-magnifying-glass"></i> {buttonText}
        </button>
      </form>
      <SearchSuggestions 
        suggestions={suggestions} 
        onSuggestionClick={handleSuggestionClick} 
        onOutsideClick={handleOutsideClick}
      />
    </div>
  );
}

export default HomeSearch2;
