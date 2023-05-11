import request from '@/api/request'

export const produce_event = (data)=>{
    return request({
        method:'post',
        url:'transactionset_create',
        data
    })
}