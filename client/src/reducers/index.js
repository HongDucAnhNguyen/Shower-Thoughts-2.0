import { combineReducers } from "redux";
import authReducer from "./authReducer";
import thoughts from "./reducers";
import reddits from "./redditReducer";

export default combineReducers({
  thoughts: thoughts,
  authReducer: authReducer,
  reddits: reddits,
});

// The combineReducers helper
//function turns an object whose values are
//different reducing functions into a single
//reducing function you can pass to createStore .
// The resulting reducer calls every child reducer,
// and gathers their results into a single state object.
