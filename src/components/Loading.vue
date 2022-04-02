<template>
  <Overlay :show="props.show">
    <Loading vertical color="#fff">请稍后...</Loading>
  </Overlay>
</template>

<script setup lang="ts">
  import { Overlay, Loading } from 'vant'
  import { ref, defineProps, withDefaults } from 'vue'
  const props = withDefaults(defineProps<{
    show: boolean
  }>(), {
    show: false
  })
</script>
<style scoped lang="less">
  .van-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    .van-loading {
      margin-top: -50px;
    }
  }
</style>