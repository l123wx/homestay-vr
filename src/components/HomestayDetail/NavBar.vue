<template>
  <NavBar class="nav-bar" bgColor="transparent" centerTextAlign="right">
    <template v-slot:left>
      <Icon name="cross" />
    </template>
    <template v-slot:default>
      <Icon name="share-o" />
    </template>
    <template v-slot:right>
      <Icon name="like-o" />
    </template>
  </NavBar>
</template>

<script setup lang="ts">
  import NavBar from '@/components/NavBar.vue'
  import { Icon } from 'vant'
</script>
<style scoped lang="less">
  .nav-bar {
    position: fixed;
    top: 0;
    z-index: 5;
    width: 100%;
    i {
      background-color: #ffffff;
      border-radius: 50%;
      padding: 8px;
      .shadow();
    }
  }
</style>