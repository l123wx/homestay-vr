<template>
  <div class="panorama-view" ref="panoramaView">
    <FloorPlanMap
      :floor-plan-path="props.floorPlanImg"
      :loc-point-view-angle="locPointViewAngle"
      :loc-point-location="location"
      :editable="true"
      @submit-btn-click="floorPlanLocPointLocationSumbit" />
    <div class="fov-controler">
      <div>请将视角调整至于右上角提示点视角</div>
      <input type="range" v-model="fovValue" min="1" />
      <div>请调整合适的视距，尽量还原现实房屋的观感</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FloorPlanMap from '@/components/PanoramaAdmin/FloorPlanMap.vue'
import { onBeforeUnmount, onMounted, watch, ref, defineProps, reactive, defineExpose, readonly, inject} from 'vue';
import { Panorama, PanoramaItem } from '@/assets/javascript/panorama/Panorama'
const { showLoading, hideLoading }: any = inject('loadingOperation')
const props = defineProps<{
  floorPlanImg: string,
  panoramaInfo: PanoramaItem
}>()

const locPointViewAngle = ref(0);
const fovValue = ref(60);
const rotations = ref();
const location = ref({
  x: 50,
  y: 50
})

watch(fovValue, function(e) {
  panorama.fov = e;
})

const panoramaView = ref();
let panorama: Panorama;

onMounted(function() {
  showLoading()
  if (props.panoramaInfo.location) {
    location.value = props.panoramaInfo.location;
  }
  panorama = new Panorama(panoramaView.value);
  panorama.initPanorama(props.panoramaInfo).then(res => {
    hideLoading()
  })
  animate();
})

let animate: any = function() {
  if (!animate) return
  rotations.value = panorama.getCameraRotationsAngle();
  requestAnimationFrame(animate);
  // locPointViewAngle.value = panorama.getCameraAzimuthalAngle();
}

onBeforeUnmount(function() {
  animate = null;
})

function floorPlanLocPointLocationSumbit(e: any) {
  location.value = e;
}

defineExpose(readonly({
  getLocation: () => location.value,
  getFov: () => fovValue.value,
  getRotations: () => rotations.value
}))
</script>
<style scoped lang="less">
  .panorama-view {
    height: calc(100% - 50px);
    position: relative;
    .fov-controler {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 30px 22px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      background-color: rgba(255, 255, 255, 0.5);
      input {
        width: 100%;
      }
    }
  }
</style>