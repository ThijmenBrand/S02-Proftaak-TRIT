import axios, { AxiosInstance, AxiosResponse } from "axios";

const API: AxiosInstance = axios.create({
    baseURL: "https://rockstar-api.azurewebsites.net/api/",
    headers: {
        "Content-type": "application/json",
    },
});

export default API;