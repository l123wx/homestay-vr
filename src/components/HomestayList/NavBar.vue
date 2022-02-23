<template>
  <NavBar>
    <template v-slot:default>
      <SearchBar />
    </template>
    <template v-slot:right>
      <Icon name="map-marked"></Icon>
      <span>地图</span>
    </template>
  </NavBar>
</template>

<script setup lang="ts">
  import { Icon } from "vant"
  import NavBar from "../NavBar.vue"
  import SearchBar from "./SearchBar.vue"
</script>
<style scoped lang="less">
  span {
    width: 24px;
    font-size: 12px;
    display: block;
    margin-top: -4px;
  }
</style>