<template>
  <div class="user-info-container">
    <div>
      <div class="user-name">text</div>
      <div class="edit-info-btn" v-if="userType == 1">查看并编辑资料</div>
    </div>
    <div class="avatar">
      <img src="https://placekitten.com/100/100" />
    </div>
  </div>
  <div class="btn-list">
    <ul>
      <li
        v-for="(item, index) in userType == 0 ? roomerBtnList : landlordBtnList"
        :key="index"
        @click="item.fun">
        <Icon :name="item.icon"></Icon>
        <div>{{ item.text }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { Icon } from 'vant'
  import { computed, inject } from 'vue'
  import { gobalData } from '@/main'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const { showLoading, hideLoading }: any = inject('loadingOperation')
  const roomerBtnList = [
    {
      icon: 'friends-o',
      text: '切换到房东模式',
      fun() {
        showLoading()
        setTimeout(() => {
          gobalData.userType = 1;
          hideLoading()
        }, 1000)
      }
    }, {
      icon: 'eye-o',
      text: '查看浏览足迹',
      fun() {
        router.push({
          name: 'collect',
          params: {
            active: 1
          }
        })
      }
    }, {
      icon: 'like-o',
      text: '我的收藏',
      fun() {
        router.push({
          name: 'collect',
          params: {
            active: 0
          }
        })
      }
    }, {
      icon: 'revoke',
      text: '退出登录',
      fun: logOut
    }
  ]
  const landlordBtnList = [
    {
      icon: 'friends-o',
      text: '切换到房客模式',
      fun() {
        showLoading()
        setTimeout(() => {
          gobalData.userType = 0;
          hideLoading()
        }, 1000)
      }
    }, {
      icon: 'hotel-o',
      text: '添加新房源',
      fun() {
        router.push({
          name: 'homestayEdit'
        })
      }
    }, {
      icon: 'revoke',
      text: '退出登录',
      fun: logOut
    }
  ]

  function logOut() {
    showLoading()
    setTimeout(() => {
      router.push('login')
      hideLoading()
    }, 1000)
  }
  const userType = computed(() => {
    return gobalData.userType;
  })
</script>
<style scoped lang="less">
  .user-info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 22px;
    border-bottom: 10px solid @color-light-gray-2;
    div {
      .user-name {
        font-size: 18px;
        font-weight: bold;
      }
      .edit-info-btn {
        border: 1px solid #000;
        padding: 4px 6px;
        border-radius: 5px;
        margin-top: 10px;
      }
    }
    .avatar {
      width: 80px;
      height: 80px;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .btn-list {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 22px;
      li {
        display: flex;
        justify-content: center;
        align-content: start;
        flex-wrap: wrap;
        width: 80px;
        margin: 0 10px 20px 0;
        text-align: center;
        &:nth-child(3n) {
          margin-right: 0;
        }
        i {
          font-size: 35px;
          flex-grow: 0;
        }
      }
    }
  }
</style>