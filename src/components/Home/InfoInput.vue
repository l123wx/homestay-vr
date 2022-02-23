<template>
  <div class="info-container">
    <div class="time">
      <span class="begin">2月19日</span>
      <span class="end">2月20日</span>
      <span class="amount">共一晚</span>
    </div>
    <div class="people">房客人数</div>
  </div>
</template>

<script setup lang="ts">

</script>
<style scoped lang="less">
.info-container {
  display: flex;
  .time {
    flex: 1;
    .font(@fontWeight: bold; @textAlign: left);
    .end::before {
      content: '-';
      display: inline-block;
      margin: 0 5px;
    }
    .amount {
      .font(@fontSize: 12px);
      margin-left: 5px;
    }
  }
  .people {
    padding-left: 10px;
    position: relative;
    &::before {
      .kerley(120%);
    }
  }
}
</style>