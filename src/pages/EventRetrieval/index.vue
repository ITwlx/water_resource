<template>
  <div style="padding: 0px 90px">
    事件检索
    <br /><br />
    <el-row :gutter="10">
      <el-col :span="18"><el-input v-model="problem" placeholder="请输入要查找的问题"></el-input ></el-col>
      <el-col :span="6"><el-button type="primary" @click="searchExample">检索</el-button></el-col>
    </el-row>
    <br />
    <h4>图谱概览</h4>
    <el-row :gutter="10">
      <el-col :span="20">
        <div ref="charts" style="border: 1px solid black; height: 300px"></div>
      </el-col>
    </el-row>
    <h4>事件信息</h4>
    <el-row :gutter="10">
      <el-col :span="20">
        <div style="border: 1px solid black; min-height: 100px">
            <p v-for="(item, index) in linkData" :key="index">
              {{item.target}}-{{item.des}}--{{item.source}}
            </p>
        </div>
      </el-col>
    </el-row>
    <h4>相关事件</h4>
    <el-row :gutter="10">
      <el-col :span="20">
        <div style="border: 1px solid black; min-height: 100px">
             <p v-for="(item,index) in similar" :key="index">{{item}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {event_retrieve} from '@/api/applyKnowledge/index'
export default {
  data() {
    return {
      problem: "",
      show:false,
      entityData:[],
      linkData:[],
      similar:[]
    };
  },
  methods: {
    async getData(){
      let data = new FormData()
      if(this.problem.indexOf('渗')!==-1||this.problem.indexOf('钢筋')!==-1){
       data.append('event_type','1')
      }else{
        data.append('event_type','2')
      }
      console.log(data);
      data.append('event','')
      
      let result = await event_retrieve(data)
      this.entityData = result.data.entityData
      this.linkData = result.data.linkData
      this.similar = result.data.similar
      
    },
    //展示图谱
    showCharts(data,links) {
      let myChart = echarts.init(this.$refs.charts);
      // let options = {
      //   title: {
      //     text: "Graph",
      //   },
      //   tooltip: {},
      //   animationDurationUpdate: 1500,
      //   animationEasingUpdate: "quinticInOut",
      //   series: [
      //     {
      //       type: "graph",
      //       layout: "none",
      //       symbolSize: 50,
      //       roam: true,
      //       label: {
      //         show: true,
      //       },
      //       edgeSymbol: ["circle", "arrow"],
      //       edgeSymbolSize: [4, 10],
      //       edgeLabel: {
      //         fontSize: 20,
      //       },
      //       data:data,
      //       links:links,
      //       lineStyle: {
      //         opacity: 0.9,
      //         width: 2,
      //         curveness: 0,
      //       },
      //     },
      //   ],
      // };
      let options = {
            title: {
                text: ''
            },
            opts:{
                width:'auto',
                height:'auto',
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 2
                    },
                }
            },
            legend: {
                x: "center",
                show: false,
                textStyle:{
                    color:'#000000'
                }
            },
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    // symbolSize: 10,
                    focusNodeAdjacency: true,
                    roam: true,
                    edgeSymbol: ['none', 'arrow'],
                    categories: [{
                        name: '查询实体',
                        itemStyle: {
                            normal: {
                                color: "#DC143C",
                            }
                        }
                    }],
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 14,
                                color:'#000000'
                            },
                        }
                    },
                    force: {
                        repulsion: 1000,
                        edgeLength: [40, 100]
                    },
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 10
                            },
                            formatter: "{c}"
                        }
                    },
                    data,
                    links,
                    lineStyle: {
                        normal: {
                            opacity: 0.9,
                            width: 0.3,
                            curveness: 0.1,
                            color:"#262626"
                        }
                    }
                }
            ]
        };

      options && myChart.setOption(options);
    },
    //输入要查找的例子
    searchExample(){
        this.show = true
        
        this.getData().then((r)=>{
            this.showCharts(this.entityData,this.linkData)
        },(e)=>{})
        
    }
  },
  mounted() {
    
  },
};
</script>

<style>
</style>