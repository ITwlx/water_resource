// 引入mockjs模块
import Mock from 'mockjs'
// 引入JSON数据  【JSON数据没有对外暴露，但是可以引入】
// webpack默认对外暴露：图片，JSON数据格式
import knowledge from './knowledge.json'
import water from './water.json'

// mock数据 ：第一个参数：请求地址 第二个参数：请求数据
Mock.mock("/mock/knowledge", { code: 200, data: knowledge })
Mock.mock("/mock/water", { code: 200, data: water })

Mock.mock('/mock/login', 'post', (options) => {
    console.log(options.body);
    const { username, password } = JSON.parse(options.body) // 从POST请求中解析出用户名和密码
    // 如果用户名和密码与预定义的值匹配，则返回成功状态
    if (username === 'test' && password === '123456') {
      return {
        code: 200,
        message: 'Login success',
      }
    } else {
      return {
        code: 400,
        message: 'Invalid username or password',
      }
    }
  })