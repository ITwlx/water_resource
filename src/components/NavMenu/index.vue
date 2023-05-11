<template>
  <el-menu
    default-active="2"
    style="background: rgb(230, 247, 255); color: white"
    class="el-menu-vertical-demo"
  >
    <!-- @open="handleOpen"
          @close="handleClose" -->
    <el-submenu index="1">
      <template slot="title">
        <span style="color: black">知识库管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1" @click="showPage('1-1')">知识建模</el-menu-item>
        <el-menu-item index="1-2" @click="showPage('1-2')">事件抽取</el-menu-item>
        <el-menu-item index="1-3" @click="showPage('1-3')">挖掘分析</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <span style="color: black">知识库应用</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1" @click="showPage('2-1')">事件检索</el-menu-item>
        <el-menu-item index="2-2" @click="showPage('2-2')">预测分析</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  methods: {
    showPage(index){
      if(index === '1-1'){
        this.$router.push({
          name:'zhishijianmo'
        })
      }else if(index === '1-2'){
        this.$router.push({
          name:'shijianchouqu'
        })
      }else if(index =='1-3'){
        this.$router.push({
          name:'wajuefenxi'
        })
      }else if(index=='2-1'){
        this.$router.push({
          name:'shijianjiansuo'
        })
      }else if(index == '2-2'){
        this.$router.push({
          name:'yucefenxi'
        })
      }
    }
  },
};
</script>

<style>
</style>