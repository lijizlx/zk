<template>
  <el-menu :default-active="route.path" mode="vertical" router ref="menuRef"
           class="el-menu-vertical-demo"
           :collapse="themeConfig.isCollapsed" :unique-opened=true :collapse-transition="false"
           @select="handleSelect"
           style="border-right: 1px solid transparent"
           background-color="#282C34" text-color="#fff">
    <ClassMenuChild :menuList="menuList" />
  </el-menu>
</template>

<script setup>
import {onMounted, ref, nextTick, watch, watchEffect, onUpdated} from "vue";
import {dynamicRoutes} from "@/router/index.js"
import {Local} from "@/utils/storage.js";
import flatterArrar from "@/utils/flatterArrar.js";
import {useRoute} from 'vue-router'
import {storeToRefs} from "pinia";
import {useThemeConfig} from "@/stores/themeConfig.js";
import {useRouterInfo} from "@/stores/router.js";

import ClassMenuChild from './ClassMenuChild.vue'

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const storesRouterInfo = useRouterInfo();
const { tagsViewList } = storeToRefs(storesRouterInfo);

const menuList = JSON.parse(JSON.stringify(dynamicRoutes))
const route = useRoute()
const menuRef = ref(null)

watch(() => route.path, () => {
  const activeMenuItem = menuRef.value.$el.querySelector('.is-active');
  if (activeMenuItem) {
    activeMenuItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
})

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
  // 扁平化原路由 并在其中找到跟menu触发的path相同的路由对象 也就是当前激活的路由对象 存入到Local中
  let list = flatterArrar(JSON.parse(JSON.stringify(dynamicRoutes)))
  const current = list.filter(item => item.path === key)
  console.log(current)
  Local.set('currentRoute', current)
  // 将此激活的路由对象存入到pinia中
  tagsViewList.value.push(current[0])
  tagsViewList.value = tagsViewList.value.filter((obj, index, self) =>
      index === self.findIndex((t) => (
        t.path === obj.path
      ))
  )
  Local.set('tagsViewList', tagsViewList.value)
}

onMounted(() => {
  // isCollapse.value = themeConfig.value.isCollapsed
  // 刷新后菜单没有自动滚动到刷新的位置
  nextTick(() => {
    const activeMenuItem = menuRef.value.$el.querySelector('.is-active');
    if (activeMenuItem) {
      activeMenuItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
})
</script>

<style scoped lang="scss">
.el-menu {
  //border-right: 10px solid transparent;
  height: 100%;
  overflow-y: scroll;
}
:deep(.el-menu-item.is-active, .el-sub-menu) {
  background-color: var(--el-color-primary) !important;
  color: #fff !important;
}
svg {
  margin-right: 5px;
}
//:deep(.el-menu--collapse .el-submenu) {
//  margin-left: 200px !important; /* 调整子菜单到一级菜单的距离 */
//}
//:deep(.el-menu--collapse .el-submenu__title) {
//  transition: margin-left 0.9s !important; /* 使用 CSS 过渡效果 */
//}
//
///* 展开动画 */
//:deep(.el-menu--collapse .el-submenu.is-opened>.el-submenu__title) {
//  transition: margin-left 0.9s !important; /* 使用 CSS 过渡效果 */
//}
</style>