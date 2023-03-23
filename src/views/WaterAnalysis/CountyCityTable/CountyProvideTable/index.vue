<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="80%"
    @open="initChart"
  >
    <!--  -->
    <!-- open函数dialog打开的回调，不加会在dom未渲染时进行图表加载报错  -->
    <!-- :before-close="dialogBeforeClose" -->
    <div>
      <el-row :gutter="10">
        <el-col :span="6">
          <h3 style="text-align: center">县供水分布表</h3>
          <el-table border :data="table_data" style="width: 100%">
            <el-table-column prop="area" label="市县区"> </el-table-column>
            <el-table-column prop="dbsgsl" label="地表水"> </el-table-column>
            <el-table-column prop="dxsgsl" label="地下水"> </el-table-column>
            <el-table-column prop="qtsgsl" label="其他水"> </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="18">
          <div ref="bar_chart" style="width: 820px; height: 560px"></div>
        </el-col>
      </el-row>
      <h3 style="text-align: center">{{ year }}年{{ area }}供水分布详情</h3>
      <el-table border :data="table_data" style="width: 100%">
        <el-table-column prop="city" label="地市"> </el-table-column>
        <el-table-column prop="area" label="市辖县"> </el-table-column>
        <el-table-column prop="year" label="年份"> </el-table-column>
        <el-table-column prop="xushui" label="蓄水"> </el-table-column>
        <el-table-column prop="yinshui" label="引水"> </el-table-column>
        <el-table-column prop="tishui" label="提水"> </el-table-column>
        <el-table-column prop="klydrl" label="跨流域调入量"> </el-table-column>
        <el-table-column prop="qtdbs" label="其他"> </el-table-column>
        <el-table-column prop="dbsgsl" label="地表水供水量"> </el-table-column>
        <el-table-column prop="qcdxs" label="浅层地下水"> </el-table-column>
        <el-table-column prop="scdxs" label="深层地下水"> </el-table-column>
        <el-table-column prop="dxsgsl" label="地下水供水量"> </el-table-column>
        <el-table-column prop="wshy" label="污水回用"> </el-table-column>
        <el-table-column prop="yskksly" label="雨水/矿坑水利用">
        </el-table-column>
        <el-table-column prop="qts" label="其他"> </el-table-column>
        <el-table-column prop="qtsgsl" label="其他水供水量"> </el-table-column>
        <el-table-column prop="zgsl" label="总供水量"> </el-table-column>
      </el-table>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { area_year_water_supply_table } from "@/api/waterAnalysis";
import * as echarts from "echarts";
export default {
  data() {
    return {
      dialogVisible: false,
      address: [], //地址
      gsl: {
        dxsgsl: [], //地下水供水量
        dbsgsl: [], //地表水供水量
        qtsgsl: [], //其他水供水量
      },

      //各种水
      area: "",
      year: "",
      table_data: null, //本组件数据
    };
  },
  watch: {
    table_data: {
      handler(newVal) {
        newVal.forEach((item) => {
          let num1 = Math.floor(
            (item.dxsgsl / (item.dxsgsl + item.dbsgsl + item.qtsgsl)) * 100
          );
          let num2 = Math.floor(
            (item.dbsgsl / (item.dxsgsl + item.dbsgsl + item.qtsgsl)) * 100
          );
          let num3 = Math.floor(
            (item.qtsgsl / (item.dxsgsl + item.dbsgsl + item.qtsgsl)) * 100
          );
          this.gsl.dxsgsl.push(num1);
          this.gsl.dbsgsl.push(num2);
          this.gsl.qtsgsl.push(num3);
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
          data: ["地表水", "地下水", "其他水"],
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
            name: "地表水",
            type: "bar",
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.gsl.dbsgsl,
          },
          {
            name: "地下水",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.gsl.dxsgsl,
          },
          {
            name: "其他水",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: this.gsl.qtsgsl,
          },
        ],
      };
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
      let result = await area_year_water_supply_table(data);
      this.table_data = result.data.data;
      this.table_data.forEach((element) => {
        this.address.push(element.area);
      });
    },
  },
  mounted() {
    // this.getData()
  },
};
</script>

<style>
</style>