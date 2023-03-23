<template>
  <div>
    <div class="chart" ref="lineCharts"></div>
  </div>
</template>

<script>
import * as echart from "echarts";
import { mapState } from "vuex";
export default {
  props: ["title", "data"],
  data() {
    return {
      chart_data: {}, //请求回来的数据
      year: [], //x轴坐标
      nyysl: [], //农业用水量
      gyysl: [], //工业用水量
      shysl: [], //生活用水量
      stxsl: [], //生态需水量
      zysl: [], //总用水量
      chart: null,
    };
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        newVal.forEach((element) => {
          this.year.push(element.year);
          this.nyysl.push(element.nyysl);
          this.gyysl.push(element.gyysl);
          this.shysl.push(element.shysl);
          this.stxsl.push(element.stxsl);
          this.zysl.push(element.zysl);
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
            data: [
              "农业用水",
              "工业用水",
              "生活用水",
              "生态需水",
              "总用水量",
            ],
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
              name: "农业用水",
              type: "line",
              stack: "Total",
              data: this.nyysl,
            },
            {
              name: "工业用水",
              type: "line",
              stack: "Total",
              data: this.gyysl,
            },
            {
              name: "生活用水",
              type: "line",
              stack: "Total",
              data: this.shysl,
            },
            {
              name: "生态需水",
              type: "line",
              stack: "Total",
              data: this.stxsl,
            },
            {
              name: "总用水量",
              type: "line",
              stack: "Total",
              data: this.zysl,
            },
          ],
        };
        this.chart = echart.init(this.$refs.lineCharts);
        this.chart.setOption(option);
      });
    },
    getData() {},
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