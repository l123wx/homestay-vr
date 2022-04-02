<template>
  <Swipe indicator-color="white">
    <SwipeItem v-for="item in 4" :key="item" @click="item == 1 ? toPanoramaViewPage() : () => {123}">
      <img :src="getPlaceholderImg(900, 500)" />
      <div class="panoramaIcon" v-if="item == 1">
        <img src="@/assets/images/720°.png" />
      </div>
    </SwipeItem>
  </Swipe>
</template>

<script setup lang="ts">
  import { Swipe, SwipeItem } from 'vant';
  import { getPlaceholderImg } from '@/utils/index';
  import { useRouter } from 'vue-router'
  const router = useRouter();
  // interface Props {
  //   borderRadius?: number
  // }
  // const props = withDefaults(defineProps<Props>(), {
  //   borderRadius: 0
  // })
  function toPanoramaViewPage() {
    router.push({
      name: 'panoramaView'
    })
  }
</script>
<style scoped lang="less">
  .van-swipe {
    height: 100%;
    .van-swipe-item {
      overflow: hidden;
      & > img {
        height: 100%;
        .absolute-center();
      }
      .panoramaIcon {
        width: 70px;
        height: 70px;
        .absolute-center();
        img {
          width: 100%;
        }
      }
    }
  }
</style>