<template>
  <div class="water_need">
    <div class="top-select">
      <div class="address">
        地(市):&nbsp;&nbsp;
        <el-input
          v-model="city"
          placeholder="请输入地市"
          style="width: 200px"
        ></el-input>
      </div>
      <div class="address">
        县(市):&nbsp;&nbsp;
        <el-input
          v-model="area"
          placeholder="请输入县市"
          style="width: 200px"
        ></el-input>
      </div>
      <div class="year">
        <div class="block">
          <span class="demonstration">基准年份：&nbsp;</span>
          <el-date-picker
            v-model="startYearValue"
            type="year"
            placeholder="开始年份"
            value-format="yyyy"
            size="mini"
            style="width: 150px"
          >
          </el-date-picker
          ><span class="demonstration">估计年份：&nbsp;</span>
          <el-date-picker
            v-model="endYearValue"
            type="year"
            placeholder="结束年份"
            value-format="yyyy"
            size="mini"
            style="width: 150px"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="select">
        <el-button type="primary" @click="goWater">计算</el-button>
      </div>
    </div>
    <hr />
    <ul class="list">
      <li>生活需水计算</li>
      <span>--></span>
      <li>生产需水计算</li>
      <span>--></span>
      <li>灌溉需水计算</li>
      <span>--></span>
      <li>林牧渔需水计算</li>
      <span>--></span>
      <li>生态需水计算</li>
      <span>--></span>
      <li>需水计算汇合</li>
      <span>--></span>
      <li>合理性分析</li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
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
      startYearValue: "2020", //日期开始年份
      endYearValue: "2025", //日期结束年份
    };
  },
  methods: {
    goWater(){
      this.$router.push({
        name:'lifeneed',
        params:{
          city:this.city,
          area:this.area,
          base_year:this.startYearValue,
          esti_year:this.endYearValue
        }
      })
    }
  },
};
</script>

<style scoped lang="less">
.water_need {
  .top-select {
    margin-top: 30px;
    padding: 0 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .el-input__inner {
    padding: 0 5px;
    width: 100px;
  }
  .list {
    height: 26px;
    span{
      float: left;
      line-height: 31px;
    }
    li {
      float: left;
      list-style: none;
      border: 1px solid black;
      padding: 5px 8px;
    }
  }
}
</style>