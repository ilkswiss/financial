//判断是否是生产环境
var isPro = process.env.NODE_ENV === 'production' 
//process.env.NODE_ENV用于区分是生产环境还是开发环境
//根据环境不同导出不同的baseURL
module.exports = {
     baseURL: isPro ? 'http://192.168.202.190:8081' : 'http://192.168.3.253:8081'
    //baseURL:'http://192.168.3.253:8081'
}