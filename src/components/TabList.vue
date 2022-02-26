<template>
  <div class="tab-list-container">
    <ul>
      <li
        :class="['item', props.plain ? 'plain' : '']"
        v-for="tab in props.tabList"
        :key="tab.value"
      >{{ tab.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, withDefaults } from 'vue'
  interface Props {
    tabList: Array<Tab> | null
    color?: string
    plain?: boolean
    size?: 'small' | 'normal' | 'large'
  }
  interface Tab {
    value: number
    title: string
  }
  const props = withDefaults(defineProps<Props>(), {
    tabList: null,
    color: '#c7c7cc',
    plain: true,
    size: 'normal'
  })
</script>
<style scoped lang="less">
  @color: v-bind('props.color');
  .tab-list-container {
    overflow-x: auto;
    ul {
      display: flex;
      .item {
        display: inline-block;
        flex-shrink: 0;
        .font(@color-white; 10px; normal; inherit; center);
        background-color: @color;
        border: 0.5px solid @color;
        border-radius: 4px;
        padding: 2px 4px;
        &.plain {
          color: @color;
          background-color: @color-white;
        }
        & + .item {
          margin-left: 10px;
        }
      }
    } 
  }
</style>