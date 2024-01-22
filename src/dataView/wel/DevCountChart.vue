<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons'); // echarts theme
import { debounce } from '@/util/debounce.js';
import { getOnlines } from '@/api/wel/dashBoard';

export default {
  name: "LineChart",
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '340px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null,
      chartData: {
        devCount: []
      }
    }
  },
  mounted() {
    // 获取折线图数据
    getOnlines().then(res => {
      let resData = res.data.data;
      // {"status":8,"statusDesc":"已断开连接","count":443}
      let outlineNum = 0;
      let onlineNum = 0;
      if (resData !=null && resData.length >0) {
        for (let i = 0; i < resData.length; i++) {
          if(resData[i].status == 2){
            onlineNum = parseInt(resData[i].count);
          }else{
            outlineNum +=  parseInt(resData[i].count);
          }
        }
        let outlineNumObj = {
          name:'离线设备',
          value:outlineNum,
        };
        let onlineNumObj = {
          name:'在线设备',
          value:onlineNum,
        };

        this.chartData.devCount.push(onlineNumObj);
        this.chartData.devCount.push(outlineNumObj);
      }
      this.initChart()
      this.watchSize();
    });
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100);
      window.addEventListener('resize', this.__resizeHandler)
    }
    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('avue-left')[0];
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler);
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }
    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler);
    this.chart.dispose();
    this.chart = null
  },
  methods: {
    watchSize(){
      // 元素监听----用于echarts图表错乱
      let that = this;
      this.$erd.listenTo(document.getElementsByClassName("chart"), function (element) {
        that.$nextTick(function () {
          //使echarts尺寸重置
          that.chart.resize();

        })
      })
    },
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions({devCount} = {}) {
      this.chart.setOption({
        // title:{
        //     text: '设备数量统计',
        //     subtext: '各状态设备数',
        //     left: 'center'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          textStyle:{
            align:'left'
          },
          triggerOn:"mousemove",
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left',
        //   data: devCount,
        // },
        series: [{
          name: '设备数',
          type: 'pie',
          radius: ['25%', '40%'],//饼图的半径，第一个为内半径，第二个为外半径
          // radius: '40%',
          center: ['45%', '30%'],
          color: ['#35ce8b', '#df2f3c', '#c278fd', '#ffc848', '#fe7751 ', '#00D4FF'],
          data: devCount,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            normal: {
              show: true,
              formatter: "{b} : {c}台",
              textStyle: {
                fontSize: 12,
              },
              position: 'outside'
            },
            emphasis: {
              show: true
            }
          },
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions(this.chartData);
      // 饼状图单击跳转
      this.chart.on('click', (params) => {
        // 阻止冒泡, 没有参数event, 但添加event参数会报错 --现用
        event.stopPropagation()
        if (params.componentType === 'series') {
          let isOnline = 1;
          if(params.name == '离线设备'){
            isOnline = 2;
          }
          this.handleTooltipClick(isOnline);
        }

      })
    },
    handleTooltipClick(isOnline) {
      sessionStorage.setItem("deviceListKA",'FALSE');
      this.$router.push({
        path: this.$router.$avueRouter.getPath({
          name: '设备信息',
          src: '/device/deviceInfo/index'
        }),
        // query: {'isOnline':true}
      });
      sessionStorage.setItem("isOnline", isOnline);
    },
  }
}
</script>

<style scoped>
.chart{
  padding-bottom: 4px;
}
</style>
