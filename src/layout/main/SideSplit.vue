<template>
  <div class="side-split-page">
    <el-container>
      <el-aside width="auto">
        <SideSplitMenu/>
      </el-aside>
      <el-container>
        <el-header>
          <Header/>
        </el-header>
        <el-main>
          <router-view v-if="isRouterAlive"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {ref, nextTick, provide} from "vue";
import {useThemeConfig} from "@/stores/themeConfig.js";
import {storeToRefs} from "pinia";

import Header from '../components/Header.vue'
import SideSplitMenu from '../components/menu/SideSplitMenu.vue'

const storesThemeConfig = useThemeConfig();
const {themeConfig} = storeToRefs(storesThemeConfig);

const isRouterAlive = ref(true)

const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)
</script>

<style scoped>

</style>