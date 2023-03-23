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
      chart_data:null,//用水数据
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
          text: "用水分布图",
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
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: this.chart_data.stxsl, name: "生态用水" },
              { value: this.chart_data.shysl, name: "生活用水" },
              { value: this.chart_data.gyysl, name: "工业用水" },
              { value: this.chart_data.nyysl, name: "农业用水" },
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