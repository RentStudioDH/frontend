import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
})

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchData = async ({ method, endpoint, data = null, headers = {}, isFormData = false, delayTime = 1000, requireAuth = false }) => {
  try {
    await delay(delayTime)
    const token = requireAuth ? Cookies.get('token') : null

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

    const response = await api.request(config)
    return response.data
  } catch (error) {
    console.error(`Error ${method}ing data to ${endpoint}:`, error)
    throw error
  }
}