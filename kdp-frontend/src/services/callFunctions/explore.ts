import API from "../api";
import { AxiosResponse } from "axios";

const exploreService = {
  getAllArticles(start: number, limit: number): Promise<AxiosResponse<any, any>> {
    return API.get(`/article/start/${start}/limit/${limit}`);
  },
  getArticleCount(): Promise<AxiosResponse<any, any>> {
    return API.get(`/article/count`);
  },
};

export default exploreService;
