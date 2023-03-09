import axios from "axios";

const api = axios.create({
  baseURL: process.env.OMDB_API_URL,
});

export default api;
