<template>
  <div class="side-simp-page">
    <div class="page-side">
      <SideSimpMenu />
    </div>
    <div class="page-right">
    </div>
    <el-container>
<!--      <el-aside width="auto"><SideSimpMenu /></el-aside>-->
      <el-container>
        <el-header><Header /></el-header>
        <el-main><router-view v-if="isRouterAlive"/></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, nextTick, provide } from "vue";
import { useThemeConfig } from "@/stores/themeConfig.js";
import { storeToRefs } from "pinia";

import Header from '../components/Header.vue'
import SideSimpMenu from '../components/menu/SideSimpMenu.vue'

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

const isRouterAlive = ref(true)

const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)
</script>

<style scoped lang="scss">
.side-simp-page {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  .page-side {
    flex: 0 0 auto;
    height: 100vh;
    //border-radius: 6px;
    padding: 10px 0 10px 10px;
    //overflow: hidden;
    //border-right: 1px solid #747476;
    display: flex;
    flex-direction: column; /* 设置为纵向布局 */
  }
}
</style>