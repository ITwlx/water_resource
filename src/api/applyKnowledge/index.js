import request from '@/api/request'

export const event_retrieve = (data)=>{
    return request({
        method:'post',
        url:'event_retrieve',
        data
    })
}