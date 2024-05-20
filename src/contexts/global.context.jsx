import { createContext, useContext, useEffect, useReducer } from 'react'
import { reducer } from '../reducers/reducer'
import axios from 'axios'

export const ContextGlobal = createContext()

export const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  isDesktop: window.innerWidth > 767,
  data: [],
  productSelected: {},
  favs: JSON.parse(localStorage.getItem('favs')) || [],
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoggedIn: !!localStorage.getItem('user'),
  role: localStorage.getItem('role') || 'admin',
}

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Cambiar tema
  const toggleTheme = () => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark'
    dispatch({ type: 'SET_THEME', payload: newTheme })
  }

  // Escucha cambios en el tamaño de la ventana para ajustar isDesktop
  useEffect(() => {
    const handleResize = () => {
      const isDesktopNow = window.innerWidth > 767
      dispatch({ type: 'TOGGLE_DESKTOP', payload: isDesktopNow })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Cargar datos desde una API
  useEffect(() => {
    const url = 'https://api-digitalhouse.adksolutions.net.ar/product'
    axios.get(url)
      .then(res => {
        dispatch({ type: 'GET_LIST', payload: res.data })
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  // Aplicar el tema oscuro o claro
  useEffect(() => {
    state.theme === 'dark' ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }, [state.theme])

  // User
  /* Login */
  const loginUser = (userData, role) => {
    dispatch({ type: 'LOGIN_USER', payload: { user: userData, role } });
  }

   /* Logout */
  const logoutUser = () => {
    dispatch({ type: 'LOGOUT_USER' })
  }

  const contextValue = {
    state,
    toggleTheme,
    loginUser,
    logoutUser,
    dispatch,
  }

  return (
    <ContextGlobal.Provider value={contextValue}>
      {children}
    </ContextGlobal.Provider>
  )
}

export default ContextProvider

export const useContextGlobal = () => useContext(ContextGlobal)