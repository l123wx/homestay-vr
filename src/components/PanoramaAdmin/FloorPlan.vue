<template>
  <div>
    <div class="floor-plan-container">
      <div>
        <Uploader class="uploader" v-model="fileList" :max-count="1" />
        <div
          class="compass"
          src="@/assets/images/compass.png"
          :style="'transform: rotate(' + 180 / 50 * (inputValue - 50) + 'deg)'"></div>
      </div>
      <div>方向：{{ compassText }}</div>
      <div>调整指针，指向户型图正北方向</div>
      <input type="range" v-model="inputValue" />
    </div>
    <Field label="房屋面积" placeholder="请输入房屋面积" v-model="area" />
  </div>
</template>

<script setup lang="ts">
import { Uploader, Field, Notify } from 'vant';
import { ref, watch, defineExpose, readonly, reactive } from 'vue';
import type { UploaderFileListItem } from 'vant'

const inputValue = ref(50)
const fileList = ref<UploaderFileListItem[]>()
const compass = ref(0)
const compassText = ref('0° 正北')
const area = ref();

watch(inputValue, function(e) {
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

function getData(){
  // if (!(area.value && fileList.value[0].content && compass.value)) return 1
  if (!(fileList.value && fileList.value[0]?.file)) {
    Notify('请上传户型图！')
    return false;
  } else if (!area.value) {
    Notify('请输入房屋面积')
    return false;
  }
  return {
    area: area.value,
    floorPlanPath: fileList.value[0].file,
    compass: compass.value
  }
}

defineExpose({
  getData
});
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
        &:deep .van-uploader__preview {
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