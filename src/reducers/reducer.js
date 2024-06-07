export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      localStorage.setItem('theme', action.payload)
      return { ...state, theme: action.payload }
    case 'TOGGLE_DESKTOP':
      return { ...state, isDesktop: action.payload }
    case 'GET_LIST':
      return { ...state, data: action.payload }
    case 'GET_PRODUCT':
      return { ...state, productSelected: action.payload }
    case 'SET_PRODUCTS':
      return {
        ...state,
        data: action.payload,
      }
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      }
    case 'GET_CATEGORIES':
      return { ...state, categories: action.payload }
    case 'LOGIN_USER':
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('role', action.payload.role)
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
        role: action.payload.role,
        token: action.payload.token
      }
    case 'LOGOUT_USER':
      localStorage.removeItem('user')
      localStorage.removeItem('role')
      localStorage.removeItem('token')
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        role: 'user',
        token: ''
      }

    case 'ADD_FAV':
      return {
          ...state, 
          favs: [...state.favs, action.payload]
      }  
    case 'UPDATE_USER':
      localStorage.setItem('user', JSON.stringify(action.payload))
      return { ...state, user: action.payload }
    default:
      return state
  }
}