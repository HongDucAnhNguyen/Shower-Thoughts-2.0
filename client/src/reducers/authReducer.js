import * as type from "./constantActionTypes/actionTypes";
const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    //auth reducer returned state can be but never accessed directly
    case type.AUTH:
     
      //use local storage, set its attribute, call it "profile", give it value of data to store session for user
      //using the json stringify to turn js object into json string format
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case type.LOGOUT:
      //clear all records if logout
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
