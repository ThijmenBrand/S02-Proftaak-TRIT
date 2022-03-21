import API from "../api";
import { AxiosResponse } from "axios"

const rockstarService = {
    getRockstar(rockstarId : string): Promise<AxiosResponse<any, any>> {
        return API.get(`/rockstar/${rockstarId}`);
    },
    getArticles(rockstarId : string): Promise<AxiosResponse<any, any>> {
        return API.get(`/article/GetArticlesByRockstar/${rockstarId}`);
    },
};

export default rockstarService;
