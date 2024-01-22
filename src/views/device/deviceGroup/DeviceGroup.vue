<template>
  <TransitionWrapper>
    <div class="device-group">
      <div ref="chartRef" style="width: 600px; height: 400px;"></div>
    </div>
  </TransitionWrapper>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts';

import {useThemeConfig} from "@/stores/themeConfig.js";
import {storeToRefs} from "pinia";

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

const chartRef = ref(null)

const initView = () => {
  const chartDom = chartRef.value;
  const myChart = echarts.init(chartDom);
  let option;
  // 柱状图数据
  const data = [120, 200, 150, 80, 70];

  // 修改柱状图颜色
  const color = Array(data.length).fill(themeConfig.value.primary);

  option = {
    xAxis: {
      show: false,
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      show: false,
      type: 'value'
    },
    series: [
      {
        type: 'line',
        smooth: true,  // 平滑折线
        symbol: 'circle', // 数据点实心
        data: data,
        itemStyle: {
          color: themeConfig.value.primary
        },
        markPoint: {
          data: [
            { type: 'max', name: '最高点' },  // 标记最高数据点
            { type: 'min', name: '最低点' }   // 标记最低数据点
          ],
        }
      }
    ],
    tooltip: {
      trigger: 'axis', // 悬浮触发方式，默认为'item'
      axisPointer: {
        type: 'none' // 设置为'none'，表示不显示竖线或横线
      },
      formatter: '{b} : {c}' // 显示的格式化字符串，{b}代表横坐标，{c}代表数据值
    }
  };

  option && myChart.setOption(option);
}

onMounted(() => {
  initView()
})
</script>

<style scoped lang="scss">

</style>