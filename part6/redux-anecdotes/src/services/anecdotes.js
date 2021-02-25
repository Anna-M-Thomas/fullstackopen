const axios = require("axios");

const baseURL = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const addNew = async (content) => {
  const response = await axios.post(baseURL, { content, votes: 0 });
  return response.data;
};

const updateVotes = async (id, votes) => {
  const response = await axios.patch(`${baseURL}/${id}`, { votes });
  return response.data;
};

export default { getAll, addNew, updateVotes };
//do named exports and call default anecdoteHandler
