import type { AxiosRequestConfig } from 'axios'

const pendingMap = new Map<string, AbortController>()

function getKey(config: AxiosRequestConfig) {
  return [config.method, config.url].join('&')
}

export function addPending(config: AxiosRequestConfig) {
  const key = getKey(config)
  if (pendingMap.has(key)) {
    pendingMap.get(key)?.abort()
  }
  const controller = new AbortController()
  config.signal = controller.signal
  pendingMap.set(key, controller)
}

export function removePending(config: AxiosRequestConfig) {
  const key = getKey(config)
  pendingMap.delete(key)
}
