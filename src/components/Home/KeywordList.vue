<template>
  <div class="keyword-container">
    <ul>
      <li class="item" v-for="(item, index) in keywordList" :key="index" @click="onKeywordItemClick(item)">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { defineEmits } from 'vue'
  const emits = defineEmits(['keywordItemClick'])

  const keywordList = [
    '酒店',
    '民宿',
    '投影仪',
    '厨房可做饭',
    '空调',
    '可聚会'
  ]

  function onKeywordItemClick(value: string) {
    emits('keywordItemClick', value)
  }
</script>
<style scoped lang="less">
  .keyword-container {
    overflow-x: auto;
    ul {
      display: flex;
      .item {
        display: inline-block;
        flex-shrink: 0;
        .font(#ffffff; 12px; normal; inherit; center);
        background-color: @color-medium-gray;
        border-radius: 5px;
        padding: 5px 10px;
        & + .item {
          margin-left: 10px;
        }
      }
    } 
  }
</style>