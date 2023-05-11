<template>
  <div class="category">
    <h2>请选择具体问题</h2>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in data"
        :key="item.name"
        :label="item.name"
        :name="item.name"
      >
        <el-tabs>
          <el-tab-pane
            v-for="item in item.list"
            :key="item.name"
            :label="item.name"
            :name="item.name"
          >
            <el-button
              v-for="item in item.list"
              :type="id == item.type_id ? 'primary' : ''"
              :key="item.type_id"
              @click="chooseId(item.type_id,item.name)"
              style="margin: 3px 1px"
              >{{ item.name }}</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <br /><br /><br /><br />
      <el-button type="success" @click="confirmType">确定</el-button>
      <el-button type="info" @click="cancel">取消</el-button>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "second",
      data: [],
      id: "", //id
      name:'',//name
    };
  },
  methods: {
    handleClick(tab, event) {},
    // 选择某个事件
    chooseId(id,name) {
      this.id = id;
      this.name = name
    },
    //取消选择
    cancel() {
      Object.assign(this._data, this.$options.data());
      this.$parent.$parent.category_show = false;
    },
    //确定选择
    confirmType(){
        this.$emit('confirmType',[this.id,this.name])
        Object.assign(this._data, this.$options.data());
        this.$parent.$parent.category_show = false;
    }
  },
  mounted() {},
};
</script>

<style scope lang="less">
.category {
  width: 130%;
  height: 100%;
  position: absolute;
  left: -50px;
  top: 0px;
  background-color: rgb(213, 251, 255);
  z-index: 10;
}
</style>