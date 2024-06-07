import { createContext, useContext, useEffect, useReducer } from 'react'
import { reducer } from '../reducers/reducer'
import { fetchData } from '../utils/js/apiRequest'

export const ContextGlobal = createContext()

export const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  isDesktop: window.innerWidth > 767,
  data: [],
  productSelected: [],
  categories: [],
  user: JSON.parse(localStorage.getItem('user')) || null,
  isLoggedIn: !!localStorage.getItem('token'),
  role: localStorage.getItem('role') || 'user',
  token: localStorage.getItem('token') || '',
  favs: JSON.parse(localStorage.getItem('favs')) || [],
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

  // Cargar productos desde una API
  const getProducts = async () => {
    try {
      const products = await fetchData({ method: 'get', endpoint: '/public/products' })
      dispatch({ type: 'SET_PRODUCTS', payload: products })
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }
  useEffect(() => {
    getProducts()
  }, [])

  // Función para obtener las categorías
  const getCategories = async () => {
    try {
      const categories = await fetchData({ method: 'get', endpoint: '/public/categories' })
      dispatch({ type: 'GET_CATEGORIES', payload: categories })
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }
  useEffect(() => {
    getCategories()
  }, [])

  // Aplicar el tema oscuro o claro
  useEffect(() => {
    state.theme === 'dark' ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }, [state.theme])

  //FAVS
  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(state.favs))
}, [state.favs])

  // User
  /* Login */
  const loginUser = (token) => {
    localStorage.setItem('token', token)  // Guardar el token
    dispatch({ type: 'LOGIN_USER', payload: { user: null, token } })
    // fetchUserData(token)
  }

  // const fetchUserData = async (token) => {
  //   try {
  //     const userData = await fetchData({ method: 'get', endpoint: '/auth/user', headers: { 'Authorization': `Bearer ${token}` } })
  //     localStorage.setItem('user', JSON.stringify(userData))
  //     dispatch({ type: 'SET_USER_DATA', payload: userData })
  //   } catch (error) {
  //     console.error('Error fetching user data:', error)
  //   }
  // }

  /* Logout */
  const logoutUser = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')  // Remover el token
    dispatch({ type: 'LOGOUT_USER' })
  }

  const contextValue = {
    state,
    dispatch,
    getProducts,
    getCategories,
    loginUser,
    logoutUser,
    toggleTheme,
  }

  return (
    <ContextGlobal.Provider value={contextValue}>
      {children}
    </ContextGlobal.Provider>
  )
}

export default ContextProvider

export const useContextGlobal = () => useContext(ContextGlobal)