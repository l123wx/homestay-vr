<template>
  <div class="container">
    <router-view/>
  </div>
  <Tabbar route>
    <TabbarItem
      v-for="(item, index) in userType == 0 ? roomerTabbarList : landlordTabbarList"
      :key="index"
      :icon="item.icon"
      :to="item.to"
      :class="{'van-tabbar-item--active': route.path == item.to}">{{ item.text }}</TabbarItem>
  </Tabbar>
</template>

<script setup lang='ts'>
  import { Tabbar, TabbarItem } from 'vant';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router'
  import { gobalData } from '@/main';
  const route = useRoute()

  const userType = computed(() => {
    return gobalData.userType;
  })

  const roomerTabbarList = [
    {
      icon: 'search',
      text: '搜索',
      to: '/'
    }, {
      icon: 'like-o',
      text: '收藏',
      to: '/collect'
    }, {
      icon: 'contact',
      text: '我的',
      to: '/my'
    }, 
  ]

  const landlordTabbarList = [
    {
      icon: 'hotel-o',
      text: '房源',
      to: '/homestayAdmin'
    }, {
      icon: 'contact',
      text: '我的',
      to: '/my'
    }
  ]
</script>
<style scoped>
  .container {
    height: calc(100vh - var(--van-tabbar-height));
    width: 100vw;
    overflow: auto;
  }
</style>