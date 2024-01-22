<template>
  <div class="global-setting scroll-container">
    <el-alert :title="t('setting.tips')" type="error" :closable="false" />
    <!-- 主题颜色 -->
    <el-divider content-position="center">{{ t('setting.dividerThemeColor') }}</el-divider>
    <div class="theme-color common-wrapper">
      <div class="theme-color-item common-flex"
           v-for="item in themeColors" :key="item.id"
           @click="switchThemeColor(item)"
           :style="{border: themeColorActive === item.name ? '2px solid var(--el-color-primary)' : ''}">
        <p class="color-circle" :class="{ themeColorActiveClass: themeColorActive === item.name }" :style="{backgroundColor: item.name}"></p>
      </div>
    </div>
    <!-- 导航栏模式 -->
    <el-divider content-position="center">{{ t('setting.varBarMode') }}</el-divider>
    <div class="nav-bar-mode common-wrapper">
      <!-- classic -->
      <el-tooltip class="box-item" :content="t('setting.classicNav')" placement="top">
        <div class="nav-bar-mode-item common-flex" @click="switchNavBar('classic')"
             :style="{border: navBarActive === 'classic' ? '2px solid var(--el-color-primary)' : ''}">
          <div class="item">
            <div class="transverse-header" :style="{backgroundColor: themeConfig.primary}"></div>
            <div class="classic-content">
              <div class="classic-content-left" :style="{backgroundColor: setColor(themeConfig.primary, 0.6)}"></div>
              <div class="classic-content-right main" :style="{backgroundColor: setColor(themeConfig.primary, 0.3)}"></div>
            </div>
          </div>
        </div>
      </el-tooltip>
      <!-- sideSimp 左侧仅主菜单 -->
      <el-tooltip class="box-item" :content="t('setting.sideSimpNav')" placement="top">
        <div class="nav-bar-mode-item common-flex" @click="switchNavBar('sideSimp')"
             :style="{border: navBarActive === 'sideSimp' ? '2px solid var(--el-color-primary)' : ''}">
          <div class="item side-simp-content">
            <div class="side-simp-left" :style="{backgroundColor: themeConfig.primary}"></div>
            <div class="side-simp-right" :style="{backgroundColor: setColor(themeConfig.primary, 0.6)}"></div>
          </div>
        </div>
      </el-tooltip>
      <!-- sideSplit 左侧主菜单和次菜单都显示 -->
      <el-tooltip class="box-item" :content="t('setting.sideSplitNav')" placement="top">
        <div class="nav-bar-mode-item common-flex" @click="switchNavBar('sideSplit')"
             :style="{border: navBarActive === 'sideSplit' ? '2px solid var(--el-color-primary)' : ''}">
          <div class="item side-split-content">
            <div class="side-split-left-1" :style="{backgroundColor: themeConfig.primary}"></div>
            <div class="side-split-left-2" :style="{backgroundColor: setColor(themeConfig.primary, 0.6)}"></div>
            <div class="side-split-right main" :style="{backgroundColor: setColor(themeConfig.primary, 0.3)}"></div>
          </div>
        </div>
      </el-tooltip>
      <!-- transverse -->
      <el-tooltip class="box-item" :content="t('setting.transverseNav')" placement="top">
        <div class="nav-bar-mode-item common-flex" @click="switchNavBar('transverse')"
             :style="{border: navBarActive === 'transverse' ? '2px solid var(--el-color-primary)' : ''}">
          <div class="item">
            <div class="transverse-header" :style="{backgroundColor: themeConfig.primary}"></div>
            <div class="transverse-main main" :style="{backgroundColor: setColor(themeConfig.primary, 0.6)}"></div>
          </div>
        </div>
      </el-tooltip>
      <!-- topSide 头部主菜单 左侧子菜单 -->
      <el-tooltip class="box-item" :content="t('setting.topSideNav')" placement="top">
        <div class="nav-bar-mode-item common-flex" @click="switchNavBar('topSide')"
             :style="{border: navBarActive === 'topSide' ? '2px solid var(--el-color-primary)' : ''}">
          <div class="item">
            <div class="transverse-header" :style="{backgroundColor: themeConfig.primary}"></div>
            <div class="classic-content">
              <div class="classic-content-left" :style="{backgroundColor: setColor(themeConfig.primary, 0.6)}"></div>
              <div class="classic-content-right main" :style="{backgroundColor: setColor(themeConfig.primary, 0.3)}"></div>
            </div>
          </div>
        </div>
      </el-tooltip>
    </div>

    <!-- 主题组件动画 -->
    <el-divider content-position="center">{{ t('setting.pageAnimation') }}</el-divider>
    <!-- 取消动画效果 -->
    <el-tooltip :content="t('setting.switchBtn')" placement="top">
      <el-switch
        v-model="isSwitchPageAnimation"
        style="--el-switch-on-color: var(--el-color-primary); --el-switch-off-color: var(--el-color-info)"
        active-value="开启动画"
        inactive-value="取消动画"
        @change="switchPageAnimationOnOff"
      />
    </el-tooltip>
    <div class="page-animation common-wrapper">
      <!-- slide-right -->
      <el-tooltip :content="t('setting.slideRightEffect')" placement="bottom">
        <div class="page-animation-item common-flex" @click="switchPageAnimation('slide-right')"
             :style="{border: pageAminationActive === 'slide-right' ? '2px solid var(--el-color-primary)' : ''}">
          <transition name="fade1">
            <div v-if="showSlideRight" class="movingDiv1 content" :style="{ backgroundColor: pageAminationActive === 'slide-right' ? 'var(--el-color-primary-light-2)' : '' }"></div>
          </transition>
        </div>
      </el-tooltip>

      <!-- slide-top -->
      <el-tooltip :content="t('setting.elideTopEffect')" placement="bottom">
        <div class="page-animation-item common-flex" @click="switchPageAnimation('slide-top')"
             :style="{border: pageAminationActive === 'slide-top' ? '2px solid var(--el-color-primary)' : ''}">
          <transition name="fade2">
            <div v-if="showSlideTop" class="movingDiv2 content" :style="{ backgroundColor: pageAminationActive === 'slide-top' ? 'var(--el-color-primary-light-2)' : '' }"></div>
          </transition>
        </div>
      </el-tooltip>

      <!-- opacitys -->
      <el-tooltip :content="t('setting.opacityEffect')" placement="bottom">
        <div class="page-animation-item common-flex" @click="switchPageAnimation('opacitys')"
             :style="{border: pageAminationActive === 'opacitys' ? '2px solid var(--el-color-primary)' : ''}">
          <transition name="fade3">
            <div v-if="showOpacitys" class="movingDiv3 content" :style="{ backgroundColor: pageAminationActive === 'opacitys' ? 'var(--el-color-primary-light-2)' : '' }"></div>
          </transition>
        </div>
      </el-tooltip>
    </div>

    <!-- tagStyle -->
    <el-divider content-position="center">{{ t('setting.tagSetting') }}</el-divider>
    <!-- 是否开启tagsview -->
    <div class="tags-style">
      <p>{{ t('setting.tagPageShow') }}</p>
      <RemoteSelect :width="100" :options="isShowTagsOptions" :modelData="'isTagsview'"/>
    </div>
    <!-- 标签外观风格 -->
    <div class="tags-style">
      <p>{{ t('setting.tagStyle') }}</p>
      <RemoteSelect :width="100" :options="tagStyleOptions" :modelData="'tagsStyle'"/>
    </div>
    <!-- 标签图标开启关闭 -->
    <div class="tags-style">
      <p>{{ t('setting.tagIcon') }}</p>
      <RemoteSelect :width="100" :options="tagIconOptions"  :modelData="'isTagsviewIcon'"/>
    </div>
  </div>
