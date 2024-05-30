import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
})

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchData = async ({ method, endpoint, data = null, headers = {}, isFormData = false, delayTime = 1000 }) => {
  try {
    await delay(delayTime)
    const token = localStorage.getItem('token') // Obtener el token del local storage

    const config = {
      url: endpoint,
      method,
      data,
      headers: {
        'Content-Type': isFormData ? undefined : 'application/json',
        'Authorization': `Bearer ${token}`, // Incluir el token en los headers
        ...headers,
      },
    }

    const response = await api.request(config)
    return response.data
  } catch (error) {
    console.error(`Error ${method}ing data to ${endpoint}:`, error)
    throw error
  }
}