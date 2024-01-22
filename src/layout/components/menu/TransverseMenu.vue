<template>
  <el-menu :default-active="route.path" mode="horizontal" router
           @select="handleSelect"
           background-color="#282C34" text-color="#fff">
    <TransverseMenuChild :menuList="menuList" />
  </el-menu>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { dynamicRoutes } from "@/router/index.js"
import { Local } from "@/utils/storage.js";
import flatterArrar from "@/utils/flatterArrar.js";
import { useRoute } from 'vue-router'

import TransverseMenuChild from './TransverseMenuChild.vue'

const menuList = dynamicRoutes
const route = useRoute()

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
  const list = flatterArrar(JSON.parse(JSON.stringify(menuList)))
  Local.set('currentRoute', list.filter(item => item.path === key))
}
</script>

<style scoped lang="scss">
:deep(.el-menu-item.is-active) {
  background-color: var(--el-color-primary) !important;
  color: #fff !important;
  border-radius: 6px;
}
svg {
  margin-right: 5px;
}
</style>