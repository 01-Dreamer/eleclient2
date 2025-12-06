import { defineStore } from 'pinia';
import { ref } from 'vue';

const ws_url = import.meta.env.VITE_WS_URL;
export const useWebSocketStore = defineStore('websocket', () => {
    const ws = ref<WebSocket | null>(null);
});