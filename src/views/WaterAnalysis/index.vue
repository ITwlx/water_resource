<template>
  <div class="water-main">
    <div class="top-select">
      <div class="address">
        地市:&nbsp;&nbsp;
        <!-- <el-select
          v-model="city"
          style="width: 180px"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
        <el-input v-model="city" placeholder="请输入地市" style="width:200px"></el-input>
      </div>
      <div class="address">
        县市:&nbsp;&nbsp;
        <!-- <el-select
          v-model="area"
          style="width: 180px"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
         <el-input v-model="area" placeholder="请输入县市" style="width:200px"></el-input>
      </div>
      <div class="year">
        <div class="block">
          <span class="demonstration">起止年份：&nbsp;</span>
          <el-date-picker
            v-model="year.start"
            type="year"
            style="width: 180px"
            placeholder="开始年份"
            value-format="yyyy"
          >
          </el-date-picker
          >--
          <el-date-picker
            v-model="year.end"
            type="year"
            style="width: 180px"
            placeholder="结束年份"
            value-format="yyyy"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="select">
        <el-button @click="searchTable" type="primary">查询</el-button>
      </div>
    </div>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      area: "荥阳县",
      year: {
        start: "",
        end: "",
      },
      water_data: { supply_water_data: {}, use_water_data: {} },
    };
  },
 watch: {
   '$route.params'() {
    console.log('params');
    this.searchTable()
    },
  },
  methods: {
    async searchTable() {
      console.log(this.city);
      this.$router.push({
        name: "useprovide",
        params:{
          city:this.city,
          area:this.area
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.water-main {
  overflow: auto;
  width: 100%;
  padding: 30px 20px 100px 20px;
  .top-select {
    display: flex;
    justify-content: space-between;
  }
}
</style>