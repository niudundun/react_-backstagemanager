import { combineReducers } from "redux";

import user from './users'
import headerTitle from './header_title';
import categorys from "./categorys";
import roles from "./roles";

/* {
  user:{},
  headerTitle:'',
  categorys:[]
  roles:[]
} */

export default combineReducers({user,headerTitle,categorys,roles})