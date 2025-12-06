import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = ref({
        id: -1,
        email: '',
        token: '',
        locaton_text: '',
        is_login: true,
    })

    return { user }
})