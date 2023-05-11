<template>
  <div class="mining">
    事件抽取 <hr>
     <h4>滑动时间窗口关联规则挖掘</h4>
    <el-row :gutter="10">
      <el-col :span="8">窗口宽度(天):<input type="text" v-model.number="windows_weight"></el-col>
      <el-col :span="8">步    长(天):<input type="text" v-model.number="step_width"></el-col>
      <el-col :span="8"><el-button type="success" @click="produceEvent">生成事务集</el-button></el-col>
    </el-row>
    <hr>
    <el-row :gutter="10">
      <el-col :span="18">
        <h5>事务集</h5>
        <div  style="width:100%;height:250px;border:1px solid black;padding:0px 20px">
          <p v-for="(item, index) in event_data" :key="index"><span v-for="(i,index) in item" :key="index">&nbsp;{{i}}&nbsp;,</span></p>
        </div>
      </el-col>
      <el-col :span="6">
        <h5>参数设置</h5>
        <ul style="list-style:none">
          <li>支持度 <input type="text" v-model="support_d"></li> <br>
          <li>置信度 <input type="text" v-model="believe_d"></li> <br>
          <li>提升度 <input type="text" v-model="promote_d"></li>
        </ul>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="24"  style="text-align:center;padding:90px 0">
        <el-button type="primary" @click="miningEvent">开始挖掘</el-button>
      </el-col>
    </el-row>
    <MiningEvent ref="mining" />
  </div>
</template>

<script>
import MiningEvent from './MiningEvent/index.vue'
import {produce_event} from '@/api/MiningAnalysis/index'
export default {
  data() {
    return {
      windows_weight:'',
      step_width:'',
      textarea:'',
      event_data:[],
      flag:false,
      support_d:'',
      believe_d:'',
      promote_d:'',
    }
  },
  components:{MiningEvent},
  methods: {
    //生成事务集
    async produceEvent(){
      let data = new FormData()
      data.append('width',this.windows_weight)
      data.append('step_size',this.step_width)
      let result = await produce_event(data)
      this.event_data = result.data
      this.flag = true
    },
    //挖掘事务集
    miningEvent(){
      if(this.support_d==''&&this.believe_d==''&&this.promote_d==''){
        this.$message({
          type:'error',
          message:'请输入完整数据'
        })
        return
      }
      this.$refs.mining.dialogVisible = true
    }
  },
}
</script>

<style scope lang="less">
.mining{
  padding: 0 5px;
}
</style>