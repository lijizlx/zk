<template>
  <keep-alive>
    <component :is="layouts[themeConfig.layout]" />
  </keep-alive>
</template>

<script setup>
import { defineAsyncComponent } from "vue"
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '../stores/themeConfig.js';
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

const layouts = {
  classic: defineAsyncComponent(() => import("../layout/main/Classic.vue")),
  sideSimp: defineAsyncComponent(() => import("../layout/main/SideSimp.vue")),
  sideSplit: defineAsyncComponent(() => import("../layout/main/SideSplit.vue")),
  transverse: defineAsyncComponent(() => import("../layout/main/Transverse.vue")),
  topSide: defineAsyncComponent(() => import("../layout/main/TopSide.vue")),
}
</script>

<style scoped>

</style>