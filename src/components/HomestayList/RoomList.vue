<template>
  <PullRefresh class="list" v-model="loading" @refresh="onRefresh">
    <div class="amount">{{ roomList?.length || 0 }}个房源结果</div>
    <RoomItem
      class="room-item"
      v-for="(item, index) in roomList"
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
      :key="index" />
  </PullRefresh>
</template>

<script setup lang="ts">
  import { PullRefresh, Toast } from 'vant'
  import type { HomestayData, SortType } from '@/types/homestay'
  import { ref, withDefaults, defineProps, watch, inject, Ref } from 'vue'
  import { getPlaceholderImg } from '@/utils/index';
  import RoomItem from '@/components/HomestayList/RoomItem.vue'

  const { showLoading, hideLoading }: any = inject('loadingOperation')

  const props = withDefaults(defineProps<{
    peopleNumber?: number
    addressValue?: string
    keyword?: string
    sortType?: SortType
  }>(), {
    peopleNumber: 1,
    addressValue: '0',
    keyword: '',
    sortType: 0
  })

  const loading = ref(false);
  const onRefresh = () => {
    setTimeout(() => {
      Toast('刷新成功');
      loading.value = false;
    }, 1000);
  };

  const roomList = ref<Array<HomestayData>>([])
  interface getRoomListOptions {
    peopleNumber?: number
    addressValue?: string
    keyword?: string
  }
  function getRoomList() {
    getRoomListRequest(props).then((res: any) => {
      roomList.value = res.data
      roomListSort(props.sortType)
    })
  }
  getRoomList()
  function getRoomListRequest({
    peopleNumber,
    addressValue,
    keyword
  }: getRoomListOptions) {
    return new Promise((resolve, reject) => {
      showLoading()
      setTimeout(() => {
        hideLoading()
        resolve({
          data: [
            {
              bannerPath: require('@/assets/images/homestay-banner.png'),
              isCollect: 0,
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
              servicesList: [],
              landlordInfo: {
                avatarPath: getPlaceholderImg(50, 50),
                name: '陈先生',
                phone: ''
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
              },
              servicesList: [],
              landlordInfo: {
                avatarPath: getPlaceholderImg(50, 50),
                name: '陈先生',
                phone: ''
              }
            }
          ]
        })
      }, 500)
    })
  }
  function roomListSort(type: SortType) {
    roomList.value.sort((a, b) => {
      switch(type) {
        case 0: return Number(b.price) - Number(a.price);
        case 1: return Number(a.price) - Number(b.price);
      }
    })
  }

  watch(() => props.sortType, (nValue) => {
    console.log(nValue)
    roomListSort(nValue)
  })

  watch([() => props.peopleNumber, () => props.addressValue, () => props.keyword], function() {
    console.log(arguments)
    getRoomList()
  })

</script>
<style scoped lang="less">
  .list {
    padding: 0 22px;
    min-height: 100%;
    .amount {
      padding: 15px 0;
      .font(@fontSize: 18px; @fontWeight: bold; @textAlign: left);
    }
    .room-item {
      margin-bottom: 22px;
    }
  }
</style>