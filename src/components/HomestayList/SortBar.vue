<template>
  <ul class="sort-nav-container">
    <li v-for="item in sortList" :key="item.title">
      {{ item.title }}
      <Icon :name="'arrow-' + (item.active ? 'up' : 'down')" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { Icon } from "vant"
  interface sortInfo {
    title: string;
    active: boolean;
  }
  const sortList: Array<sortInfo> = [
    {
      title: '人数',
      active: false
    }, {
      title: '未知区域',
      active: false
    }, {
      title: '排序',
      active: false
    }, {
      title: '筛选',
      active: false
    }
  ];
</script>
<style scoped lang="less">
  .sort-nav-container {
    display: flex;
    padding: 10px 0;
    li {
      position: relative;
      flex: auto;
      font-size: 14px;
      &::before {
        .kerley(120%);
      }
      i {
        font-size: 12px;
      }
    }
  }
</style>