// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'

export const useUserStore = defineStore('user', () => {

    // 根據後端 back > controllers > user.js 內 login 時會回傳什麼
    const token = ref('')
    const account = ref('')
    const role = ref()
    const cart = ref(0)

    // 登入者
  const isLoggedIn = computed(() => {
    return token.value.length > 0
  })

  // 管理員
  const isAdmin = computed(() => {
    return role.value === UserRole.ADMIN
  })

  return {
    token, account, role, cart,
    isLoggedIn, isAdmin,
  }
})
