import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7777",
});

instance.interceptors.request.use((config) => {
  if (window.localStorage.getItem("token")) {
    config.headers.Authorization = window.localStorage.getItem("token");
    // console.log("Config:", config.headers);
  }
  return config;
});

export default instance;
