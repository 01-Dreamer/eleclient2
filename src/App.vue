<template>
  <router-view />
  <NavBar class="footer" />
</template>

<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue';


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
