import API from "../api";
import { AxiosResponse } from "axios";
import { ViewCountShape } from "@/models/ViewCountShape";
import { CommentShape } from "@/models/Comment";
import { LikeCountShape } from "@/models/LikeCountShape";

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
  likeArticle(
    articleId: string,
    userId: string
  ): Promise<AxiosResponse<any, any>> {
    return API.put(`/article/incrementLikeCount/${articleId}/${userId}`);
  },
  dislikeArticle(
    articleId: string,
    userId: string
  ): Promise<AxiosResponse<any, any>> {
    return API.put(`/article/decrementLikeCount/${articleId}/${userId}`);
  },
  checkIfUserLiked(
    articleId: string,
    userId: string
  ): Promise<AxiosResponse<any, any>> {
    return API.get(`/article/CheckIfUserLiked/${articleId}/${userId}`);
  },
  getLikedState(likeCount: LikeCountShape): Promise<AxiosResponse<any, any>> {
    return API.post(`/article/checkIfAlreadyLiked`, likeCount);
  },
  getLikeCount(articleId: string): Promise<AxiosResponse<any, any>> {
    return API.post(`/article/getLikeCount?articleId=${articleId}`);
  },
};

export default articleService;
