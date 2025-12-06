<template>
  <router-view />
  <NavBar class="footer" />
</template>

<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue';

const ws_url = import.meta.env.VITE_WS_URL;
console.log(ws_url);

</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}
</style>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
