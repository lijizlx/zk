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
      <el-menu-item :index="route.path">
        <SvgIcon :name="route.meta.icon" width="16px" height="16px" fill="#fff"></SvgIcon>
        <span>{{ route.meta.label }}</span>
      </el-menu-item>
    </template>
  </template>
</template>
<script setup>
defineOptions({
  name: "ClassMenuChild",//组件命名
});
defineProps(["menuList"]);//父组件向子组件传递的数据
</script>
<style scoped>
.icon {
  width: 20px;
  height: 20px;
}
svg {
  margin-right: 5px;
}
</style>