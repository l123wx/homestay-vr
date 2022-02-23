<template>
  <div class="keyword-container">
    <ul>
      <li class="item">景点1</li>
      <li class="item">景点景点景点2</li>
      <li class="item">景点景点2</li>
      <li class="item">景点景点2</li>
      <li class="item">景点景点2</li>
      <li class="item">景点景点2</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  
</script>
<style scoped lang="less">
  .keyword-container {
    overflow-x: auto;
    ul {
      display: flex;
      .item {
        display: inline-block;
        flex-shrink: 0;
        .font(#ffffff; 12px; normal; inherit; center);
        background-color: @color-medium-gray;
        border-radius: 5px;
        padding: 5px 10px;
        & + .item {
          margin-left: 10px;
        }
      }
    } 
  }
</style>