import type {
  AxiosInstance,
  // AxiosResponse
} from 'axios'
// import type { ApiResponse } from '@/types/api'
import { addPending, removePending } from './cancel'
import { useUserStore } from '@/stores/user'
import { ErrorCode } from '@/constants/errorCode'
import { axiosInstance } from './axios'
// import { getErrorMessage } from '@/utils/i18n'

export function setupInterceptors(instance: AxiosInstance) {
  // 请求拦截
  instance.interceptors.request.use((config) => {
    addPending(config)

    const userStore = useUserStore()
    if (userStore.token && config.headers) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  })

  // 响应拦截
  instance.interceptors.response.use(
    (response) => {
      removePending(response.config)

      const res = response.data
      if (res.code !== ErrorCode.SUCCESS) {
        // const msg = getErrorMessage(res.code) || res.message
        // return Promise.reject(new Error(msg))
        const msg = res.message
        return Promise.reject(new Error(msg))
      }
      return res.data
    },
    async (error) => {
      const { response, config } = error
      removePending(config)

      // token 过期示例（可选）
      if (response?.status === ErrorCode.TOKEN_EXPIRED) {
        // 统一处理：跳登录 / 刷新 token
      }

      return Promise.reject(error)
    },
  )
}

let isRefreshing = false
let retryQueue: Array<(token: string) => void> = []

function handleQueue(token: string) {
  retryQueue.forEach((cb) => cb(token))
  retryQueue = []
}

export function setupInterceptors_r() {
  // 请求拦截
  axiosInstance.interceptors.request.use((config) => {
    addPending(config)

    const userStore = useUserStore()
    if (userStore.token && config.headers) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  })

  // 响应拦截
  axiosInstance.interceptors.response.use(
    (response) => {
      removePending(response.config)

      const res = response.data
      if (res.code !== 200) {
        return Promise.reject(res)
      }
      return res.data
    },
    async (error) => {
      const { response, config } = error
      removePending(config)

      // Token 过期
      if (response?.status === 401 && !config._retry) {
        config._retry = true
        const userStore = useUserStore()

        if (!isRefreshing) {
          isRefreshing = true
          try {
            const newToken = await userStore.refreshToken()
            handleQueue(newToken)
            return axiosInstance(config)
          } finally {
            isRefreshing = false
          }
        }

        return new Promise((resolve) => {
          retryQueue.push((token: string) => {
            config.headers.Authorization = `Bearer ${token}`
            resolve(axiosInstance(config))
          })
        })
      }

      return Promise.reject(error)
    },
  )
}
