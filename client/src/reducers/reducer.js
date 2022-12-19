import { combineReducers } from "redux";
import authReducer from "./authReducer";
import thoughts from "./thoughtsReducer";
import reddits from "./redditReducer";

export default combineReducers({
  //each child reducer's state is singly sliced, all children transformed into a single reducer function with an united state object
  thoughts: thoughts,
  authReducer: authReducer,
  reddits: reddits,
});

/*
More detailed redux docummentations: 
The combineReducers helper function transforms an object whose values are different reducing functions into a single reducing function you can pass to createStore .
The resulting reducer calls every child reducer,
 and gathers their results into a single object called state.
 */
