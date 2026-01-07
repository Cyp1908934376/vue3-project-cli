import axios, { type AxiosInstance } from 'axios'
import { setupInterceptors } from '../interceptors'

export function createAxios(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
    timeout: 15000,
  })

  setupInterceptors(instance)
  return instance
}
