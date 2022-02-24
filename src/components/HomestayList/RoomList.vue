<template>
  <PullRefresh class="list" v-model="loading" @refresh="onRefresh">
    <div class="amount">{{ 200 }}个房源结果</div>
    <RoomItem v-for="item in 10" :key="item" class="room-item"/>
  </PullRefresh>
</template>

<script setup lang="ts">
  import { PullRefresh, Toast } from 'vant'
  import { ref } from 'vue'
  import RoomItem from '@/components/HomestayList/RoomItem.vue'

  const loading = ref(false);
  const onRefresh = () => {
    setTimeout(() => {
      Toast('刷新成功');
      loading.value = false;
    }, 1000);
  };
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