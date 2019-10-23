import { SAVE_USER_TOKEN,REMOVE_USER_TOKEN } from "../action_types";

const userKey = JSON.parse(localStorage.getItem('user_key'))||{}
const tokenKey = localStorage.getItem('token_key')
const initUser = {
  user:userKey,
  token:tokenKey,
  // 当 local 中的 user token 都存在时为true
  hasLogin: userKey._id && tokenKey
}
export default function user(state=initUser,action) {
  switch (action.type) {
    case SAVE_USER_TOKEN:
      const {user,token } = action.data
      return {
        user,
        token,
        hasLogin:true
      }
    case REMOVE_USER_TOKEN:
      return {
        user:{},
        token:'',
        hasLogin:false
      }
    default:
      return state
  }
}