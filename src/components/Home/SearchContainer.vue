<template>
  <div class="container">
    <div class="cell">
      <AddressInput ref="addressInput" :keyword="keyword" :addressValue="addressValue" />
    </div>
    <div class="cell">
      <KeywordList @keywordItemClick="onkeywordListClick" />
    </div>
    <Button size="large" color="#5856d6" @click="SearchHomestay">搜索房源</Button>
  </div>
</template>

<script setup lang="ts">
  import AddressInput from "./AddressInput.vue"
  import KeywordList from "./KeywordList.vue" 
  import { Button } from "vant"
  import router from "@/router/index"
  import { ref } from "vue"

  const keyword = ref('')
  const addressValue = ref('')

  const addressInput = ref()

  function onkeywordListClick(_keyword: string) {
    console.log(_keyword)
    keyword.value = _keyword
  }

  function SearchHomestay(): void {
    const { keyword, addressValue, addressText } = addressInput.value.getData()
    router.push({
      name: 'homestayList',
      params: {
        keyword,
        addressValue,
        addressText
      }
    })
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