</template>

<script setup>
import {ref, nextTick, onUnmounted, onMounted, computed, reactive, watch, inject} from 'vue'
import { Local } from "@/utils/storage.js"
import { storeToRefs } from 'pinia'
import { useThemeConfig } from '@/stores/themeConfig.js'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import setColor from "@/utils/setPrimaryColorOpacity.js";

import RemoteSelect from '@/components/element/controlled/RemoteSelect.vue'

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

// 主题颜色列表
const themeColors = ref([
  { name: '#2482BF', id: 'themeColor1' },
  { name: '#248bf6', id: 'themeColor2' },
  { name: '#18a058', id: 'themeColor3' },
  { name: '#f30e88', id: 'themeColor4' },
  { name: '#ed6808', id: 'themeColor5' },
  { name: '#a308ef', id: 'themeColor6' }
])
const themeColorActive = ref('#2482BF') // 当前选中主题色
const navBarActive = ref('transverse') // 当前激活菜单导航布局模式
const isSwitchPageAnimation = ref('开启动画') // 页面切换动画 切换是否开启动画的开关的值
const pageAminationActive = ref('slide-right') // 当前选中的动画模式
const showSlideRight = ref(false) // 用于设计动画的模拟图
const showSlideTop = ref(false) // 用于设计动画的模拟图
const showOpacitys = ref(false) // 用于设计动画的模拟图
// 标签风格
const tagStyleOptions = [
  { value: 'tag-card', label: t('setting.tagStyleCard') },
  { value: 'tag-nimble', label: t('setting.tagStyleNimble') },
  { value: 'tag-rectangle', label: t('setting.tagStyleRectangle') }
]
const tagIconOptions = [
  { value: true, label: t('setting.tagIconOpen') },
  { value: false, label: t('setting.tagIconClose') },
]
const isShowTagsOptions = [
  { value: true, label: t('text.isOk') },
  { value: false, label: t('text.isNo') },
]
// const reload = inject('reload')
// const isRotating = ref(false)
//
// // 更新组件
// const refresh = () => {
//   console.log(123)
//   // reload()
//   console.log(inject('reload'))
//   isRotating.value = true;
//   setTimeout(() => {
//     isRotating.value = false;
//   }, 500); // 1秒后停止旋转
// }

