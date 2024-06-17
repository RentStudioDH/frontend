import { createContext, useContext, useEffect, useReducer } from 'react'
import { reducer } from '../reducers/reducer'
import { fetchData } from '../utils/js/apiRequest'
import Cookies from 'js-cookie'

export const ContextGlobal = createContext()

export const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  isDesktop: window.innerWidth > 767,
  data: [],
  productSelected: [],
  categories: [],
  user: JSON.parse(Cookies.get('user') || '{}'),
  isLoggedIn: !!Cookies.get('token'),
  role: Cookies.get('role') || 'user',
  token: Cookies.get('token') || '',
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

  // Aplicar el tema oscuro o claro
  useEffect(() => {
    state.theme === 'dark' ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }, [state.theme])

  // Productos
  const urlProducts = '/products'
  // Cargar productos
  const getProducts = async () => {
    try {
      const products = await fetchData({ method: 'get', endpoint: `/public${urlProducts}`, requireAuth: false })
      dispatch({ type: 'LIST_PRODUCTS', payload: products })
      // console.log(products)
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
      if (error.response && error.response.status === 500) {
        console.error('Internal Server Error:', error.response.data)
      }
      throw error
    }
  }

  // Categorias
  const urlCategories = '/categories'
  // Cargar categorías
  const getCategories = async () => {
    try {
      const categories = await fetchData({ method: 'get', endpoint: `/public${urlCategories}`, requireAuth: false })
      dispatch({ type: 'LIST_CATEGORIES', payload: categories })
      // console.log(categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }
  useEffect(() => {
    getCategories()
  }, [])
  
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

  // Login
  const loginRequest = async (usuario) => {
    try {
      const response = await fetchData({ method: 'post', endpoint: '/auth/login', data: usuario, requireAuth: false })
      const { token } = response
      loginUser(token, 'user', usuario)
      return response
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }
  // Iniciar renovación del token
  const startTokenRenewal = () => {
    const interval = 15 * 60 * 1000 // 15 minutos
    setInterval(async () => {
      try {
        await loginRequest(state.user)
      } catch (error) {
        console.error('Error renewing token:', error)
      }
    }, interval)
  }

  // Usuarios
  const urlUsers = '/public/users'
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


  //FAVS
  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(state.favs))
}, [state.favs])

  // User
  const loginUser = (token, role, user) => {
    Cookies.set('token', token, { secure: true, sameSite: 'Strict' })
    Cookies.set('role', role, { secure: true, sameSite: 'Strict' })
    Cookies.set('user', JSON.stringify(user), { secure: true, sameSite: 'Strict' })
    dispatch({ type: 'LOGIN_USER', payload: { user, token, role } })
    startTokenRenewal()
  }

  // const fetchUserData = async (token) => {
  //   try {
  //     const userData = await fetchData({ method: 'get', endpoint: '/auth/user', requireAuth: true })
  //     localStorage.setItem('user', JSON.stringify(userData))
  //     dispatch({ type: 'SET_USER_DATA', payload: userData })
  //   } catch (error) {
  //     console.error('Error fetching user data:', error)
  //   }
  // }

  /* Logout */
  const logoutUser = () => {
    Cookies.remove('token')
    Cookies.remove('role')
    Cookies.remove('user')
    dispatch({ type: 'LOGOUT_USER' })
  }

  const contextValue = {
    state,
    dispatch,
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    removeProduct,
    getCategories,
    uploadImage,
    loginRequest,
    registerUser,
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