<template>
  <div class="container">
    <router-view/>
  </div>
  <Tabbar route v-model="active">
    <TabbarItem icon="search" to="/" :class="{'van-tabbar-item--active': active == 0}">搜索</TabbarItem>
    <TabbarItem icon="like-o" to="collect" :class="{'van-tabbar-item--active': active == 1}">收藏</TabbarItem>
    <TabbarItem icon="flower-o" to="community" :class="{'van-tabbar-item--active': active == 2}">社区</TabbarItem>
    <TabbarItem icon="envelop-o" to="message" :class="{'van-tabbar-item--active': active == 3}">收信箱</TabbarItem>
    <TabbarItem icon="contact" to="my" :class="{'van-tabbar-item--active': active == 4}">我的</TabbarItem>
  </Tabbar>
</template>

<script setup lang='ts'>
  import { Tabbar, TabbarItem } from 'vant';
  import { ref, watch } from 'vue';
  const active = ref(0);
</script>
<style scoped>
  .container {
    height: calc(100vh - var(--van-tabbar-height));
    width: 100vw;
    overflow: auto;
  }
</style>