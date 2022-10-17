import axios from "axios";
const API = axios.create({ baseUrl: "http://localhost:5000" });

export const fetchThoughts = () => API.get("/thoughts");
export const createThought = (newPost) => API.post("/thoughts", newPost);
export const updateThought = (id, updatedPostData) =>
  API.patch(`/thoughts/${id}`, updatedPostData);
export const deleteThought = (id) => API.delete(`/thoughts/${id}`);
