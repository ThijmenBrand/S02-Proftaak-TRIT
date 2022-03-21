import API from "../api";
import { AxiosResponse } from "axios";

const articleService = {
  getArticle(articleId: string): Promise<AxiosResponse<any, any>> {
    return API.get(`/article/${articleId}`);
  },
};

export default articleService;
