<template>
  <div class="message-container">
    <Avatar class="avatar" :height="60" :width="60" />
    <div class="text">
      <div class="title">{{ props.title }}</div>
      <div class="desc">{{ props.desc }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Avatar from '@/components/Avatar.vue'
  import { defineProps, withDefaults } from 'vue';

  interface Props {
    arrayUrl?: string
    title?: string
    desc?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    arrayUrl: '',
    title: '',
    desc: ''
  })
</script>
<style scoped lang="less">
  .message-container {
    padding: 12px 0;
    margin: 0 12px;
    .flex();
    .text {
      flex: 1;
      margin-left: 8px;
      .title {
        font-weight: bold;
      }
      .desc {
        margin-top: 4px;
        .font(@color-gray; 13px);
        .ellipsis(2);
      }
    }
    &+& {
      border-top: 1px solid @color-light-gray-3;
    }
  }
</style>