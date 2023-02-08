/**
 * This module exports the store's action creators for user login/register
 * author: Hong Duc Anh Nguyen
 */

import * as api from "../api/index";
//action creators for auth
export const login = (formData, navigate) => async (dispatch) => {
  try {
    //get data from api request made to backend

    const { data } = await api.logIn(formData);
    console.log(data);
    dispatch({ type: "AUTH", data: data });
    //redirects user after login
    navigate("/home?page=1");
  } catch (error) {
    console.log(error.name);
    alert(`${error.response.data.creds_err_message}`);
  }
};

export const register = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch({ type: "AUTH", data: data });
    navigate("/home");
  } catch (error) {
    console.log(error);
    alert(`${error.response.data.creds_err_message}`);
  }
};
