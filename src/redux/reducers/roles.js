import {
  GET_ROLES,
  ADD_ROLES,
  UPDATE_ROLES
} from '../action_types'

const initRoles = []
export default function roles(state = initRoles, action) {
  switch (action.type) {
    case GET_ROLES:
      return action.data
    case ADD_ROLES:
      return [...state,action.data]
    case UPDATE_ROLES:
      return state.map(item=>{
        if(item._id === action.data._id) return action.data
        else return item
      })
    default:
      return state
  }
}