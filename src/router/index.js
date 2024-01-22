import { createRouter, createWebHashHistory } from "vue-router"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/stores/index'
import { useThemeConfig } from "@/stores/themeConfig.js"
import { storeToRefs } from "pinia"
import { Local } from "@/utils/storage.js"

const storesThemeConfig = useThemeConfig(pinia);
const { themeConfig } = storeToRefs(storesThemeConfig);

const routes = [
  {
    path: "/",
    redirect: '/wel'
  },
  {
    path: "/login",
    name: "Login",
    label: "登录",
    component: () => import("@/views/login/Login.vue")
  },
  {
    path: '/remote-web',
    name: 'RemoteWeb',
    label: 'RemoteWeb',
    component: () => import("@/layout/index.vue"),
    children: []
  },
  // 无权限
  {
    path: "/401",
    name: "NoRight",
    label: "无权限",
    component: () => import("@/views/errors/NoRight.vue")
  },
  // 没有资源404
  {
    path: '/:path(.*)*',
    name: "NotFound",
    component: () => import("@/views/errors/NotFound.vue")
  }
]

// 模拟动态路由 死页面 后期换成需要的活页面 死页面都放在imitateViews文件夹下
export const dynamicRoutes = [
  {
    path: '/wel',
    name: '首页',
    label: '首页',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页",
      name: "首页",
      tagName: 'wel',
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/device',
    name: '远程设备管理',
    label: '远程设备管理',
    meta: {
      label: "远程设备管理",
      name: "远程设备管理",
      icon: "icon-yunyingshuju",
      sort: 2
    },
    children: [
      {
        path: '/deviceInfo',
        name: '设备信息',
        // component: () => import("../views/device/deviceInfo/DeviceInfo.vue"),
        meta: {
          label: "设备信息",
          name: "设备信息",
          icon: "icon-msnui-supervise",
          sort: 1
        },
        children: [
          {
            path: '/deviceInfo1',
            name: '设备信息1',
            component: () => import("../views/device/deviceInfo/DeviceInfo.vue"),
            meta: {
              label: "设备信息1",
              name: "设备信息1",
              icon: "icon-msnui-supervise",
              sort: 1
            },
            children: [
              {
                path: '/deviceInfo3',
                name: '设备信息3',
                meta: {
                  label: "设备信息3",
                  name: "设备信息3",
                  icon: "icon-msnui-supervise",
                  sort: 1
                },
                component: () => import("../views/device/deviceInfo/DeviceInfo.vue"),
                children: []
              }
            ]
          },
          {
            path: '/deviceInfo2',
            name: '设备信息2',
            component: () => import("../views/device/deviceInfo/DeviceInfo.vue"),
            meta: {
              label: "设备信息2",
              name: "设备信息2",
              icon: "icon-msnui-supervise",
              sort: 2
            },
            children: []
          }
        ],
      },
      {
        path: '/deviceGroup',
        name: '设备组管理',
        component: () => import("../views/device/deviceGroup/DeviceGroup.vue"),
        meta: {
          label: "设备组管理",
          name: "设备组管理",
          icon: "el-icon-set-up",
          sort: 1
        },
        children: [],
      },
    ]
  },
  {
    path: '/wel3',
    name: '首页3',
    label: '首页3',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页3",
      name: "首页3",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel4',
    name: '首页4',
    label: '首页4',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页4",
      name: "首页4",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel5',
    name: '首页5',
    label: '首页5',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页5",
      name: "首页5",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel6',
    name: '首页6',
    label: '首页6',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页6",
      name: "首页6",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel7',
    name: '首页7',
    label: '首页7',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页7",
      name: "首页7",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel8',
    name: '首页8',
    label: '首页8',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页8",
      name: "首页8",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel9',
    name: '首页9',
    label: '首页9',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页9",
      name: "首页9",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel10',
    name: '首页10',
    label: '首页10',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页10",
      name: "首页10",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel11',
    name: '首页11',
    label: '首页11',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页11",
      name: "首页11",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel12',
    name: '首页12',
    label: '首页12',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页12",
      name: "首页12",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel13',
    name: '首页13',
    label: '首页13',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页13",
      name: "首页13",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel14',
    name: '首页14',
    label: '首页14',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页14",
      name: "首页14",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel15',
    name: '首页15',
    label: '首页15',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页15",
      name: "首页15",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel16',
    name: '首页16',
    label: '首页16',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页16",
      name: "首页16",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel17',
    name: '首页17',
    label: '首页17',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页17",
      name: "首页17",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel18',
    name: '首页18',
    label: '首页18',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页18",
      name: "首页18",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel19',
    name: '首页19',
    label: '首页19',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页19",
      name: "首页19",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
  {
    path: '/wel20',
    name: '首页20',
    label: '首页20',
    component: () => import("@/views/Wel/Wel.vue"),
    meta: {
      label: "首页20",
      name: "首页20",
      icon: "icon-shouyeoff2x",
      sort: 1
    },
    children: [],
  },
]

routes[2].children.push(...dynamicRoutes)

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path === '/login') {
    themeConfig.value.lockScreenPwd = ''
    themeConfig.value.isLockScreen = false
    Local.set('themeConfig', themeConfig)
  }
  next()
})

router.afterEach(() => {
  NProgress.done();
});

export default router