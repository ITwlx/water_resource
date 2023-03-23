<template>
  <div id="app">
    <div class="header">
      <Header></Header>
    </div>
    <div class="main">
      <div class="navbar">
        <NavBar></NavBar>
      </div>
      <router-view>

      </router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import EcomicsTrend from "@/views/ecomicsTrend";

export default {
  name: "App",
  components: {
    Header,
    NavBar,
    EcomicsTrend
  },
};
</script>

<style lang="less" scoped>
#app{
  height: 110%;
  
  border: 2px solid black;
  overflow: hidden;
  .header{
    height: 71px;
    
  }
  .main{
    min-height: 1000px;
    height: 100%;
    display: flex;
    .navbar{
      border: 1px solid black;
    }
  }
}
</style>
