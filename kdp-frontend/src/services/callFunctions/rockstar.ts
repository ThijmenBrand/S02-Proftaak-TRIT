﻿import API from "../api";
import { AxiosResponse } from "axios";

const rockstarService = {
  getRockstar(rockstarId: string): Promise<AxiosResponse<any, any>> {
    return API.get(`/rockstar/${rockstarId}`);
  },
  getArticles(rockstarId: string, start: number, limit: number): Promise<AxiosResponse<any, any>> {
    return API.get(`/article/GetArticlesByRockstar/${rockstarId}/start/${start}/limit/${limit}`);
  },
  getArticleCount(rockstarId: string): Promise<AxiosResponse<any, any>> {
    return API.get(`article/count/rockstar/${rockstarId}`);
  },
};

export default rockstarService;
