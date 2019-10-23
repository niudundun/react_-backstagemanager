import axios from "axios";
import qs from "qs";
import {message} from "antd";
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const instance = axios.create({
  timeout:10000
})

//请求拦截器参数为一个回调函数传配置对象并将其返回
instance.interceptors.request.use( config => {
  console.log('request inter');
  Nprogress.start()
  const {data} = config
  // post put 请求的data对象数据为json 需要转换成字符串
  if (data instanceof Object) {
     config.data = qs.stringify(data)
  }
  return config
})

//响应拦截器
instance.interceptors.response.use(
  //拦截响应成功的回调
  response => {
    console.log('response inter',response);
    Nprogress.done()
    const result = response.data
    return result
  },
  // 请求失败的回调,也有外部错误的
  error => {
    // console.log('error inter');
    Nprogress.done()
    message.error('请求出错:'+error.message)
    // 出错误不用再传递了，中断promise链
    return new Promise(()=>{})
  }
)

export default instance

