import API from "../api";
import { AxiosResponse } from "axios";

const exploreService = {
  getAllArticles(): Promise<AxiosResponse<any, any>> {
    return API.get(`/article`);
  },
};

export default exploreService;
