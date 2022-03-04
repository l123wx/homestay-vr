<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component v-if="$route.meta.keepAlive" :is="Component" />
    </keep-alive>
    <component v-if="!$route.meta.keepAlive" :is="Component" />
  </router-view>
</template>
<script setup lang="ts">
</script>
<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: @viewport-height;
    user-select: none;
  }
</style>
