import API from "../api";
import { AxiosResponse } from "axios";

const exploreService = {
  getAllArticles(start: number, limit: number): Promise<AxiosResponse<any, any>> {
    return API.get(`/article/start/${start}/limit/${limit}`);
  },
  getArticleCount(): Promise<AxiosResponse<any, any>> {
    return API.get(`/article/count`);
  },
  getFoundedArticles(
    start: number,
    limit: number,
    searchData: string
  ): Promise<AxiosResponse<any, any>> {
    return API.get(`/article/new/start/${start}/limit/${limit}`, {
      params: { data: searchData },
    });
  },
};

export default exploreService;
