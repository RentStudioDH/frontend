import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useContextGlobal } from '../../../contexts/global.context'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const SearchSuggestions = ({ searchText, onSuggestionClick }) => {
  const { state } = useContextGlobal()
  const { suggestions } = state
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onSuggestionClick('') // Clear suggestions on outside click
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onSuggestionClick])

  if (!searchText) {
    return null
  }

  return (
    <div ref={wrapperRef} className="suggestions relative z-10">
      {suggestions.length > 0 && (
        <Paper className="relative top-[5px] left-0 max-h-52 overflow-y-auto sm:absolute sm:top-[20px]" elevation={2}>
          <List>
            {suggestions.map(suggestion => (
              <ListItem key={suggestion.id} disableGutters>
                <Link to={`/producto/${suggestion.id}`} className="no-underline text-inherit px-1 w-full" onClick={() => onSuggestionClick(suggestion)}>
                  <ListItemText primary={suggestion.name} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  )
}

export default SearchSuggestions