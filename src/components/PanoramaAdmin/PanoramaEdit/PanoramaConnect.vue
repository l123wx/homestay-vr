<template>
  <div class="panorama-view" ref="panoramaView">
    <div class="sight-bead"></div>
    <div class="tip">点击屏幕将交互点置于准星处</div>
  </div>
  <div class="operation-container">
    <div class="interact-points-list">
      <ul>
        <li
          v-for="(item, index) in interactPointList"
          :key="index"
          :class="index == interactPointIndex ? 'active' : ''"
          @click="interactPointIndex = index"
        >
          {{ item.message }}
        </li> 
        <li @click="onInteractPointAddBtnClick">
          <Icon name="plus"></Icon>
        </li>
      </ul>
    </div>
    <Popup v-model:show="showPopup" position="bottom">
      <Picker
        title="标题"
        :columns="columns"
        @confirm="() => {}"
        @cancel="showPopup = false"
      />
    </Popup>
    <Cell title="目标全景" value="123" @click="showPopup = true"></Cell>
    <div class="slider">
      交互点大小
      <Slider v-model="interactPointScale"/>
    </div>
  </div>

  <VanDialog :show="showNewInteractPointDialog" title="添加交互点" show-cancel-button @cancel="showNewInteractPointDialog = false" @confirm="addInteractPoint">
    <Field placeholder="请输入交互点名称" v-model="newInteractPointName"></Field>
  </VanDialog>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch, ref, defineProps, defineExpose, reactive} from 'vue';
import { Panorama, PanoramaItem, InteractPoint } from '@/assets/javascript/panorama/Panorama'
import { Cell, Picker, Popup, Icon, Slider, Dialog, Field } from 'vant'
import type { PickerColumn } from 'vant'
import * as THREE from 'three'

const VanDialog = Dialog.Component,
  newInteractPointName = ref(''),
  showNewInteractPointDialog = ref(true);
function addInteractPoint() {
  const newInteractPoint: InteractPoint = {
    name: 'test_1',
    message: newInteractPointName.value,
    position: {x: 0, y: 0, z: 0},
    scale: 4
  }
  newInteractPoint.object = panorama.addInteractPointToScene(newInteractPoint);
  setInteractPointPositionCenter(newInteractPoint.object);
  interactPointList.push(newInteractPoint);
  interactPointIndex.value = interactPointList.length - 1;
  newInteractPointName.value = '';
  showNewInteractPointDialog.value = false;
}

const props = defineProps<{
  panoramaInfo: PanoramaItem
}>()

const interactPointList: Array<InteractPoint> = reactive([
  {
    name: 'test_1',
    message: '仓库',
    position: {x: 41.12218783392694, y: -0.8053452657697661, z: 26.480118531637107},
    scale: 4
  }, {
    name: 'test_1',
    message: '厨房',
    position: {x: 48, y: 1, z: 0},
    scale: 4
  }, {
    name: 'test_1',
    message: '汽车',
    position: {x: -23.035690643889414, y: -3.028725818509145, z: -43.06321379983966},
    scale: 4
  }
])
const interactPointIndex = ref(0);

const columns = ref<PickerColumn[]>([])
columns.value = [
  {
    text: '全景1',
    value: 1,
    id: 1
  }, {
    text: '全景2',
    value: 2,
    id: 2
  }, {
    text: '全景3',
    value: 3,
    id: 3
  }
]
const interactPointScale = ref(50);
const fovValue = ref(60);
const showPopup = ref(false);

watch(fovValue, function(e) {
  panorama.fov = e;
})

const panoramaView = ref();
let panorama: Panorama;

onMounted(function() {
  panorama = new Panorama(panoramaView.value);
  panorama.initPanorama({ ...props.panoramaInfo, path: require('@/assets/images/inside.jpg')});
  interactPointList.map(item => {
    const object3d = panorama.addInteractPointToScene(item);
    item.object = object3d;
    return item;
  })

  panoramaView.value.addEventListener('click', function(){
    if (!interactPointList[interactPointIndex.value]) return
    setInteractPointPositionCenter((interactPointList as any)[interactPointIndex.value].object)
  })
  animate();
})

function setInteractPointPositionCenter(object: THREE.Object3D) {
  const intersect = panorama.getCenterIntersects()[0]
  object.position.copy( intersect.point ).add( intersect.face!.normal )
  console.log(object)
}

function onInteractPointAddBtnClick() {
  showNewInteractPointDialog.value = true;
}

let animate: any = function() {
  if (!animate) return
  requestAnimationFrame(animate);
}

// onBeforeUnmount(function() {
//   animate = null;
// })
</script>
<style scoped lang="less">
  .panorama-view {
    height: calc(100% - 50px - 200px);
    position: relative;
    .sight-bead {
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      &::before {
        content: '';
        position: absolute;
        height: 20px;
        width: 2px;
        background-color: #fff;
        display: inline-block;
      }
      &::after {
        content: '';
        position: absolute;
        height: 2px;
        width: 20px;
        background-color: #fff;
        display: inline-block;
      }
    }
    .tip {
      position: absolute;
      width: 100%;
      bottom: 0;
      text-align: center;
      line-height: 26px;
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
  .operation-container {
    height: 200px;
    width: 100%;
    .interact-points-list {
      height: 60px;
      width: 100%;
      display: flex;
      align-items: center;
      overflow-x: auto;
      ul {
        display: flex;
        flex-shrink: 0;
        padding: 0 10px;
        li {
          padding: 6px 10px;
          text-align: center;
          color: @color-yellow;
          border-radius: 5px;
          background-color: transparent;
          border: 2px solid @color-yellow;
          align-self: center;
          & + li {
            margin-left: 10px;
          }
          &.active {
            color: #fff;
            background-color: @color-yellow;
          }
        }
      }
    }
    .slider {
      padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
      .van-slider {
        margin-top: 15px;
      }
    }
  }
</style>