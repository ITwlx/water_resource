import request from '@/api/request'

//生活需水计算接口
export const shxs_renkou = (params) => {
    return request({
        url: 'shxs_renkou',
        method: 'post',
        data: params
    })
}

//生产需水计算接口
export const scxs_jingji = (params) => {
    return request({
        url: 'scxs_jingji',
        method: 'post',
        data: params
    })
}

//灌溉需水计算接口
export const ggxs_zwjbde = (params) => {
    return request({
        url: 'ggxs_zwjbde',
        method: 'post',
        data: params
    })
}

//林牧渔需水计算接口
export const lmyxs_linyushengchu = (params) => {
    return request({
        url: 'lmyxs_linyushengchu',
        method: 'post',
        data: params
    })
}

//生态需水计算接口
export const stxs_shengtaibushui = (params) => {
    return request({
        url: 'stxs_shengtaibushui',
        method: 'post',
        data: params
    })
}