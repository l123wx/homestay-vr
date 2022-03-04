<template>
  <NavBar>添加全景图</NavBar>
  <Steps :active="stepActive">
    <Step>添加户型图</Step>
    <Step>添加全景图</Step>
    <Step>预览</Step>
  </Steps>
  <FloorPlan v-show="stepActive == 0" ref="floorPlan" />
  <PanoramaList v-show="stepActive == 1" />
  <Button type="success" size="large" plain v-if="stepActive != 0" @click="stepActive --" >上一步</Button>
  <Button type="success" size="large" @click="onNextBtnClick">{{ stepActive != 2 ? '下一步' : '完成' }}</Button>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import FloorPlan from '@/components/PanoramaAdmin/FloorPlan.vue'
import PanoramaList from '@/components/PanoramaAdmin/PanoramaList.vue'
import { Step, Steps, Button } from 'vant';
import { onMounted, ref, toRefs } from 'vue';
const stepActive = ref(0)
const floorPlan: any = ref(null);
let floorPlanData;
onMounted(function() {
  // console.log(floorPlan.value.getData());
})

function onNextBtnClick() {
  if (stepActive.value == 0) {
    const _result = floorPlan.value.getData();
    if (_result) {
      floorPlanData = _result;
      console.log(floorPlanData)
      stepActive.value ++;
    }
  }
}

</script>
<style scoped lang="less">
  
</style>