<template>
  <div class="panorama-list-containter">
    <div class="title">全景图列表</div>
    <ul>
      <li v-for="item in panoramaList" :key="item.path">
        <div>{{ item.name }}</div>
        <Button type="success" size="mini">编辑</Button>
      </li>
    </ul>
    <Button
      class="add-btn"
      type="success"
      plain
      size="large"
      color="#8e8e93"
      icon="plus"
      @click="toPanoramaEditPage">添加全景图</Button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { Button } from 'vant';
import { PanoramaItem } from '@/assets/javascript/panorama/Panorama';
import { ref } from 'vue';

const outside_low_url = require('@/assets/images/outside_low.jpg');
const panoramaList = ref<PanoramaItem[]>([
  {
    name: '厨房',
    path: outside_low_url,
    fov: 70,
    deviationAngle: 0
  }
])
function toPanoramaEditPage() {
  router.push('/panoramaEdit')
}
</script>
<style scoped lang="less">
  .panorama-list-containter {
    margin: 0 15px;
    .title {
      font-weight: bold;
      margin-bottom: 10px;
    }
    li {
      min-height: 50px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid @color-light-gray-1;
      box-sizing: border-box;
      padding: 10px 0;
      div {
        flex: 1;
        font-size: 13px;
      }
      button {
        padding: 0 20px;
      }
    }
    .add-btn {
      border-radius: 5px;
      margin-top: 15px;
    }
  }
  
</style>