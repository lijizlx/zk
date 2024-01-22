<template>
  <!-- 横向菜单 -->
  <el-container>
    <el-header><Header /></el-header>
    <el-main>
      <router-view v-if="isRouterAlive"/></el-main>
  </el-container>
</template>

<script setup>
import { ref, nextTick, provide } from "vue";
import Header from '../components/Header.vue'

const isRouterAlive = ref(true)

const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}

provide('reload', reload)
</script>