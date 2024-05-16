export const reducer = (state, action) => {
  switch (action.type) {
    // case 'SET_THEME':
    //   localStorage.setItem('theme', action.payload)
    //   return { ...state, theme: action.payload }
    case 'TOGGLE_DESKTOP':
      return { ...state, isDesktop: action.payload }
    case 'GET_LIST':
      return { ...state, data: action.payload }
    case 'GET_PRODUCT':
      return { ...state, productSelected: action.payload }
    case 'UPDATE_PRODUCT':
      return { ...state, productSelected: action.payload }
    case 'UPDATE_USER':
      localStorage.setItem('user', JSON.stringify(action.payload))
      return { ...state, user: action.payload }
    default:
      return state
  }
}