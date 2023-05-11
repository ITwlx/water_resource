<template>
  <div id="app">
    <h2>南水北调工程运行风险事理图谱系统</h2>
    <el-row :gutter="10" style="height:100%">
      <el-col :span="4" class="left_nav" style="height:100%;background:rgb(230,247,255);padding:0" >
        <NavMenu></NavMenu>
      </el-col>
      <el-col :span="20" >
        <router-view>
        </router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Ad from '@/pages/Login'
import NavMenu from '@/components/NavMenu'
export default {
  name: "App",
  components: {NavMenu,Ad},
};
</script>

<style lang="less">
#app {
  min-height: 100vh;
  width: 100%;
  background-color: rgb(180, 212, 226);
  h2 {
    padding: 10px 0;
    margin: 0;
    border-bottom: 3px solid black;
  }
}
</style>
