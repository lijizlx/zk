<template>
  <transition :name="themeConfig.animation">
    <div v-show="show">
      <slot></slot>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useThemeConfig } from "@/stores/themeConfig.js";
import { storeToRefs } from "pinia";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

NProgress.start()

let show = ref(false)

onMounted(() => {
  NProgress.done()
  show.value = true
})
</script>

<style scoped>

</style>