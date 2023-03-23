import request from '@/api/request'


//城用水分析表
export const city_water_use_plot = (params)=>{
   return request({
        url:'/city_water_use_plot',
        method:'post',
        data:params
    })
}   
//城供水分析表
export const city_water_supply_table = (params)=>{
    return request({
         url:'/city_water_supply_table',
         method:'post',
         data:params
     })
 }  
 //县用水分析表
export const area_water_use_plot = (params)=>{
    return request({
         url:'/area_water_use_plot',
         method:'post',
         data:params
     })
 }   
 //县供水分析表
 export const area_water_supply_table = (params)=>{
     return request({
          url:'/area_water_supply_table',
          method:'post',
          data:params
      })
  }  

  // 交互二市供水分布表
  export const area_year_water_supply_table = (params)=>{
    return request({
         url:'/area_year_water_supply_table',
         method:'post',
         data:params
     })
 }  
 // 交互二市用水分布表
 export const area_year_water_use_table = (params)=>{
    return request({
         url:'/area_year_water_use_table',
         method:'post',
         data:params
     })
 } 