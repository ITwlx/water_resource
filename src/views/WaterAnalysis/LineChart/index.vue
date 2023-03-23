<template>
  <div>
    <div class="chart" ref="lineCharts"></div>
  </div>
</template>

<script>
import * as echart from "echarts";
export default {
  props: ["title", "data"],
  data() {
    return {
      chart_data: {}, //请求回来的数据
      year: [], //x轴坐标
      dbsgsl: [], //地表水供水量
      qtsgsl: [], //其他水供水量
      zgsl: [], //总供水量
      dxsgsl: [], //地下水供水量
    };
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        newVal.forEach((element) => {
          this.year.push(element.year);
          this.dbsgsl.push(element.dbsgsl);
          this.qtsgsl.push(element.qtsgsl);
          this.zgsl.push(element.zgsl);
          this.dxsgsl.push(element.dxsgsl);
        });
        this.initChart();
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    initChart() {
      this.$nextTick(() => {
        let option = {
          title: {
            text: this.title,
            subtext: "(万立方米)",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["地表水供水量", "其他水供水量", "总供水量", "地下水供水量"],
            textStyle: {
              fontSize: 10,
            },
            itemWidth: 10
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.year,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "地表水供水量",
              type: "line",
              stack: "Total",
              data: this.dbsgsl,
            },
            {
              name: "其他水供水量",
              type: "line",
              stack: "Total",
              data: this.qtsgsl,
            },
            {
              name: "总供水量",
              type: "line",
              stack: "Total",
              data: this.zgsl,
            },
            {
              name: "地下水供水量",
              type: "line",
              stack: "Total",
              data: this.dxsgsl,
            },
          ],
        };
        this.chart = echart.init(this.$refs.lineCharts);
        this.chart.setOption(option);
      });
    },
  },
  mounted() {
    // this.initChart();
  },
};
</script>

<style scoped lang="less">
.chart {
  width: 100%;
  height: 300px;
}
</style>