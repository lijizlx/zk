<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <template v-for="(item, index) in list" :key="item.path+index">
        <el-breadcrumb-item :to="item.path === currentRote.path ? { path: item.path } : { path: '' }">
          <div class="item">
            <SvgIcon :name="item.meta.icon" width="14px" height="14px"></SvgIcon>
            {{ item.meta.label }}
          </div>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Local } from "@/utils/storage.js"
import { findTopMostParent, findAllParentRoutes } from "@/utils/routeDatahandle.js";
import { dynamicRoutes } from "@/router/index.js"
import { useRoute } from 'vue-router'

// const currentRote = Local.get('currentRoute')[0] || {}
const currentRote = ref({})
const list = ref([])
const route = useRoute()

// 渲染面包屑数据
const renderBreadCrumb = () => {
  Local.get('currentRoute') && (currentRote.value = Local.get('currentRoute')[0])
  if (currentRote.value) {
    console.log('currentRote.value', currentRote.value)
    const parentFinal = findAllParentRoutes(dynamicRoutes, currentRote.value.path)
    console.log('parentFinal', parentFinal)
    if (parentFinal) list.value = [...parentFinal, currentRote.value ]
    else list.value = [ currentRote.value, currentRote.value ]
    console.log(list.value)
  }
}
watch(() => route.path, val => {
  console.log('变化了', val)
  renderBreadCrumb()
})

onMounted(() => {
  renderBreadCrumb()
})
</script>

<style scoped lang="scss">
.bread-crumb {
  margin-left: 15px;
}
.item {
  display: flex;
  align-items: center;
  transition: all 0.5s;
  svg {
    margin-right: 3px;
    transition: all 0.5s;
  }
}
.item:hover {
  color: var(--el-color-primary);
  svg {
    fill: var(--el-color-primary);
  }
}
</style>