import axios from "axios";

const baseURL = "/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const newPerson = (person) => {
  const request = axios.post(baseURL, person);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => response);
};

const updatePerson = (person) => {
  const request = axios.put(`${baseURL}/${person.id}`, person);
  return request.then((response) => response.data);
};

export default { getAll, newPerson, deletePerson, updatePerson };
