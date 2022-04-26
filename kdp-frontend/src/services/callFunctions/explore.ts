import API from "../api";
import { AxiosResponse } from "axios";

const exploreService = {
  getAllArticles(): Promise<AxiosResponse<any, any>> {
    return API.get(`/article/start/0/limit/100`);
  },
};

export default exploreService;
