<template>
  <Tabs class="tabs" v-model:active="active" shrink color="#5856d6">
    <Tab title="收藏" title-style="padding: 0 14px">
      <img src="@/assets/images/collect.jpg" />
    </Tab>
    <Tab title="历史足迹" title-style="padding: 0 14px">
      <img src="@/assets/images/history.jpg" />
    </Tab>
  </Tabs>
</template>

<script setup lang="ts">
  import { Tab, Tabs } from 'vant'
  import { ref } from 'vue'
  const active = ref(0);
</script>
<style scoped lang="less">
  img {
    width: 100%;
  }
</style>