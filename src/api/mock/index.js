import mockAjax from '@/api/mockAjax'
export const login = (data)=>{
    return mockAjax({
        method:'post',
        url:'/login',
        data
    })
}