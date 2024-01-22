<template>
  <header class="header-transverse" v-if="themeConfig.layout === 'transverse'">
    <div class="logo">
      <Logo title="智慧云工业互联网-私有云"/>
      <h1>智慧云工业互联网-私有云</h1>
    </div>
    <MenuBar class="transverse-menu-bar"/>
    <UserOperate class="fixed-width"/>
  </header>
  <header class="header-classic" v-if="themeConfig.layout === 'classic'">
    <div class="logo">
      <Logo title="智慧云工业互联网-私有云"/>
      <h1>智慧云工业互联网-私有云</h1>
    </div>
    <div class="classic-header-slot"></div>
    <UserOperate class="fixed-width"/>
  </header>
  <header class="header-side-simp header-transverse" v-if="themeConfig.layout === 'sideSimp' || themeConfig.layout === 'sideSplit'">
    <div class="classic-header-slot"></div>
    <UserOperate class="fixed-width"/>
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/stores/themeConfig.js';

import MenuBar from '../components/menu/TransverseMenu.vue'
import Logo from './Logo.vue'
import UserOperate from './UserOperate.vue'

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);


</script>

<style scoped lang="scss">
.header-transverse, .header-classic, .header-side-simp {
  display: flex;
  justify-content: space-between;
  .logo {
    flex: 0 0 auto; /* 不随父元素变化而变化 */
    width: 250px; /* 设置固定长度 */
    display: flex;
    align-items: center;
  }
  .transverse-menu-bar, .classic-header-slot {
    flex: 1
  }
  .fixed-width {
    //width: 500px;
  }
}
.header-side-simp {
  background-color: #fff;
//  border-bottom: 1px solid var(--el-border-color);
//  color: var(--el-text-);
  svg {
    fill: #fff !important;
  }
}
</style>