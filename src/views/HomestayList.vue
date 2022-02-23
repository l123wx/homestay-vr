<template>
  <div class="nav">
    <NavBar />
    <SortBar />
  </div>
</template>

<script setup lang="ts">
  import NavBar from "@/components/HomestayList/NavBar.vue";
  import SortBar from "@/components/HomestayList/SortBar.vue";
</script>
<style scoped lang="less">
  .nav {
    border-bottom: 1px solid @color-light-gray-3;
  }
</style>