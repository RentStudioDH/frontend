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
    case 'REMOVE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload)
      }

    // Sugerencias de búsqueda
    case 'SET_SUGGESTIONS':
      return { ...state, suggestions: action.payload }

    // Usuario y autenticación
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      }
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        role: action.payload.role,
      }
    case 'UPDATE_USER':
      return { ...state, user: action.payload }
    case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        role: '',
        token: '',
      }
    case 'SET_USER_DATA':
      return { ...state, user: action.payload }

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

    case "ADD_RESERVA":
      return{
        ...state,
        reservaData : action.payload
      } 

    default:
      return state
  }
}