import ajax from "./ajax";
// 登入请求接口
export const reqLogin = ({username,password}) => ajax({
  url:'/login',
  method:'POST',
  data:{username,password}
})
