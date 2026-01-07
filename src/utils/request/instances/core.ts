import { createAxios } from './base'

export const coreRequest = createAxios(import.meta.env.VITE_API_CORE)
