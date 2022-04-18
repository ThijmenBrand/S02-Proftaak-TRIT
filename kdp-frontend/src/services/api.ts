import axios, { AxiosInstance } from "axios";

const API: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export default API;
