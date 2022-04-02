import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/tabbarPage',
    name: 'tabbarPage',
    component: () => import('../views/TabbarPage.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
      }, {
        path: '/collect',
        name: 'collect',
        component: () => import('../views/Collect.vue'),
      }, {
        path: '/message',
        name: 'message',
        component: () => import('../views/Message.vue'),
      }, {
        path: '/my',
        name: 'my',
        component: () => import('../views/My.vue'),
      }, {
        path: '/homestayAdmin',
        name: 'homestayAdmin',
        component: () => import('../views/HomestayAdmin.vue'),
      }
    ]
  }, {
    path: '/homestayList',
    name: 'homestayList',
    component: () => import('../views/HomestayList.vue')
  }, {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }, {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  }, {
    path: '/homestayDetail',
    name: 'homestayDetail',
    component: () => import('../views/HomestayDetail.vue')
  }, {
    path: '/panoramaAdmin',
    name: 'panoramaAdmin',
    component: () => import('../views/PanoramaAdmin.vue'),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/panoramaEdit',
    name: 'panoramaEdit',
    component: () => import('../views/PanoramaEdit.vue')
  }, {
    path: '/panoramaView',
    name: 'panoramaView',
    component: () => import('../views/PanoramaView.vue')
  }, {
    path: '/homestayEdit',
    name: 'homestayEdit',
    component: () => import('../views/HomestayEdit.vue')
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
