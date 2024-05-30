import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
})

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchData = async ({ method, endpoint, data = null, headers = {}, isFormData = false, delayTime = 1000 }) => {
  try {
    await delay(delayTime)
    const config = {
      url: endpoint,
      method,
      data,
      headers: isFormData ? { ...headers } : { 'Content-Type': 'application/json', ...headers },
    }

    // Si los datos son de tipo FormData, no se debe establecer el header 'Content-Type'
    if (isFormData) {
      config.headers = { ...headers }
    }

    const response = await api.request(config)
    return response.data
  } catch (error) {
    console.error(`Error ${method}ing data to ${endpoint}:`, error)
    throw error
  }
}