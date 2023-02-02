/**
 * This module exports the store's action creators for thoughts
 * author: Hong Duc Anh Nguyen
 */

import * as api from "../api/index";
//action creators
export const getThoughts = (page) => async (dispatch) => {
  //refactor to get thoughts according to page
  try {
    dispatch({ type: "LOADING" });
    const { data } = await api.fetchThoughts(page);
    console.log(data);
    dispatch({ type: "FETCH_ALL", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.error(error);
  }
};
export const getThoughtById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const { data } = await api.fetchThoughtById(id);
    console.log(data);
    dispatch({ type: "FETCH_BY_ID", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
  }
};
export const getThoughtsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const { data } = await api.fetchThoughtsBySearch(searchQuery);
    dispatch({ type: "FETCH_BY_SEARCH", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
  }
};
export const createThoughts = (newPostData) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING" });
    const { data } = await api.createThought(newPostData);
    dispatch({ type: "CREATE_THOUGHT", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.error(error);
  }
};
export const deleteThoughts = (id) => async (dispatch) => {
  try {
    await api.deleteThought(id);
    dispatch({ type: "DELETE_THOUGHT", payload: id });
  } catch (error) {
    console.error(error);
  }
};
export const updateThoughts = (id, updatedPostData) => async (dispatch) => {
  try {
    const { data } = await api.updateThought(id, updatedPostData);
    dispatch({ type: "UPDATE_THOUGHT", payload: data });
  } catch (error) {
    console.error(error);
  }
};
export const heartThoughts = (id) => async (dispatch) => {
  try {
    const { data } = await api.heartThoughts(id);
    dispatch({ type: "HEART_THOUGHTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const fetchRedditThoughts = () => async (dispatch) => {
  try {
    dispatch({ type: "REDDIT_LOADING" });
    const { data } = await api.fetchRedditThoughts();

    dispatch({ type: "FETCH_REDDIT", payload: data });
    dispatch({ type: "END_REDDIT_LOADING" });
  } catch (error) {
    console.log(error);
  }
};
