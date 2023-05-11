<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="width"
    :close-on-click-modal="false"
    :before-close="clearData"
    >
    <div>
        <h4>风险因子或破坏模式</h4>
        <hr>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-input v-model="reason1" placeholder="请输入要增加节点的内容" clearable=""></el-input>
            </el-col>
        </el-row>
        <br>
         <el-row :gutter="10">
            <el-col :span="24">
                <el-input v-model="reason2" :readonly="reason1.length==0?true:false" placeholder="请先输入上方节点的内容" clearable></el-input>
            </el-col>
        </el-row>
        <br>
         <el-row :gutter="10">
            <el-col :span="24">
                <el-input v-model="reason3" :readonly="reason2.length==0?true:false" placeholder="请先输入上方节点的内容" clearable=""></el-input>
            </el-col>
        </el-row>
        <br>
         <el-row :gutter="10">
            <el-col :span="24">
                <el-input v-model="reason4" :readonly="reason3.length==0?true:false" placeholder="请先输入上方节点的内容" clearable=""></el-input>
            </el-col>
        </el-row>
        <br>
         <el-row :gutter="10">
            <el-col :span="24">
                <el-input v-model="reason5" :readonly="reason4.length==0?true:false" placeholder="请先输入上方节点的内容" clearable=""></el-input>
            </el-col>
        </el-row>
    </div>
    <div slot="footer">
        <el-button @click="cancelAddNode">取 消</el-button>
        <el-button type="primary" @click="addNode">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible:false,
            reason1:'',
            reason2:'',
            reason3:'',
            reason4:'',
            reason5:'',
        }
    },
    methods: {
        //取消按钮
        cancelAddNode(){
            Object.assign(this.$data,this.$options.data())
            this.dialogVisible = false
            
        },
        //关闭之前清除数据
        clearData(){
            Object.assign(this.$data,this.$options.data())
            this.dialogVisible = false
        },
        //增加节点
        addNode(){
            let data = []
            if(this.reason1==''){
                this.$message({
                    type:'warning',
                    message:'请先输入数据'
                })
            }else if(this.reason2==''){
                let a = {}
                a.name = this.reason1
                a.x = 80
                a.y = 400
                a.to = []
                data.push(a)
            }else if(this.reason3==''){
                let a = {}
                a.name = this.reason1
                a.x = 80
                a.y = 400
                a.to = []
                data.push(a)
                let b = {}
                b.name = this.reason2
                b.x = 180
                b.y = 900
                b.to = []
                data.push(b)
            }else if(this.reason4==''){
                let a = {}
                a.name = this.reason1
                a.x = 80
                a.y = 400
                a.to = []
                data.push(a)
                let b = {}
                b.name = this.reason2
                b.x = 180
                b.y = 900
                b.to = []
                data.push(b)
                let c = {}
                c.name = this.reason3
                c.x = 580
                c.y = 80
                c.to = []
                data.push(c)
            }else if(this.reason5==''){
                let a = {}
                a.name = this.reason1
                a.x = 80
                a.y = 400
                a.to = []
                data.push(a)
                let b = {}
                b.name = this.reason2
                b.x = 180
                b.y = 900
                b.to = []
                data.push(b)
                let c = {}
                c.name = this.reason3
                c.x = 580
                c.y = 80
                c.to = []
                data.push(c)
                let d = {}
                d.name = this.reason4
                d.x = 780
                d.y = 480
                d.to = []
                data.push(d)
            }else{
                let a = {}
                a.name = this.reason1
                a.x = 80
                a.y = 400
                a.to = []
                data.push(a)
                let b = {}
                b.name = this.reason2
                b.x = 180
                b.y = 900
                b.to = []
                data.push(b)
                let c = {}
                c.name = this.reason3
                c.x = 580
                c.y = 80
                c.to = []
                data.push(c)
                let d = {}
                d.name = this.reason4
                d.x = 780
                d.y = 480
                d.to = []
                data.push(d)
                let e = {}
                e.name = this.reason5
                e.x = 980
                e.y = 1080
                e.to = []
                data.push(e)
            }
            this.$emit('addData',data)
            this.dialogVisible = false
        }
    },
}
</script>

<style>

</style>