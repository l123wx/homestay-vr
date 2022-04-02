<template>
  <div class="room-container" @click="toDetailPage">
    <div class="banner">
      <img :src="props.option.coverImgPath" />
      <div class="collect-btn">
        <Icon :name="props.option.isCollect ? 'like' : 'like-o'" :style="props.option.isCollect ? 'color:#ff2d55' : ''"/>
      </div>
    </div>
    <div class="description">{{ props.option.buildingType }} · {{ props.option.houseType }} · {{ props.option.roomNumber }}室{{ props.option.toiletNumber }}卫{{ props.option.bedNumber }}床 · 可住{{ props.option.peopleNumber }}人</div>
    <div class="title">{{ props.option.homestayName }}</div>
    <div class="price">￥{{ props.option.price }}</div>
  </div>
</template>

<script setup lang="ts">
  import { Icon } from 'vant'
  import router from '@/router/index'
  import { defineProps, withDefaults } from 'vue'
  const props = withDefaults(defineProps<{
    option: {
      isCollect: boolean
      coverImgPath: string
      homestayName: string
      price: string
      peopleNumber: string
      roomNumber: string
      bedNumber: string
      buildingType: string
      houseType: string
      toiletNumber: string
    }
  }>(), {})
  function toDetailPage(): void {
    router.push('/homestayDetail');
  }
</script>
<style scoped lang="less">
  .room-container {
    &:active {
      transform: scale(.95);
      transition: transform .1s;
    }
    .banner {
      border-radius: 10px;
      height: 220px;
      position: relative;
      overflow: hidden;
      // background-color: @color-light-gray-3;
      img {
        width: 100%;
        height: 100%;
      }
      .collect-btn {
        .absolute(@right: 20px; @top: 20px);
        i {
          font-size: 24px;
          color: #ffffff;
        }
      }
    }
    .description {
      font-size: 13px;
      margin-top: 10px;
    }
    .title {
      margin-top: 4px;
      font-weight: bold;
    }
    .tab-list {
      margin-top: 6px;
    }
    .price {
      font-weight: bold;
      padding: 4px 0 10px;
      &::after {
        content: ' / 晚';
        .font(@color-gray; 12px);
      }
    }
  }
</style>