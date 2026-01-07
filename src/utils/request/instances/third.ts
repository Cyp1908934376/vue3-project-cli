import axios from 'axios'

export const thirdRequest = axios.create({
  baseURL: 'https://api.third.com',
})
