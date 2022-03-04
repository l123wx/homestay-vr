<template>
  <NavBar>{{ pageState == 'add' ? '添加' : '编辑'}}全景图</NavBar>
  <div v-show="!PanoramaEditing">
    <CellGroup>
      <Field label="文本" placeholder="请输入用户名" />
      <Cell title-class="van-field__label" title="全景图" center>
        <div class="align-left">
          <Uploader
            class="uploader"
            :after-read="afterRead"
            v-model="imgList"
            :max-count="1" />
        </div>
      </Cell>
      <Cell title-class="van-field__label" title="全景图配置" center>
        <Button type="success" size="mini" style="padding: 0 20px">编辑</Button>
      </Cell>
      <Cell title-class="van-field__label" title="全景图关联" center>
        <Button type="success" size="mini" style="padding: 0 20px">编辑</Button>
      </Cell>
    </CellGroup>
    <Button size="large" type="success">{{ pageState == 'add' ? '添加' : '保存'}}</Button>
  </div>
  <div class="panorama-view" ref="panoramaView">
    <div class="map">
      <div class="location_point" :style="'transform:rotate(' + angle + 'deg)'"></div>
      <img src="@/assets/images/floorPlan-text.png" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { Cell, CellGroup, Field, Uploader, Button } from 'vant';
import { onBeforeUnmount, onMounted, Ref, ref } from 'vue';
import { Panorama, PanoramaItem } from '@/assets/javascript/panorama/Panorama'

let pageState: 'add' | 'update' = 'add';
let PanoramaEditing = true;

const imgList = ref([{
  url: 'https://img.yzcdn.cn/vant/leaf.jpg'
}]);

function afterRead() {
  console.log(arguments)
}

const panoramaView = ref(),
  angle = ref(0);
let panorama: Panorama;
const panoramaList: Array<PanoramaItem> = [
  {
    name: '',
    path: require('@/assets/images/outside.jpg'),
    fov: 75,
    deviationAngle: 0
  }
]

onMounted(function() {
  panorama = new Panorama(panoramaView.value)
  panorama.setPanorama(panoramaList[0]);
  // console.log(panoramaView.value.angle)
  // angle = panoramaView.value?.angle;
  animate();
})

let animate: any = function() {
  if (!animate) return
  requestAnimationFrame(animate);
  angle.value = panorama.getCameraRotationYAngle();
}

onBeforeUnmount(function() {
  animate = null;
})
</script>
<style scoped lang="less">
  .align-left {
    text-align: left
  }
  .uploader:deep .van-uploader__preview-image {
    width: auto;
  }
  .panorama-view {
    height: calc(100% - 50px);
    position: relative;
    .map {
      width: 15em;
      height: 15em;
      position: absolute;
      right: 1em;
      top: 1em;
      opacity: 0.5;
      font-size: 10px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.5);
      &.active {
        .absolute-center(true, false);
        font-size: 5.7vw;
        opacity: 1;
        top: 20px;
        outline: 100vh solid rgba(0, 0, 0, 0.5);
      }
      img {
        max-height: 100%;
        max-width: 100%;
      }
      .location_point {
        .absolute-center();
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
    }
  }
</style>