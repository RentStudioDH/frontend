import axios from 'axios'

const api = axios.create({
  baseURL: 'https://apidh.jackmoon.dev'
})

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const apiRequest = async (method, endpoint, data = null, headers = null, delayMs = 1000) => {
  try {
    // Espera opcional antes de realizar la solicitud
    if (delayMs) {
      await delay(delayMs);
    }

    const config = {
      method,
      url: endpoint,
      data,
      headers
    }

    const response = await api(config);
    return response.data
  } catch (error) {
    console.error(`Error ${method}ing data to ${endpoint}:`, error)
    throw error
  }
}