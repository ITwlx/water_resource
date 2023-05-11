import request from '@/api/request'

//获取事件类型
export const event_category = ()=>{
    return request({
        method:'post',
        url:'event_category'
    })
}

// 获取事件列表分页
export const event_list = (data)=>{
    return request({
        url:'event_list',
        method:'post',
        data
    })
}

// 事件标注提交
export const event_update = (data)=>{
    return request({
        url:'event_update',
        method:'post',
        data
    })
}