<template>
  <NavBar>{{ subPageList[stepActiveIndex].title }}</NavBar>
  <Steps :active="stepActiveIndex" style="padding: 10px 22px 0">
    <Step v-for="(item, index) in subPageList" :key="index">{{ item.title }}</Step>
  </Steps>
  <div class="container">
    <FloorPlan
      v-show="stepActiveIndex == 0"
      v-model:compassAngle="floorPlanData.compassAngle"
      v-model:area="floorPlanData.area"
      v-model:floorPlanPath="floorPlanData.floorPlanPath"/>
    <PanoramaList v-show="stepActiveIndex == 1" v-model:panoramaList="panoramaList" :floorPlanData="floorPlanData" />
    <Button v-if="stepActiveIndex != 0" type="success" size="large" plain @click="stepActiveIndex--" >上一步</Button>
    <Button v-if="stepActiveIndex != (subPageList.length - 1)" type="success" size="large" @click="onNextBtnClick">下一步</Button>
    <Button v-else type="success" size="large" @click="onConfirmBtnClick">完成</Button>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FloorPlan from '@/components/PanoramaAdmin/FloorPlan.vue'
import PanoramaList from '@/components/PanoramaAdmin/PanoramaList.vue'
import { PanoramaItem } from '@/assets/javascript/panorama/Panorama'
import { Step, Steps, Button, Notify } from 'vant';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import type { FloorPlanData } from '@/types/floorPlan'
const route = useRoute(),
  router = useRouter()
const stepActiveIndex = ref(0)

const subPageList = [
  {
    title: '添加户型图',
    comfirmFun() {
      if (!floorPlanData.floorPlanPath) {
        Notify('请上传户型图！')
        return false;
      } else if (!floorPlanData.area) {
        Notify('请输入房屋面积')
        return false;
      }
      stepActiveIndex.value++
    }
  }, {
    title: '添加全景图',
    comfirmFun() {
      console.log(123)
    }
  }
]
function onNextBtnClick() {
  subPageList[stepActiveIndex.value].comfirmFun();
}
function onConfirmBtnClick() {
  router.back();
}

// 户型图数据
const floorPlanData: FloorPlanData = reactive({
  area: 0,
  floorPlanPath: '',
  compassAngle: 0
})

// 全景数据
const panoramaList = ref<Array<PanoramaItem>>([])

</script>
<style scoped lang="less">
  .container {
    padding: 0 22px;
  }
  button {
    margin-top: 10px;
  }
</style>