<template>
    <template v-for="route in menuList">
      <template v-if="route.children && route.children.length > 0">
        <el-sub-menu :index="route.path">
          <template #title>
            <SvgIcon :name="route.meta.icon" width="16px" height="16px" fill="#fff"></SvgIcon>
            <span>{{ route.meta.label }}</span>
          </template>
          <template v-for="child in route.children" :key="child.path">
            <el-menu-item :index="child.path" v-if="child.children.length === 0">
              <SvgIcon :name="child.meta.icon" width="16px" height="16px" fill="#fff"></SvgIcon>
              <span>{{ child.meta.label }}</span>
            </el-menu-item>
            <el-sub-menu v-else :index="child.path">
              <template #title>
                <SvgIcon :name="route.meta.icon" width="16px" height="16px" fill="#fff"></SvgIcon>
                <span>{{ child.meta.label }}</span>
              </template>
              <ClassMenuChild :menuList="child.children"/>
            </el-sub-menu>
          </template>
        </el-sub-menu>
      </template>
      <template v-else :key="route.path">
        <el-tooltip v-if="!findParent(menuLists, route)" :content="route.meta.label" placement="right" effect="dark">
          <el-menu-item :index="route.path">
              <SvgIcon :name="route.meta.icon" width="16px" height="16px" fill="#fff"></SvgIcon>
              <span>{{ route.meta.label }}</span>
          </el-menu-item>
        </el-tooltip>
        <el-menu-item v-else :index="route.path">
          <SvgIcon :name="route.meta.icon" width="16px" height="16px" fill="#fff"></SvgIcon>
          <span>{{ route.meta.label }}</span>
        </el-menu-item>
      </template>
    </template>
</template>
<script setup>
// import { watch, ref, onMounted } from "vue";
import { findParent, findTopMostParent } from "@/utils/routeDatahandle.js";
import { dynamicRoutes } from "@/router/index.js";
// import { Local } from "@/utils/storage.js";
// import {useRoute} from "vue-router";

defineOptions({
  name: "ClassMenuChild",//组件命名
});
defineProps(["menuList"]);//父组件向子组件传递的数据

const menuLists = dynamicRoutes
// const isActive = ref('')
// const route = useRoute()
//
// const renderSubItemColor = () => {
//   let p = findTopMostParent(menuLists, Local.get('currentRoute')[0].path)
//   p && (isActive.value = p.path)
// }
// watch(() => route.path, val => {
//   renderSubItemColor()
// })
//
// onMounted(() => {
//   renderSubItemColor()
// })
// const target = arr[0].children[0].children[0]; // 目标对象：{ id: 3 }
// const target = arr[0]; // 目标对象：{ id: 3 }
// const target = arr[0]; // 目标对象：{ id: 3 }
// const target = props.menuList[0]; // 目标对象：{ id: 3 }
// const parent = findParent(arr, target); // 返回父对象：{ id: 2, children: [{ id: 3 }, { id: 4 }] }
// console.log('parent', parent);
</script>
<style scoped>
.icon {
  width: 20px;
  height: 20px;
}
svg {
   margin-right: 5px;
 }
/*:deep(.el-menu-item.is-active, .el-sub-menu.is-active) {*/
/*  background-color: var(--el-color-primary) !important;*/
/*  color: #fff !important;*/
/*}*/
</style>