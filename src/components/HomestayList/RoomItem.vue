<template>
  <div class="room-container">
    <div class="banner">
      <Swipe indicator-color="white">
        <SwipeItem v-for="item in 4" :key="item">
          <img :src="getPlaceholderImg(900, 500)" />
        </SwipeItem>
      </Swipe>
      <div class="collect-btn">
        <Icon name="like-o" />
      </div>
    </div>
    <div class="description">整套公寓型住宅 · 1室1卫1床 · 可住2人</div>
    <div class="title">民宿名称名宿名称名宿名称民宿名称民宿名...</div>
    <TabList class="tab-list" :plain="true" :tabList="tabList"/>
    <div class="price">￥100</div>
  </div>
</template>

<script setup lang="ts">
  import { Swipe, SwipeItem, Icon } from 'vant';
  import { getPlaceholderImg } from '@/utils/index';
  import TabList from '@/components/HomestayList/TabList.vue'
  const tabList = [
    {
      title: '景点1',
      value: 0
    }, {
      title: '景点2',
      value: 2
    }, 
  ]
</script>
<style scoped lang="less">
  .room-container {
    // &:active {
    //   transform: scale(.95);
    //   transition: transform .1s;
    // }
    .banner {
      border-radius: 10px;
      height: 220px;
      position: relative;
      overflow: hidden;
      // background-color: @color-light-gray-3;
      .van-swipe {
        height: 100%;
        .van-swipe-item {
          border-radius: 10px;
          overflow: hidden;
          img {
            height: 100%;
            .absolute-center();
          }
        }
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