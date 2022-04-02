<template>
  <NavBar>添加全景图</NavBar>
  <Steps :active="stepActive">
    <Step>添加户型图</Step>
    <Step>添加全景图</Step>
    <Step>预览</Step>
  </Steps>
  <FloorPlan
    v-show="stepActive == 0"
    v-model:compassAngle="floorPlanData.compassAngle"
    v-model:area="floorPlanData.area"
    v-model:floorPlanPath="floorPlanData.floorPlanPath"/>
  <PanoramaList v-show="stepActive == 1" />
  <Button type="success" size="large" plain v-if="stepActive != 0" @click="stepActive --" >上一步</Button>
  <Button type="success" size="large" @click="onNextBtnClick">{{ stepActive != 2 ? '下一步' : '完成' }}</Button>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FloorPlan from '@/components/PanoramaAdmin/FloorPlan.vue'
import PanoramaList from '@/components/PanoramaAdmin/PanoramaList.vue'
import { PanoramaItem } from '@/assets/javascript/panorama/Panorama'
import { Step, Steps, Button, Notify } from 'vant';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router'
import type { FloorPlanData } from '@/types/floorPlan'
const route = useRoute()
const stepActive = ref(0)

function onInput() {
  console.log(arguments)
}

// 户型图数据
const floorPlanData: FloorPlanData = reactive({
  area: 0,
  floorPlanPath: '',
  compassAngle: 0
})

setTimeout(function(){
  floorPlanData.floorPlanPath = 'blob:http://192.168.43.44:8080/f686a504-03d0-40ec-97f6-36fd5eea2ed4'
}, 1000)

// 全景数据
const panoramaList = ref<Array<PanoramaItem>>([])

function onNextBtnClick() {
  if (stepActive.value == 0) {
    if (!floorPlanData.floorPlanPath) {
      Notify('请上传户型图！')
      return false;
    } else if (!floorPlanData.area) {
      Notify('请输入房屋面积')
      return false;
    }
  }
}

</script>
<style scoped lang="less">
  
</style>