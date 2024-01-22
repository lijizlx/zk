<template>
  <div class="user-operation">
    <el-popover
      placement="top-start"
      title=""
      trigger="click"
    >
      <template #reference>
        <el-input
          v-model="searchValue"
          clearable
          :placeholder="t('system.choseTip')"
          @clear="clearSearch"
          :prefix-icon="Search"
        >
        </el-input>
      </template>
      <el-tree
        :data="menuList"
        :props="defaultProps"
        :current-node-key="currentNodeKey"
        node-key="path"
        @node-click="handleNodeClick"
        :highlight-current="true"
        :default-expand-all="true"
        class="tree-select" />
    </el-popover>
    <OperateIcon :title="t('userOperate.setUI')">
      <SvgIcon name="theme"
               :fill="(themeConfig.layout === 'sideSimp' || themeConfig.layout === 'sideSplit' || themeConfig.layout === 'classic') ? '#5a5959' : '#fff'"
               height="20px" width="20px" @click="clickOperateIcon('界面设置')"/>
    </OperateIcon>
    <OperateIcon :title="t('userOperate.lockScreen')">
      <SvgIcon name="lock"
               :fill="(themeConfig.layout === 'sideSimp' || themeConfig.layout === 'sideSplit' || themeConfig.layout === 'classic') ? '#5a5959' : '#fff'"
               height="20px" width="20px" @click="clickOperateIcon('锁屏')"/>
    </OperateIcon>
    <OperateIcon :title="t('userOperate.alarmInfo')">
      <SvgIcon name="rings"
               :fill="(themeConfig.layout === 'sideSimp' || themeConfig.layout === 'sideSplit' || themeConfig.layout === 'classic') ? '#5a5959' : '#fff'"
               height="20px" width="20px" @click="clickOperateIcon('告警信息')"/>
    </OperateIcon>
    <el-dropdown style="margin-top: 3px" @command="switchLanguage">
      <span class="el-dropdown-link">
        <SvgIcon name="language"
                 :fill="(themeConfig.layout === 'sideSimp' || themeConfig.layout === 'sideSplit' || themeConfig.layout === 'classic') ? '#5a5959' : '#fff'"
                 height="20px" width="20px"/>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh-cn">中文简体</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <OperateIcon :title="themeConfig.isFullScreen ? t('userOperate.exitFullScreen') : t('userOperate.fullScreen')">
      <SvgIcon v-if="!themeConfig.isFullScreen" name="fullScreen"
               :fill="(themeConfig.layout === 'sideSimp' || themeConfig.layout === 'sideSplit' || themeConfig.layout === 'classic') ? '#5a5959' : '#fff'"
               height="25px" width="25px" @click="clickOperateIcon('全屏')"/>
      <SvgIcon v-else name="fullScreen-exit"
               :fill="(themeConfig.layout === 'sideSimp' || themeConfig.layout === 'sideSplit' || themeConfig.layout === 'classic') ? '#5a5959' : '#fff'"
               height="25px" width="25px" @click="clickOperateIcon('退出全屏')"/>
    </OperateIcon>
    <SvgIcon class="clickable-element" :class="{ rotating: isRotating }" name="reload" width="17px" height="17px"
             :fill="(themeConfig.layout === 'sideSimp' || themeConfig.layout === 'sideSplit' || themeConfig.layout === 'classic') ? '#5a5959' : '#fff'" @click="refresh"></SvgIcon>
    <el-dropdown @command="commandUser" class="user-avatar">
      <div class="avatar-wrapper el-dropdown-link">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span :style="{ color: (themeConfig.layout === 'sideSimp' || themeConfig.layout === 'sideSplit' || themeConfig.layout === 'classic') ? '#5a5959' : '#fff' }">admin</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="userinfo" divided><el-icon><User /></el-icon>{{ t('userOperate.personInfo') }}</el-dropdown-item>
          <el-dropdown-item command="exit" divided><el-icon><SwitchButton /></el-icon>{{ t('userOperate.exitSys') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dialog
      v-model="showLockScreenTips"
      :title="t('system.lockScreenTip')"
      width="30%"
    >
      <LockScreen @closeLockScreen="closeLockScreen"/>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { storeToRefs } from 'pinia'
import { Local } from "@/utils/storage.js";
import { dynamicRoutes } from "@/router/index.js"
import router from "@/router/index.js";
import { useThemeConfig } from "@/stores/themeConfig.js";
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

import { Search, User, SwitchButton, ArrowDown } from '@element-plus/icons-vue'
import OperateIcon from './little/UserOperateIcon.vue'
import LockScreen from '../../layout/components/LockScreenForm.vue'

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

let searchValue = ref('')     // 全局搜索输入内容
let currentNodeKey = ref('')    // 全局搜索下拉选中节点
const menuList = dynamicRoutes  // 全局搜索下拉菜单列表
const defaultProps = {
  children: 'children',
  label: 'name',
}
let showLockScreenTips = ref(false) // 是否显示锁屏的弹出框
const reload = inject('reload')
const isRotating = ref(false)

const clickOperateIcon = title => {
  if (title === '全屏') {
    themeConfig.value.isFullScreen = true
    Local.set('themeConfig', themeConfig.value)
    document.documentElement.requestFullscreen().catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else if (title === '退出全屏') {
    themeConfig.value.isFullScreen = false
    Local.set('themeConfig', themeConfig.value)
    document.exitFullscreen()
  }else if (title === '告警信息') {
    alert('告警信息')
  } else if (title === '锁屏') {
    showLockScreenTips.value = true
  } else if (title === '界面设置') {
    themeConfig.value.isDrawer = true;
    Local.set('themeConfig', themeConfig.value)
  }
}

// 点击搜索输入框下拉节点 跳转路由
const handleNodeClick = data => {
  console.log(data)
  // 将当前选中的节点保存
  currentNodeKey.value = data.path
  if (data && data.children.length === 0) {
    // 路由跳转
    router.push(data.path)
    // 将选中内容输入到输入框
    searchValue.value = data.name
    // 将当前路由信息保存到内存
    Local.set('currentRoute', data)
  }
}
// 清空搜索输入框内容
const clearSearch = () => {
  // 清空当前选中内容
  currentNodeKey.value = null
}

// 语言切换
const switchLanguage = val => {
  console.log(val)
  if (val) {
    themeConfig.value.globalI18n = locale.value = val
    Local.set('globalI18n', val)
  }
}

// 关闭锁屏提示弹窗
const closeLockScreen = () => {
  showLockScreenTips.value = false
}

const refresh = () => {
  reload()
  isRotating.value = true;
  setTimeout(() => {
    isRotating.value = false;
  }, 500); // 1秒后停止旋转
}

// 选择用户下拉 
const commandUser = command => {
  console.log(command)
  if (command === 'userinfo') {

  } else if (command === 'exit') {

  }
}
</script>

<style scoped lang="scss">
:deep(.el-input) {
  width: 140px;
}
:deep(.el-tree-node.is-current .el-tree-node__label) {
  color: var(--el-color-primary);  /* 设置选中节点的字体颜色 */
}
:deep(.el-dialog__footer) {
  padding: 0 !important;
}
.user-operation {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  > * {
    flex-shrink: 0;
    margin: 0 6px;
  }
  svg {
    cursor: pointer !important;
  }
  .avatar-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      margin-left: 5px;
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .rotating {
    animation: rotate 1s linear;
  }
  .user-avatar {
    margin-left: 10px;
  }
}
.el-input {
  margin-right: 20px;
}
</style>