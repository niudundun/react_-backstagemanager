import { GET_ROLES,ADD_ROLES,UPDATE_ROLES } from '../action_types'
import { reqGetRoles,reqAddRole,reqUpdateRole } from "../../api";


const getRoles = (roles) => ({type:GET_ROLES,data:roles})
const addRole = (role) => ({type:ADD_ROLES,data:role})
const updateRole = (role) => ({type:UPDATE_ROLES,data:role})

export const getRolesAsync = () => {
  return async(dispatch,getState) => {
    if (getState().roles.length>0) return

    const result = await reqGetRoles()
    if (result.status === 0) {
      const roles = result.data
      dispatch(getRoles(roles))
    }
    return result.msg
  }
}

export const addRoleAsync = (roleName) => {
  return async dispatch => {
    const result = await reqAddRole(roleName)
    if(result.status===0){
      const role = result.data
      dispatch(addRole(role))
    }
    return result.msg
  }
}

export const updateRoleAsync = (role) => {
  return async dispatch => {
    const result = await reqUpdateRole(role)
    if(result.status===0){
      dispatch(updateRole(role))
    }
    return result.msg
  }
}