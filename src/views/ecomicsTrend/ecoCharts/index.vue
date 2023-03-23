<template>
  <!-- 图标容器 -->
  <div class="charts" ref="charts" style="width: 340px; height: 250px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  props: ["title", "chart_data"],

  watch: {
    // x轴,y轴数据
    chart_data: {
      handler(newVal, oldVal) {
        let length = newVal.length;
        let data = { x: [], y: [] };
        for (let index = 0; index < length; index++) {
          // chart_data[0] == {year,population}
          data.x.push(Object.values(newVal[index])[0]);
          data.y.push(Object.values(newVal[index])[1]);
        }
        this.axis = data;
        this.initChart();
      },
      deep: true,
      // immediate: true,
    },
  },
  data() {
    return {
      chartColumn: null,
      axis: this.chart_data,
    };
  },
  methods: {
    initChart() {
      let option = {
        title: {
          text: this.title, //名称
          textAlign: "left",
        },
        xAxis: {
          type: "category",
          data: [...this.axis.x],
        },
        yAxis: {
          type: "value",
          offset:-15
        },
        series: [
          {
            // itemStyle:{ normal: {label : {show: true}}},
            data: this.axis.y,
            type: "line",
          },
        ],
        tooltip: {
          trigger: "axis", //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
      };
      this.chartColumn = echarts.init(this.$refs.charts);
      this.chartColumn.setOption(option);
    },
  },
  mounted: function () {
    
    // console.log(this.a);
  },
};
</script>

<style>
</style>