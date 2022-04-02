<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component v-if="$route.meta.keepAlive" :is="Component" />
    </keep-alive>
    <component v-if="!$route.meta.keepAlive" :is="Component" />
  </router-view>
  <Loading :show="loadingShow"></Loading>
</template>
<script setup lang="ts">
  import Loading from '@/components/Loading.vue'
  import { provide, ref } from 'vue';
  const loadingShow = ref(false)
  provide('loadingOperation', {
    showLoading() {
      loadingShow.value = true
    },
    hideLoading() {
      loadingShow.value = false
    }
  })
</script>
<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: @viewport-height;
    user-select: none;
    overflow-y: auto;
  }
</style>
