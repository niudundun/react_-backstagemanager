import { combineReducers } from "redux";

import user from './users'
import headerTitle from './header_title';
import categorys from "./categorys";

/* {
  user:{},
  headerTitle:'',
  categorys:[]
} */

export default combineReducers({user,headerTitle,categorys})