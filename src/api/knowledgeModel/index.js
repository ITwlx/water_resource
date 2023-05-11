import mockAjax from '@/api/mockAjax'
export const node = ()=>{
    return mockAjax({
        method:'get',
        url:'knowledge',
    })
}