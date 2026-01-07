import type { AxiosRequestConfig } from 'axios'
import { axiosInstance } from './axios'
import { setupInterceptors_r } from './interceptors'

setupInterceptors_r()

export function request<T = object>(config: AxiosRequestConfig): Promise<T> {
  return axiosInstance(config)
}
