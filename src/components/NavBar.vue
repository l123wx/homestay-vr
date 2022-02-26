<template>
  <div class="nav-bar">
    <div class="left">
      <span>
        <slot name="left">
          <Icon name="arrow-left" size="20px"></Icon>
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
  import { withDefaults, defineProps } from "vue"
  interface Props {
    bgColor?: string
    centerTextAlign?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    bgColor: '#ffffff',
    centerTextAlign: 'center'
  })
</script>
<style scoped lang="less">
  @bgColor: v-bind('props.bgColor');
  @centerContentAlign: v-bind('props.centerTextAlign');
  .nav-bar {
    @height: 50px;
    height: @height;
    background-color: @bgColor;
    display: flex;
    div {
      position: relative;
      span {
        .absolute-center();
        text-align: center;
      }
      &.center>span {
        width: 100%;
        text-align: v-bind('props.centerTextAlign');
      }
    }
    .left, .right {
      width: @height;
      height: @height;
    }
    // @marginSpacing: 10px;
    // .left {
    //   margin-left: @marginSpacing;
    // }
    // .right {
    //   margin-right: @marginSpacing;
    // }
    .center {
      flex: 1;
    }
  }
</style>