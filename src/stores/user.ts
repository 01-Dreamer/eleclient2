import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = ref({
        id: -1,
        email: '',
        is_login: true,
    })

    return { user }
})