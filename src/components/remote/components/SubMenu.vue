<template>
  <div class="children" v-for="(item, childIndex) in child.children" :key="childIndex">
    <div>{{ item.meta.label }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  child: {
    required: true,
    type: Array,
  }
})
</script>

<style scoped>

</style>