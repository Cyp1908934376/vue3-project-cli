import { createAxios } from './base'

export const authRequest = createAxios(import.meta.env.VITE_API_AUTH)