// 切换主题色
const switchThemeColor = data => {
  if (data) {
    // 将主题色的值存入到Local以及全局pinia中
    themeConfig.value.primary = themeColorActive.value = data.name
    Local.set('themeConfig', themeConfig.value)
    // 设置全局primary的值为选中的值
    document.documentElement.style.setProperty('--el-color-primary', data.name)
    // 设置primary对应的各种深浅色的值
    for (let i = 1; i < 10; i++ ) {
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, setColor(data.name,  i * 0.1))
    }
    // document.documentElement.style.setProperty(`--el-color-primary-dark`, setColor('--el-color-primary', mixBlack, 0.1))
    // nextTick(
    //   () => {refresh()
    // })
  }
}

// 切换导航栏模式
const switchNavBar = data => {
  console.log(data)
  // 将选中的导航菜单布局模式存入到Local和全局pinia中
  themeConfig.value.layout = navBarActive.value = data
  Local.set('themeConfig', themeConfig.value)
}

// 页面动画切换
const switchPageAnimation = data => {
  // 将选中的动画模式存入到Local和全局pinia中
  themeConfig.value.animation = pageAminationActive.value = data
  Local.set('themeConfig', themeConfig.value)
  isSwitchPageAnimation.value = '开启动画'
}

// 选择开启或是取消动画效果的开关回调
const switchPageAnimationOnOff = data => {
  if (data === '取消动画') {
    // 如果开关选中 取消动画 则把选中的动画模式清空 并存入Local和全局pinia
    themeConfig.value.animation = pageAminationActive.value = ''
    Local.set('themeConfig', themeConfig.value)
  } else {
    // 如果开关选中 开启动画 设置默认动画效果为'slide-right' 并存入全局中
    themeConfig.value.animation = pageAminationActive.value = 'slide-right'
    Local.set('themeConfig', themeConfig.value)
  }
}

