<template>
  <NavBar>
    <template v-slot:left>
      <Icon name="arrow-left" size="22px" @click="onNavBackBtnClick" />
    </template>
    {{ pageState == 'add' ? '添加' : '编辑'}}全景图
    <template v-slot:right>
      <Icon v-if="panoramaEditState == PanoramaEditState['editing']" name="success" size="22px" @click="onPanoramaEditSubmit" />
      <Icon v-if="panoramaEditState == PanoramaEditState['connecting']" name="success" size="22px" @click="onPanoramaConnectSubmit" />
    </template>
  </NavBar>
  <div v-show="panoramaEditState == PanoramaEditState['index']">
    <CellGroup>
      <Field label="房间名称" placeholder="请输入房间名称" v-model="panoramaInfo.name" />
      <Cell title-class="van-field__label" title="全景图" center>
        <div class="align-left">
          <Uploader
            class="uploader"
            :after-read="afterRead"
            v-model="imgList"
            @delete="onDeletePhoto"
            :max-count="1" />
        </div>
      </Cell>
      <Cell title-class="van-field__label" title="全景图配置" center>
        <Button type="success" size="mini" style="padding: 0 20px" @click="onPanoramaConfigEditBtnClick">编辑</Button>
      </Cell>
      <Cell title-class="van-field__label" title="全景图关联" center>
        <Button type="success" size="mini" style="padding: 0 20px" @click="panoramaEditState = PanoramaEditState['connecting']">编辑</Button>
      </Cell>
      <Cell center>
        <Button size="large" type="success" @click="onSubmitBtnClick">{{ pageState == 'add' ? '添加' : '保存'}}</Button>
      </Cell>
    </CellGroup>
  </div>
  <PanoramaView v-if="panoramaEditState == PanoramaEditState['editing']" :floor-plan-img="floorPlanImg" ref="panoramaView" :panorama-info="panoramaInfo" />
  <PanoramaConnect v-if="panoramaEditState == PanoramaEditState['connecting']" ref="panoramaConnecting" :panorama-info="panoramaInfo" />
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import PanoramaView from '@/components/PanoramaAdmin/PanoramaEdit/PanoramaView.vue'
import PanoramaConnect from '@/components/PanoramaAdmin/PanoramaEdit/PanoramaConnect.vue'
import { Cell, CellGroup, Field, Uploader, Button, Icon } from 'vant';
import type { UploaderFileListItem } from 'vant';
import { PanoramaItem } from "@/assets/javascript/panorama/Panorama";
import { computed, onMounted, readonly, ref, unref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Vuex from '@/store/index';
const router = useRouter(),
  route = useRoute();

let pageState = ref<'add' | 'update'>('add'), // 页面编辑类型，新建or编辑
  panroamaIndex: string;

enum PanoramaEditState {
  'index',
  'editing',
  'connecting'
}

const floorPlanImg = ref<string>(require('@/assets/images/floorPlan-text.png')), // 户型图
  panoramaEditing = ref(false), // 当前是否在全景编辑页面
  panoramaConnecting = ref(false),
  panoramaEditState = ref<PanoramaEditState>(0),

  panoramaView = ref(), // 全景组件dom
  imgList = ref<UploaderFileListItem[]>([]),
  panoramaInfo = ref<PanoramaItem>({
    name: '',
    path: '',
    fov: 60,
    cameraPosition: {
      x: 0, y: 0, z: 0
    },
    location: {
      x: 0, y: 0
    }
  });

const panoramaItem = computed(() => {
  return (Vuex.state as any).panorama.panoramaList[panroamaIndex]
})


onMounted(function() {
  if (route.params.state) {
    pageState.value = route.params.state as ('add' | 'update');
  }
  if (pageState.value == 'add') return;
  if (route.params.index) {
    panroamaIndex = route.params.index as string;
    panoramaInfo.value = readonly(panoramaItem.value);
    console.log(panoramaInfo.value)
    if (panoramaInfo.value.path == undefined) return;
    imgList.value.push({
      url: panoramaInfo.value.path
    })
  }
  // floorPlanImg.value = require('@/assets/images/floorPlan-text.png');
  // floorPlanImg.value = (Vuex.state as any).panorama.floorPlanPath;
})

function afterRead(e: any) {
  panoramaInfo.value.path = window.URL.createObjectURL(e.file)
}

function onNavBackBtnClick() {
  if (panoramaEditState.value == PanoramaEditState['index']) {
    backToPanoramaList();
  } else {
    panoramaEditState.value = PanoramaEditState['index'];
  }
}

function onDeletePhoto() {
  panoramaInfo.value.path = '';
}

function onPanoramaConfigEditBtnClick() {
  panoramaEditState.value = PanoramaEditState['editing'];
}

function onPanoramaEditSubmit() {
  const res = panoramaView.value;
  panoramaInfo.value = {
    ...panoramaInfo.value,
    fov: res.getFov(),
    cameraPosition: res.getRotations(),
    location: res.getLocation()
  }
  panoramaEditState.value = PanoramaEditState['index']
}

function onPanoramaConnectSubmit() {
  // const res = panoramaView.value;
  // panoramaInfo.value = {
  //   ...panoramaInfo.value,
  //   fov: res.getFov(),
  //   cameraPosition: res.getRotations(),
  //   location: res.getLocation()
  // }
  panoramaEditState.value = PanoramaEditState['index']
}

function backToPanoramaList() {
  router.back()
}

function onSubmitBtnClick() {
  if (pageState.value == 'add') {
    addPanorama();
  } else {
    updatePanorama();
  }
  router.back();
}

function addPanorama() {
  Vuex.commit('addPanorama', unref(panoramaInfo));
}

function updatePanorama() {
  Vuex.commit('updatePanorama', {
    index: panroamaIndex,
    panoramaItem: unref(panoramaInfo)
  });
}

</script>
<style scoped lang="less">
  .van-cell {
    padding: var(--van-cell-vertical-padding) 22px;
  }
  .align-left {
    text-align: left
  }
  .uploader:deep(.van-uploader__preview-image) {
    width: auto;
  }
</style>