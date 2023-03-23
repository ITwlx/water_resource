<template>
  <div>
    <ul>
      <li><el-button @click="toHome" :autofocus="true"> 社会经济指标历史趋势查询 </el-button></li>
      <li><el-button @click="toAnalysis"> 现状供应水分析 </el-button></li>
      <li><el-button @click="toHisUseWater"> 历史用水定额 </el-button></li>
      <li><el-button @click="toWaterNeed"> 需水计算 </el-button></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "navBar",

  methods:{
    toHome(){
      this.$router.push({path:'/home'})
    },
    toAnalysis(){
      this.$router.push({path:'/wateranalysis'})
    },
    toHisUseWater(){
      this.$router.push({name:'historywater'})
    },
    toWaterNeed(){
      this.$router.push({path:'/waterneed'})
    }
  }
};
</script>

<style lang="less" scoped>
div {
  ul {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 250px;
    li {
      list-style: none;
      text-align: center;
      .el-button{
        width: 100%;
      }
      a {
        width: 100%;
        display: inline-block;
        text-decoration: none;
        color: black;
        height: 38px;
        line-height: 38px;
        border: 1px solid black;
      }
    }
  }
}
</style>