<template>
  <TransitionWrapper>
    <div class="wr">
      <r-button type="plain">按钮</r-button>
      <r-button type="primary">按钮</r-button>
      <r-button type="info" size="small">按钮</r-button>
      <r-button type="info" size="large">按钮</r-button>
      <r-button type="danger">按钮</r-button>
      <r-button type="warning">按钮</r-button>
      <r-button type="success">按钮</r-button>
    </div>
  </TransitionWrapper>
</template>

<script setup>
import { onMounted, ref } from "vue"

onMounted(() => {
  // alert('AAA')
})
</script>

<style scoped lang="scss">
.wr {
  width: 100%;
}
</style>
