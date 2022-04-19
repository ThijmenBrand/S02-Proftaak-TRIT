import API from "../api";
import { AxiosResponse } from "axios";
import { ViewCountShape } from "@/models/ViewCountShape";
import { CommentShape } from "@/models/Comment";

const articleService = {
  getArticle(articleId: string): Promise<AxiosResponse<any, any>> {
    return API.get(`/article/${articleId}`);
  },
  getComments(articleId: string): Promise<AxiosResponse<any, any>> {
    return API.get(`/comment/articleId/${articleId}`);
  },
  updateViewCount(viewCount: ViewCountShape): Promise<AxiosResponse<any, any>> {
    return API.post("/article/updateViewCount", JSON.stringify(viewCount));
  },
  postComment(opts: CommentShape): Promise<AxiosResponse<any, any>> {
    return API.post("/comment", opts);
  },
};

export default articleService;
