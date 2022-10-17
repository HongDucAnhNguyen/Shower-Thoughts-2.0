import * as api from "../api/index";

export const getThoughts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchThoughts();

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.error(error);
  }
};
export const createThoughts = (newPostData) => async (dispatch) => {
  try {
    const { data } = await api.createThought(newPostData);
    dispatch({ type: "CREATE_THOUGHT", payload: data });
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
