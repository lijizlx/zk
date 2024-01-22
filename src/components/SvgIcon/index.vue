<template>
  <svg :style="{ width, height }">
    <use :xlink:href="`#icon-${name}`" :fill="color"></use>
  </svg>
</template>

<script setup>
defineProps({
  name: {
    required: true,
    type: String
  },
  width: {
    type: String,
    default: '1.2em'
  },
  height: {
    type: String,
    default: '1.2em'
  },
  color: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>

</style>