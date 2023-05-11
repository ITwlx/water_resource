<template>
  <div style="padding:0 90px">
    预测分析 <br><br><br>
    <el-row :gutter="10">
        <el-col :span="24" style="display:flex;justify-content:space-between">
            <h4>事件描述</h4>
            <el-button type="primary">分析</el-button>
        </el-col>
    </el-row><br>
    <el-row :gutter="10">
        <el-col :span="24"><el-input v-model="charts_analysis" :autosize="{ minRows: 4, maxRows: 24}" type="textarea" placeholder=""></el-input></el-col>
    </el-row>
     
    <br>
    <el-row :gutter="10">
        <h4>图谱分析</h4>
        <el-col :span="24">
           <div style="border:1px solid black;height:220px"></div>
        </el-col>
    </el-row>
    <el-row :gutter="10">
        <h4>预测结果</h4>
        <el-col :span="24">
            <div style="border:1px solid black;height:80px"></div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
            charts_analysis:'',
        }
    },
}
</script>

<style>

</style>