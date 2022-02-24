<template>
  <div class="homestay-list-container">
    <div class="nav">
      <NavBar />
      <SortBar />
    </div>
    <div class="list-container">
      <RoomList />
    </div>
  </div>
</template>

<script setup lang="ts">
  import NavBar from "@/components/HomestayList/NavBar.vue"
  import SortBar from "@/components/HomestayList/SortBar.vue"
  import RoomList from "@/components/HomestayList/RoomList.vue"
</script>
<style scoped lang="less">
  .homestay-list-container {
    display: flex;
    flex-direction: column;
    height: @viewport-height;
    .nav {
      border-bottom: 1px solid @color-light-gray-3;
    }
    .list-container {
      overflow-y: auto;
      flex: 1;
    }
  }
</style>