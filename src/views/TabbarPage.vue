<template>
  <div class="container">
    <router-view/>
  </div>
  <Tabbar route v-model="active">
    <TabbarItem icon="search" to="/home">搜索</TabbarItem>
    <TabbarItem icon="like-o" to="collect">收藏</TabbarItem>
    <TabbarItem icon="flower-o" to="community">社区</TabbarItem>
    <TabbarItem icon="envelop-o" to="message">收信箱</TabbarItem>
    <TabbarItem icon="contact" to="my">我的</TabbarItem>
  </Tabbar>
</template>

<script setup lang='ts'>
  import { Tabbar, TabbarItem } from 'vant';
  import { ref } from 'vue';
  const active = ref(0);
</script>
<style scoped>
  .container {
    height: calc(100vh - var(--van-tabbar-height));
    width: 100vw;
    overflow: auto;
  }
</style>