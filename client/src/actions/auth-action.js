import * as api from "../api/index";
//action creators for auth
export const login = (formData, navigate) => async (dispatch) => {
  try {
    //get data from api request made to backend

    const { data } = await api.logIn(formData);
    dispatch({ type: "AUTH", data: data });
    //redirects user after login
    navigate("/home");
  } catch (error) {
    console.log(error);
  }
};

export const register = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch({ type: "AUTH", data: data });
    navigate("/home");
  } catch (error) {
    console.log(error);
  }
};
