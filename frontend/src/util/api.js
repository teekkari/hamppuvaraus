import axios from "axios";

const API_URL = "http://localhost:1337/api";

export const api = {
  get: (url, params = {}) => axios.get(API_URL + url, params),
  post: (url, params = {}) => axios.post(API_URL + url, params),
};
