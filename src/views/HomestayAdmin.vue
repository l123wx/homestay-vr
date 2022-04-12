<template>
  <div class="homestay-list">
    <div class="title">房源</div>
    <ul v-if="homestayList.length !== 0">
      <li v-for="item in homestayList" :key="item.id" @click="editHomestay(item.id)">
        <img :src="item.coverImgPath" />
        <div class="name">{{ item.name }}</div>
      </li>
    </ul>
    <Empty v-else description="还没有自己的房源"></Empty>
  </div>
  <div class="add-button" @click="addHomestay">
    <Icon name="plus"></Icon>
    添加新房源
  </div>
</template>

<script setup lang="ts">
  import { Icon, Empty } from 'vant'
  import { inject, ref } from 'vue';
  import { useRouter } from 'vue-router'
  const router = useRouter();
  const { showLoading, hideLoading }: any = inject('loadingOperation')
  
  interface HomestayItem {
    id: number
    name: string
    coverImgPath: string
    status: 0 | 1 // 0:审核中 1:已发布
  }
  const homestayList = ref<Array<HomestayItem>>([])
  function getHomestayList() {
    showLoading()
    getHomestayListRequest().then((res: any) => {
      homestayList.value = res.data
      hideLoading()
    })
  }
  getHomestayList()
  function getHomestayListRequest() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              name: '有间民宿',
              coverImgPath: require('@/assets/images/homestay-banner.png'),
              id: 1,
              status: 0
            }
          ]
        })
      }, 1000)
    })
  }

  function editHomestay(id: number) {
    router.push({
      name: 'homestayEdit',
      params: {
        state: 'add',
        id
      }
    })
  }
  function addHomestay() {
    router.push({
      name: 'homestayEdit',
      params: {
        state: 'edit'
      }
    })
  }
</script>
<style scoped lang="less">
  .homestay-list {
    padding: 0 22px;
    .title {
      font-size: 18px;
      font-weight: bold;
      margin-top: 30px;
    }
    ul {
      margin-top: 16px;
      li {
        .shadow();
        display: flex;
        width: 100%;
        padding: 14px 20px;
        border-radius: 5px;
        box-sizing: border-box;
        img {
          height: 70px;
          width: 120px;
        }
        .name {
          margin-left: 20px;
        }
      }
    }
  }
  .add-button {
    .shadow();
    border-radius: 5px;
    margin: 30px 20px 0;
    padding: 15px 20px;
  }
</style>