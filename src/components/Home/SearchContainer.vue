<template>
  <div class="container">
    <div class="cell">
      <AddressInput />
    </div>
  </div>
</template>

<script setup lang="ts">
  import AddressInput from "./AddressInput.vue";
</script>
<style scoped lang="less">
  .container {
    .shadow();
    border-radius: 15px;
    width: 100%;
    padding: 22px;
    .border-box();
    .cell {
      padding: 14px 0;
    }
  }
</style>