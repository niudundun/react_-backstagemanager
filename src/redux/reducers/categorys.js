import { 
  GET_CATEGORYS,
  ADD_CATEGORY,
  UPDATE_CATEGORY
 } from "../action_types"

const initCategorys = []
export default function categorys(state=initCategorys,action) {
  switch (action.type) {
    case GET_CATEGORYS:
      return action.data
    case ADD_CATEGORY:
      return  [action.data,...state]
    case UPDATE_CATEGORY:
      //循环遍历state存的categorys找到相同符合id的category
      return state.map(item => {
        if(item._id === action.data._id) return action.data
        else return item
      })
    default:
      return state
  }
}
