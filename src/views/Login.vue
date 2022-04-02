<template>
  <div class="container">
    <div class="title">登录</div>
    <div class="form">
      <div class="form-item-title">账号</div>
      <Field v-model="formData.username.value" placeholder="请输入账号"></Field>
      <div class="form-item-title">密码</div>
      <Field v-model="formData.password.value" placeholder="请输入密码" type="password"></Field>
      <Button type="success" size="large" @click="login">登录</Button>
      <div class="link">
        <span @click="toRegisterPage">注册新账号</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject, reactive, Ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Field, Button, Notify } from 'vant'
  const { showLoading, hideLoading }: any = inject('loadingOperation')
  const router = useRouter()
  const formData = reactive({
    username: {
      title: '账号',
      value: ''
    },
    password: {
      title: '密码',
      value: ''
    },
  })

  function toRegisterPage() {
    router.push('register')
  }

  function login() {
    if (formValidaton()) {
      loginRequest(formData.username.value, formData.password.value)
    }
  }
  function formValidaton(): boolean {
    const emptyFormKey = Object.keys(formData).find(item => {
      return !formData[item].value
    })
    if (emptyFormKey) {
      Notify('请输入' + formData[emptyFormKey].title)
      return false
    }
    return true
  }
  function loginRequest(username: string, password: string) {
    return new Promise((resolve, reject) => {
      showLoading()
      setTimeout(function() {
        if (username != 'text') {
          Notify('该账号未注册')
        } else if (password != '123456') {
          Notify('密码错误')
        } else {
          Notify({
            type: 'success',
            message: '登录成功',
            duration: 500,
            onClose() {
              router.push('/')
            }
          })
        }
        hideLoading()
        resolve({})
      }, 500)
    })
  }
</script>
<style scoped lang="less">
  .container {
    padding: 0 22px;
    .title {
      font-size: 20px;
      font-weight: bold;
      margin-top: 50px;
    }
    .form {
      margin-top: 25px;
      .form-item-title {
        margin-top: 20px;
      }
      .van-cell {
        padding: var(--van-cell-vertical-padding) 0;
        border-bottom: 1px solid @color-gray;
      }
      button {
        margin-top: 20px;
      }
      .link {
        text-align: right;
        margin-top: 10px;
      }
    }
  }
</style>