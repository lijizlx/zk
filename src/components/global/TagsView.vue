<template>
  <div class="tag-wrapper" id="tag-wrapper">
    <div class="left-btn" @click="scrollLeft" v-show="isOverRight">
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div class="tag-view" id="tag-view" ref="tagViewWrapperRef">
      <template v-for="(tag, index) in tagList" :key="tag.path + 'tag'">
        <transition name="">
          <div class="tags-item tag-card" @click.prevent.stop="clickTag(tag)" v-show="themeConfig.tagsStyle==='tag-card'"
               :class="{ backgroundColor: tag.path===currentRoute.path ? 'tag-card-active' : ''}"
               :id="`item-${index}`"
          >
            <div class="tag-content">
              <SvgIcon :name="tag.meta.icon" :fill="tag.path===currentRoute.path ? 'var(--el-color-primary)' : '#353434'" width="14px" height="14px"></SvgIcon>
              <span :style="{ color: tag.path===currentRoute.path ? 'var(--el-color-primary)' : '#353434'}">{{ tag.meta.label }}</span>
              <div v-if="tag.path!=='/wel'" class="delete-btn" :class="{ 'delete-btn-active': tag.path===currentRoute.path }"
                   @click.prevent.stop="deleteTag(tag)"
              >×</div>
            </div>
          </div>
        </transition>
        <transition name="">
          <div class="tags-item tag-nimble" @click.prevent.stop="clickTag(tag)" v-show="themeConfig.tagsStyle==='tag-nimble'"
               :class="{ 'tag-nimble-active': tag.path===currentRoute.path }"
               :id="`item-${index}`"
          >
            <div class="tag-content">
              <SvgIcon :name="tag.meta.icon" :fill="tag.path===currentRoute.path ? 'var(--el-color-primary)' : '#353434'" width="14px" height="14px"></SvgIcon>
              <span :style="{ color: tag.path===currentRoute.path ? 'var(--el-color-primary)' : '#353434', marginRight: tag.path!=='/wel' ? '10px' : '' }">{{ tag.meta.label }}</span>
              <div class="slot" v-if="tag.path!=='/wel'"></div>
              <div v-if="tag.path!=='/wel'" class="delete-btn" :class="{ 'delete-btn-active': tag.path===currentRoute.path }"
                   @click.prevent.stop="deleteTag(tag)"
              >×</div>
            </div>
          </div>
        </transition>
        <transition name="">
          <div class="tags-item tag-rectangle" @click.prevent.stop="clickTag(tag)" v-show="themeConfig.tagsStyle==='tag-rectangle'"
               :id="`item-${index}`"
          >
            <div class="tag-content">
              <SvgIcon :name="tag.meta.icon" :fill="tag.path===currentRoute.path ? 'var(--el-color-primary)' : '#353434'" width="14px" height="14px"></SvgIcon>
              <span :style="{ color: tag.path===currentRoute.path ? 'var(--el-color-primary)' : '#353434'}">{{ tag.meta.label }}</span>
              <div v-if="tag.path!=='/wel'" class="delete-btn" :class="{ 'delete-btn-active': tag.path===currentRoute.path }"
                   @click.prevent.stop="deleteTag(tag)"
              >×</div>
            </div>
          </div>
        </transition>
      </template>
    </div>
    <div class="right-btn" @click="scrollRight" v-show="isOverRight">
      <el-icon><ArrowRight /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Local } from "@/utils/storage.js";
import { useRouterInfo } from "@/stores/router.js";
import { useThemeConfig } from "@/stores/themeConfig.js";
import { storeToRefs } from "pinia";

import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const storesRouterInfo = useRouterInfo();
const { tagsViewList } = storeToRefs(storesRouterInfo);

const route = useRoute()
const router = useRouter()
const tagList = ref([])
const currentRoute = ref({})
const tagViewWrapperRef = ref()
const isOverRight = ref(false)

// 向左移动滚动位置
const scrollLeft = () => {
  tagViewWrapperRef.value.scrollBy({
    left: -150,
    behavior: 'smooth'
  })
};
// 向右移动滚动位置
const scrollRight = () => {
  // console.log('滚动了')
  tagViewWrapperRef.value.scrollBy({
    left: 150,
    behavior: 'smooth'
  })
};

// 点击tag
const clickTag = tag => {
  console.log(tag)
  currentRoute.value = tag
  Local.set('currentRoute', [currentRoute.value])
  router.push(tag.path)
}

