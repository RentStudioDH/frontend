import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
})

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const refreshTokenRequest = async () => {
  try {
    console.log('Refreshing token...')
    const refreshToken = Cookies.get('refreshToken')
    const response = await api.post('/auth/refresh-token', { refreshToken }, { withCredentials: true })
    const { token, refreshToken: newRefreshToken } = response.data
    console.log('Token refreshed successfully', token)
    Cookies.set('token', token, { secure: true, sameSite: 'Strict' })
    Cookies.set('refreshToken', newRefreshToken, { secure: true, sameSite: 'Strict' })
    return token
  } catch (error) {
    console.error('Error refreshing token:', error)
    throw error
  }
}

export const fetchData = async ({ method, endpoint, data = null, headers = {}, isFormData = false, delayTime = 1000, requireAuth = false }) => {
  await delay(delayTime)
  let token = requireAuth ? Cookies.get('token') : null

  const config = {
    url: endpoint,
    method,
    data,
    headers: {
      'Content-Type': isFormData ? undefined : 'application/json',
      ...headers,
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    withCredentials: true,
  }

  try {
    const response = await api.request(config)
    return response.data
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403) && requireAuth) {
      try {
        token = await refreshTokenRequest()
        config.headers['Authorization'] = `Bearer ${token}`
        const retryResponse = await api.request(config)
        return retryResponse.data
      } catch (retryError) {
        throw retryError
      }
    } else {
      console.error(`Error ${method}ing data to ${endpoint}:`, error)
      throw error
    }
  }
}