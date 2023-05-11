<template>
  <div style="padding: 0px 5px">
    知识建模 <br />
    <hr />
    <NewNode ref="newNode" @addData='addData'/>
    <el-row :gutter="10">
      <el-col :span="24">
        <div ref="charts" style="height: 620px; border: 1px solid black"></div>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="10">
      <el-col :span="24" style="text-align: center; padding-left: 180px">
        <el-col :span="3">风险机理:</el-col>
        <el-col :span="3"
          ><el-input
            v-model="reason"
            placeholder="请输入因素"
            size="mini"
          ></el-input
        ></el-col>
        <el-col :span="3">导致:</el-col>
        <el-col :span="3"
          ><el-input
            v-model="result"
            placeholder="请输入事故"
            size="mini"
          ></el-input
        ></el-col>
        <el-col :span="2"
          ><el-button type="primary" size="small" @click="searchChart"
            >查询</el-button
          ></el-col
        >
        <el-col :span="2"
          ><el-button type="primary" size="small" @click="saveChart"
            >存储</el-button
          ></el-col
        >
        <el-col :span="2"
          ><el-button type="primary" size="small" @click="deleteChart"
            >删除</el-button
          ></el-col
        >
        <el-col :span="2"
          ><el-button type="primary" size="small" @click="addNode">添加节点</el-button></el-col
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import NewNode from "@/pages/KnowledgeModel/NewNode";
export default {
  data() {
    return {
      reason: "",
      result: "",
      graph_data: [
        {
          id: "1",
          x: "10",
          y: "10",
          name: "洪水冲刷渡槽基础",
          to: ["地基不均匀沉陷"],
        },
        {
          id: "2",
          x: "120",
          y: "10",
          name: "地基不均匀沉陷",
          to: ["支撑结构倾斜开裂"],
        },
        {
          id: "3",
          x: "120",
          y: "200",
          name: "支撑结构倾斜开裂",
          to: ["整体倒塌", "槽身倾斜开裂"],
        },
        {
          id: "4",
          x: "260",
          y: "60",
          name: "整体倒塌",
          to: [],
        },
        {
          id: "5",
          x: "260",
          y: "300",
          name: "槽身倾斜开裂",
          to: ["止水带断裂"],
        },
        {
          id: "6",
          x: "400",
          y: "330",
          name: "止水带断裂",
          to: ["整体倒塌"],
        },
      ], //关系图的数据
    };
  },
  components:{
    NewNode
  },
  methods: {
    // 查询图表
    searchChart() {
      let data = [];
      let links = [];
      if (this.reason == "" && this.result == "") {
        this.graph_data.forEach((item) => {
          let a = {};
          a.name = item.name;
          a.x = item.y;
          a.y = item.x;
          data.push(a);
          item.to.forEach((i) => {
            let link = {};
            link.source = item.name;
            link.target = i;
            links.push(link);
          });
        });
      } else if (this.reason !== "" && this.result == "") {
        if ("洪水冲刷渡槽基础".indexOf(this.reason) !== -1) {
          data = [
            {
              name: "洪水冲刷渡槽基础",
              x: 100,
              y: 2000,
            },
            {
              name: "地基不均匀沉陷",
              x: 200,
              y: 1000,
            },
          ];
          links = [
            {
              source: 0,
              target: 1,
            },
          ];
        } else if ("地基不均匀沉陷".indexOf(this.reason) !== -1) {
          data = [
            {
              name: "支撑结构倾斜开裂",
              x: 100,
              y: 2000,
            },
            {
              name: "地基不均匀沉陷",
              x: 200,
              y: 1000,
            },
          ];
          links = [
            {
              source: 1,
              target: 0,
            },
          ];
        } else if ("支撑结构倾斜开裂".indexOf(this.reason) !== -1) {
          data = [
            {
              name: "支撑结构倾斜开裂",
              x: 100,
              y: 2000,
            },
            {
              name: "整体倒塌",
              x: 200,
              y: 1500,
            },
            {
              name: "槽身倾斜开裂",
              x: 400,
              y: 1200,
            },
          ];
          links = [
            {
              source: 0,
              target: 1,
            },
            {
              source: 0,
              target: 2,
            },
          ];
        } else if ("槽身倾斜开裂".indexOf(this.reason) !== -1) {
          data = [
            {
              name: "槽身倾斜开裂",
              x: 100,
              y: 2000,
            },
            {
              name: "止水带断裂",
              x: 200,
              y: 1000,
            },
          ];
          links = [
            {
              source: 0,
              target: 1,
            },
          ];
        } else if ("止水带断裂".indexOf(this.reason) !== -1) {
          data = [
            {
              name: "止水带断裂",
              x: 100,
              y: 2000,
            },
            {
              name: "整体倒塌",
              x: 200,
              y: 1000,
            },
          ];
          links = [
            {
              source: 0,
              target: 1,
            },
          ];
        }
      } else if (this.reason == "" && this.result !== "") {
        if ("地基不均匀沉陷".indexOf(this.result) !== -1) {
          data = [
            {
              name: "洪水冲刷渡槽基础",
              x: 100,
              y: 2000,
            },
            {
              name: "地基不均匀沉陷",
              x: 200,
              y: 1000,
            },
          ];
          links = [
            {
              source: 0,
              target: 1,
            },
          ];
        } else if ("支撑结构倾斜开裂".indexOf(this.result) !== -1) {
          data = [
            {
              name: "支撑结构倾斜开裂",
              x: 100,
              y: 2000,
            },
            {
              name: "地基不均匀沉陷",
              x: 200,
              y: 1000,
            },
          ];
          links = [
            {
              source: 1,
              target: 0,
            },
          ];
        } else if ("整体倒塌".indexOf(this.result) !== -1) {
          data = [
            {
              name: "支撑结构倾斜开裂",
              x: 100,
              y: 2000,
            },
            {
              name: "整体倒塌",
              x: 200,
              y: 1500,
            },
          ];
          links = [
            {
              source: 0,
              target: 1,
            },
          ];
        } else if ("止水带断裂".indexOf(this.result) !== -1) {
          data = [
            {
              name: "槽身倾斜开裂",
              x: 100,
              y: 2000,
            },
            {
              name: "止水带断裂",
              x: 200,
              y: 1000,
            },
          ];
          links = [
            {
              source: 0,
              target: 1,
            },
          ];
        } else if ("整体倒塌".indexOf(this.result) !== -1) {
          data = [
            {
              name: "止水带断裂",
              x: 100,
              y: 2000,
            },
            {
              name: "整体倒塌",
              x: 200,
              y: 1000,
            },
          ];
          links = [
            {
              source: 0,
              target: 1,
            },
          ];
        }
      } else if (this.reason !== "" && this.result !== "") {
        this.graph_data.forEach((item) => {
          if (item.name.indexOf(this.reason) !== -1) {
            item.to.forEach((i) => {
              if (i.indexOf(this.result) !== -1) {
                data = [
                  {
                    name: item.name,
                    x: 1000,
                    y: 2000,
                  },
                  {
                    name: i,
                    x: 2000,
                    y: 1000,
                  },
                ];
                links = [
                  {
                    source: item.name,
                    target: i,
                  },
                ];
              }
            });
          }
        });
      }
    //   if (data.length == 0) {
    //     this.$message({
    //       type: "error",
    //       message: "无数据",
    //     });
    //   }
      this.getChart(data, links);
    },
    //存储关系
    saveChart() {
      if (this.reason == "" || this.result == "") {
        this.$message({
          type: "error",
          message: "请将因素和事故填写完毕",
        });
        return;
      }
      let a, b;
      this.graph_data.forEach((item, index) => {
        if (item.name.indexOf(this.result) !== -1) {
          a = item.name;
        }
        if (item.name.indexOf(this.reason) !== -1) {
          b = index;
        }
      });
      let flag = 1;
      for (let index = 0; index < this.graph_data[b].to.length; index++) {
        if (this.graph_data[b].to[index] == a) {
          this.$message({
            type: "error",
            message: "不能重复建立联系",
          });
          flag = 0;
        }
      }
      if (flag) {
        this.graph_data[b].to.push(a);
      }
      this.searchChart();
    },
    //获取图表
    getChart(data, links) {
      console.log(links);
      let myChart = echarts.init(this.$refs.charts);
      let options = {
        title: {
          text: "Graph",
        },

        // legend: {
        // 	orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
        // 							   // 'horizontal' ¦ 'vertical'
        // 	x: 'center',               // 水平安放位置，默认为全图居中，可选为：
        // 							   // 'center' ¦ 'left' ¦ 'right'
        // 							   // ¦ {number}（x坐标，单位px）
        // 	y: 'top',  },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
            symbolSize: 50,
            roam: true,
            label: {
              show: true,
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20,
            },
            data,
            // data: [
            //   {
            //     name: "洪水冲刷渡槽基础",
            //     x: 1000,
            //     y: 2000,
            //   },
            //   {
            //     name: "地基不均匀沉陷",
            //     x: 2000,
            //     y: 1000,
            //   },
            //   {
            //     name: "支撑结构倾斜开裂",
            //     x: 400,
            //     y: 200,
            //   },
            //   {
            //     name: "整体倒塌",
            //     x: 600,
            //     y: 200,
            //   },
            //   {
            //     name: "槽身倾斜开裂",
            //     x: 600,
            //     y: 400,
            //   },
            //   {
            //     name: "止水带断裂",
            //     x: 800,
            //     y: 600,
            //   },
            // ],
            links,
            // links: [
            //   {
            //     source: 0,
            //     target: 1,
            //   },
            //   {
            //     source: 1,
            //     target: 2,
            //   },
            //   {
            //     source: 2,
            //     target: 3,
            //   },
            //   {
            //     source: 2,
            //     target: 4,
            //   },
            //   {
            //     source: "槽身倾斜开裂",
            //     target: "止水带断裂",
            //   },
            //   {
            //     source: 5,
            //     target: 3,
            //   },
            // ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0,
            },
          },
        ],
      };
      options && myChart.setOption(options);
    },
    //删除接关系
    deleteChart() {
      let a;
      this.graph_data.forEach((item, index) => {
        if (item.name == this.reason) {
          item.to.forEach((i, index) => {
            if (i == this.result) {
              a = index;
            }
          });
          this.graph_data[index].to.splice(a,1);
        }
      });
      this.reason= ''
      this.result = ''
      this.searchChart()
    },
    //增加节点
    addNode(){
        this.$refs.newNode.dialogVisible = true
    },
    addData(data){
        this.graph_data.splice(this.graph_data.length,0,...data)
        this.searchChart()
    }
  },
  mounted() {},
};
</script>

<style>
</style>