import { combineReducers } from "redux";
import workerReducer from "./worker";
import detailsReducer from "./details";

export default combineReducers({
  worker: workerReducer,
  details: detailsReducer
});
