<template>
  <!-- 横向菜单 -->
  <el-container class="top-side-page">
    <el-header>
      <header class="header-transverse top-side-page-header">
        <div class="logo">
          <Logo title="智慧云工业互联网-私有云"/>
          <h1>智慧云工业互联网-私有云</h1>
        </div>
        <div class="top-menu">
          <el-menu
            :default-active="activeTopRoute"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelectTopMenu"
            background-color="#282C34" text-color="#fff"
          >
            <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
              <SvgIcon :name="item.meta.icon" width="16px" height="16px" fill="#fff"></SvgIcon>
              {{ item.label }}
            </el-menu-item>
          </el-menu>
        </div>
        <UserOperate class="fixed-width"/>
      </header>
    </el-header>
    <el-container>
      <el-aside class="aside-menu" width="200px">
        <el-menu :default-active="route.path" mode="vertical" router
                 @select="handleSelectSideMenu"
                 background-color="#282C34" text-color="#fff" style="height: 100%">
          <template v-for="route in sideMenuList">
            <template v-if="route.children && route.children.length > 0">
              <el-sub-menu :index="route.path">
                <template #title>
                  <span>{{ route.meta.label }}</span>
                </template>
                <template v-for="child in route.children" :key="child.path">
                  <el-menu-item :index="child.path">
                    <!--              <i :class="child.meta.icon"></i>-->
                    <SvgIcon :name="child.meta.icon" width="16px" height="16px" fill="#fff"></SvgIcon>
                    <span>{{ child.meta.label }}</span>
                  </el-menu-item>
                </template>
              </el-sub-menu>
            </template>
            <template v-else :key="route.path">
              <el-menu-item :index="route.path">
                <!--          <i :class="route.meta.icon"></i>-->
                <SvgIcon :name="route.meta.icon" width="16px" height="16px" fill="#fff"></SvgIcon>
                <span>{{ route.meta.label }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main><router-view v-if="isRouterAlive"/></el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, nextTick, provide, onMounted, onActivated } from "vue";
import router, { dynamicRoutes } from "@/router/index.js"
import { Local } from "@/utils/storage.js";
import flatterArrar from "@/utils/flatterArrar.js";
import { useRoute } from 'vue-router'
import { findRouteByPath, findTopMostParent } from "@/utils/routeDatahandle.js";

import Logo from '../components/Logo.vue'
import UserOperate from '../components/UserOperate.vue'

const isRouterAlive = ref(true)   // 刷新组件用的
const menuList = dynamicRoutes  // 初始总体路由列表
const sideMenuList = ref([])  // 左侧路由列表
const route = useRoute()  // 将路由实例域menu绑定

const activeTopRoute = ref('')  // 初始化头部菜单显示的项为第一个
const activeSideRoute = ref('')  // 初始化头部菜单显示的项为第一个

// 头部菜单选中
const handleSelectTopMenu = (key, keyPath) => {
  console.log('key', key)
  console.log('keyPath', keyPath)
  let currentMainItem = {}
  if (key) {
    // 通过头部选中的路由 加载出它的childre 在左侧菜单渲染
    menuList.forEach(item => {
      // 渲染左侧菜单
      if (item.path === key) {
        currentMainItem = item
        // if (item.children && item.children.length > 0) {
        //   sideMenuList.value = item.children
        //   // router.push(Local.get('currentRoute') || sideMenuList.value[0].path)
        // } else {
        //   sideMenuList.value = [item]
        //   // router.push(key)
        // }
      }
    })
    if (currentMainItem.children.length === 0) {
      sideMenuList.value = [currentMainItem]
      // 路由跳转
      router.push(currentMainItem.path)
      // 保存路由
      Local.set('currentRoute', [currentMainItem])
    } else {
      // 包含子菜单的一级菜单
      sideMenuList.value = currentMainItem.children
    }
  }
}
// 侧边菜单选中
const handleSelectSideMenu = (key, keyPath) => {
  router.push(key)
  Local.set('currentRoute', [findRouteByPath(menuList, key)])
}

const refreshData = () => {
  if (!Local.get('currentRoute')) {
    activeTopRoute.value = menuList[0].path
  } else {
    const topMostParent = findTopMostParent(menuList, Local.get('currentRoute')[0].path)
    console.log(topMostParent)
    activeTopRoute.value = topMostParent.path
    handleSelectTopMenu(activeTopRoute.value)
  }
}
onActivated(() => {
  refreshData()
})
onMounted(() => {
  refreshData()
})

// 用于刷新组件
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)
</script>

<style scoped lang="scss">
.top-side-page {
  width: 100%;
  height: 100%;
  .top-side-page-header {
    display: flex;
    justify-content: space-between;
    .logo {
      flex: 0 0 auto; /* 不随父元素变化而变化 */
      width: 250px; /* 设置固定长度 */
      display: flex;
      align-items: center;
    }
    .top-menu {
      flex: 1
    }
    :deep(.el-menu-item.is-active) {
      background-color: var(--el-color-primary) !important;
      color: #fff !important;
      border-radius: 6px;
    }
  }
  .aside-menu {
    :deep(.el-menu-item.is-active) {
      background-color: var(--el-color-primary) !important;
      color: #fff !important;
    }
  }
  svg {
    margin-right: 5px;
  }
}
</style>