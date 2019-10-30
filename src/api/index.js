import ajax from "./ajax";
import jsonp from "jsonp";
import {
  message
} from "antd";

// 登入请求接口
export const reqLogin = ({
  username,
  password
}) => ajax({
  url: '/login',
  method: 'POST',
  data: {
    username,
    password
  }
})

//获取用户列表
export const reqUsersList = () => ajax({
  url: '/manage/user/list',
  method: 'GET'
})

//获取天气
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {
        const {
          dayPictureUrl,
          weather
        } = data.results[0].weather_data[0]
        resolve({
          dayPictureUrl,
          weather
        })
      } else {
        message.error('获取天气失败')
        return new Promise(() => {})
      }
    })
  })
}

//页面加载获取商品分类
export const reqGetCategorys = () => ajax('/manage/category/list')

//添加商品分类
export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add', {categoryName})

//更新商品分类
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax({
  url: '/manage/category/update',
  method: 'POST',
  data: {
    categoryId,
    categoryName
  }
})

//页面加载获取商品分页列表List
export const reqGetProducts = (pageNum, pageSize) => ajax({
  url: '/manage/product/list',
  params: { // 用参数而不是data
    pageNum, // 页码 读取第几页
    pageSize // 每页条目数
  }
})

//搜索请求获取商品列表
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchType, //搜索类型名称 productName/productDesc 
  searchName //搜索关键字
}) => ajax({
  url: '/manage/product/search',
  params: {
    pageNum,
    pageSize,
    [searchType]: searchName //searchType作为请求参数名称，不作为值传递
  }
})

//更新商品状态
export const reqUapdateProductStatus = (productId,status) => ajax({
  url:'/manage/product/update',
  method:'POST',
  data:{
    productId,
    status
  }
})

//根据商品id获取商品
export const reqProductById = (productId) => ajax({
  url: '/manage/product/info',
  params: {productId}
})

//根据商品分类id获取分类
export const reqCategoryById = (categoryId) => ajax({
  url:'/manage/category/info',
  params:{
    categoryId
  }
})

//添加/更新商品
export const reqAddUpdateProduct = (product) => ajax.post(
  '/manage/product/' + (product._id ? 'update' : 'add'),
  product
)

//获取角色列表
export const reqGetRoles = () => ajax('/manage/role/list')

//添加角色
export const reqAddRole = (roleName) => ajax.post('/manage/role/add',{roleName})

//设置权限后更新角色
export  const reqUpdateRole = (role) => ajax.post('/manage/role/update',role)

//获取用户
export const reqGetUsers = () => ajax('/manage/user/list')

//添加/更新用户
export const reqAddUpdateUser = (user) => ajax.post('/manage/user/'+(user.id?'update':'add'),user)

//删除用户
export const reqDeletUser = (userId) => ajax.post('/manage/user/delete',{userId})