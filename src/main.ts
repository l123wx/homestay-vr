import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Plus } from '@/utils/plus'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')

// 修改返回按钮默认行为
Plus((plus: any) => {
  let first: number | null = null
  plus.key.addEventListener("backbutton", function() { 
    //首次按键，提示  再按一次退出应用
    const href = window.location.href
    const arrUrl = href.split("#")
    let prams = '' 
    if (arrUrl[1].indexOf('?') > 0) {
      const page = arrUrl[1].split("?")
      prams = page[0]
    } else {
      prams = arrUrl[1]
    }
    const endparms = prams.split("/")
    if (!first && (endparms[1] == 'home' || endparms[1] == 'loginAndRegister' || endparms[1]=='')) {
      first = new Date().getTime() //记录第一次按下回退键的时间
      plus.nativeUI.toast('再按一次退出应用') //给出提示
      setTimeout(function() { //1s中后清除
        first = null
      }, 1000)
    } else if (!first && endparms[1] != 'home') {
      history.go(-1) //回退到上一页面
    } else {
      if (new Date().getTime() - (first as number) < 1000) { //如果两次按下的时间小于1s，
        plus.runtime.quit() //那么就退出app
      }
    }
  })
})

// 适配safari viewportHeight
import { isSafari } from "@/utils/index"
const handleResize = () => {
  const veiwportHeight = window.innerHeight
  document.documentElement.style.setProperty('--viewport-height', `${veiwportHeight}px`)
}
handleResize()
if (isSafari()) {
  window.addEventListener("resize", handleResize)
}

export const gobalData = reactive({
  userType: 0, // 0 房客 1 房东
})