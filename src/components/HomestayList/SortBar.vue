<template>
  <DropdownMenu active-color="#5856d6">
    <DropdownItem
      v-for="item in sortList"
      :key="item.title"
      :title="item.title"
      v-model="item.value"
      :options="item.options" />
  </DropdownMenu>
</template>

<script setup lang="ts">
  import { DropdownMenu, DropdownItem } from 'vant';
  interface SortInfo {
    title: string
    value: number
    options?: Array<SortOption>
  }
  interface SortOption {
    text: string,
    value: number
  }
  const sortList: Array<SortInfo> = [
    {
      title: '人数',
      value: 0,
      options: [
        {
          text: '1',
          value: 1
        }
      ]
    }, {
      title: '未知区域',
      value: 1
    }, {
      title: '排序',
      value: 2
    }, {
      title: '筛选',
      value: 3
    }
  ];
</script>
<style lang="less">
  .van-dropdown-menu {
    .van-dropdown-menu__bar {
      box-shadow: unset;
      .van-dropdown-menu__item {
        flex: auto;
      }
    }
  }
</style>