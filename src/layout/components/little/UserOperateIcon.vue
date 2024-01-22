<template>
  <el-tooltip
    class="box-item"
    effect="light"
    :content="title"
    placement="bottom"
  >
    <slot></slot>
  </el-tooltip>
</template>

<script setup>
defineProps({
  title: {
    required: true,
    type: String
  },
})
</script>

<style scoped>

</style>