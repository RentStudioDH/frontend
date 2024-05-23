import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
})

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchData = async ({ method, endpoint, data = null, headers = {}, delayTime = 1000 }) => {
  try {
    await delay(delayTime)
    const response = await api.request({
      url: endpoint,
      method,
      data,
      headers,
    })
    return response.data
  } catch (error) {
    console.error(`Error ${method}ing data to ${endpoint}:`, error)
    throw error
  }
}