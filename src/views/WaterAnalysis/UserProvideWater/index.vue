<template>
  <div>
    <CountyUseTable ref="countusewater" />
    <CityUseTable ref="cityusewater" />
    <CountyProvideTable ref="countprovidewater" />
    <CityProvideTable ref="cityprovidewater" />
    <el-row :gutter="10">
      <el-col :span="12">
        <LineChart
          :title="chartData.name.provideName"
          :data="water_data.supply_water_data"
        />
      </el-col>
      <el-col :span="12">
        <LineChartOther
          :title="chartData.name.useName"
          :data="water_data.use_water_data"
          ref="lincharto"
        />
      </el-col>
    </el-row>
    <h3 style="text-align: center">供水分析表</h3>
    <el-table
      :data="water_data.supply_water_data"
      style="width: 100%; padding: 15px 15px; margin-right: 20px"
    >
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
      <el-table-column label="操作" prop="year" width="120">
        <template slot-scope="scope">
          <el-button type="primary" @click="showProvideWater(scope.row)"
            >查看详细</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <h3 style="text-align: center">用水分析表</h3>
    <el-table
      :data="water_data.use_water_data"
      style="width: 100%; padding: 15px 15px"
    >
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
      <el-table-column prop="jmshysl" label="居民生活用水量"> </el-table-column>
      <el-table-column prop="jzyysl" label="建筑业用水量"> </el-table-column>
      <el-table-column prop="fwyysl" label="服务业用水量"> </el-table-column>
      <el-table-column prop="czggysl" label="城镇公共用水量"> </el-table-column>
      <el-table-column prop="shysl" label="生活用水量"> </el-table-column>
      <el-table-column prop="czhj" label="城镇环境"> </el-table-column>
      <el-table-column prop="hhbs" label="河湖补水"> </el-table-column>
      <el-table-column prop="stysl" label="生态需水量"> </el-table-column>
      <el-table-column prop="cxshhjzh" label="城乡生活环境综合">
      </el-table-column>
      <el-table-column prop="zysl" label="总用水量"> </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" @click="showUseWater(scope.row)">
            查看详细
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import LineChart from "@/views/WaterAnalysis/LineChart";
import LineChartOther from "@/views/WaterAnalysis/LineChartOther";
import CountyUseTable from "@/views/WaterAnalysis/CountyCityTable/CountyUseTable";
import CountyProvideTable from "@/views/WaterAnalysis/CountyCityTable/CountyProvideTable";
import CityUseTable from "@/views/WaterAnalysis/CountyCityTable/CityUseTable";
import CityProvideTable from "@/views/WaterAnalysis/CountyCityTable/CityProvideTable";
import {
  city_water_use_plot,
  city_water_supply_table,
  area_water_use_plot,
  area_water_supply_table,
} from "@/api/waterAnalysis/index";
export default {
  data() {
    return {
      //供水分析表数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路1518",
        },
      ],
      //折线图表数据
      chartData: {
        name: {
          provideName: "供水趋势图",
          useName: "用水趋势图",
        },
      },

      // 供用水数据
      water_data: {
        // 供水数据
        supply_water_data: [],
        // 用水数据
        use_water_data: [],
      },
    };
  },
  components: {
    LineChart,
    LineChartOther,
    CountyUseTable,
    CountyProvideTable,
    CityUseTable,
    CityProvideTable,
  },
 
  methods: {
    // 向服务器发送请求接受数据展示本页面
    async showWaterAnalysisPage() {
      let data = new FormData();
      // console.log(this.$route.params);
      // if (this.$route.params.city == "") {
      //   data.append("city", this.$route.params.city);
      // } else if (this.$route.params.area == "") {
        
      // }
      data.append("city", "郑州市");
      // data.append("city", this.$route.params.city);
      data.append("area", "郑州市");
      data.append("start_year", "2010");
      data.append("end_year", "2018");
      let result1 = await city_water_supply_table(data);
      let result2 = await city_water_use_plot(data);
      if (result1.status == 200 && result2.status == 200) {
        this.water_data.supply_water_data = result1.data.data;
        this.water_data.use_water_data = result2.data.data;
      } else {
        alert("网络错误，请联系管理员");
      }
    },
    //展示供水页面
    showProvideWater(row) {
      if (0) {
        this.$refs.countprovidewater.year = row.year;
        this.$refs.countprovidewater.area = row.city;
        //等待获取数据成功后再初始化视图
        this.$refs.countprovidewater.getData().then((r) => {
          this.$refs.countprovidewater.initChart();
        });
        this.$refs.countprovidewater.dialogVisible = true;
      } else {
        this.$refs.cityprovidewater.chart_data = row;
        this.$refs.cityprovidewater.dialogVisible = true;
      }
    },
    //展示用水页面
    showUseWater(row) {
      if (0) {
        this.$refs.countusewater.year = row.year;
        this.$refs.countusewater.area = row.city;
        //等待获取数据成功后再初始化视图
        this.$refs.countusewater.getData().then((r) => {
          this.$refs.countusewater.initChart();
        });
        this.$refs.countusewater.dialogVisible = true;
      } else {
        this.$refs.cityusewater.chart_data = row;
        this.$refs.cityusewater.dialogVisible = true;
      }
    },
  },
  mounted() {
    this.showWaterAnalysisPage();
  },
};
</script>

<style>
</style>