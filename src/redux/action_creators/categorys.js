import { 
  GET_CATEGORYS,
  ADD_CATEGORY,
  UPDATE_CATEGORY
 } from "../action_types"
import { reqGetCategorys, reqAddCategory, reqUpdateCategory } from "../../api"

 const getCategorys = (categorys) => ({type:GET_CATEGORYS,data:categorys})
 const addCategory = (category) => ({type:ADD_CATEGORY,data:category})
 const updateCategory = (category) => ({type:UPDATE_CATEGORY,data:category})


 //获取所有分类列表的异步请求
 export const getCategorysAsync = () => {
   return async (dispatch,getState) => {
     if(getState().categorys.length > 0) return
     const result = await reqGetCategorys()
     if(result.status === 0) {
       const categorys = result.data
       dispatch(getCategorys(categorys))
     }
     return result.msg
   }
 }

 //添加分类列表的异步请求
 export const addCategoryAsync = (categoryName) => {
   return async dispatch => {
     const result = await reqAddCategory(categoryName) 
     if(result.status === 0) {
       const category = result.data
       dispatch(addCategory(category))
     }
     return result.msg
   }
 }

 //更新分类列表的异步请求 Id是原本的id Name是更新的name
 export const updateCategoryAsync = ({categoryId,categoryName}) => { //请求接口参数用的是对象
  return async dispatch => {
    const result = await reqUpdateCategory({categoryId,categoryName})
    if(result.status ===0 ){
      const category = {_id:categoryId,name:categoryName}
      dispatch(updateCategory(category))
    }
    return result.msg
  }
 }
 