<template>
  <div class="classic-page">
    <div class="page-aside" style="width: auto">
<!--      <div class="title-log">-->
<!--        <Logo v-show="themeConfig.isCollapsed"/>-->
<!--        <div v-show="!themeConfig.isCollapsed" class="title">智慧云工业互联网-私有云</div>-->
<!--      </div>-->
      <r-menu class="menu-list" :themeConfig="themeConfig" width="230px"></r-menu>
    </div>
    <div class="page-right">
      <div class="page-content">
        <div class="page-content-header">
          <div class="breadcrumbs-route">
<!--            <el-icon v-if="!themeConfig.isCollapsed"><Fold @click="switchCollapse"/></el-icon>-->
<!--            <el-icon v-else><Expand  @click="switchCollapse"/></el-icon>-->
            <div class="breadcrumbs"><Breadcrumb /></div>
          </div>
          <div class="user-operate"><UserOperate class="fixed-width"/></div>
        </div>
        <div class="tag-views" v-show="themeConfig.isTagsview">
          <TestView />
        </div>
        <div class="page-content-main" :style="{ marginTop: !themeConfig.isTagsview ? '70px' : '' }">
          <router-view v-if="isRouterAlive"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, provide, watch } from "vue";
import { useThemeConfig } from "@/stores/themeConfig.js";
import { storeToRefs } from "pinia";
import { Local } from "@/utils/storage.js";

import { Fold, Expand } from '@element-plus/icons-vue'
// import ClassicMenu from '../components/menu/ClassicMenu.vue'
import Logo from '../components/Logo.vue'
import UserOperate from '../components/UserOperate.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import TestView from "@/components/global/TestView.vue";
import RMenu from '@/components/remote/RMenu.vue'

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

const isRouterAlive = ref(true)
const isCollapse = ref(themeConfig.value.isCollapsed)
const switchCollapse = bool => {
  themeConfig.value.isCollapsed = !themeConfig.value.isCollapsed
  Local.set('themeConfig', themeConfig.value)
}

watch(() => themeConfig.value.primary, () => {
  reload()
})

const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)
</script>

<style scoped lang="scss">
.classic-page {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  .page-aside {
    flex: 0 0 auto;
    height: 100vh;
    //border-radius: 6px;
    padding: 10px 0 10px 10px;
    //overflow: hidden;
    //border-right: 1px solid #747476;
    display: flex;
    flex-direction: column; /* 设置为纵向布局 */
    //background-color: #282C34;
    .title-log {
      flex: 1;
      height: 60px;
      text-align: center;
      padding: 12.5px 10px;
      .title {
        margin: 10px;
        //background-color: ;
        color: #fff;
      }
    }
  }
  .page-slot{
    width: 15px;
    height: 100%;
  }
  .page-right{
    flex: 1;
    padding: 10px;
    height: 100vh;
  }
  .page-content {
    height: 100%;
    display: flex;
    flex-direction: column; /* 设置为纵向布局 */
    position: relative;
    .page-content-header {
      flex: 0 0 auto;
      width: 100%;
      height: 60px;
      position: absolute;
      top: 0;
      right: 0;
      border-bottom: 1px solid var(--el-border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: $BoxShadow;
      .breadcrumbs-route {
        flex: 1;
        display: flex;
        align-items: center;
        .el-icon {
          font-size: 1.3rem;
          margin-right: 10px;
          cursor: pointer;
          color: #515050;
        }
      }
      .user-operate {

      }
    }
    .tag-views {
      width: 100%;
      height: 50px;
      background-color: #fff;
      border-radius: 6px;
      margin: 70px 0 10px 0;
      padding: 5px 10px;
      box-shadow: $BoxShadow;
    }
    .page-content-main {
      width: 100%;
      flex: 1;
      margin-top: 0;
      overflow-y: scroll;
      overflow-x: hidden;
      padding: 15px;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: $BoxShadow;
    }
  }
}
</style>