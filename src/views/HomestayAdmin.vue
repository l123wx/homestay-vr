<template>
  <div class="homestay-list">
    <div class="title">已发布</div>
    <ul>
      <li @click="editHomestayInfo">
        <img src="@/assets/images/homestay-banner.png" alt="">
        <div class="name">有间民宿</div>
      </li>
    </ul>
  </div>
  <div class="add-button" @click="editHomestayInfo">
    <Icon name="plus"></Icon>
    添加新房源
  </div>
</template>

<script setup lang="ts">
  import { Icon } from 'vant'
  import { useRouter } from 'vue-router'
  const router = useRouter();

  function editHomestayInfo() {
    router.push({
      name: 'homestayEdit',
      params: {
        state: 'add'
      }
    })
  }
</script>
<style scoped lang="less">
  .homestay-list {
    padding: 0 22px;
    .title {
      font-size: 18px;
      font-weight: bold;
      margin-top: 30px;
    }
    ul {
      margin-top: 16px;
      li {
        .shadow();
        display: flex;
        width: 100%;
        padding: 14px 20px;
        border-radius: 5px;
        box-sizing: border-box;
        img {
          height: 70px;
          width: 120px;
        }
        .name {
          margin-left: 20px;
        }
      }
    }
  }
  .add-button {
    .shadow();
    border-radius: 5px;
    margin: 30px 20px 0;
    padding: 15px 20px;
  }
</style>