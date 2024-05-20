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
    case 'LOGIN_USER':
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('role', action.payload.role)
      return { 
        ...state, 
        user: action.payload.user, 
        isLoggedIn: true, 
        role: action.payload.role 
      }
    case 'LOGOUT_USER':
      localStorage.removeItem('user')
      localStorage.removeItem('role')
      return { 
        ...state, 
        user: null, 
        isLoggedIn: false, 
        role: 'user' 
      }
    case 'UPDATE_USER':
      localStorage.setItem('user', JSON.stringify(action.payload))
      return { ...state, user: action.payload }
    default:
      return state
  }
}