onMounted(() => {
  // 进入页面将全局主题色从缓存中拿到 持久化
  themeColorActive.value = themeConfig.value.primary
  // 进入页面将菜单布局模式从缓存中拿到 持久化
  navBarActive.value = themeConfig.value.layout

  // 显示动画切换的动画模拟用的
  nextTick(() => {
    setInterval(() => {
      showSlideRight.value = true
      showSlideTop.value = true
      showOpacitys.value = true
    }, 1000);
  })
})
</script>

<style scoped lang="scss">
.global-setting {
  width: 100%;
  height: 100%;
  .theme-color {
    .theme-color-item {
      width: 50px;
      height: 50px;
      .color-circle {
        width: 30px;
        height: 15px;
        border-radius: 45%;
        transform: rotate(135deg);
        transition: transform 0.5s;
      }
      .themeColorActiveClass {
        transform: rotate(180deg) ;
      }
    }
  }
  .nav-bar-mode {
    .nav-bar-mode-item {
      width: 70px;
      height: 50px;
      .item {
        width: 100%;
        height: 100%;
        padding: 7px;
        .main {
          border: 1px dashed var(--el-color-primary);
        }
        .transverse-header {
          width: 100%;
          height: 8px;
          margin-bottom: 2px;
          border-top-right-radius: 6px;
          border-top-left-radius: 6px;
        }
        .transverse-main {
          width: 100%;
          height: 24px;
          border-bottom-right-radius: 6px;
          border-bottom-left-radius: 6px;
        }
        .classic-content {
          width: 100%;
          height: 24px;
          display: flex;
          align-items: center;
          .classic-content-left {
            width: 12px;
            height: 24px;
            margin-right: 2px;
            border-bottom-left-radius: 6px;
          }
          .classic-content-right {
            width: 45px;
            height: 24px;
            border-bottom-right-radius: 6px;
          }
        }
      }
      .side-simp-content {
        display: flex;
        align-items: center;
        .side-simp-left {
          width: 8px;
          height: 100%;
          border-bottom-left-radius: 6px;
          border-top-left-radius: 6px;
          margin-right: 2px;
        }
        .side-simp-right {
          width: 45px;
          height: 100%;
          border-bottom-right-radius: 6px;
          border-top-right-radius: 6px;
        }
      }
      .side-split-content {
        display: flex;
        align-items: center;
        .side-split-left-1 {
          width: 8px;
          height: 100%;
          border-bottom-left-radius: 6px;
          border-top-left-radius: 6px;
          margin-right: 2px;
        }
        .side-split-left-2 {
          width: 10px;
          height: 100%;
          margin-right: 2px;
        }
        .side-split-right {
          width: 35px;
          height: 100%;
          border-bottom-right-radius: 6px;
          border-top-right-radius: 6px;
        }
      }
    }
  }
  .page-animation {
    .page-animation-item {
      width: 100px;
      height: 60px;
      position: relative;
      .content {
        width: 80px;
        height: 40px;
        background-color: #E7E5E4;
        position: absolute;
        opacity: 0; /* 初始时设置透明度为0，实现淡入效果 */
        top: 50%;
        transform: translateY(-50%);
        border-radius: 8px;
      }
      .movingDiv1 {
        //left: -10px;
        animation: moveRight 2s ease infinite;
      }
      .movingDiv2 {
        //width: 80px;
        //height: 30px;
        animation: moveTop 2s ease infinite;
      }
      .movingDiv3 {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: opacity 2s ease infinite;
      }
    }
  }
  .el-switch {
    margin: 0 0  10px 50%;
    transform: translateX(-50%);
  }
  .common-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .common-flex {
    border: 1px solid var(--el-border-color);
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .tags-style {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 10px;
  }
  .el-divider {
    margin: 50px 0 30px 0;
  }
  :deep(.el-alert) {
    line-height: 25px;
    padding: 10px;
    font-size: 1.1rem;
  }
  :deep(.el-tooltip__popper) {
    background-color: #333 !important; /* 自定义背景颜色 */
    border-color: #f00 !important; /* 自定义边框颜色 */
  }
}
</style>