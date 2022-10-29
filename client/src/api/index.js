import axios from "axios";
const API = axios.create({ baseUrl: "http://localhost:5000" });
//intercept request to parse token
//only takes effect if user account exists or created
API.interceptors.request.use((request) => {
  //check if a user profile is present
  if (localStorage.getItem("profile")) {
    //assign authorization property as token pulled from user profile
    request.headers.Authorization = `Bearer ${
      //convert json text to javascript object to retrieve token attribute
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return request;
});
export const fetchThoughts = () => API.get("/thoughts");
export const createThought = (newPost) => API.post("/thoughts", newPost);
export const updateThought = (id, updatedPostData) =>
  API.patch(`/thoughts/${id}`, updatedPostData);
export const deleteThought = (id) => API.delete(`/thoughts/${id}`);
export const logIn = (formData) => API.post("/users/login", formData);
export const register = (formData) => API.post("/users/register", formData);
