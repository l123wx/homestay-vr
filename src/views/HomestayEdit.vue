<template>
  <div>
    <NavBar class="nav-bar" bgColor="#fff">房源信息编辑</NavBar>
    <div class="title">房源信息</div>
    <CellGroup>
      <Field label="房间名称" placeholder="请输入房间名称" />
      <Cell
        title-class="van-field__label"
        title="建筑类型"
        center
        :value="buildingTypeValue || '请选择建筑类型'"
        @click="showBuildingTypePickerPopup = true"></Cell>
      <Popup v-model:show="showBuildingTypePickerPopup" round position="bottom">
        <Picker
          title="建筑类型"
          :columns="buildingTypeColumns"
          @confirm="onBuildingTypePickerConfirm"
          @cancel="showBuildingTypePickerPopup = false"
        />
      </Popup>
      <Cell
        title-class="van-field__label"
        title="房源类型"
        center
        :value="houseTypeValue || '请选择房源类型'"
        @click="showHouseTypePickerPopup = true"></Cell>
      <Popup v-model:show="showHouseTypePickerPopup" round position="bottom">
        <Picker
          title="房源类型"
          :columns="houseTypeColumns"
          @confirm="onHouseTypePickerConfirm"
          @cancel="showHouseTypePickerPopup = false"
        />
      </Popup>
      <Field label="房源价格" placeholder="请输入房源价格" v-model="price">
        <template #right-icon>
          元 / 晚
        </template>
      </Field>
    </CellGroup>

    <div class="title">房客信息</div>
    <CellGroup>
      <Field label="房客人数" placeholder="请输入房客人数" v-model="roomerInfo.peopleNumber" />
      <Field label="卧室数量" placeholder="请输入卧室数量" v-model="roomerInfo.roomNumber" />
      <Field label="床位数量" placeholder="请输入床位数量" v-model="roomerInfo.bedNumber" />
    </CellGroup>

    <div class="title">房源位置</div>
    <CellGroup>
      <Cell
        title-class="van-field__label"
        title="房源地区"
        center
        :value="addressCascaderText || '请选择房源地区'"
        @click="showCascaderPopup = true"></Cell>
      <Popup v-model:show="showCascaderPopup" round position="bottom">
        <Cascader
          v-model="addressCascaderValue"
          title="请选择所在地区"
          :options="addressCascaderOptions"
          @close="showCascaderPopup = false"
          @finish="onCascaderFinish"
        />
      </Popup>
      <Field v-model="addressDetail" label="详细位置" placeholder="请输入详细位置" />
    </CellGroup>

    <div class="title">房源封面</div>
    <CellGroup>
      <Cell title-class="van-field__label" class="uploader" title="房源封面图" center>
        <Uploader v-model="homestayCoverImg" max-count="1" result-type="file" />
      </Cell>
    </CellGroup>

    <div class="title">全景配置</div>
    <CellGroup>
      <Cell class="button" title="全景图编辑" center>
        <Button type="success" size="mini" style="padding: 0 20px" @click="toPanoramaAdmin">编辑</Button>
      </Cell>
    </CellGroup>

    <div class="title">配套资源</div>
    <CellGroup>
      <Field label="卫生间数量" placeholder="请输入卫生间数量" v-model="toiletNumber" />
      <Cell
        title-class="van-field__label"
        title="卫生间类型"
        center
        value="请选择卫生间类型"
        @click="showToiletTypePickerPopup = true"></Cell>
      <Popup v-model:show="showToiletTypePickerPopup" round position="bottom">
        <Picker
          title="卫生间类型"
          :columns="toiletTypeColumns"
          @confirm="onToiletTypePickerConfirm"
          @cancel="showToiletTypePickerPopup = false"
        />
      </Popup>
      <Cell
        class="checkbox"
        v-for="(item, index) in servicesList"
        :key="index"
        :title="item.title" :label="item?.desc"
        center>
        <Checkbox v-model="item.checked" checked-color="#4cd964"></Checkbox>
      </Cell>
    </CellGroup>

    <div class="bottom">
      <Button type="success" size="large">保存</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import NavBar from '@/components/NavBar.vue'
  import { Cell, CellGroup, Field, Checkbox, Button, Popup, Cascader, Picker, Uploader } from 'vant';
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router'
  import { cityData, CityItem } from '@/assets/javascript/city'
  const router = useRouter();

  // 建筑类型
  const showBuildingTypePickerPopup = ref(false)
  const buildingTypeValue = ref('')
  const buildingTypeColumns = [
    '城市民宿',
    '酒店房源',
    '乡村民宿',
    '特色房源'
  ]
  function onBuildingTypePickerConfirm(value: string) {
    buildingTypeValue.value = value
    showBuildingTypePickerPopup.value = false
    console.log(arguments)
  }

  // 房源类型
  const showHouseTypePickerPopup = ref(false)
  const houseTypeValue = ref('')
  const houseTypeColumns = [
    '住宅',
    '公寓',
    '复试Loft',
    '别墅'
  ]
  function onHouseTypePickerConfirm(value: string) {
    houseTypeValue.value = value
    showHouseTypePickerPopup.value = false
    console.log(arguments)
  }

  // 价格
  const price = ref('')

  // 房客信息
  const roomerInfo = reactive({
    peopleNumber: '',
    roomNumber: '',
    bedNumber: ''
  })

  // 房源位置
  // 地区选择
  const showCascaderPopup = ref(false)
  const addressCascaderOptions = cityData
  const addressCascaderValue = ref('')
  const addressCascaderText = ref('')
  function onCascaderFinish({ selectedOptions }: any) {
    addressCascaderText.value = selectedOptions.reduce((pre: string, item: CityItem, index: number) => pre + (index == 0 ? '' : '/') + item.text, '')
    showCascaderPopup.value = false
  }
  // 详细位置
  const addressDetail = ref('')

  // 房源封面
  const homestayCoverImg = ref([])

  // 全景配置
  function toPanoramaAdmin() {
    router.push({
      name: 'panoramaAdmin',
      params: {}
    })
  }

  // 配套资源
  const servicesList = reactive([
    {
      title: '生活必需品',
      desc: '床单、枕头、被子、毛巾',
      checked: false
    }, {
      title: '无线网络',
      desc: '遍布房源',
      checked: false
    }, {
      title: '厨房',
      desc: '可以做饭',
      checked: false
    }, {
      title: '免费停车位',
      checked: false
    }, {
      title: '电视',
      checked: false
    }, {
      title: '热水器',
      checked: false
    }, {
      title: '空调',
      checked: false
    }, {
      title: '暖气',
      checked: false
    }, {
      title: '洗衣机',
      checked: false
    }, {
      title: '吹风机',
      checked: false
    }, {
      title: '早餐',
      desc: '提供早餐',
      checked: false
    }
  ])
  const toiletNumber = ref('')
  const showToiletTypePickerPopup = ref(false)
  const toiletTypeValue = ref('')
  const toiletTypeColumns = [
    '独立卫生间',
    '公共卫生间'
  ]
  function onToiletTypePickerConfirm(value: string) {
    toiletTypeValue.value = value
    showToiletTypePickerPopup.value = false
  }
</script>
<style scoped lang="less">
  .nav-bar {
    position: sticky;
    top: 0;
    z-index: 5;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: var(--van-cell-horizontal-padding);
  }
  .van-cell:deep(.van-cell__value) {
    text-align: left
  }
  .checkbox:deep(.van-cell__value) {
    flex: unset;
  }
  .button:deep(.van-cell__value) {
    flex: unset;
  }
  .uploader:deep(.van-cell__value) {
    flex: unset;
  }
  .bottom {
    padding: var(--van-cell-horizontal-padding);
  }
</style>