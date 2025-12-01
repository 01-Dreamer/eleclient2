import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = ref({
        id: '',
        email: '',
        is_login: false,
    })

    return { user }
})