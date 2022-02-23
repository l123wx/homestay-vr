<template>
  <div class="search-bar-container">
    <AddressInput class="address-input" :showLocationBtn="false" kerleyColor="#ffffff"/>
    <div class="time">
      <div class="begin">02/19</div>
      <div class="end">02/12</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import AddressInput from '../Home/AddressInput.vue';
</script>
<style scoped lang="less">
  .search-bar-container {
    background-color: @color-light-gray-1;
    padding: 4px 10px;
    border-radius: 5px;
    display: flex;
    .address-input {
      flex: 1;
    }
    .time {
      width: 56px;
      font-size: 12px;
      .begin::after {
        content: '入住';
      }
      .end {
        margin-top: -2px;
        &::after {
          content: '退房';
        }
      }
    }
  }
</style>