const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      console.log(action?.data);
      //use local storage, set its attribute, call it "profile", give it value of data
      //using the json stringify to turn js object into json string format
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case "LOGOUT":
      //clear all records if logout
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
