<template>
  <div class="nav-bar">
    <div class="left">
      <span>
        <slot name="left">
          <Icon name="arrow-left"></Icon>
        </slot>
      </span>
    </div>
    <div class="center">
      <span>
        <slot>navbar标题</slot>
      </span>
    </div>
    <div class="right">
      <span>
        <slot name="right"></slot>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Icon } from "vant"
</script>
<style scoped lang="less">
  .nav-bar {
    @height: 50px;
    height: @height;
    background-color: #fff;
    display: flex;
    div {
      position: relative;
      span {
        .absolute-center();
        text-align: center;
      }
      &.center>span {
        width: 100%;
      }
    }
    .left, .right {
      width: @height;
      height: @height;
    }
    .center {
      flex: 1;
    }
  }
</style>