// 删除tag
const deleteTag = tag => {
  console.log(currentRoute.value)
  console.log(tag)
  tagList.value.forEach((item, index) => {
    if (item.path === tag.path) {
      // 将要删除的从tagList中splice掉
      tagList.value.splice(index, 1)
      // 如果删除的是正在激活的 那么
      if (tag.path === currentRoute.value.path) {
        // 删除的是正在激活的 并且当它是数组的最后一条时 就让删除后继续显示最后一条
        if (index === tagList.value.length) {
          currentRoute.value = tagList.value[index-1]
        } else {
          // 删除的是正在激活的 并且不是最后一条 就让删除后继续显示它原来的后一条
          currentRoute.value = tagList.value[index]
        }
      }
      Local.set('currentRoute', [currentRoute.value])
    }
  })
  router.push(currentRoute.value.path)
  tagsViewList.value = tagList.value
  Local.set('tagsViewList', tagsViewList.value)
  nextTick(() => {
    const tagsWidth = document.getElementById('tag-view').clientWidth
    const wrapperWidth = document.getElementById('tag-wrapper').clientWidth
    console.log(tagsWidth / wrapperWidth )
    // 当tags太多 超过了容器
    isOverRight.value =!( tagsWidth / wrapperWidth < 0.86);
  })
}

const init = () => {
  if(Local.get('currentRoute')) {
    currentRoute.value = Local.get('currentRoute')[0]
    tagList.value = tagsViewList.value
  }
  nextTick(() => {
    const tagsWidth = document.getElementById('tag-view').clientWidth
    const wrapperWidth = document.getElementById('tag-wrapper').clientWidth
    console.log(tagsWidth / wrapperWidth )
    // 当tags太多 超过了容器
    isOverRight.value =!( tagsWidth / wrapperWidth < 0.86);
  })
  if (isOverRight.value) {
    tagViewWrapperRef.value.scrollLeft = tagViewWrapperRef.value.scrollWidth - tagViewWrapperRef.value.clientWidth
  }
}
// 监听路由变化 每次有新的就添加到里面去
watch(() => tagsViewList.value, () => {
  nextTick(() => {
    init()
  })
})

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.tag-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .right-btn, .left-btn {
    width: 30px;
    height: 100%;
    line-height: 52px;
    text-align: center;
  }
}
.tag-view::-webkit-scrollbar {
  display: none; /* Webkit (Safari, Chrome) */
}
.tag-view {
  max-width: 88%;
  height: 100%;
  display: flex;
  align-items: center;
  //margin: 0 10px;
  position: relative;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  .tags-item {
    flex-shrink: 0;
    padding: 10px;
    cursor: pointer;
    font-size: 0.9rem;
    .tag-content {
      display: flex;
      align-items: center;
      box-sizing: content-box !important;
      span {
        margin-left: 5px;
      }
      .slot {
        width: 12px;
        height: 2px;
      }
      .delete-btn {
        position: absolute;
        right: 8px;
        top: 10px;
        margin-left: 10px;
        transition: all 0.3s;
        width: 15px;
        height: 15px;
        color: #fff;
        text-align: center;
        line-height: 13px;
        font-size: 1.1rem;
      }
      .delete-btn:hover {
        color: red;
      }
      .delete-btn-active {
        width: 15px;
        height: 15px;
        text-align: center;
        line-height: 13px;
        //background-color: var(--el-color-primary-light-3);
        color: var(--el-color-primary);
        border-radius: 100px;
      }
    }
  }
  // tag-card(卡片) tag-rectangle(矩形) tag-nimble(灵动) 默认tag-card
  .tag-card {
    border: 1px solid var(--el-border-color-dark);
    border-radius: 4px;
    margin-right: 8px;
  }
  .tag-nimble {
    border-bottom: 2px solid transparent;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    margin-right: 5px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    transition: all 0.5s;
  }
  .tag-rectangle {

  }
  .tag-nimble::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background-color: var(--el-color-primary); /* 边框颜色 */
    transition: left 0.3s, height 0.3s; /* 位置和高度过渡效果 */
  }
  .tag-nimble:hover::after {
    left: 0;
    height: 2px;
  }
  .tag-nimble-active {
    background-color: var(--el-color-primary-light-1);
  }
   .tag-nimble-active::after{
     left: 0;
     height: 2px;
   }
  .tag-nimble:hover {
    background-color: var(--el-color-primary-light-1);
    svg {
      fill: var(--el-color-primary) !important;
    }
    span {
      color:var(--el-color-primary) !important ;
    }
    .delete-btn {
      width: 15px;
      height: 15px;
      text-align: center;
      line-height: 13px;
      //background-color: var(--el-color-primary-light-3);
      color: var(--el-color-primary);
      border-radius: 100px;
    }
  }
  .demo-tabs > .el-tabs__content {
    display: none !important;
  }
  :deep(.el-tabs__item) {
    border: none !important;
  }
  :deep(.el-tabs__nav) {
    border: none !important;
  }
  :deep(.el-tabs__header) {
    border: none !important;
    margin: 0 !important;
  }
}
</style>