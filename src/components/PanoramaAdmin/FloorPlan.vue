<template>
  <div>
    <div class="floor-plan-container">
      <div>
        <Uploader
          class="uploader"
          v-model="fileList"
          :max-count="1"
          :after-read="onFloorPlanUpload"
          @delete="emit('update:floorPlanPath', '')" />
        <div
          class="compass"
          src="@/assets/images/compass.png"
          :style="'transform: rotate(' + 180 / 50 * (compassAngleInputValue - 50) + 'deg)'"></div>
      </div>
      <div>方向：{{ compassText }}</div>
      <div>调整指针，指向户型图正北方向</div>
      <input type="range" v-model="compassAngleInputValue" @change="$emit('update:compassAngle', compass)" />
    </div>
    <Field v-model="area" :formatter="(val: string) => (Number(val) || '').toString()" type="number" label="房屋面积" placeholder="请输入房屋面积" @change="$emit('update:area', Number(($event.target as HTMLInputElement).value) || 0)" />
  </div>
</template>

<script setup lang="ts">
import { Uploader, Field } from 'vant';
import { ref, watch, defineProps, defineEmits } from 'vue';
import type { UploaderFileListItem } from 'vant'
const props = defineProps<{
  area: number
  floorPlanPath: string
  compassAngle: number
}>()
const emit = defineEmits([
  'update:area',
  'update:floorPlanPath',
  'update:compassAngle'
])

function onFloorPlanUpload(item: any) {
  emit('update:floorPlanPath', window.URL.createObjectURL((item as UploaderFileListItem).file as File))
}

// 指针角度
const compassAngleInputValue = ref(50)
const compass = ref(0)
const compassText = ref('0° 正北')
watch(compassAngleInputValue, function(e) {
  compass.value = Math.floor(360 / 100 * ((e * 1 + 50) % 100));
  let text;
  if (compass.value == 0) text = '正北'
  else if (compass.value < 90) text = '东北'
  else if (compass.value == 90) text = '正东'
  else if (compass.value < 180) text = '东南'
  else if (compass.value == 180) text = '正南'
  else if (compass.value < 270) text = '西南'
  else if (compass.value == 270) text = '正西'
  else if (compass.value < 360) text = '西北'
  compassText.value = compass.value + '° ' + text
})

// 户型图
const fileList = ref<UploaderFileListItem[]>([])
watch(() => props.floorPlanPath, (newValue) => {
  console.log(newValue)
  if (newValue == '') {
    fileList.value = []
  } else {
    fileList.value = [{
      url: newValue,
      isImage: true
    }]
  }
})

// 房屋面积
const area = ref<number | null>();

</script>
<style scoped lang="less">
  .floor-plan-container {
    div {
      margin: 0 auto;
      width: 250px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .uploader {
        width: 100%;
        height: 100%;
        &:deep(.van-uploader__preview) {
          margin: 0;
          .van-uploader__preview-image {
            width: auto;
            height: auto;
          }
        }
      }
      .compass {
        @size: 50px;
        width: @size;
        height: @size;
        // background-color: #fff;
        // border: 2px solid #333;
        // border-radius: 50%;
        position: absolute;
        right: 10px;
        bottom: 10px;
        &::before {
          content: '';
          border: (@size / 7) solid transparent;
          border-bottom: (@size / 2 - 5) solid red;
          border-top: 0;
          position: absolute;
          bottom: 50%;
        }
        &::after {
          content: '';
          border: (@size / 7) solid transparent;
          border-top: (@size / 2 - 5) solid blue;
          border-bottom: 0;
          position: absolute;
          top: 50%;
        }
      }
    }
    input {
      width: 100%;
    }
  }
</style>