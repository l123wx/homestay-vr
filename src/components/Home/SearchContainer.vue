<template>
  <div class="container">
    <div class="cell">
      <AddressInput :showSearchWordInputEmptyBtn="true"/>
    </div>
    <div class="cell">
      <InfoInput />
    </div>
    <div class="cell">
      <KeywordList />
    </div>
    <Button size="large" color="#5856d6" @click="SearchHomestay">搜索房源</Button>
  </div>
</template>

<script setup lang="ts">
  import InfoInput from "./InfoInput.vue"
  import AddressInput from "./AddressInput.vue"
  import KeywordList from "./KeywordList.vue" 
  import { Button } from "vant"
  import router from "@/router/index"
  function SearchHomestay(): void {
    router.push('/homestayList')
  }
</script>
<style scoped lang="less">
  .container {
    background-color: #fff;
    display: inline-block;
    .shadow();
    border-radius: 15px;
    padding: 22px;
    .border-box();
    .cell {
      padding: 14px 0;
      & + .cell {
        border-top: 1px solid @color-light-gray-2;
      }
    }
  }
</style>