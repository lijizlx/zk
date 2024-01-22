<template>
  <div class="side-simp-menu">
    <el-tooltip
      class="box-item"
      effect="light"
      content="智慧云工业互联网-私有云"
      placement="right"
    >
      <Logo />
    </el-tooltip>
    <div class="menu-list">
      <ul>
        <template v-for="(item, index) in menuList" :key="item.path">
          <li :title="item.label" @click="selectMain(item)"
              v-if="item.children && item.children.length === 0"
              :style="{ backgroundColor: item.label === activeMainItem ? 'var(--el-color-primary)' : '' }"
          >
            <SvgIcon :name="item.meta.icon" width="16px" height="16px" fill="#fff"></SvgIcon>
          </li>
          <el-popover
            v-else
            placement="right"
            :width="200"
            trigger="hover"
            :offset="10"
            :show-arrow="false"
            transition="el-zoom-in-top"
            popper-class="custom-popper-class"
          >
            <template #reference>
              <li :title="item.label" @click="selectMain(item)"
                  :style="{ backgroundColor: item.label === activeMainItem ? 'var(--el-color-primary)' : '' }">
                <SvgIcon :name="item.meta.icon" width="16px" height="16px" fill="#fff"></SvgIcon>
              </li>
            </template>
            <!-- 子级菜单 -->
            <div class="multi-menu">
              <el-menu :default-active="route.path" mode="vertical" router
                       @select="selectMulti"
                       background-color="#282C34" text-color="#fff" style="margin: -14px">
                <template v-for="route in item.children">
                  <template v-if="route.children && route.children.length > 0">
                    <el-sub-menu :index="route.path">
                      <template #title>
                        <SvgIcon :name="route.meta.icon" width="16px" height="16px" fill="#fff"></SvgIcon>
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
            </div>
          </el-popover>
        </template>
      </ul>
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

const menuList = dynamicRoutes
const activeMainItem = ref('')
const activeMultiItem = ref('')
const route = useRoute()

// 点击一级菜单
const selectMain = data => {
  console.log(data)
  // 其实也就是简单的一级菜单即没有children类似首页这样的
  if (data.children && data.children.length === 0) {
    // 高亮
    activeMainItem.value = data.label
    // 路由跳转
    router.push(data.path)
    // 保存路由
    Local.set('currentRoute', [data])
  }
}
// 点击二级菜单
const selectMulti = (key) => {
  // 先将总菜单扁平化 找到点击的二级菜单中的菜单项所对应的路由对象 将其存到Local 并设置对应一级菜单的高亮
  const list = flatterArrar(JSON.parse(JSON.stringify(menuList)))
  Local.set('currentRoute', list.filter(item => item.path === key))
  activeMainItem.value = findTopMostParent(menuList, key).label
}

onActivated(() => {
  if (Local.get('currentRoute')) {
    activeMainItem.value = findTopMostParent(menuList, Local.get('currentRoute')[0].path).label
  }
})
onMounted(() => {
  // 刷新页面时 将之前的激活路由拿到 然后找到对应的最高级父路由 将其高亮
  // 如果Local中没有 默认显示第一个
  if (Local.get('currentRoute')) {
    activeMainItem.value = findTopMostParent(menuList, Local.get('currentRoute')[0].path).label
  }
})
</script>

<style scoped lang="scss">
.side-simp-menu {
  height: 100vh;
  width: 60px;
  background-color: #282C34;
  color: #fff;
  border-right: 1px solid #3f3e3e;
  overflow-y: auto;
  text-align: center;
  padding: 20px 0;
  border-radius: 6px;
  .menu-list {
    width: 100%;
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
}
//svg {
//  margin-right: 5px;
//}
.el-menu {
  border: none !important;
  svg {
    margin-right: 5px;
  }
}:deep(.el-menu-item.is-active) {
   background-color: var(--el-color-primary) !important;
   color: #fff !important;
   //border-radius: 6px;
 }
</style>