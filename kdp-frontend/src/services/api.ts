import axios, { AxiosInstance } from "axios";

const API: AxiosInstance = axios.create({
  baseURL: "https://api-rockstarsit.azurewebsites.net/api/",
  headers: {
    "Content-type": "application/json",
  },
});

export default API;
