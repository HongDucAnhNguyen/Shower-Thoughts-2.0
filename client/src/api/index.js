import axios from "axios";
const API = axios.create({ baseUrl: "http://localhost:5000" });

/**middleware api interceptor each request */
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
  //continue request with authorization token attached
  return request;
});

/**thoughts api requests */
export const fetchThoughts = (page) => API.get(`/thoughts?page=${page}`);
//refactor to fetchThoughts per page
export const fetchThoughtsBySearch = (searchQuery) =>
  API.get(`/thoughts/search?searchQuery=${searchQuery}`);
export const createThought = (newPost) => API.post("/thoughts", newPost);
export const updateThought = (id, updatedPostData) =>
  API.patch(`/thoughts/${id}`, updatedPostData);
export const deleteThought = (id) => API.delete(`/thoughts/${id}`);
//only id is needed because id is the sole information we need for likes update
export const heartThoughts = (id) => API.patch(`/thoughts/${id}/hearts`);

export const fetchRedditThoughts = () => API.get("/thoughts/reddit");
/**user api requests */
export const logIn = (formData) => API.post("/users/login", formData);
export const register = (formData) => API.post("/users/register", formData);
