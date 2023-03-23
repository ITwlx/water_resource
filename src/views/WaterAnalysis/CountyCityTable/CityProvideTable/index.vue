<template>
  <el-dialog title="" :visible.sync="dialogVisible" width="50%" @open="initChart">
    <!-- :before-close="dialogBeforeClose" -->
    <div>
      <div ref="pie_chart" style="width:560px;height:560px">

      </div>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      dialogVisible: false,
      chart_data:null,//展示数据
    };
  },
  methods: {
    // dialog的关闭前的回调函数
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 展示饼图的函数
    initChart() {
      let option = {
        title: {
          text: "供水分布图",
          subtext: `${this.chart_data.area}2020年`,
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "供水图",
            type: "pie",
            radius: "50%",
            data: [
              { value: this.chart_data.dxsgsl, name: "地下水供水" },
              { value: this.chart_data.qts, name: "其他水供水" },
              { value: this.chart_data.dbsgsl, name: "地表水供水" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      this.$nextTick(()=>{
        let myChart = echarts.init(this.$refs.pie_chart) 
        myChart.setOption(option)
      })
    },
  },
};
</script>

<style>
</style>