<template>
  <NavBar class="nav-bar" bgColor="transparent">
    <template v-slot:left>
      <Icon name="cross" @click="router.back"/>
    </template>
    <template v-slot:default>
      <span></span>
    </template>
    <template v-slot:right>
      <Icon :name="prop.isCollect ? 'like' : 'like-o'" :style="prop.isCollect ? 'color:red' : ''" @click="onCollectBtnClick" />
    </template>
  </NavBar>
</template>

<script setup lang="ts">
  import NavBar from '@/components/NavBar.vue'
  import { Icon } from 'vant'
  import { withDefaults, defineProps, defineEmits } from 'vue'
  import router from '@/router/index'
  const prop = withDefaults(defineProps<{
    isCollect: boolean
  }>(), {
    isCollect: false
  })

  const emit = defineEmits(['collectBtnClick'])
  function onCollectBtnClick() {
    emit('collectBtnClick')
  }

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