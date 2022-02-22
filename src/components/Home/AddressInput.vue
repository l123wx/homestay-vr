<template>
  <div class="address-container">
    <div class="city">
      {{ data.city }}
      <Icon name="arrow-down"></Icon>
    </div>
    <div class="search-word">
      {{ data.address || '景点/地址/房源名' }}
      <Icon name="clear"></Icon>
    </div>
    <div class="location-btn">
      <Icon name="aim"></Icon>
      <span>当前位置</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Icon } from 'vant'
  import { reactive } from 'vue';
  let data = reactive<{
    city: string,
    address: string,
    beginTime: Date | null,
    endTime: Date | null,
    peopleNum: number
  }>({
    city: '广州市',
    address: '',
    beginTime: null,
    endTime: null,
    peopleNum: 0
  })
</script>
<style scoped lang="less">
  .address-container {
    display: flex;
    @spacing: 10px;
    .city {
      font-weight: bold;
      padding-right: @spacing; 
    }
    .search-word {
      color: @color-medium-gray;
      .font(@color: @color-medium-gray);
      padding: 0 @spacing + 20px 0 @spacing;
      position: relative;
      flex: 1;
      &::before, &::after {
        content: '';
        height: 120%;
        border-left: 1px solid @color-medium-gray;
        .absolute-center(false, true);
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
      i {
        color: @color-gray;
        .absolute-center(false, true);
        right: @spacing;
      }
    }
    .location-btn {
      padding-left: @spacing;
      position: relative;
      span {
        font-size: 14px;
        margin-left: 20px;
      }
      i {
        .absolute-center(false, true);
      }
    }
  }
</style>