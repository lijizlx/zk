<template>
  <el-select
    v-model="themeConfig[modelData]"
    :style="{width: `${width}px`}"
    class="m-2"
    placeholder="Select"
    @change="handleSelect"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup>
import { defineProps } from 'vue'
import {useThemeConfig} from "@/stores/themeConfig.js";
import {storeToRefs} from "pinia";
import { useI18n } from 'vue-i18n'
import { Local } from "@/utils/storage.js"

const { t } = useI18n()
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

const props = defineProps({
  width: {
    required: true,
    type: Number,
    default: '120px'
  },
  options: {
    required: true,
    type: Array,
    default: []
  },
  modelData: {
    required: true,
    type: String,
    default: ''
  }
})

const handleSelect = val => {
  themeConfig.value[props.modelData] = val
  Local.set('themeConfig', themeConfig.value)
}
</script>

<style scoped>

</style>