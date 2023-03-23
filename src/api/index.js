import request from '@/api/request'

//获取常住人口
export const population_plot = (params) => {
    return request({
        url: '/get_population_plot',
        method: 'post',
        data: params
    })
}
// 获取城镇化率
export const urbanization_plot = (params) => {
    return request({
        url: '/get_urbanization_plot',
        method: 'post',
        data: params
    })
}
// 获取地区生产总值
export const gdp_plot = (params) => {
    return request({
        url: '/get_gdp_plot',
        method: 'post',
        data: params
    })
}
// 二产增加值
export const sec_growth_plot = (params) => {
    return request({
        url: '/get_sec_growth_plot',
        method: 'post',
        data: params
    })
}
// 获取三产增加值
export const trd_growth_plot = (params) => {
    return request({
        url: '/get_trd_growth_plot',
        method: 'post',
        data: params
    })
}
// 获取工业增加值
export const ind_growth_plot = (params) => {
    return request({
        url: '/get_ind_growth_plot',
        method: 'post',
        data: params
    })
}
// 获取三产占比
export const trd_product_ratio_plot = (params) => {
    return request({
        url: '/get_trd_product_ratio_plot',
        method: 'post',
        data: params
    })
}
// 获取经济指标趋势表格
export const ecno_analysis_table = (params) => {
    return request({
        url: '/get_ecno_analysis_table',
        method: 'post',
        data: params
    })
}