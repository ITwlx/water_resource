<template>
  <div>
    
    <el-row :gutter="10">
      <h3>基准年人口经济指标与需水定额</h3>
      <el-col :span="20">
        <el-table
          :data="nowData"
          style="width: 100%; padding-bottom: 70px"
          :border="true"
          size="mini"
        >
          <el-table-column prop="city" label="分区"> </el-table-column>
          <el-table-column label="2020基准年">
            <el-table-column prop="czrk" label="城镇人口"> </el-table-column>
            <el-table-column prop="ncrk" label="农村人口"> </el-table-column>
            <el-table-column prop="population" label="常住人口">
            </el-table-column>
            <el-table-column prop="urbanization_rate" label="城镇化率">
            </el-table-column>
          </el-table-column>
          <el-table-column label="常住人口增速" width="120">
            <el-table-column label="2020-2025" width="120">
              <template slot-scope="scope">
                <el-input
                  type="text"
                  v-model="scope.row.year"
                  maxlength="3"
                  style="width: 80px"
                  :max="100"
                ></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="zip" label="城镇生活需水定额" width="120">
            <el-table-column prop="zip" label="2020" width="120">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="zip" label="农村生活需水定额" width="120">
            <el-table-column prop="zip" label="2025" width="120">
            </el-table-column>
          </el-table-column> </el-table
      ></el-col>
      <el-col :span="4">
        <el-button type="primary" @click="showNext">下一步</el-button>
        <br /><br />
        <el-button type="danger" @click="showProductWaterCal"
          >生产需水计算</el-button
        >
      </el-col>
    </el-row>
    <!-- 表二 -->
    
    <el-row :gutter="10" v-if="flag2">
      <h3>未来年人口经济指标与需水定额</h3>
      <el-col :span="20">
        <el-table
          :data="future_data"
          style="width: 100%; padding-bottom: 70px"
          :border="true"
          size="mini"
        >
          <el-table-column prop="city" label="分区"> </el-table-column>
          <el-table-column label="2025年">
            <el-table-column prop="czrk" label="城镇人口"> </el-table-column>
            <el-table-column prop="ncrk" label="农村人口"> </el-table-column>
            <el-table-column prop="nor_population" label="常住人口">
            </el-table-column>
            <el-table-column prop="czhl" label="城镇化率"> </el-table-column>
          </el-table-column>
          <el-table-column prop="zip" label="城镇生活需水定额" width="120">
            <el-table-column prop="zip" label="2020" width="120">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="zip" label="农村生活需水定额" width="120">
            <el-table-column prop="zip" label="2025" width="120">
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 表三 -->
    
    <el-row :gutter="10" v-if="flag2">
      <h3>生活需水计算结果</h3>
      <el-col :span="20">
        <el-table
          :data="future_data"
          style="width: 100%; padding-bottom: 70px"
          :border="true"
          size="mini"
        >
          <el-table-column prop="city" label="分区"> </el-table-column>
          <el-table-column label="2025年">
            <el-table-column prop="czrk" label="城镇人口"> </el-table-column>
            <el-table-column prop="ncrk" label="农村人口"> </el-table-column>
            <el-table-column prop="nor_population" label="常住人口">
            </el-table-column>
            <el-table-column prop="czhl" label="城镇化率"> </el-table-column>
          </el-table-column>
          <el-table-column prop="zip" label="城镇生活需水定额" width="120">
            <el-table-column prop="zip" label="2020" width="120">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="zip" label="农村生活需水定额" width="120">
            <el-table-column prop="zip" label="2025" width="120">
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { shxs_renkou } from "@/api/Needwater";
export default {
  data() {
    return {
      // 请求参数
      requestData: null,
      //基准年数据
      nowData: [],
      //未来年数据
      future_data: [],
      population_increase: [],
      flag2: false, //第二个表
      flag3: true, //第三个表
      params: null,
    };
  },
  methods: {
    // 从服务器获取生活需水数据
    async getData() {
      this.params = this.$route.params;
      this.requestData = new FormData();
      this.requestData.append("area", this.$route.params.area);
      this.requestData.append("city", this.$route.params.city);
      this.requestData.append("base_year", this.$route.params.base_year);
      this.requestData.append("esti_year", this.$route.params.esti_year);
      try {
        let result = await shxs_renkou(this.requestData);
        this.nowData = result.data.data;
      } catch (error) {
        // alert(error);
      }
    },
    //展示生产需水页面
    showProductWaterCal() {
      if ((this.flag3 = true)) {
        this.$router.push({
          name: "guangai",
          params: this.params,
        });
      }
    },
    //展示未来人口经济指标和需水定额
    showNext() {
      let flag = this.nowData.every((item) => {
        return item.year !== "";
      });
      if (!flag) {
        alert("请输入每一项");
        return;
      } else {
        this.FormData = [];
        this.nowData.forEach((item) => {
          let a = {};
          a.city = item.city;
          a.czrk = item.czrk * Math.pow(1 + item.year / 1, 1 / (2025 - 2020));
          a.ncrk = item.ncrk * Math.pow(1 + item.year / 1, 1 / (2025 - 2020));
          a.nor_population = a.czrk + a.ncrk;
          a.czhl = a.czrk / (a.czrk + a.nor_population);
          this.future_data.push(a);
        });
      }
      this.flag2 = true;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>