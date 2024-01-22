<template>
  <div class="side-simp-menu">
    <div class="menu-list">
      <Logo />
      <ul>
        <template v-for="(item, index) in menuList" :key="item.path">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="item.label"
            placement="right"
            :show-arrow="false"
          >
            <li :title="item.label" @click="selectMain(item)"
                :style="{ backgroundColor: item.label === activeMainItem ? 'var(--el-color-primary)' : '' }"
            >
              <SvgIcon :name="item.meta.icon" width="16px" height="16px" fill="#fff"></SvgIcon>
            </li>
          </el-tooltip>
        </template>
      </ul>
    </div>
    <div class="multi-menu">
      <div class="header">
        <div>智慧云工业互联网</div>
      </div>
      <el-menu :default-active="route.path" mode="vertical" router text-color="#000" active-text-color="red"
               @select="selectMulti">
        <template v-for="route in multiMenulist">
          <template v-if="route.children && route.children.length > 0">
            <el-sub-menu :index="route.path">
              <template #title>
                <SvgIcon :name="route.meta.icon" width="16px" height="16px" fill="#000"></SvgIcon>
                <span>{{ route.meta.label }}</span>
              </template>
              <template v-for="child in route.children" :key="child.path">
                <el-menu-item :index="child.path">
                  <!--              <i :class="child.meta.icon"></i>-->
                  <SvgIcon :name="child.meta.icon" width="16px" height="16px" fill="#000"></SvgIcon>
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated } from 'vue'
import router, { dynamicRoutes } from "@/router/index.js"
import { Local } from "@/utils/storage.js";
import flatterArrar from "@/utils/flatterArrar.js";
import { useRoute } from 'vue-router'
import { findTopMostParent } from "@/utils/routeDatahandle.js";

import Logo from '../Logo.vue'
import { useThemeConfig } from "@/stores/themeConfig.js";
import { storeToRefs } from "pinia";

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

const menuList = dynamicRoutes
const multiMenulist = ref([])
const activeMainItem = ref('')
const activeMultiItem = ref('')
const route = useRoute()
// 点击一级菜单
const selectMain = data => {
  console.log(data)
  // 高亮
  activeMainItem.value = data.label
  if (data.children.length === 0) {
    multiMenulist.value = [data]
    // 路由跳转
    router.push(data.path)
    // 保存路由
    Local.set('currentRoute', [data])
  } else {
    // 包含子菜单的一级菜单
    multiMenulist.value = data.children
  }
}
// 点击二级菜单
const selectMulti = (key) => {
  // 先将总菜单扁平化 找到点击的二级菜单中的菜单项所对应的路由对象 将其存到Local 并设置对应一级菜单的高亮
  const list = flatterArrar(JSON.parse(JSON.stringify(menuList)))
  Local.set('currentRoute', list.filter(item => item.path === key))
  activeMainItem.value = findTopMostParent(menuList, key).label
}

const refreshData = () => {
  if (Local.get('currentRoute')) {
    // 刷新页面时 将之前的激活路由拿到 然后找到对应的最高级父路由 将其高亮
    // 如果Local中没有 默认显示第一个
    const p = findTopMostParent(menuList, Local.get('currentRoute')[0].path)
    activeMainItem.value = p.label
    // 找到激活菜单所在的次级菜单
    if (p.children.length === 0) {
      multiMenulist.value = [p]
    } else {
      multiMenulist.value = p.children
    }
  }
}
onMounted(() => {
  refreshData()
})
onActivated(() => {
  refreshData()
})
</script>

<style scoped lang="scss">
.side-simp-menu {
  height: 100vh;
  //width: 380px;
  background-color: #282C34;
  color: #fff;
  border-right: 1px solid var(--el-border-color);
  overflow-y: auto;
  text-align: center;
  //padding: 20px 0;
  display: flex;
  .menu-list {
    width: 60px;
    border-right: 1px solid var(--el-border-color);
    padding: 20px 0 !important;
    ul {
      margin-top: 15px;
      li {
        width: 45px;
        height: 50px;
        line-height: 55px;
        cursor: pointer;
        border-radius: 6px;
        margin: 0 0 10px 6px;
        text-align: center;
      }
      li:hover {
        background-color: #000;
        color: #fff;
      }
    }
  }
  .multi-menu {
    background-color: #fff;
    .header {
      height: 60px;
      padding: 20px;
      border-bottom: 1px solid var(--el-border-color);
      color: #000;
      font-size: 1.1rem;
      font-weight: 600;
    }
  }
}
.el-menu {
  border: none !important;
  svg {
    margin-right: 5px;
    fill: #252525;
  }
}

:deep(.el-menu-item.is-active) {
   background-color: var(--el-color-primary) !important;
  svg {
    fill: #fff;
  }
   color: #fff !important;
   //border-radius: 6px;
 }
</style>