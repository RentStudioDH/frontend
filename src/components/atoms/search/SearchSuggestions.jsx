import React, { useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const SearchSuggestions = ({ suggestions, onSuggestionClick, onOutsideClick }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick]);

  return (
    <div ref={wrapperRef} className="search-suggestions" style={{ position: 'relative', zIndex: 1 }}>
      {suggestions.length > 0 && (
        <Paper 
          style={{ 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            right: 0, 
            maxHeight: '200px', 
            overflowY: 'auto' 
          }}
          elevation={4}
        >
          <List>
            {suggestions.map(suggestion => (
              <ListItem 
                key={suggestion.id} 
                button 
                onClick={() => onSuggestionClick(suggestion)}
              >
                <ListItemText primary={suggestion.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default SearchSuggestions;
