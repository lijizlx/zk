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
    path: '/testReport',
    name: '测试报告',
    meta: {
      label: "测试报告",
      name: "测试报告",
      tagName: 'testReport',
      icon: "icon-yunyingshuju",
      sort: 2
    },
    children: [
      {
        path: '/testForm',
        name: '报告申请',
        component: () => import("@/views/testReport/TestForm.vue"),
        meta: {
          label: "报告申请",
          name: "报告申请",
          tagName: 'testForm',
          icon: "icon-supervise",
          sort: 1
        },
        children: [],
      },
      {
        path: '/testList',
        name: '列表查询',
        component: () => import("@/views/testReport/TestList.vue"),
        meta: {
          label: "列表查询",
          name: "列表查询",
          tagName: 'testList',
          icon: "icon-supervise",
          sort: 2
        },
        children: [],
      }
    ]
  },
  // {
  //   path: '/device',
  //   name: '远程设备管理',
  //   label: '远程设备管理',
  //   meta: {
  //     label: "远程设备管理",
  //     name: "远程设备管理",
  //     icon: "icon-yunyingshuju",
  //     sort: 2
  //   },
  //   children: [
  //     {
  //       path: '/deviceInfo',
  //       name: '设备信息',
  //       // component: () => import("../views/device/deviceInfo/DeviceInfo.vue"),
  //       meta: {
  //         label: "设备信息",
  //         name: "设备信息",
  //         icon: "icon-msnui-supervise",
  //         sort: 1
  //       },
  //       children: [
  //         {
  //           path: '/deviceInfo1',
  //           name: '设备信息1',
  //           component: () => import("../views/device/deviceInfo/DeviceInfo.vue"),
  //           meta: {
  //             label: "设备信息1",
  //             name: "设备信息1",
  //             icon: "icon-msnui-supervise",
  //             sort: 1
  //           },
  //           children: [
  //             {
  //               path: '/deviceInfo3',
  //               name: '设备信息3',
  //               meta: {
  //                 label: "设备信息3",
  //                 name: "设备信息3",
  //                 icon: "icon-msnui-supervise",
  //                 sort: 1
  //               },
  //               component: () => import("../views/device/deviceInfo/DeviceInfo.vue"),
  //               children: []
  //             }
  //           ]
  //         },
  //         {
  //           path: '/deviceInfo2',
  //           name: '设备信息2',
  //           component: () => import("../views/device/deviceInfo/DeviceInfo.vue"),
  //           meta: {
  //             label: "设备信息2",
  //             name: "设备信息2",
  //             icon: "icon-msnui-supervise",
  //             sort: 2
  //           },
  //           children: []
  //         }
  //       ],
  //     },
  //     {
  //       path: '/deviceGroup',
  //       name: '设备组管理',
  //       component: () => import("@/views/testReport/TestForm.vue"),
  //       meta: {
  //         label: "设备组管理",
  //         name: "设备组管理",
  //         icon: "el-icon-set-up",
  //         sort: 1
  //       },
  //       children: [],
  //     },
  //   ]
  // }
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