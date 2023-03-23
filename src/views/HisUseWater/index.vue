<template>
  <div class="hiswater">
    <div class="top-select">
      <div class="address">
        地(市):&nbsp;&nbsp;
        <el-input
          v-model="city"
          placeholder="输入市"
          style="width: 150px"
        ></el-input>
        县(市):&nbsp;&nbsp;
        <el-input
          v-model="area"
          placeholder="输入县"
          style="width: 150px"
        ></el-input>
      </div>
      <div class="year">
        <div class="block">
          <span class="demonstration">起止年份：&nbsp;</span>
          <el-date-picker
            v-model="startYearValue"
            type="year"
            placeholder="开始年份"
            value-format="yyyy"
          >
          </el-date-picker
          >--
          <el-date-picker
            v-model="endYearValue"
            type="year"
            placeholder="结束年份"
            value-format="yyyy"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="select" style="width: 100px">
        <el-button type="primary">计算</el-button>
      </div>
    </div>
    <hr />

    <div class="water_calculate">
      <h3 style="text-align: center">用水定额计算结果</h3>
      <el-table :data="water_use_table" border style="width: 90%">
        <el-table-column prop="city" label="地市"> </el-table-column>
        <el-table-column prop="year" label="年份"> </el-table-column>
        <el-table-column prop="czsh" label="城镇生活"> </el-table-column>
        <el-table-column prop="ncsh" label="农村生活"> </el-table-column>
        <el-table-column prop="czdsh" label="城镇大生活"> </el-table-column>
        <el-table-column prop="gy" label="工业"> </el-table-column>
        <el-table-column prop="jz" label="建筑"> </el-table-column>
        <el-table-column prop="sc" label="三产"> </el-table-column>
        <el-table-column prop="ntgg" label="农田灌溉"> </el-table-column>
        <el-table-column prop="sgl" label="实灌率"> </el-table-column>
      </el-table>
    </div>
    <div class="history_eco">
      <h3 style="text-align: center">历史经济指标</h3>
      <el-table :data="tableData" border style="width: 98%">
        <el-table-column prop="area" label="地市"> </el-table-column>
        <el-table-column prop="city" label="市辖县"> </el-table-column>
        <el-table-column prop="year" label="年份"> </el-table-column>
        <el-table-column prop="czrk" label="城镇人口"> </el-table-column>
        <el-table-column prop="ncrk" label="农村人口"> </el-table-column>
        <el-table-column prop="population" label="总常住人口"> </el-table-column>
        <el-table-column prop="fst_growth" label="一产增加值"> </el-table-column>
        <el-table-column prop="sec_growth" label="二产增加值"> </el-table-column>
        <el-table-column prop="trd_growth" label="三产增加值"> </el-table-column>
        <el-table-column prop="gdp" label="国内生产总值"> </el-table-column>
        <el-table-column prop="ind_growth" label="工业增加值"> </el-table-column>
        <el-table-column prop="jzyzjz" label="建筑业增加值"> </el-table-column>
        <el-table-column prop="gdggmj" label="耕地灌溉面积"> </el-table-column>
        <el-table-column prop="sjgdggmj" label="实际耕地灌溉面积"> </el-table-column>
      </el-table>
    </div>

    <div class="history_water" style="margin-bottom: 30px">
      <h3 style="text-align: center">历史用水信息</h3>
      <el-table
        :data="his_water_data"
        border
        style="width: 98%; margin-bottom: 30px"
      >
        <el-table-column prop="area" label="地市"> </el-table-column>
        <el-table-column prop="city" label="市辖县"> </el-table-column>
        <el-table-column prop="year" label="年份"> </el-table-column>
        <el-table-column prop="gdgg" label="耕地灌溉"> </el-table-column>
        <el-table-column prop="lgdgg" label="林果地灌溉"> </el-table-column>
        <el-table-column prop="ytbs" label="鱼塘补水"> </el-table-column>
        <el-table-column prop="scys" label="牲畜用水"> </el-table-column>
        <el-table-column prop="ntzysl" label="农田总用水量"> </el-table-column>
        <el-table-column prop="gyzysl" label="工业总用水量"> </el-table-column>
        <el-table-column prop="czjmsh" label="城镇居民生活"> </el-table-column>
        <el-table-column prop="ncjmsh" label="农村居民生活"> </el-table-column>
        <el-table-column prop="jmshysl" label="居民生活用水量"> </el-table-column>
        <el-table-column prop="jzyysl" label="建筑业用水量"> </el-table-column>
        <el-table-column prop="fwyysl" label="服务业用水量"> </el-table-column>
        <el-table-column prop="czggysl" label="城镇公共用水量"> </el-table-column>
        <el-table-column prop="shzysl" label="生活总用水量"> </el-table-column>
        <el-table-column prop="czhj" label="城镇环境"> </el-table-column>
        <el-table-column prop="hhbs" label="河湖补水"> </el-table-column>
        <el-table-column prop="zstxsl" label="总生态需水量"> </el-table-column>
        <el-table-column prop="cxshhjzh" label="城乡生活环境综合"> </el-table-column>
        <el-table-column prop="zysl" label="总用水量"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  get_water_use_table,
  get_ecnomic_table,
  cal_water_quota,
} from "@/api/HisUseWater";
export default {
  data() {
    return {
      // 地址数据
      area: "郑州市",
      city: "荥阳市",
      startYearValue: "", //日期开始年份
      endYearValue: "", //日期结束年份
      // 用水计算表格数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      // 用水计算表格
      water_use_table:[],
      // 历史经济
      ecnomic_table:[],
      //历史用水
      his_water_data:[]
    };
  },
  methods: {
    //得到数据
    async getData() {
      let data = new FormData()
      data.append('city',this.city)
      data.append('area',this.area)
      let result1 = await cal_water_quota(data)
      let result3 = await get_water_use_table(data)
      let result2 = await get_ecnomic_table(data)
      this.water_use_table = result1.data.data
      this.his_water_data = result3.data.data
      this.ecnomic_table = result2.data.data
      
      
      
      
    },
  },
  mounted() {
    this.getData()
  },
};
</script>

<style scoped lang='less'>
.hiswater {
  padding: 20px 25px 0px 25px;
  width: 1150px;
  .top-select {
    display: flex;
    justify-content: space-between;
  }
}
</style>