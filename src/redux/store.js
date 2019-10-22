import { createStore,applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";

const IsDev = process.env.NODE_ENV === 'development'
export default createStore(
  reducer,
  IsDev ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
)


