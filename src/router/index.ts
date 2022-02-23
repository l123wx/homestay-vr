import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'tabbarPage',
    component: () => import('../views/TabbarPage.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue'),
      }, {
        path: '/collect',
        name: 'collect',
        component: () => import('../views/Collect.vue'),
      }, {
        path: '/community',
        name: 'community',
        component: () => import('../views/Community.vue'),
      }, {
        path: '/message',
        name: 'message',
        component: () => import('../views/Message.vue'),
      }, {
        path: '/my',
        name: 'my',
        component: () => import('../views/My.vue'),
      }
    ]
  },
  {
    path: '/homestayList',
    name: 'homestayList',
    component: () => import('../views/HomestayList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
