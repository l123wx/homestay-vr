import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 适配safari viewportHeight
import { isSafari } from "@/utils/index"
const handleResize = () => {
  const veiwportHeight = window.innerHeight;
  document.documentElement.style.setProperty('--viewport-height', `${veiwportHeight}px`);
}
handleResize();
if (isSafari()) {
  window.addEventListener("resize", handleResize);
}

createApp(App).use(store).use(router).mount('#app')
