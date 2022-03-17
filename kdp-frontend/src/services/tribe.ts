import API from "./api";
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
};

export default tribeService;
