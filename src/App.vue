<template>
  <el-config-provider :locale="locale === 'en' ? en : zhCn">
    <el-drawer
      v-model="themeConfig.isDrawer"
      title="风格设置"
      @close="closeSetting"
      size="500px"
      :lock-scroll="false"
      :close-on-press-escape="false"
    >
      <template #header>
        <h2>{{ t('setting.title') }}</h2>
      </template>
      <template #default>
        <Setting />
      </template>
    </el-drawer>
    <transition name="el-zoom-in-top">
      <LockScreen v-show="themeConfig.isLockScreen"/>
    </transition>
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { inject, watch } from "vue"
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { onMounted, nextTick } from 'vue'
import { useThemeConfig } from "@/stores/themeConfig.js"
import {useRouterInfo} from "@/stores/router.js";
import { storeToRefs } from 'pinia'
import { Local } from "./utils/storage.js";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import setColor from '@/utils/setPrimaryColorOpacity.js'

import Setting from './components/global/Setting.vue'
import LockScreen from './components/global/LockScreen.vue'

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const storesRouterInfo = useRouterInfo();
const { tagsViewList } = storeToRefs(storesRouterInfo);

let locale = Local.get('globalI18n') || themeConfig.value.globalI18n || 'zh-cn'

// 关闭设置弹窗回调
const closeSetting = () => {
  themeConfig.value.isDrawer = false
  Local.set('themeConfig', themeConfig.value)
}

onMounted(() => {
  console.log(themeConfig.value.layout)
  nextTick(() => {
    // 进入App页面时 如果内存中没有themeConfig，则将其添加到内存中
    if (!Local.get('themeConfig')) {
      Local.set('themeConfig', themeConfig.value)
    } else {
      themeConfig.value = Local.get('themeConfig')._object?.themeConfig || Local.get('themeConfig')
      // 设置主题色
      document.documentElement.style.setProperty('--el-color-primary', themeConfig.value.primary)
      for (let i = 1; i < 10; i++ ) {
        document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, setColor(themeConfig.value.primary,  i * 0.1 ))
      }
    }
    if (!Local.get('tagsViewList')) {
      Local.set('tagsViewList', tagsViewList.value)
    } else {
      tagsViewList.value = Local.get('tagsViewList')._object?.themeConfig || Local.get('tagsViewList')
    }
  })
})
</script>

<style scoped lang="scss">
.el-drawer {
  z-index: 99999;
}
h2 {
  color: #000;
  font-size: 1.2rem;
}
:deep(.el-drawer__close, .el-drawer__close-btn) {
  color: #000 !important;
}
svg {
  color: #000 !important;
}
</style>
