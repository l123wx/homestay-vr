<template>
  <DropdownMenu active-color="#5856d6">
    <DropdownItem
      :title="peopleNumOptions.title"
      v-model="peopleNumOptions.value"
      :options="peopleNumOptions.options"
      @change="onPeopleNumChange"/>
    <DropdownItem
      :title="sortTypeOptions.title"
      v-model="sortTypeOptions.value"
      :options="sortTypeOptions.options"
      @change="onSortTypeChange"/>
  </DropdownMenu>
</template>

<script setup lang="ts">
  import { DropdownMenu, DropdownItem } from 'vant';
  import { defineEmits } from 'vue';
  interface SortInfo {
    title: string
    value: number
    options?: Array<SortOption>
  }
  interface SortOption {
    text: string,
    value: number
  }

  const emits = defineEmits(['peopleNumChange', 'sortTypeChange'])

  const peopleNumOptions: SortInfo = {
    title: '人数',
    value: 0,
    options: [
      {
        text: '1',
        value: 1
      }, {
        text: '2',
        value: 2
      }, {
        text: '3',
        value: 3
      }, {
        text: '4',
        value: 4
      }
    ]
  }
  function onPeopleNumChange(value: number) {
    emits('peopleNumChange', value)
  }

  const sortTypeOptions: SortInfo = {
    title: '排序',
    value: 0,
    options: [
      {
        text: '价格降序',
        value: 0
      }, {
        text: '价格升序',
        value: 1
      }
    ]
  }
  function onSortTypeChange(value: number) {
    emits('sortTypeChange', value)
  }

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