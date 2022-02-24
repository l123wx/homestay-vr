<template>
  <div class="address-container">
    <div class="city">
      {{ data.city }}
      <Icon name="arrow-down"></Icon>
    </div>
    <div class="search-word">
      {{ data.address || '景点/地址/房源名' }}
      <Icon name="clear" v-if="showSearchWordInputEmptyBtn"></Icon>
    </div>
    <div class="location-btn" v-if="props.showLocationBtn">
      <Icon name="aim"></Icon>
      <span>当前位置</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Icon } from 'vant'
  import { reactive, defineProps, withDefaults } from 'vue';

  interface Props {
    showLocationBtn?: boolean
    kerleyColor?: string //间隔线颜色
    showSearchWordInputEmptyBtn?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    showLocationBtn: true,
    kerleyColor: '#c7c7cc',
    showSearchWordInputEmptyBtn: false
  })

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
    align-items: center;
    @spacing: 10px;
    .city {
      font-weight: bold;
      padding-right: @spacing;
      i {
        font-size: 12px;
        margin-left: -5px;
      }
    }
    .search-word {
      color: @color-medium-gray;
      .font(@color: @color-medium-gray; @fontSize: 14px);
      @paddingRight: @spacing + if(v-bind(showSearchWordInputEmptyBtn), 16px, 0);
      padding: 0 @paddingRight 0 @spacing;
      position: relative;
      flex: 1;
      &::before {
        .kerley(120%, v-bind('props.kerleyColor'));
      }
      i {
        font-size: 14px;
        color: @color-gray;
        .absolute-center(false, true);
        right: @spacing;
      }
    }
    .location-btn {
      padding-left: @spacing;
      position: relative;
      &::before {
        .kerley(120%, v-bind('props.kerleyColor'));
      }
      span {
        font-size: 12px;
        margin-left: 16px;
      }
      i {
        font-size: 14px;
        .absolute-center(false, true);
      }
    }
  }
</style>