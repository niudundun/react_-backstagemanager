import { message } from "antd";

import { SAVE_USER_TOKEN,REMOVE_USER_TOKEN } from "../action_types";
import {reqLogin} from "../../api";
import storage from "../../utils/storage";

//保存 user token 的 action
export const saveUserToken = (user,token)=>({type:SAVE_USER_TOKEN,data:{user,token}})

//根据登录请求分发同步 action 的函数
export function loginAsync(username,password) {
  return async dispatch => {
    const result = await reqLogin({username,password})
    if(result.status === 0){
      const {user,token} = result.data

      // localStorage.setItem('user_key',JSON.stringify(user))
      // localStorage.setItem('token_key',token)
      storage.set(storage.KEYS.USER_KEY,user)
      storage.set(storage.KEYS.TOKEN_KEY,token)

      dispatch(saveUserToken(user,token))
    }else{
      message.error(result.msg)
    }
  }
}

//移除local user token
export const removeUserToken = () => {
  storage.remove(storage.KEYS.USER_KEY)
  storage.remove(storage.KEYS.TOKEN_KEY)
  return {type:REMOVE_USER_TOKEN}
}
