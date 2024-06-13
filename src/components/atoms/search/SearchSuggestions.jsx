import React from 'react';

const SearchSuggestions = ({ suggestions, onSuggestionClick }) => {
  return (
    <div className="search-suggestions" style={{ position: 'relative', zIndex: 1000 }}>
      {suggestions.length > 0 && (
        <ul style={{ 
          position: 'absolute', 
          top: '100%', 
          left: 0, 
          right: 0, 
          backgroundColor: 'white', 
          border: '1px solid #ccc', 
          borderTop: 'none', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          maxHeight: '200px', 
          overflowY: 'auto', 
          padding: 0, 
          margin: 0, 
          listStyle: 'none' 
        }}>
          {suggestions.map(suggestion => (
            <li 
              key={suggestion.id} 
              onClick={() => onSuggestionClick(suggestion)}
              style={{ 
                padding: '10px', 
                cursor: 'pointer', 
                backgroundColor: 'black', 
                color: 'white' 
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'black'}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSuggestions;
