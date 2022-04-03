<template>
  <div class="panorama-list-containter">
    <div class="title">全景图列表</div>
    <ul>
      <li v-for="(item, index) in panoramaList" :key="item.path">
        <div>{{ item.name }}</div>
        <Button type="success" size="mini" @click="onPanoramaEditBtnClick(index)">编辑</Button>
        <Button type="danger" size="mini" @click="onPanoramaEditBtnClick(index)">删除</Button>
      </li>
    </ul>
    <Button
      class="add-btn"
      type="success"
      plain
      size="large"
      color="#8e8e93"
      icon="plus"
      @click="onAddPanoramaBtnClick">添加全景图</Button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Vuex from '@/store/index';
import { Button } from 'vant';
import { PanoramaItem } from '@/assets/javascript/panorama/Panorama';
import { computed, reactive, ref } from 'vue';

const router = useRouter();
console.log(Vuex)

function onAddPanoramaBtnClick() {
  toAddPanoramaPage();
}

function toAddPanoramaPage() {
  router.push({
    name: 'panoramaEdit',
    params: {
      state: 'add'
    }
  })
}

const panoramaList = computed(() => {
  return (Vuex.state as any).panorama.panoramaList;
})

function onPanoramaEditBtnClick(index: number) {
  router.push({
    name: 'panoramaEdit',
    params: {
      index,
      state: 'update'
    }
  })
}
</script>
<style scoped lang="less">
  .panorama-list-containter {
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