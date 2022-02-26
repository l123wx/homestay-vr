<template>
  <Swipe indicator-color="white">
    <SwipeItem v-for="item in 4" :key="item">
      <img :src="getPlaceholderImg(900, 500)" />
    </SwipeItem>
  </Swipe>
</template>

<script setup lang="ts">
  import { Swipe, SwipeItem } from 'vant';
  import { getPlaceholderImg } from '@/utils/index';
  // interface Props {
  //   borderRadius?: number
  // }
  // const props = withDefaults(defineProps<Props>(), {
  //   borderRadius: 0
  // })
</script>
<style scoped lang="less">
  .van-swipe {
    height: 100%;
    .van-swipe-item {
      overflow: hidden;
      img {
        height: 100%;
        .absolute-center();
      }
    }
  }
</style>