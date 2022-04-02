<template>
  <div class="homestay-list-container">
    <div class="nav">
      <NavBar>
        <template v-slot:default>
          <div class="search-bar-container">
            <AddressInput
              kerleyColor="#ffffff"
              :keyword="keyword"
              :address-value="addressValue"
              :address-text="addressText"
              @address-edit-finished="onAddressEditingFinished"/>
          </div>
        </template>
      </NavBar>
      <SortBar @peopleNumChange="onPeopleNumChange" @sortTypeChange="onSortTypeChange" />
    </div>
    <div class="list-container">
      <RoomList :sort-type="sortType" :people-number="peopleNumber" :keyword="keyword" :address-value="addressValue" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import NavBar from "@/components/NavBar.vue"
  import AddressInput from '@/components/Home/AddressInput.vue';
  import SortBar from "@/components/HomestayList/SortBar.vue"
  import RoomList from "@/components/HomestayList/RoomList.vue"
  import { onMounted, ref } from "vue";
  import { useRoute } from 'vue-router'
  import type { SortType } from '@/types/homestay'
  const route = useRoute()
  console.log(route.params)

  const keyword = ref(''),
    addressValue = ref(''),
    addressText = ref('')
    
  onMounted(function() {
    setAddressBarData(route.params)
  })

  function setAddressBarData(obj: {
    keyword?: string
    addressValue?: string
    addressText?: string
  }) {
    keyword.value = obj.keyword || ''
    addressValue.value = obj.addressValue || ''
    addressText.value = obj.addressText || ''
  }

  function onAddressEditingFinished(obj: any) {
    setAddressBarData(obj)
  }

  const peopleNumber = ref(1)
  function onPeopleNumChange(value: number) {
    peopleNumber.value = value
  }

  const sortType = ref<SortType>(0)
  function onSortTypeChange(value: SortType) {
    sortType.value = value
  }

</script>
<style scoped lang="less">
  .homestay-list-container {
    display: flex;
    flex-direction: column;
    height: @viewport-height;
    .nav {
      border-bottom: 1px solid @color-light-gray-3;
      .search-bar-container {
        background-color: @color-light-gray-1;
        padding: 4px 10px;
        border-radius: 5px;
      }
    }
    .list-container {
      overflow-y: auto;
      flex: 1;
    }
  }
</style>