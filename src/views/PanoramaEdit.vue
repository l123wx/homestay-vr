<template>
  <NavBar>添加全景图</NavBar>
  <CellGroup>
    <Field label="文本" placeholder="请输入用户名" />
    <Cell title-class="van-field__label" title="全景图" center>
      <div class="align-left">
        <Uploader
          class="uploader"
          :after-read="afterRead"
          v-model="imgList"
          :max-count="1" />
      </div>
    </Cell>
    <Cell title-class="van-field__label" title="全景图配置" center>
      <Button type="success" size="mini" style="padding: 0 20px">编辑</Button>
    </Cell>
    <Cell title-class="van-field__label" title="全景图关联" center>
      <Button type="success" size="mini" style="padding: 0 20px">编辑</Button>
    </Cell>
  </CellGroup>
</template>

<script setup lang="ts">
  import NavBar from '@/components/NavBar.vue'
  import { Cell, CellGroup, Field, Uploader, Button } from 'vant';
  import { ref } from 'vue';

  const imgList = ref([{
    url: 'https://img.yzcdn.cn/vant/leaf.jpg'
  }]);

  function afterRead() {
    console.log(arguments)
  }
</script>
<style scoped lang="less">
  .align-left {
    text-align: left
  }
  .uploader /deep/ .van-uploader__preview-image {
    width: auto;
  }
</style>