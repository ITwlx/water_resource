<template>
  <div>
    <h3
      style="
        text-align: center;
        background: rgb(0, 32, 96);
        color: rgb(249, 255, 30);
      "
    >
      经济指标历史趋势输出结果区域
    </h3>
    <h3 style="text-align: center">{{ title }}</h3>
    <table style="border-collapse:collapse;border-space:0" border='1px solid black;'>
      <tr>   <td>各项</td><td>{{tableData.header.start_year}}</td><td>{{tableData.header.end_year}}</td> <td>区间增速</td> </tr>
      <tr>   <td>常住人口</td> <td>{{tableData.population.start_value}}</td> <td>{{tableData.population.end_value}}</td> <td>{{tableData.population.increase_speed}}</td> </tr>
      <tr>   <td>城镇化率</td> <td>{{tableData.urbanization_rate.start_value}}</td> <td>{{tableData.urbanization_rate.end_value}}</td> <td>{{tableData.urbanization_rate.increase_speed}}</td> </tr>
      <tr>   <td>地区生产总值</td> <td>{{tableData.gdp.start_value}}</td> <td>{{tableData.gdp.end_value}}</td> <td>{{tableData.gdp.increase_speed}}</td> </tr>
      <tr>   <td>二产增加值</td> <td>{{tableData.sec_growth.start_value}}</td> <td>{{tableData.sec_growth.end_value}}</td> <td>{{tableData.sec_growth.increase_speed}}</td> </tr>
      <tr>   <td>工业增加值</td> <td>{{tableData.ind_growth.start_value}}</td> <td>{{tableData.ind_growth.end_value}}</td> <td>{{tableData.ind_growth.increase_speed}}</td> </tr>
      <tr>   <td>三产增加值</td> <td>{{tableData.trd_growth.start_value}}</td> <td>{{tableData.trd_growth.start_value}}</td> <td>{{tableData.trd_growth.start_value}}</td> </tr>
      <tr>   <td>三产占比</td> <td>{{tableData.trd_product_ratio.start_value}}</td> <td>{{tableData.trd_product_ratio.start_value}}</td> <td>{{tableData.trd_product_ratio.start_value}}</td> </tr>
      <tr>   <td>地区生产总值换算系数</td> <td></td> <td>{{tableData.gdp_coefficient}}</td> <td></td> </tr>
      <tr>   <td>工业增加值换算系数</td> <td></td> <td>{{tableData.ind_growth_cofficient}}</td> <td></td> </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "EcoResult",
  data() {
    return {
      data:this.formData
    };
  },
  props: ["title", "formData"],
  computed: {
    tableData() {
      return this.formData||{};
    },
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style>
</style>