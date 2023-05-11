<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="width"
    :close-on-click-modal="false"
  >
    <!-- :before-close="dialogBeforeClose" -->
    <div>
      <h2>事件详情</h2>
      <br />
      <div style="width: 100%; height: 200px; border: 1px solid black">
        {{ event_details }}
      </div>
      <br />
      <el-row :gutter="10">
        <el-col :span="12">
          所属管理处:<input v-model="data.office_name" placeholder="" />
          <br /><br />
          建筑物名称: <input v-model="data.building_name" placeholder="" />
          <br />
          <br />
          发生&nbsp;&nbsp;部位:
          <input v-model="data.location" placeholder="" /> <br />
          <br />
          破坏&nbsp;&nbsp;模式 :<input
            v-model="data.failure_mode"
            placeholder=""
          />
        </el-col>
        <el-col :span="12">
          事件类型:
          <input
            v-model="event_name"
            placeholder="请选择"
            @focus="showCategoryPage"
          />
          <br /><br />
          索引：<input
            v-model="data.building_name_index"
            placeholder=""
            readonly
          />
          <br /><br />
          索引：<input v-model="data.location_index" placeholder="" readonly />
          <br /><br />
          索引：<input
            v-model="data.failure_mode_index"
            placeholder=""
            readonly
          />
        </el-col>
      </el-row>
    </div>
    <CategoryPage ref="category" @confirmType="getId" v-show="category_show" />
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateEventData">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { event_category,event_update } from "@/api/manegeKnowledge/index";
import CategoryPage from "@/pages/EventExtraction/EventDetail/Category";
export default {
  data() {
    return {
      dialogVisible: false,
      event_details: "", //事件详情
      data: {},
      //选择时间标注类型
      event_type: [
        {
          event_type: "1",
          event_type_id: "2",
        },
      ],
      event_id: "",
      event_name: "", //事件类型
      //category页面
      category_data: [],
      category_show: false, //category是否显示
    };
  },
  watch: {
    data: {
      handler(newval, oldval) {
        this.data.building_name_index =
          this.event_details.indexOf(this.data.building_name) + 1;
        this.data.location_index =
          this.event_details.indexOf(this.data.location) + 1;
        this.data.failure_mode_index =
          this.event_details.indexOf(this.data.failure_mode) + 1;
      },
      deep: true,
      // immediate:true
    },
  },
  components: { CategoryPage },
  methods: {
    // 获取父组件数据
    async getData(row) {
      this.data = row;
      this.event_details = row.event_details;
      try {
        let data = await event_category();
        this.category_data = data.data;
      } catch (error) {
        this.$message({
          message: "数据出错了",
          type: "warning",
        });
      }
    },
    // 展示问题分类页面
    showCategoryPage() {
      this.$refs.category.data = this.category_data;
      this.category_show = true;
    },
    //获取事件类型的id
    getId(row) {
      this.event_id = row[0];
      this.event_name = row[1];
    },
    // 向后端发送并更新数据
    async updateEventData(){
      let data = new FormData()
      data.append('event_id',this.data.event_id)
      data.append('office_name',this.data.office_name)
      data.append('event_type_id',this.event_id)
      data.append('event_type_name',this.event_name)
      data.append('building_name',this.data.building_name)
      data.append('building_name_index',this.data.building_name_index)
      data.append('location',this.data.location)
      data.append('location_index',this.data.location_index)
      data.append('failure_mode',this.data.failure_mode)
      data.append('failure_mode_index',this.data.failure_mode_index)
      try {
        let result = await event_update(data)
        this.$message({
          message:'成功修改后台数据啦',
          type:'success'
        })
        this.dialogVisible = false
      } catch (error) {
        this.$message({
          message:'出问题啦，请联系管理人员',
          type:'warning'
        })
      }
    }
  },
};
</script>

<style scope lang='less'>
input {
  width: 180px;
  height: 30px;
}
</style>