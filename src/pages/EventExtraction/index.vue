<template>
  <div style="padding:0px 5px">
    事件抽取 <br /><br />
    <el-row :gutter="10">
      <el-col :span="12">
        管理处：<el-select v-model="address" placeholder="请选择" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option> </el-select
      ></el-col>
      <el-col :span="12">
        日期：<el-date-picker
          v-model="value1"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getTimeChangeData"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <br />
    <EventDetail ref="eventdetail"></EventDetail>
    <el-table :data="data" border style="width: 100%">
      <el-table-column prop="failure_mode" label="问题描述" width="width">
      </el-table-column>
      <el-table-column prop="building_name" label="建筑物" width="width"> </el-table-column>
      <el-table-column prop="location" label="部位" width="width"> </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button type="primary" @click="showDetail(row)"> 标注 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import EventDetail from "@/pages/EventExtraction/EventDetail";
import moment from "moment";
import { event_list } from "@/api/manegeKnowledge/index";
export default {
  name: "shijianchouqu",
  data() {
    return {
      options:[

      ],
      address: "", //管理处
      value1: ['2010-05-01','2015-05-01'], //选取的日期
      currentPage: 1, //默认页
      page:1,//选择那一页
      page_size:10,//每页多少条数据
      data: [ ],
    };
  },
  computed: {
    //利用moment转化为时间戳
    //开始时间
    start_date() {
      return moment(this.value1[0]).format("x")/1000;
    },
    //结束时间
    end_date() {
      return moment(this.value1[1]).format("x")/1000;
    },
  },
  components: { EventDetail },
  methods: {
    //展示详情页
    showDetail(row) {
      this.$refs.eventdetail.dialogVisible = true;
      this.$refs.eventdetail.getData(row);
    },
    //请求后台数据
    async getEventData(page,page_size,management,start_date,end_date){
      try {
        let data = new FormData()
        data.append('page',page)
        data.append('page_size',page_size)
        data.append('management',management)
        data.append('start_date',start_date)
        data.append('end_date',end_date)
        let result = await event_list(data)
        this.data = result.data
      } catch (error) {
        this.$message({
          message:error,
          type:'warning'
        })
      }
    },
    //时间变化获取数据
    getTimeChangeData() {
      this.getEventData(this.page,this.page_size,'郑州管理处',this.start_date,this.end_date)
    },
    //每页多少
    handleSizeChange(val) {
      this.page_size = val
      this.getEventData(this.page,val,'郑州管理处',this.start_date,this.end_date)
    },
    handleCurrentChange(val) {
      this.page = val
      this.getEventData(val,this.page_size,'郑州管理处',this.start_date,this.end_date)
    },
  },
  beforeMount() {
    this.getEventData(this.page,this.page_size,'郑州管理处',this.start_date,this.end_date)
  },
};
</script>

<style>
</style>