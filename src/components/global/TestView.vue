<template>
  <div class="tag-view-wrapper">
    <!-- tag -->
    <div
      class="tag-view"
      id="tag-view-s"
      @contextmenu.prevent="showTagDropdown($event)"
    >
      <el-tabs
        v-model="currentPath"
        type="card"
        class="demo-tabs"
        :closable="false"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="(item, index) in tagList"
          :key="item.path+'tags'"
          :closable="false"
          :label="item.meta.label"
          :name="item.path"
        >
          <template #label>
            <div class="custom-tabs-label"
                 :class="[
                   themeConfig.tagsStyle,
                   { 'active-item': item.path === currentPath },
                   { 'active-item-nimble': themeConfig.tagsStyle === 'tag-nimble' }]"
            >
              <SvgIcon
                v-if="themeConfig.isTagsviewIcon"
                class="icon-svg"
                :name="item.meta.icon"
                width="14px"
                height="14px"
                :fill="item.path === currentPath ? 'var(--el-color-primary)' : ''"
              ></SvgIcon>
              <span :style="{ marginLeft: themeConfig.isTagsviewIcon ? '' : '5px' }">
                {{ item.meta.label }}
              </span>
              <svgIcon
                v-if="index !== 0"
                @click.stop="removeTab(item.path)"
                class="close-svg"
                name="close"
                width="14px"
                height="14px"
                :fill="item.path === currentPath ? 'var(--el-color-primary)' : ''"
              ></svgIcon>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 右侧下拉菜单-->
    <div class="operate-dropdown">
      <el-dropdown @command="commandOperateDrop">
        <span class="el-dropdown-link">
          <el-icon><CaretBottom /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(item, index) in operateDropList"
              :key="item + index + 'operate'"
              :command="item.name"
              :disabled="!testOperateRules(item.name)"
            >
              <SvgIcon
                style="margin-right: 8px;"
                :name="item.icon"
                width="14px"
                height="14px">
              </SvgIcon>
              {{ t(`operate.${item.name}`) }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 右键tag出现的下拉菜单 -->
    <transition name="el-zoom-in-top">
    <div
      class="tag-drop"
      id="tag-view-f"
      v-show="tagDropObj.isShowTagDrop"
      :style="{ top: tagDropObj.fixedY, left: tagDropObj.fixedX }"
    >
      <div
        class="tag-drop-wrapper-item"
        v-for="(item, index) in operateDropList"
        :key="item + index + 'tag-drop'"
        @click="contextmenuTagDrop(item.name)"
        :class="{ disabledTagDropOpt: !testOperateRules(item.name, 'drop')}"
      >
        <SvgIcon
          style="margin-right: 8px;"
          :name="item.icon"
          width="14px"
          height="14px">
        </SvgIcon>
        {{ t(`operate.${item.name}`) }}
      </div>
    </div>
    </transition>
  </div>
</template>
<script setup>
import {inject, nextTick, onMounted, ref, watch, onBeforeUnmount} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Local} from "@/utils/storage.js";
import {useRouterInfo} from "@/stores/router.js";
import {useThemeConfig} from "@/stores/themeConfig.js";
import {storeToRefs} from "pinia";
import {useI18n} from 'vue-i18n'
import {CaretBottom} from '@element-plus/icons-vue'
import removeObjArrDuplicates from "@/utils/RemoveObjArrduplicates.js";

const { t } = useI18n()

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const storesRouterInfo = useRouterInfo();
const { tagsViewList } = storeToRefs(storesRouterInfo);

const route = useRoute()
const router = useRouter()
const reload = inject('reload')

const tagList = ref([])  // 静态渲染列表
const currentPath = ref('')  // 当前选中标签卡的path
const currentRoute = ref({})  // 当前激活的路由对象
const operateDropList = ref([  // 右侧下拉菜单
  { name: 'refresh', icon: 'refresh-drop' },
  { name: 'closeAll', icon: 'close' },
  { name: 'closeOther', icon: 'close' },
  { name: 'closeLeft', icon: 'close-left' },
  { name: 'closeRight', icon: 'close-right' }
])
const tagDropObj = ref({  // 右键tag显示下拉菜单
  fixedX: '',   // 菜单定位的x和y
  fixedY: '',
  isShowTagDrop: false,
  index: null,
  tagRoute: {}
})

