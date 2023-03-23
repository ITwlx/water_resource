<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="80%"
    @open="initChart"
  >
    <!-- open函数dialog打开的毁掉，不加会在dom未渲染时进行图表加载报错 -->
    <!-- :before-close="dialogBeforeClose" -->
    <div>
      <el-row :gutter="10">
        <el-col :span="6">
          <h3 style="text-align: center">用水分布表</h3>
          <el-table border :data="table_data" style="width: 100%">
            <el-table-column prop="area" label="市，县，区"> </el-table-column>
            <el-table-column prop="shysl" label="生活用水"> </el-table-column>
            <el-table-column prop="gyysl" label="工业用水"> </el-table-column>
            <el-table-column prop="nyysl" label="农业用水"> </el-table-column>
            <el-table-column prop="stysl" label="生态用水"> </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="18">
          <div ref="bar_chart" style="width: 820px; height: 560px"></div>
        </el-col>
      </el-row>
      <h3 style="text-align: center">2020年郑州市用水分布详情</h3>
      <el-table border :data="table_data" style="width: 100%">
        <el-table-column prop="city" label="地市"> </el-table-column>
        <el-table-column prop="area" label="市辖县"> </el-table-column>
        <el-table-column prop="year" label="年份"> </el-table-column>
        <el-table-column prop="gdgg" label="耕地灌溉"> </el-table-column>
        <el-table-column prop="lgdgg" label="林果地灌溉"> </el-table-column>
        <el-table-column prop="ytbs" label="鱼塘补水"> </el-table-column>
        <el-table-column prop="scys" label="牲畜用水"> </el-table-column>
        <el-table-column prop="nyysl" label="农业用水量"> </el-table-column>
        <el-table-column prop="zlhhdysl" label="直流火(核)电用水量">
        </el-table-column>
        <el-table-column prop="xhshhdysl" label="循环式火(核)电用水量">
        </el-table-column>
        <el-table-column prop="fhhdysl" label="非火(核)电用水量">
        </el-table-column>
        <el-table-column prop="gyysl" label="工业用水量"> </el-table-column>
        <el-table-column prop="czjmsh" label="城镇居民生活"> </el-table-column>
        <el-table-column prop="ncjmsh" label="农村居民生活"> </el-table-column>
        <el-table-column prop="jmshysl" label="居民生活用水量">
        </el-table-column>
        <el-table-column prop="jzyysl" label="建筑业用水量"> </el-table-column>
        <el-table-column prop="fwyysl" label="服务业用水量"> </el-table-column>
        <el-table-column prop="czggysl" label="城镇公共用水量">
        </el-table-column>
        <el-table-column prop="shysl" label="生活用水量"> </el-table-column>
        <el-table-column prop="czhj" label="城镇环境"> </el-table-column>
        <el-table-column prop="hhbs" label="河湖补水"> </el-table-column>
        <el-table-column prop="stysl" label="生态需水量"> </el-table-column>
        <el-table-column prop="cxshhjzh" label="城乡生活环境综合">
        </el-table-column>
        <el-table-column prop="zysl" label="总用水量"> </el-table-column>
      </el-table>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as echarts from "echarts";
import { area_year_water_use_table } from "@/api/waterAnalysis";
export default {
  data() {
    return {
      dialogVisible: false,
      table_data: [],
      address: [],
      ysl: {
        //用水量
        shysl: [], //生活用水
        gyysl: [], //工业用水
        nyysl: [], //农业用水
        stysl: [], //生态用水
      },
    };
  },
  watch: {
    table_data: {
      handler(newVal) {
        newVal.forEach((item) => {
          let num1 = Math.floor(
            (item.shysl / (item.shysl + item.gyysl + item.nyysl + item.stysl)) * 100
          );
          let num2 = Math.floor(
            (item.gyysl / (item.shysl + item.gyysl + item.nyysl + item.stysl)) * 100
          );
          let num3 = Math.floor(
            (item.nyysl / (item.shysl + item.gyysl + item.nyysl + item.stysl)) * 100
          );
          let num4 = Math.floor(
            (item.stysl / (item.shysl + item.gyysl + item.nyysl + item.stysl)) * 100
          );
          this.ysl.shysl.push(num1);
          this.ysl.gyysl.push(num2);
          this.ysl.nyysl.push(num3);
          this.ysl.stysl.push(num4);
        });
      },
      deep: true,
    },
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //初始化柱状图
    initChart() {
      var app = {};
      var option;
      const posList = [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight",
      ];
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90,
        },
        align: {
          options: {
            left: "left",
            center: "center",
            right: "right",
          },
        },
        verticalAlign: {
          options: {
            top: "top",
            middle: "middle",
            bottom: "bottom",
          },
        },
        position: {
          options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            return map;
          }, {}),
        },
        distance: {
          min: 0,
          max: 100,
        },
      };
      app.config = {
        rotate: 90,
        align: "left",
        verticalAlign: "middle",
        position: "insideBottom",
        distance: 15,
        onChange: function () {
          const labelOption = {
            rotate: app.config.rotate,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            position: app.config.position,
            distance: app.config.distance,
          };
          myChart.setOption({
            series: [
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
            ],
          });
        },
      };
      const labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: "{c}  {name|{a}}",
        fontSize: 16,
        rich: {
          name: {},
        },
      };
      option = {
        title:{
          subtext:'各项数据为百分比'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["生活用水", "工业用水", "农业用水", "生态用水"],
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: this.address,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "生活用水",
            type: "bar",
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.ysl.shysl,
          },
          {
            name: "生态用水",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.ysl.stysl,
          },
          {
            name: "工业用水",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.ysl.gyysl,
          },
          {
            name: "农业用水",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.ysl.nyysl,
          },
        ],
      };
      console.log(this.address.length);
      this.$nextTick(() => {
        var myChart = echarts.init(this.$refs.bar_chart);
        myChart.setOption(option);
      });
    },
    // 获取数据
    async getData() {
      let data = new FormData();
      data.append("area", this.area);
      data.append("year", this.year);
      let result = await area_year_water_use_table(data);
      this.table_data = result.data.data;
      this.table_data.forEach((element) => {
        this.address.push(element.area);
      });
    },
  },
  mounted() {
    // this.$nextTick(()=>{
    //   this.initChart()
    // })
  },
};
</script>

<style>
</style>