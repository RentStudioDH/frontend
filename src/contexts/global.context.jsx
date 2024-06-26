import { createContext, useContext, useEffect, useReducer, useCallback } from 'react'
import Cookies from 'js-cookie'
import { reducer } from '../reducers/reducer'
import { fetchData } from '../utils/js/apiRequest'
import { debounce } from '../utils/js/debounce'
import { getNameInitials } from '../utils/js/getNameInitials'

// Crear contexto global
export const ContextGlobal = createContext()

// Obtener datos del usuario de las cookies
const userFromCookies = JSON.parse(Cookies.get('user') || '{}')

// Estado inicial
export const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  isDesktop: window.innerWidth > 767,
  data: [],
  productSelected: [],
  categories: [],
  user: userFromCookies,
  userInitials: getNameInitials(userFromCookies.firstName || '', userFromCookies.lastName || ''),
  isLoggedIn: !!Cookies.get('token'),
  role: userFromCookies.role || 'user',
  token: Cookies.get('token') || '',
  favs: JSON.parse(localStorage.getItem('favs')) || [],
  suggestions: [],
  lastTokenRefresh: null,
  reservaData: { id: null, productData: null } 
}

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Cambiar tema
  const toggleTheme = () => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark'
    dispatch({ type: 'SET_THEME', payload: newTheme })
  }

  // Aplicar el tema oscuro o claro
  useEffect(() => {
    state.theme === 'dark' ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }, [state.theme])

  // Escucha cambios en el tamaño de la ventana para ajustar isDesktop
  useEffect(() => {
    const handleResize = () => {
      const isDesktopNow = window.innerWidth > 767
      dispatch({ type: 'TOGGLE_DESKTOP', payload: isDesktopNow })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // FAVS
  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(state.favs))
  }, [state.favs])

  // Productos
  const urlProducts = '/products'
  // Cargar productos
  const getProducts = async () => {
    try {
      const products = await fetchData({ method: 'get', endpoint: `/public${urlProducts}`, requireAuth: false })
      dispatch({ type: 'LIST_PRODUCTS', payload: products })
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }
  useEffect(() => {
    getProducts()
  }, [])
  // Obtener producto específico
  const getProductById = async (id) => {
    try {
      const productData = await fetchData({ method: 'get', endpoint: `/public${urlProducts}/${id}`, requireAuth: false })
      return productData
    } catch (error) {
      throw new Error('No se pudo obtener el producto.')
    }
  }
  // Agregar producto
  const addProduct = async (product) => {
    try {
      const newProduct = await fetchData({ method: 'post', endpoint: urlProducts, data: product, requireAuth: true })
      dispatch({ type: 'ADD_PRODUCT', payload: newProduct })
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }
  // Actualizar producto
  const updateProduct = async (product) => {
    try {
      const updatedProduct = await fetchData({ method: 'put', endpoint: `${urlProducts}/${product.id}`, data: product, requireAuth: true })
      dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct })
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }
  // Eliminar producto
  const removeProduct = async (productId) => {
    try {
      await fetchData({ method: 'delete', endpoint: `${urlProducts}/${productId}`, requireAuth: true })
      dispatch({ type: 'REMOVE_PRODUCT', payload: productId })
    } catch (error) {
      console.error('Error removing product:', error)
    }
  }

  // Categorias
  const urlCategories = '/categories'
  // Cargar categorías
  const getCategories = async () => {
    try {
      const categories = await fetchData({ method: 'get', endpoint: `/public${urlCategories}`, requireAuth: false })
      dispatch({ type: 'LIST_CATEGORIES', payload: categories })
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }
  useEffect(() => {
    getCategories()
  }, [])
  // Eliminar categoría
  const removeCategory = async (categoryId) => {
    try {
      await fetchData({ method: 'delete', endpoint: `${urlCategories}/${categoryId}`, requireAuth: true })
      dispatch({ type: 'REMOVE_CATEGORY', payload: categoryId })
    } catch (error) {
      console.error('Error removing category:', error)
    }
  }

  // Imágenes
  const urlAttachments = '/attachments'
  // Subir imágenes
  const uploadImage = async (formData) => {
    try {
      const response = await fetchData({ method: 'post', endpoint: `${urlAttachments}/upload`, data: formData, isFormData: true, requireAuth: true })
      return response
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }

  // Usuarios
  const urlUsers = '/public/users'
  // Login
  const loginUser = async (usuario) => {
    try {
      const response = await fetchData({ method: 'post', endpoint: '/auth/login', data: usuario, requireAuth: false })
      const { token, refreshToken } = response
      Cookies.set('token', token, { secure: true, sameSite: 'Strict' })
      Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'Strict' })
      dispatch({ type: 'SET_TOKEN', payload: token })
      const userData = await getUserData()
      const initials = getNameInitials(userData.firstName, userData.lastName)
      dispatch({ type: 'LOGIN_USER', payload: { user: userData, initials } })
      return response
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }
  // Obtener info de usuario
  const getUserData = async () => {
    try {
      const userData = await fetchData({ method: 'get', endpoint: '/users/me', requireAuth: true })
      Cookies.set('user', JSON.stringify(userData), { secure: true, sameSite: 'Strict' })
      return userData
    } catch (error) {
      console.error('Error fetching user data:', error)
      throw error
    }
  }
  // Registro
  const registerUser = async (userData) => {
    try {
      const response = await fetchData({ method: 'post', endpoint: urlUsers, data: userData, requireAuth: false })
      return response
    } catch (error) {
      console.error('Error during registration:', error)
      throw error
    }
  }
  // Logout
  const logoutUser = () => {
    Cookies.remove('token')
    Cookies.remove('refreshToken')
    Cookies.remove('user')
    dispatch({ type: 'LOGOUT_USER' })
    window.location.reload()
  }

  // Reservas
  const getUserReservations = async () => {
    try {
      const response = await fetchData({ method: 'get', endpoint: '/user/reservations', requireAuth: true })
      return response.map(reservation => ({
        ...reservation,
        image: reservation.product.image,
      }))
    } catch (error) {
      console.error('Error fetching user reservations:', error)
      throw error
    }
  }

  // Guardar informacion para detalle reserva
  const setReservaData = (data) => {
    dispatch({ type: 'ADD_RESERVA', payload: data })
  }

  // Sugerencias
  const urlSearch = '/public/products/search'
  const fetchSuggestions = useCallback(debounce(async ({ searchText, categoryId }) => {
    if (!searchText && !categoryId) {
      dispatch({ type: 'SET_SUGGESTIONS', payload: [] })
      return
    }
    const query = [`searchText=${searchText || ''}`]
    if (categoryId) {
      query.push(`categoryId=${categoryId}`)
    }
    try {
      const data = await fetchData({ method: 'get', endpoint: `${urlSearch}/?${query.join('&')}`, requireAuth: false })
      dispatch({ type: 'SET_SUGGESTIONS', payload: data })
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      dispatch({ type: 'SET_SUGGESTIONS', payload: [] })
    }
  }, 500), [dispatch])

  const contextValue = {
    state,
    dispatch,
    toggleTheme,
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    removeProduct,
    getCategories,
    removeCategory,
    uploadImage,
    loginUser,
    getUserData,
    registerUser,
    logoutUser,
    getUserReservations,
    fetchSuggestions,
    setReservaData
  }

  return (
    <ContextGlobal.Provider value={contextValue}>
      {children}
    </ContextGlobal.Provider>
  )
}

export default ContextProvider

export const useContextGlobal = () => useContext(ContextGlobal)