// 删除标签
const removeTab = targetName => {
  console.log('targetName', targetName)
  tagList.value.forEach((item, index) => {
    if (item.path === targetName) {
      // 将要删除的从tagList中splice掉
      tagList.value.splice(index, 1)
      // 如果删除的是正在激活的 那么
      if (targetName === currentRoute.value.path) {
        // 删除的是正在激活的 并且当它是数组的最后一条时 就让删除后继续显示最后一条
        if (index === tagList.value.length) {
          currentRoute.value = tagList.value[index-1]
        } else {
          // 删除的是正在激活的 并且不是最后一条 就让删除后继续显示它原来的后一条
          currentRoute.value = tagList.value[index]
        }
      }
      currentPath.value = currentRoute.value.path
      Local.set('currentRoute', [currentRoute.value])
    }
  })
  router.push(currentRoute.value.path)
  tagsViewList.value = tagList.value
  Local.set('tagsViewList', tagsViewList.value)
}

// 右键显示下拉
const showTagDropdown = (event) => {
  // nextTick(() => {
  //   tagDropObj.value.isShowTagDrop = false
  // })
  // console.log(event)
  event.preventDefault();
  // clientX 右键的地方距离浏览器左边的距离
  const { clientX } = event;
  // 获取所有tags的dom
  const tabPanes = document.getElementsByClassName('el-tabs__item')
  for (let i = 0; i < tabPanes.length; i++) {
    let x1 = tabPanes[i].clientLeft, // tag元素左边距离浏览器左边的距离
      x2 = tabPanes[i].offsetWidth + x1, // tag元素右边距离浏览器左边的位置 offsetWidth是tag的宽度
      pLeft = tabPanes[i].getBoundingClientRect().x // 父元素tag-view左侧距离浏览器左侧的距离
    // 判断点击的位置是否在某个tag内部
    if (clientX >= x1 + pLeft && clientX <= x2 + pLeft) {
      tagDropObj.value.isShowTagDrop = true
      tagDropObj.value.tagRoute = tagList.value[i]
      tagDropObj.value.index = i
      tagDropObj.value.fixedX = pLeft  + 'px'
      tagDropObj.value.fixedY =
        tabPanes[i].getBoundingClientRect().y +
        tabPanes[i].offsetHeight +
        5 + 'px'
    }
  }
}
// 点击其他位置隐藏
const handleClickOutside = event => {
  // 右键下拉菜单的隐藏
  // const div1 = document.querySelector('#tag-view-s');
  const div2 = document.querySelector('#tag-view-f');
  if (div2 && !div2.contains(event.target)) {
    tagDropObj.value.isShowTagDrop = false
  }
}
// 选择操作
const contextmenuTagDrop = val => {
  if (val === 'refresh') {
    // 刷新
    if (currentPath.value === tagList.value[tagDropObj.value.index].path) {
      console.log(reload)
      reload()
    }
    else currentPath.value = tagList.value[tagDropObj.value.index].path
  }
  else closeTagHandle(val) // 关闭
  tagDropObj.value.isShowTagDrop = false
}
// 右键tag后选择下拉中关闭的那些选项
const closeTagHandle = val => {
  // 关闭全部
  if (val === 'closeAll') {
    // 将tagList中的tag全部删除只剩下首页
    tagList.value.splice(1, tagList.value.length - 1)
    currentPath.value = tagList.value[0].path  // 激活首页
  }
  // 关闭其他
  else if (val === 'closeOther') {
    // 将tagList重置为只有首页跟正在激活的那一条
    tagList.value = [ tagList.value[0], tagDropObj.value.tagRoute ]
    tagList.value = removeObjArrDuplicates(tagList.value, 'children')
    currentPath.value = tagDropObj.value.tagRoute.path
  }
  // 关闭左右侧
  else {
    tagList.value.forEach((item, index) => {
      if (item.path === tagDropObj.value.tagRoute.path) {
        // 关闭左侧将首页跟正在激活的中间的全部关闭
        if (val === 'closeLeft') tagList.value.splice(1, index - 1)
        // 关闭右侧 将正在激活的右侧的全部关闭
        else if (val === 'closeRight') tagList.value.splice(index + 1, tagList.value.length - (index + 1))
        currentPath.value = tagDropObj.value.tagRoute.path
      }
    })
  }
  tagsViewList.value = tagList.value
  Local.set('tagsViewList', tagsViewList.value)
}
// 右侧下拉操作选项的禁用规则
const testOperateRules = (rule, type) => {
  let cIndex = 0
  if (type) {
    cIndex = tagDropObj.value.index
  } else {
    tagList.value.forEach((item, index) => {
      if (item.path === currentPath.value) cIndex = index
    })
  }
  if (rule === 'closeLeft') {
    // 当前选中一条tag 右侧下拉菜单实现禁用'关闭左侧'
    // 关闭左侧 那么选中的必须是第三个开始 第二个的左侧是首页不可关闭左侧
    if (tagList.value.length >= 3) {
      if(cIndex >= 2) return true
    }
    return false
  } else if (rule === 'closeRight') {
    // 关闭右侧 只要不是最后一个都显示关闭
    return cIndex !== tagList.value.length - 1
  }
  else if (rule === 'closeAll') return !(tagList.value.length === 1)
  else if (rule === 'closeOther') {
    // 只有一条即首页时或者只有两条时不能关闭首页 禁用关闭其他
    if (tagList.value.length === 1) return false // 只有首页禁用
    if (tagList.value.length === 2) return cIndex === 0 // 2条的时候 只有首页能关闭其他
    else return true
  }
  else return true
}
// 点击右侧下拉操作
const commandOperateDrop = val => {
  if (val === 'refresh') reload() // 刷新
  else closeHandle(val) // 关闭
}
// 关闭
const closeHandle = val => {
  // 关闭全部
  if (val === 'closeAll') {
    // 将tagList中的tag全部删除只剩下首页
    tagList.value.splice(1, tagList.value.length - 1)
    currentPath.value = tagList.value[0].path  // 激活首页
  }
  // 关闭其他
  else if (val === 'closeOther') {
    // 将tagList重置为只有首页跟正在激活的那一条
    tagList.value = [ tagList.value[0], currentRoute.value ]
    tagList.value = removeObjArrDuplicates(tagList.value, 'children')
  }
  // 关闭左右侧
  else {
    tagList.value.forEach((item, index) => {
      if (item.path === currentPath.value) {
        // 关闭左侧将首页跟正在激活的中间的全部关闭
        if (val === 'closeLeft') tagList.value.splice(1, index - 1)
        // 关闭右侧 将正在激活的右侧的全部关闭
        else if (val === 'closeRight') tagList.value.splice(index + 1, tagList.value.length - (index + 1))
      }
    })
  }
  tagsViewList.value = tagList.value
  Local.set('tagsViewList', tagsViewList.value)
}

