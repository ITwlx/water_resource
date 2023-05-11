<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="width"
    >
    <div>
        挖掘数据
    </div>
    <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible:false
        }
    },
}
</script>

<style>

</style>