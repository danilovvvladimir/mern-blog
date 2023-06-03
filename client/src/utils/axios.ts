import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7777",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  console.log("Config:", config);
  return config;
});

export default instance;
