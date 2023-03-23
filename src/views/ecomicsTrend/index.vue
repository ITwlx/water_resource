<template>
  <div class="e-main">
    <div class="top-select">
      <div class="address">
        地(市):&nbsp;&nbsp;
        <el-input
          v-model="area"
          placeholder="输入市"
          style="width: 150px"
        ></el-input>
        <!-- <el-select v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
      </div>
      <div class="address">
        县(市):&nbsp;&nbsp;
        <el-input
          v-model="city"
          placeholder="输入地区"
          style="width: 150px"
        ></el-input>
        <!-- <el-select v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
      </div>
      <div class="year">
        <div class="block">
          <span class="demonstration">起止年份：&nbsp;</span>
          <el-date-picker
            v-model="startYearValue"
            type="year"
            placeholder="开始年份"
            value-format="yyyy"
            size="mini"
            style="width: 180px"
          >
          </el-date-picker
          >--
          <el-date-picker
            v-model="endYearValue"
            type="year"
            placeholder="结束年份"
            value-format="yyyy"
            size="mini"
            style="width: 180px"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="select">
        <el-button type="primary" @click="searchData">查询</el-button>
      </div>
    </div>
    <hr />
    <EcoResult
      :title="value"
      :formData="this.chart_data.getEcno_analysis"
    ></EcoResult>
    <el-row>
      <el-col :span="8"
        ><Chart
          title="常住人口"
          :chart_data="chart_data.population_plot"
        ></Chart
      ></el-col>
      <el-col :span="8"
        ><Chart
          title="城镇化率"
          :chart_data="chart_data.urbanization_plot"
        ></Chart
      ></el-col>
      <el-col :span="8"
        ><Chart title="地区生产总值" :chart_data="chart_data.gdp_plot"></Chart
      ></el-col>
      <el-col :span="8"
        ><Chart
          title="二产增加值"
          :chart_data="chart_data.sec_growth_plot"
        ></Chart
      ></el-col>
      <el-col :span="8"
        ><Chart
          title="工业增加值"
          :chart_data="chart_data.ind_growth_plot"
        ></Chart
      ></el-col>
      <el-col :span="8"
        ><Chart
          title="三产增加值"
          :chart_data="chart_data.trd_growth_plot"
        ></Chart
      ></el-col>
      <el-col :span="8"
        ><Chart
          title="三产占比"
          :chart_data="chart_data.trd_product_ratio_plot"
        ></Chart
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import EcoResult from "@/views/ecomicsTrend/ecoTrendResult/index.vue"; //引入表格
import Chart from "@/views/ecomicsTrend/ecoCharts/index.vue"; //引入图标
import {
  population_plot,
  ecno_analysis_table,
  urbanization_plot,
  gdp_plot,
  sec_growth_plot,
  trd_growth_plot,
  ind_growth_plot,
  trd_product_ratio_plot,
} from "@/api";
export default {
  name: "EcomicsTrend",
  data() {
    return {
      // 地址数据
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      city: "郑州市",
      area: "郑州市",
      startYearValue: "2010", //日期开始年份
      endYearValue: "2020", //日期结束年份
      result: {}, //请求到的经济指标趋势数据
      //表格数据
      chart_data: {
        getEcno_analysis: {}, //获取经济指标历史趋势输出结果区域
        population_plot: {}, //获取常驻人口
        urbanization_plot: {}, //获取城镇化率
        gdp_plot: {}, //获取地区生产总值
        sec_growth_plot: {}, //二产增加值
        trd_growth_plot: {}, //三产增加值
        ind_growth_plot: {}, //获取工业增加值
        trd_product_ratio_plot: {}, //获取三产占比
      },
    };
  },
  components: {
    EcoResult,
    Chart,
  },
  methods: {
    //点击查询按钮获取数据
    searchData() {
      if (
        this.startYearValue == "" ||
        this.endYearValue == "" ||
        this.city == ""
      ) {
        alert("输入完整信息");
        return;
      }
      // 获取经济指标历史趋势输出结果区域
      this.getEcno_analysis();
      //获取常驻人口
      this.population_plot();
      //获取城镇化率
      this.urbanization_plot();
      //获取地区生产总值
      this.gdp_plot();
      //二产增加值
      this.sec_growth_plot();
      //获取工业增加值
      this.ind_growth_plot();
      //三产增加值
      this.trd_growth_plot();
      //获取三产占比
      this.trd_product_ratio_plot();
    },
    // 获取经济指标历史趋势输出结果区域
    async getEcno_analysis() {
      let data = new FormData();
      data.append("city", this.city);
      data.append("area", this.area);
      data.append("start_year", this.startYearValue);
      data.append("end_year", this.endYearValue);
      try {
        let result = await ecno_analysis_table(data);
        this.chart_data.getEcno_analysis = result.data.data.data || {};
      } catch (error) {
        this.$message({
          type:'info',
          message:error
        })
      }
      
      
    },
    //获取常驻人口
    async population_plot() {
      let data = new FormData();
      data.append("city", this.city);
      data.append("area", this.area);
      data.append("start_year", this.startYearValue);
      data.append("end_year", this.endYearValue);
      let result = await population_plot(data);
      console.log(result);
      // console.log(result);
      this.chart_data.population_plot = result.data.data;
    },
    //获取城镇化率
    async urbanization_plot() {
      let data = new FormData();
      data.append("city", this.city);
      data.append("area", this.area);
      data.append("start_year", this.startYearValue);
      data.append("end_year", this.endYearValue);
      let result = await urbanization_plot(data);
      // console.log(result);
      this.chart_data.urbanization_plot = result.data.data;
    },
    //获取地区生产总值
    async gdp_plot() {
      let data = new FormData();
      data.append("city", this.city);
      data.append("area", this.area);
      data.append("start_year", this.startYearValue);
      data.append("end_year", this.endYearValue);
      let result = await gdp_plot(data);
      // console.log(result);
      this.chart_data.gdp_plot = result.data.data;
    },
    //二产增加值
    async sec_growth_plot() {
      let data = new FormData();
      data.append("city", this.city);
      data.append("area", this.area);
      data.append("start_year", this.startYearValue);
      data.append("end_year", this.endYearValue);
      let result = await sec_growth_plot(data);
      // console.log(result);
      this.chart_data.sec_growth_plot = result.data.data;
    },
    //三产增加值
    async trd_growth_plot() {
      let data = new FormData();
      data.append("city", this.city);
      data.append("area", this.area);
      data.append("start_year", this.startYearValue);
      data.append("end_year", this.endYearValue);
      let result = await trd_growth_plot(data);
      // console.log(result);
      this.chart_data.trd_growth_plot = result.data.data;
    },
    //获取工业增加值
    async ind_growth_plot() {
      let data = new FormData();
      data.append("city", this.city);
      data.append("area", this.area);
      data.append("start_year", this.startYearValue);
      data.append("end_year", this.endYearValue);
      let result = await ind_growth_plot(data);
      // console.log(result);
      this.chart_data.ind_growth_plot = result.data.data;
    },
    //获取三产占比
    async trd_product_ratio_plot() {
      let data = new FormData();
      data.append("city", this.city);
      data.append("area", this.area);
      data.append("start_year", this.startYearValue);
      data.append("end_year", this.endYearValue);
      let result = await trd_product_ratio_plot(data);
      // console.log(result);
      this.chart_data.trd_product_ratio_plot = result.data.data;
    },
  },
  mounted() {
    // 获取经济指标历史趋势输出结果区域
    this.getEcno_analysis();
    //获取常驻人口
    this.population_plot();
    //获取城镇化率
    this.urbanization_plot();
    //获取地区生产总值
    this.gdp_plot();
    //二产增加值
    this.sec_growth_plot();
    //获取工业增加值
    this.ind_growth_plot();
    //三产增加值
    this.trd_growth_plot();
    //获取三产占比
    this.trd_product_ratio_plot();
    // console.log(this.chart_data);
  },
};
</script>

<style lang="less" scoped>
.e-main {
  width: 100%;
  padding: 20px 60px;
  display: block;
  .top-select {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }
}
</style>