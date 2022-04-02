<template>
  <div :class="['map', floorPlanEditing ? 'active': '']">
    <div class="tip">请选择该全景图的拍摄位置</div>
    <div class="floor-plan-container">
      <div
        class="location_point"
        :style="[
          'transform:rotate(' + props.locPointViewAngle + 'deg)',
          'top:' + location!.y + '%',
          'left:' + location!.x + '%'
        ]"></div>
      <img
        @click="onFloorPlanClick"
        :src="floorPlanPath"
        :style="[
          'width:' + floorPlanInfo.width,
          'height:' + floorPlanInfo.height
        ]" />
    </div>
    <Button type="success" size="large" @click="onSubmitBtnClick">确定</Button>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, defineProps, withDefaults, watch, defineEmits } from 'vue';
  import { Location } from "@/assets/javascript/panorama/Panorama";
  import { Button } from 'vant';

  const emit = defineEmits([
    'submitBtnClick'
  ])

  const props = withDefaults(defineProps<Props>(), {
    floorPlanPath: '',
    locPointViewAngle: 0,
    locPointLocation: () => ({ x: 50, y: 50 }),
    editable: false
  })

  interface Props {
    floorPlanPath: string
    locPointViewAngle?: number
    // 这里的xy坐标的单位是百分号，相对于户型图
    locPointLocation?: Location
    editable?: boolean
  }

  let location = ref<Location>();
  location.value = { ... props.locPointLocation };
  watch(() => props.locPointLocation, (newValue) => {
    location.value = { ...newValue }
  })

  const floorPlanEditing = ref<boolean>(false);
  const floorPlanInfo = reactive<ImgSize>({
    width: '',
    height: ''
  })
  
  interface ImgSize {
    width: string
    height: string
  }
  
  watch(() => props.floorPlanPath, (newValue) => {
    console.log(newValue)
    calcWidthHeightByLongSide(newValue).then(res => {
      floorPlanInfo.width = (res as ImgSize).width;
      floorPlanInfo.height = (res as ImgSize).height;
    })
  })

  function calcWidthHeightByLongSide(path: string, maxLength = 16) {
    return new Promise(resolve => {
      const img = new Image();
      let imgSize: ImgSize = {
        width: '',
        height: ''
      };
      img.src = path;
      img.onload = function(e) {
        const w = img.width,
          h = img.height
        if (w > h) {
          imgSize.width = maxLength + 'em';
          imgSize.height = h / w * maxLength + 'em';
        } else {
          imgSize.width = w / h * maxLength + 'em';
          imgSize.height = maxLength + 'em';
        }
        resolve(imgSize)
      }
    })
  }

  function onFloorPlanClick(e: MouseEvent) {
    if (!props.editable) return;
    if (floorPlanEditing.value) {
      const target = e.target as HTMLImageElement;
      location.value!.x = Number((e.offsetX / target.width * 100).toFixed(2));
      location.value!.y = Number((e.offsetY / target.height * 100).toFixed(2));
    } else {
      floorPlanEditing.value = true;
    }
  }

  function onSubmitBtnClick() {
    emit('submitBtnClick', location.value);
    floorPlanEditing.value = false;
  }

</script>
<style scoped lang="less">
  .map {
    .tip {
      width: 100%;
      .font(@color-white; 18px; bold; normal; center);
      position: absolute;
      top: 30px;
      display: none;
    }
    .floor-plan-container {
      position: absolute;
      right: 1em;
      top: 1em;
      font-size: 10px;
      text-align: center;
    }
    &.active {
      height: 100vh;
      width: 100vw;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 5;
      .tip {
        display: block;
      }
      .floor-plan-container {
        .absolute-center(true, false);
        right: unset;
        font-size: 5.7vw;
        opacity: 1;
        top: 70px;
      }
      img {
        opacity: 1;
      }
      button {
        display: block;
      }
    }
    img {
      width: 16em;
      height: 16em;
      opacity: 0.5;
    }
    .location_point {
      z-index: 5;
      position: absolute;
      transition: top .2s, left .2s;
      &::before {
        content: '';
        position: absolute;
        border: 1em solid transparent;
        border-top: 1.8em solid #03a9f4;
        border-bottom: none;
        .absolute-center(true, false);
        bottom: -.4em;
        opacity: 0.5;
      }
      &::after {
        content: '';
        position: absolute;
        height: 1em;
        width: 1em;
        border-radius: 50%;
        background-color: blue;
        .absolute-center();
      }
    }
    button {
      position: absolute;
      bottom: 30px;
      margin: 0 22px;
      width: calc(100% - 44px);
      display: none;
    }
  }
</style>