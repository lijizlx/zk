<template>
  <transition name="width-transition">
    <div class="remote-menu" :style="{ width: !themeConfig.isCollapsed ? width : '65px', height: '100%' }">
      <div class="menu-content">
        <div class="menu-collapse">
          <div class="collapse-decoration" @click="switchBtn">
            <div class="collapse-decoration-1"></div>
            <div class="collapse-decoration-2"></div>
            <div class="collapse-decoration-3"></div>
          </div>
          <div class="collapse-button" @click="switchBtn" v-if="!themeConfig.isCollapsed">
            <el-icon><Download /></el-icon>
          </div>
        </div>
        <div class="menu-header">
          <div class="menu-title" v-show="!themeConfig.isCollapsed">
            <span class="animated-text">智慧云工业互联网</span>
          </div>
          <div class="menu-logo" v-show="themeConfig.isCollapsed"><Logo class="animated-logo"/></div>
        </div>
        <div class="content">
          <component :is="layouts[themeConfig.layout]" />
<!--          <ClassicMenu />-->
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import {ref, defineProps, onMounted, nextTick, defineAsyncComponent} from 'vue';
import {useThemeConfig} from "@/stores/themeConfig.js";
import {storeToRefs} from "pinia";
import {Local} from "@/utils/storage.js";
import { dynamicRoutes } from "@/router/index.js";
import addPropertyToObjects from "@/utils/addProperForArrObj.js";

import { Download, CaretBottom, CaretTop } from '@element-plus/icons-vue'
import Logo from '@/layout/components/Logo.vue'
import ClassicMenu from '@/layout/components/menu/ClassicMenu.vue'

const layouts = {
  classic: defineAsyncComponent(() => import("@/layout/components/menu/ClassicMenu.vue")),
  // sideSimp: defineAsyncComponent(() => import("@/layout/main/SideSimp.vue")),
  // sideSplit: defineAsyncComponent(() => import("@/layout/main/SideSplit.vue")),
  // transverse: defineAsyncComponent(() => import("@/layout/main/Transverse.vue")),
  // topSide: defineAsyncComponent(() => import("@/layout/main/TopSide.vue")),
}

const props = defineProps({
  width: {
    required: true,
    type: String,
    default: '200px'
  },
})

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

const menuList = ref([])

// 收缩和展开菜单
const switchBtn = () => {
  themeConfig.value.isCollapsed = !themeConfig.value.isCollapsed
  Local.set('themeConfig', themeConfig.value)
}

// 有children的展开和收起
const switchChildSelect = (item, bool) => {
  nextTick(() => {
    menuList.value = changeIsExpand(menuList.value, item.path, bool)
  })
  console.log(menuList.value)
}
const changeIsExpand = (arr, path, bool) => {
  arr.forEach(item => {
    if (item.path === path) {
      item.isExpand = bool;
    }
    if (item.children && item.children.length > 0) {
      changeIsExpand(item.children, path, bool);
    }
  });
  return arr;
}

onMounted(() => {
  nextTick(() => {
    menuList.value = addPropertyToObjects(
      JSON.parse(JSON.stringify(dynamicRoutes)),
      'isExpand',
      false)
  })
})
</script>

<style scoped lang="scss">
.remote-menu {
  padding: 5px 0;
  width: 65px;
  transition: width 0.3s ease-in-out; /* 过渡效果 */
  position: relative;
  text-align: center;
  border-radius: 6px;
  //background-color: #282C34;
  background: #282C34;
  .menu-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    .menu-header {
      padding: 0 15px;
    }
    .menu-title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      transition: width 0.3s ease-in-out; /* 过渡效果 */
      color: #fff;
      background-color: #373c45;
      border-radius: 6px;
    }
    .animated-text {
      opacity: 0;
      animation: menuTitleSlideIn 0.3s ease-in-out forwards;
    }
    .animated-logo {
      opacity: 0;
      animation: menuTitleSlideOut 0.3s ease-in-out forwards;
    }
    .menu-collapse {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 15px;
      .collapse-decoration {
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;
        height: 22px;
        div {
          width: 9px;
          height: 9px;
          border-radius: 100px;
          align-items: center;
          margin-right: 4px;
        }
        .collapse-decoration-1 { background-color: #ed5c5c
        }
        .collapse-decoration-2 { background-color: #f8bc4e
        }
        .collapse-decoration-3 { background-color: #62f662
        }
      }
      .collapse-button {
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        //border-radius: 100px;
        //background-color: #79808e;
        color: #fff;
        font-size: 0.9rem;
        cursor: pointer;
        transform: rotate(90deg);
      }
    }
    .content {
      flex: 1;
      overflow-y: auto;
      margin: 10px 0;
    }
  }
}
</style>