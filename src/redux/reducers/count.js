import { INCREMENT,DECREMENT } from "../action-types";

const initCount = 1
export default function count(state = initCount,action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.data
    case DECREMENT:
      return state - action.data
    default:
      return state
  }
}

