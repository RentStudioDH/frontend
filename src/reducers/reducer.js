export const reducer = (state, action) => {
  switch (action.type) {
    // Manejo del tema
    case 'SET_THEME':
      localStorage.setItem('theme', action.payload)
      return { ...state, theme: action.payload }
    // Detección de cambio de tamaño de pantalla
    case 'TOGGLE_DESKTOP':
      return { ...state, isDesktop: action.payload }
    // Productos
    case 'LIST_PRODUCTS':
      return { ...state, data: action.payload }
    case 'ADD_PRODUCT':
      return {
        ...state,
        data: [...state.data, action.payload],
      }
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        data: state.data.map(product => 
          product.id === action.payload.id ? action.payload : product
        ),
      }
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        data: state.data.filter(product => product.id !== action.payload),
      }
    // Categorías
    case 'LIST_CATEGORIES':
      return { ...state, categories: action.payload }
    // Sugerencias de búsqueda
    case 'SET_SUGGESTIONS':
      return { ...state, suggestions: action.payload }
    // Usuario y autenticación
    case 'SET_TOKEN':
      Cookies.set('token', action.payload, { secure: true, sameSite: 'Strict' })
      return {
        ...state,
        token: action.payload,
      }
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
        role: action.payload.role,
        token: action.payload.token,
      }
    case 'UPDATE_USER':
      Cookies.set('user', JSON.stringify(action.payload), { secure: true, sameSite: 'Strict' })
      return { ...state, user: action.payload }
    case 'LOGOUT_USER':
      Cookies.remove('token')
      Cookies.remove('role')
      Cookies.remove('user')
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        role: '',
        token: '',
      }
    // Favoritos
    case 'ADD_FAV':
      return {
        ...state, 
        favs: [...state.favs, action.payload]
      }
    case 'REMOVE_FAV':
      return {
        ...state,
        favs: state.favs.filter(fav => fav.id !== action.payload)
      }
    default:
      return state
  }
}