import request from '@/api/request'

//历史供用水
export const get_water_use_table = (params) => {
    return request({
        url: '/get_water_use_table',
        method: 'post',
        data: params
    })
}
// 历史经济
export const get_ecnomic_table = (params) => {
    return request({
        url: '/get_ecnomic_table',
        method: 'post',
        data: params
    })
}

// 用水定额
export const cal_water_quota = (params) => {
    return request({
        url: '/cal_water_quota',
        method: 'post',
        data: params
    })
}   