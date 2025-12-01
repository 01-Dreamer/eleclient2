<template>
  <header>
    <p><slot></slot></p>
  </header>
</template>


<script lang="ts" setup>
</script>


<style scoped>
header {
  width: 100%;
  height: 12vw;
  background-color: #0097FF;
  color: #FFF;
  font-size: 4.8vw;

  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>