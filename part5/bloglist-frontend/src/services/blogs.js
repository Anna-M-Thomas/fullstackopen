import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
let config;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  config = { headers: { Authorization: token } };
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

//Only needs id, will increment likes by 1 in Mongodb
//See backend ==> controllers ==> blogs.js
const increaseLikes = async (id) => {
  const response = await axios.put(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, addBlog, setToken, deleteBlog, increaseLikes };
