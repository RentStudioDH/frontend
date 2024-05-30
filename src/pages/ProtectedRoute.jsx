import { Navigate, useLocation } from 'react-router-dom'
import { useContextGlobal } from '../contexts/global.context'

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { state } = useContextGlobal()
  const location = useLocation()

  if (!state.isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return Component
}

export default ProtectedRoute