<template>
  <NavBar></NavBar>
  <div class="container">
    <div class="title">注册</div>
    <div class="form">
      <div class="form-item-title">账号</div>
      <Field v-model="formData.username.value" placeholder="请输入账号"></Field>
      <div class="form-item-title">密码</div>
      <Field v-model="formData.password.value" placeholder="请输入密码" type="password"></Field>
      <div class="form-item-title">手机号码</div>
      <Field v-model="formData.phone.value" placeholder="请输入手机号码"></Field>
      <Button type="success" size="large" @click="register">注册</Button>
      <div class="link">
        <span @click="toLoginPage">登录已有账号</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { inject, reactive, Ref } from 'vue'
  import { Field, Button, Notify } from 'vant'
  import NavBar from '@/components/NavBar.vue'
  import axios from '@/service/index';
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
    phone: {
      title: '电话号码',
      value: ''
    }
  })

  function toLoginPage() {
    router.push('login')
  }

  function register() {
    if (formValidaton()) {
      showLoading()
      registerRequest({
        username: formData.username.value,
        password: formData.password.value,
        phone: formData.phone.value
      }).then((res: any) => {
        hideLoading()
        const result = res.data
        if (result.code === 200) {
          if (result.msg === 'This username already exist.') {
            Notify({
              type: 'warning',
              message: '用户名已存在！'
            })
          } else {
            Notify({
              type: 'success',
              message: '注册成功！',
              duration: 500,
              onClose() {
                toLoginPage()
              }
            })
          }
        } else {
          Notify({
            type: 'warning',
            message: '请求出错，请重试'
          })
        }
      })
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
  function registerRequest({username, password, phone}: {
    username: string
    password: string
    phone: string
  }) {
    return axios({
      url: '/api/user/register',
      method: 'POST',
      data: {
        username,
        password,
        phone
      }
    })
  }
</script>
<style scoped lang="less">
  .container {
    padding: 0 22px;
    .title {
      font-size: 20px;
      font-weight: bold;
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