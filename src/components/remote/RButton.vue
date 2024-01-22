<template>
  <div class="r-button"
       :class="[
         `btn-bg-color-${type}`,
         {'btn-size-small': size === 'small'},
         {'btn-size-default': size === 'default'},
         {'btn-size-large': size === 'large'},
       ]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'
defineProps({
  type: {
    type: String,
    default: 'primary' // plain(白色背景) danger(红色背景) info(灰色背景) warning(橙红色背景) success(绿色背景)
  },
  size: {
    type: String,
    default: 'default'
  }
})
</script>

<style scoped lang="scss">
.r-button {
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  color: #fff;
  display: inline-block;
  text-align: center;
  font-size: 0.8rem;
  letter-spacing: 2px;
}
.btn-size-small {
  width: 50px;
  height: 30px;
  line-height: 28px;
  font-size: 0.65rem;
  text-align: center;
  letter-spacing: 1px;
  cursor: pointer;
}
.btn-size-default {
  width: 65px;
  height: 35px;
  line-height: 33px;
  cursor: pointer;
}
.btn-size-large {
  width: 70px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.btn-bg-color-plain {
  background-color: #fff;
  color: var(--el-text-color);
  border-color: #d7cfcf;
}
.btn-bg-color-plain:hover {
  background-color: var(--el-color-primary-light-1);
  border-color: var(--el-color-primary);
  color: var(--el-color-primary);
}
.btn-bg-color-plain:active {
  background-color: #fff;
  color: var(--el-color-primary);
}
.btn-bg-color-primary {
  background-color: var(--el-color-primary);
}
.btn-bg-color-primary:hover {
  background-color: var(--el-color-primary-light-7);
}
.btn-bg-color-primary:active {
  background-color: var(--el-color-primary);
}
.btn-bg-color-success {
  background-color: #119d39;
}
.btn-bg-color-success:hover {
  background-color: #28c554;
}
.btn-bg-color-success:active {
  background-color: #119d39;
}
.btn-bg-color-danger {
  background-color: #f12b2b;
}
.btn-bg-color-danger:hover {
  background-color: #f16c6c;
}
.btn-bg-color-danger:active {
  background-color: #f12b2b;
}
.btn-bg-color-warning {
  background-color: #e56c2f;
}
.btn-bg-color-warning:hover {
  background-color: #ef9b70;
}
.btn-bg-color-warning:active {
  background-color: #e56c2f;
}
.btn-bg-color-info {
  background-color: #867e7b;
}
.btn-bg-color-info:hover {
  background-color: #b2aaa7;
}
.btn-bg-color-info:active {
  background-color: #867e7b;
}
</style>