import { defineStore } from 'pinia'
import { request } from '@/utils/request'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    refreshTokenValue: '',
  }),
  actions: {
    async refreshToken() {
      const res = await request<string>({
        url: '/auth/refresh',
        method: 'post',
        data: { refreshToken: this.refreshTokenValue },
      })
      this.token = res
      return res
    },
  },
})
