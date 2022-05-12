import API from "../api";
import { AxiosResponse } from "axios";

const tribeService = {
  getAllTribes(): Promise<AxiosResponse<any, any>> {
    return API.get("/tribe");
  },
  getSpecificTribe(tribeId: string): Promise<AxiosResponse<any, any>> {
    return API.get(`/tribe/${tribeId}`);
  },
  getRockstarsWithTribe(tribeId: string): Promise<AxiosResponse<any, any>> {
    return API.get(`/tribe/GetAllRockstars/${tribeId}`);
  },
  getArticlesByTribe(tribeId: string, start: number, limit: number): Promise<AxiosResponse<any, any>> {
    return API.get(`article/GetArticlesByTribe/${tribeId}/start/${start}/limit/${limit}`);
  },
  getAllSpotifyByTribe(tribeId: string): Promise<AxiosResponse<any, any>> {
    return API.get(`tribe/${tribeId}/spotify`);
  },
  getArticleCount(tribeId: string): Promise<AxiosResponse<any, any>> {
    return API.get(`article/count/tribe/${tribeId}`);
  },
};

export default tribeService;
