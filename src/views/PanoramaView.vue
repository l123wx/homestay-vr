<template>
  <NavBar class="nav-bar" bgColor="transparent">{{ panoramaData.panoramaList[activePanoramaIndex].name }}</NavBar>
  <div class="panorama-view" ref="panoramaView">
    <FloorPlanMap
      class="floor-plan"
      :floor-plan-path="panoramaData.floorPlanData.floorPlanPath"
      :loc-point-view-angle="panoramaData.floorPlanData.compassAngle"
      :loc-point-location="panoramaData.panoramaList[activePanoramaIndex].location"/>
  </div>
</template>

<script setup lang="ts">
  import { Panorama, PanoramaItem, InteractPoint } from '@/assets/javascript/panorama/Panorama'
  import FloorPlanMap from '@/components/PanoramaAdmin/FloorPlanMap.vue'
  import { inject, onMounted, Ref, ref } from 'vue';
  import NavBar from '@/components/NavBar.vue'
  import type { FloorPlanData } from '@/types/floorPlan'
  const { showLoading, hideLoading }: any = inject('loadingOperation')
  const panoramaView = ref();
  let panorama: Panorama;
  const panoramaData: {
    panoramaList: Array<PanoramaItem>
    floorPlanData: FloorPlanData
  } = {
    panoramaList: [
      {
        name: '外场',
        path: require('@/assets/images/outside.jpg'),
        lowPath: require('@/assets/images/outside_low.jpg'),
        fov: 60,
        cameraPosition: {
          x: 0, y: 0, z: 0
        },
        location: {
          x: 20, y: 50
        },
        interactPointData: [
          {
            name: 'test_1',
            message: '仓库',
            position: {x: 41.12218783392694, y: -0.8053452657697661, z: 26.480118531637107},
            scale: 4,
            targetPanoramaName: '外场'
          }, {
            name: 'test_1',
            message: '厨房',
            position: {x: 48, y: 1, z: 0},
            scale: 4,
            targetPanoramaName: '内场'
          }, {
            name: 'test_1',
            message: '汽车',
            position: {x: -23.035690643889414, y: -3.028725818509145, z: -43.06321379983966},
            scale: 4
          }
        ]
      }, {
        name: '内场',
        path: require('@/assets/images/inside.jpg'),
        lowPath: require('@/assets/images/inside_low.jpg'),
        fov: 60,
        cameraPosition: {
          x: 0, y: 0, z: 0
        },
        location: {
          x: 60, y: 60
        },
        interactPointData: [
          {
            name: 'test_1',
            message: '仓库',
            position: {x: 34.044655510232346, y: 0.7694148405172122, z: 35.125966119794455},
            scale: 4,
            targetPanoramaName: '外场'
          }
        ]
      }
    ],
    floorPlanData: {
      area: 0,
      floorPlanPath: require('@/assets/images/floorPlan-text.png'),
      compassAngle: 0
    }
  }

  const activePanoramaIndex = ref(0)
  const locPointViewAngle = ref(0)

  onMounted(function() {
    showLoading()
    const panoramaList = panoramaData.panoramaList
    panorama = new Panorama(panoramaView.value)
    panorama.initPanorama(panoramaList[0]).then(res => {
      hideLoading()
    })
    panorama.onInteractPointClick(function(object: any) {
      const { targetPanoramaName } = object.userData
      const index = panoramaList.findIndex(item => {
        return item.name == targetPanoramaName
      })
      if (index === -1) {
        alert("未找到对应的全景信息")
        return
      }
      panorama.switchPanorama(panoramaList[index]).then(res => {
        activePanoramaIndex.value = index
      })
    })
    animate()
  })

  let animate: any = function() {
    if (!animate) return
    locPointViewAngle.value = panorama.getCameraAzimuthalAngle();
    requestAnimationFrame(animate);
  }

</script>
<style scoped lang="less">
  .nav-bar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    color: #fff;
  }
  .floor-plan {
    top: 50px;
    position: relative;
  }
  .panorama-view {
    height: 100vh;
  }
</style>