// 监听点击tag
watch(() => currentPath.value, val => {
  currentRoute.value = tagList.value.find(item => item.path === val)
  Local.set('currentRoute', [currentRoute.value])
  router.push(val)
})

// 数据初始化
const initData = () => {
  nextTick(() => {
    if(Local.get('currentRoute')) {
      currentRoute.value = Local.get('currentRoute')[0]
      tagList.value = tagsViewList.value
      currentPath.value = currentRoute.value?.path || tagList.value[0]?.path || ''
    }
  })
}
// 监听路由变化 每次有新的就添加到里面去
watch(() => route.path, val => {
  initData()
  // currentRoute.value = tagList.value.find(item => item.path === val)
  // Local.set('currentRoute', [currentRoute.value])
  // router.push(val)
})
onMounted(() => {
  // 首页固定加入到数组中
  initData()
  document.addEventListener('click', handleClickOutside);
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
})
</script>
<style scoped lang="scss">
.tag-view-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  .tag-view {
    height: 40px;
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 50px; /* 留出右侧div的宽度 */
    .el-tabs {
      height: 100%;
      padding: 0 5px !important;
      :deep(.el-tabs__item) {
        margin: 0;
        padding: 0 !important;
      }
      .custom-tabs-label {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 10px;
        transition: all 1s;
        svg {
          transition: all 1s;
        }
        .icon-svg {
          margin-right: 3px;
        }
        .close-svg {
          margin-left: 8px;
          transition: all 1s;
        }
        .close-svg:hover {
          border: 1px solid var(--el-color-primary);
          border-radius: 100px;
          padding: 2px;
        }
        :deep(.is-active) {

        }
      }
      .custom-tabs-label:hover {
        background-color: var(--el-color-primary-light-2);
        svg {
          fill: var(--el-color-primary) !important;
        }
      }
      .active-item {
        background-color: var(--el-color-primary-light-2);
      }
      // 矩形
      .tag-rectangle {

      }
      // 圆角
      .tag-card {
        border: 1px solid #e8e6e6;
        border-radius: 4px;
        height: 30px;
        margin-right: 6px;
        margin-top: -1px;
      }
      // 灵动
      .tag-nimble {
        height: 30px;
        margin-right: 6px;
        margin-top: -1px;
        //border-bottom: 2px solid transparent;
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
        position: relative;
        overflow: hidden;
        transition: all 1s;
      }
    }
    :deep(.el-tabs__nav-prev), :deep(.el-tabs__nav-next) {
      height: 30px !important;
      line-height: 45px !important;
    }
  }

  .operate-dropdown {
    flex-shrink: 0;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    height: 23px;
    width: 23px;
    text-align: center;
    color: #fff;
    background-color: $PageMainColor;
    cursor: pointer;
    box-shadow: $BoxShadow;
    border-radius: 4px;
    .el-dropdown {
      margin-top: 4px;
    }
  }

  .tag-drop {
    position: fixed;
    background-color: #fff;
    border-radius: 6px;
    padding: 5px 0;
    box-shadow: $BigBoxShadow;
    z-index: 666;
    .tag-drop-wrapper-item {
      display: flex;
      align-items: center;
      color: #5a5959;
      padding: 10px 15px;
      font-size: 0.9rem;
      cursor: pointer;
    }
    .tag-drop-wrapper-item:hover {
      background-color: var(--el-color-primary-light-5);
      color: #fff;
      svg {
        fill: #fff;
      }
    }
    .disabledTagDropOpt {
      color: var(--el-color-info-light-5);
      background-color: #fff;
      cursor: not-allowed;
      //pointer-events: none;
      svg {
        fill: var(--el-color-info-light-5);
      }
    }
    .disabledTagDropOpt:hover {
      color: var(--el-color-info-light-5);
      background-color: #fff;
      svg {
        fill: var(--el-color-info-light-5);
      }
    }
  }
  .tag-drop::before {
    content: "";
    position: absolute;
    top: -15px; /* 控制箭头位置 */
    left: 50%; /* 控制箭头居中 */
    border: 8px solid transparent;
    border-bottom-color: #fff; /* 控制箭头颜色 */
    transform: translateX(-50%); /* 控制箭头居中 */
  }
}
</style>
<style scoped lang="scss">
.demo-tabs > .el-tabs__content {
  display: none !important;
  margin: 0 !important;
  padding: 0 !important;
}
:deep(.el-tabs__item) {
  border: none !important;
}
:deep(.el-tabs__nav) {
  border: none !important;
}
:deep(.el-tabs__header) {
  //height: 30px !important;
  border: none !important;
  margin: 0 !important;
}
</style>
