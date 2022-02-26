<template>
  <div class="avatar" :style="{width: props.width + 'px', height: props.height + 'px'}">
    <img :src="getPlaceholderImg(50, 50)" />
  </div>
</template>

<script setup lang="ts">
  import { getPlaceholderImg } from '@/utils/index'
  import { defineProps, withDefaults } from 'vue'
  interface Props {
    width?: number
    height?: number
  }
  const props = withDefaults(defineProps<Props>(), {
    width: 50,
    height: 50
  })

</script>
<style scoped lang="less">
  .avatar {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      .absolute-center(true, true);
    }
  }
</style>