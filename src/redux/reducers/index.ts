import { combineReducers } from "redux";
import { counterReducer } from "./iam";


export const IAMReducers = combineReducers({
  counterReducer,
});
