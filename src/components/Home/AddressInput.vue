<template>
  <div class="address-container" @click="showCascaderPopup = true">
    <div class="city">
      {{ addressCascaderText || '未知地点' }}
      <Icon name="arrow-down"></Icon>
    </div>
    <div class="search-word" :style="keyword ? 'color:#000' : ''">
      {{ keyword || '景点/地址/房源名' }}
    </div>
  </div>
  <Popup v-model:show="showCascaderPopup" round position="bottom" closeable @closed="onPopupClose">
    <Field label="关键词" v-model="keyword" placeholder="景点/地址/房源名" style="margin-top:5px;padding-right:54px"></Field>
    <Cascader
      v-model="addressCascaderValue"
      title="请选择所在地区"
      :closeable="false"
      :options="addressCascaderOptions"
      @finish="onCascaderFinish"
    />
  </Popup>
</template>

<script setup lang="ts">
  import { Icon, Popup, Cascader, Field } from 'vant'
  import { defineProps, withDefaults, ref, watch, defineExpose, defineEmits } from 'vue';
  import { cityData } from '@/assets/javascript/city'

  interface Props {
    kerleyColor?: string //间隔线颜色
    keyword?: string
    addressValue?: string
    addressText?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    kerleyColor: '#c7c7cc',
    keyword: '',
    addressValue: '',
    addressText: ''
  })

  const keyword = ref('')
  watch(() => props.keyword, (value) => {
    console.log(value)
    keyword.value = value
  })

  watch(() => props.addressValue, (value) => {
    addressCascaderValue.value = value
  })
  watch(() => props.addressText, (value) => {
    addressCascaderText.value = value
  })
  const showCascaderPopup = ref(false)
  const addressCascaderOptions = cityData
  const addressCascaderValue = ref('')
  const addressCascaderText = ref('')
  function onCascaderFinish({ selectedOptions }: any) {
    addressCascaderText.value = selectedOptions[2].text
  }

  const emits = defineEmits(['AddressEditFinished'])

  function onPopupClose() {
    emits('AddressEditFinished', {
      keyword: keyword.value,
      addressValue: addressCascaderValue.value,
      addressText: addressCascaderText.value
    })
  }

  defineExpose({
    getData() {
      return {
        keyword: keyword.value,
        addressValue: addressCascaderValue.value,
        addressText: addressCascaderText.value
      }
    }
  })
</script>
<style scoped lang="less">
  .address-container {
    width: 100%;
    display: flex;
    align-items: center;
    @spacing: 10px;
    flex: 1;
    .city {
      font-weight: bold;
      padding-right: @spacing;
      i {
        font-size: 12px;
        margin-left: -5px;
      }
    }
    .search-word {
      color: @color-medium-gray;
      .font(@color: @color-medium-gray; @fontSize: 14px);
      padding: 0 @spacing;
      position: relative;
      flex: 1;
      &::before {
        .kerley(120%, v-bind('props.kerleyColor'));
      }
      i {
        font-size: 14px;
        color: @color-gray;
        .absolute-center(false, true);
        right: @spacing;
      }
    }
    .location-btn {
      padding-left: @spacing;
      position: relative;
      &::before {
        .kerley(120%, v-bind('props.kerleyColor'));
      }
      span {
        font-size: 12px;
        margin-left: 16px;
      }
      i {
        font-size: 14px;
        .absolute-center(false, true);
      }
    }
  }
</style>