<template>
  <Tabs class="tabs" v-model:active="active" shrink color="#5856d6">
    <Tab title="消息" title-style="padding: 0 14px">
      <MessageItem
        v-for="item in messageList"
        :key="item.id"
        :title="item.title"
        :desc="item.desc" />
    </Tab>
    <Tab title="通知" title-style="padding: 0 14px">
      <MessageItem
        v-for="item in notifyList"
        :key="item.id"
        :title="item.title"
        :desc="item.desc" />
    </Tab>
  </Tabs>
</template>

<script setup lang="ts">
  import { Tab, Tabs } from 'vant'
  import { ref } from 'vue'
  import MessageItem from '@/components/Message/MessageItem.vue'
  const active = ref(0);
  interface Message {
    id: string
    title: string
    desc: string
  }
  const messageList: Array<Message> = [
    {
      id: '123',
      title: '房东名称',
      desc: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容'
    }, {
      id: '1223',
      title: '房东名称',
      desc: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容'
    }, {
      id: '1243',
      title: '房东名称',
      desc: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容'
    }
  ]
  const notifyList: Array<Message> = [
    {
      id: '1231',
      title: '通知',
      desc: '通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容'
    }, {
      id: '1232',
      title: '通知',
      desc: '通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容'
    }, {
      id: '1233',
      title: '通知',
      desc: '通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容'
    }, 
  ]
</script>
<style scoped lang="less">
  .tabs {

  }
</style>