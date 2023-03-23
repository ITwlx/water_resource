<template>
  <div>
    <!-- <el-row :gutter="10">
      <el-col :span="20">
        <el-table
          :data="nowData"
          style="width: 100%"
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
                <input
                  type="text"
                  v-model="scope.row.year"
                  style="width: 80px"
                />
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
        <el-button type="primary">下一步</el-button> <br /><br />
        <el-button type="danger" @click="showProductWaterCal"
          >生产需水计算</el-button
        >
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import { scxs_jingji } from "@/api/Needwater";
export default {
  name: "shengcan",
  data() {
    return {
      requestData: null,
      tableData: [],
    };
  },
  methods: {
    //获取本页面数据
   async getData() {
      this.requestData = new FormData();
      this.requestData.append("area", this.$route.params.area);
      this.requestData.append("city", this.$route.params.city);
      this.requestData.append("base_year", this.$route.params.base_year);
      this.requestData.append("esti_year", this.$route.params.esti_year);
      try {
        let result = await scxs_jingji(this.requestData);
        this.tableData = result.data.data;
      } catch (error) {
        
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>