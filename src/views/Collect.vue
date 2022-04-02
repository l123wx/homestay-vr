<template>
  <Tabs class="tabs" v-model:active="tabActiveIndex" shrink color="#5856d6">
    <Tab title="收藏" title-style="padding: 0 14px">
      <RoomItem
        v-for="(item, index) in collectRoomList"
        :option="{
          isCollect: item.isCollect == 1,
          coverImgPath: item.bannerPath,
          homestayName: item.homestayName,
          price: item.price,
          peopleNumber: item.roomerInfo.peopleNumber,
          roomNumber: item.roomerInfo.roomNumber,
          bedNumber: item.roomerInfo.bedNumber,
          buildingType: item.buildingType,
          houseType: item.houseType,
          toiletNumber: item.toilet.number
        }"
        :key="index"
        class="room-item" />
    </Tab>
    <Tab title="历史足迹" title-style="padding: 0 14px">
      <RoomItem
        v-for="(item, index) in historyRoomList"
        :option="{
          isCollect: item.isCollect == 1,
          coverImgPath: item.bannerPath,
          homestayName: item.homestayName,
          price: item.price,
          peopleNumber: item.roomerInfo.peopleNumber,
          roomNumber: item.roomerInfo.roomNumber,
          bedNumber: item.roomerInfo.bedNumber,
          buildingType: item.buildingType,
          houseType: item.houseType,
          toiletNumber: item.toilet.number
        }"
        :key="index"
        class="room-item" />
    </Tab>
  </Tabs>
</template>

<script setup lang="ts">
  import { Tab, Tabs } from 'vant'
  import { inject, Ref, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import RoomItem from '@/components/HomestayList/RoomItem.vue'
  import type { HomestayData, SortType } from '@/types/homestay'
  const route = useRoute()
  const tabActiveIndex = ref(Number(route.params.active))
  const { showLoading, hideLoading }: any = inject('loadingOperation')

  const collectRoomList = ref<Array<HomestayData>>([])
  function getCollectRoomList() {
    getCollectRequest().then((res: any) => {
      collectRoomList.value = res.data
    })
  }
  getCollectRoomList()
  function getCollectRequest() {
    return new Promise((resolve, reject) => {
      showLoading()
      setTimeout(() => {
        hideLoading()
        resolve({
          data: [
            {
              bannerPath: require('@/assets/images/homestay-banner.png'),
              isCollect: 1,
              buildingType: '城市民宿',
              houseType: '住宅',
              homestayName: '有家民宿',
              price: '100',
              roomerInfo: {
                peopleNumber: '1',
                roomNumber: '1',
                bedNumber: '1'
              },
              address: {
                text: '广东省/韶关市/新丰县',
                value: '440233',
                detail: 'xx街道xx号'
              },
              toilet: {
                number: '1',
                type: '独立卫生间'
              },
            }
          ]
        })
      }, 500)
    })
  }

  const historyRoomList = ref<Array<HomestayData>>([])
  function getHistoryRoomList() {
    getHistoryRequest().then((res: any) => {
      historyRoomList.value = res.data
    })
  }
  getHistoryRoomList()
  function getHistoryRequest() {
    return new Promise((resolve, reject) => {
      showLoading()
      setTimeout(() => {
        hideLoading()
        resolve({
          data: [
            {
              bannerPath: require('@/assets/images/homestay-banner.png'),
              isCollect: 1,
              buildingType: '城市民宿',
              houseType: '住宅',
              homestayName: '有家民宿',
              price: '100',
              roomerInfo: {
                peopleNumber: '1',
                roomNumber: '1',
                bedNumber: '1'
              },
              address: {
                text: '广东省/韶关市/新丰县',
                value: '440233',
                detail: 'xx街道xx号'
              },
              toilet: {
                number: '1',
                type: '独立卫生间'
              }
            }, {
              bannerPath: require('@/assets/images/homestay-banner-1.jpg'),
              isCollect: 0,
              buildingType: '城市民宿',
              houseType: '住宅',
              homestayName: '另一家民宿',
              price: '120',
              roomerInfo: {
                peopleNumber: '1',
                roomNumber: '1',
                bedNumber: '1'
              },
              address: {
                text: '广东省/韶关市/新丰县',
                value: '440233',
                detail: 'xx街道xx号'
              },
              toilet: {
                number: '1',
                type: '独立卫生间'
              }
            }
          ]
        })
      }, 500)
    })
  }

</script>
<style scoped lang="less">
  img {
    width: 100%;
  }
  .tabs:deep(.van-tabs__wrap) {
    position: sticky;
    top: 0;
    z-index: 5;
  }
  .room-item {
    padding: 10px 22px;
  }
</style>