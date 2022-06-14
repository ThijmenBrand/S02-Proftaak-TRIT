import ArticleShape from "@/models/Article";
import { RockstarShape } from "@/models/Rockstar";
import articleService from "@/services/callFunctions/article";
import rockstarService from "@/services/callFunctions/rockstar";
import { ViewCountShape } from "@/models/ViewCountShape";
import getCustomDateTime from "@/services/customDateTime";
import { ActionContext } from "vuex";
import { CommentShape } from "@/models/Comment";
import { LikeCountShape } from "@/models/LikeCountShape";
import PfPlaceholder from "@/assets/PfPlaceholder";

interface articleState {
  article: ArticleShape;
  rockstar: RockstarShape;
  viewCount: ViewCountShape;
  comments: CommentShape[];
  likeCount: LikeCountShape;
  likeState: boolean;
}

const tribes = {
  namespaced: true,
  state(): articleState {
    return {
      article: {
        id: "",
        rockstarId: "",
        rockstarName: "",
        content: "",
        title: "",
        tribeId: "",
        tribeName: "",
        thumbnail: "",
        viewCount: 0,
        totalViewCount: 0,
        likes: 0,
        publishDate: new Date(),
      },
      rockstar: {
        id: "",
        name: "",
        description: "",
        image: "",
        role: "",
        email: "",
        rockstarSocial: {
          facebookLink: "",
          linkedInLink: "",
          twitterLink: "",
        },
      },
      viewCount: {
        frontendUserId: "",
        articleId: "",
      },
      comments: [
        {
          id: "",
          userId: "",
          userName: "",
          commentText: "",
          commentDate: "",
        },
      ],
      likeCount: {
        frontendUserId: "",
        articleId: "",
      },
      likeState: false,
    };
  },
  getters: {
    getArticle: (state: articleState): ArticleShape => {
      return state.article;
    },
    getRockstar: (state: articleState): RockstarShape => {
      return state.rockstar;
    },
    getComments: (state: articleState): CommentShape[] => {
      return state.comments;
    },
    getLikeState: (state: articleState): boolean => {
      return state.likeState;
    },
  },
  actions: {
    getArticle: async (
      context: ActionContext<string, any>,
      articleId: string
    ): Promise<void> => {
      context.rootState.loading = true;
      const { data, status } = await articleService.getArticle(articleId);

      if (status >= 200 && status <= 299) {
        context.rootState.loading = false;
        context.commit("SET_ARTICLE", data);
      }
    },
    getRockstar: async (context: any): Promise<void> => {
      context.rootState.loading = true;
      const rockstarId = context.state.article.rockstarId;
      const { data, status } = await rockstarService.getRockstar(rockstarId);

      if (status >= 200 && status <= 299) {
        const rockstarImage = await rockstarService.getImage(data.id);
        if (rockstarImage.data != "") {
          data.image = rockstarImage.data;
        } else {
          data.image = PfPlaceholder;
        }
        context.rootState.loading = false;
        context.commit("SET_ROCKSTAR", data);
      }
    },
    updateViewCount: async (context: any, articleId: string): Promise<void> => {
      const viewCount = context.state.viewCount;
      viewCount.articleId = articleId;
      viewCount.frontendUserId = localStorage.getItem("UserId-uuid");
      const { data, status } = await articleService.updateViewCount(viewCount);
    },
    incrementLikeCount: async (
      context: any,
      articleId: string
    ): Promise<void> => {
      const likeCount = context.state.likeCount;
      likeCount.articleId = articleId;
      const localstrorageData = localStorage.getItem("user");
      const userData = JSON.parse(localstrorageData || "{}");
      likeCount.frontendUserId = userData.account.localAccountId;
      const { data, status } = await articleService.likeArticle(likeCount);
      context.commit("SET_LIKE_STATE", true);

      const likeButton = document.getElementById("like-button");
      likeButton?.classList.add("liked");
    },
    decrementLikeCount: async (
      context: any,
      articleId: string
    ): Promise<void> => {
      const likeCount = context.state.likeCount;
      likeCount.articleId = articleId;
      const localstrorageData = localStorage.getItem("user");
      const userData = JSON.parse(localstrorageData || "{}");
      likeCount.frontendUserId = userData.account.localAccountId;
      const { data, status } = await articleService.dislikeArticle(likeCount);

      context.commit("SET_LIKE_STATE", false);

      const likeButton = document.getElementById("like-button");
      likeButton?.classList.remove("liked");
    },
    checkIfArticleIsLiked: async (context: any, articleId: string) => {
      const localstrorageData = localStorage.getItem("user");
      const userData = JSON.parse(localstrorageData || "{}");
      const likeCount = context.state.likeCount;
      likeCount.articleId = articleId;
      likeCount.frontendUserId = userData.account.localAccountId;
      const { data, status } = await articleService.getLikedState(likeCount);
      if (status >= 200 && status <= 299) {
        context.rootState.loading = false;
        context.commit("SET_LIKE_STATE", data);
      }
    },
    getComments: async (context: any, articleId: string) => {
      context.rootState.loading = true;
      const { data, status } = await articleService.getComments(articleId);

      if (status >= 200 && status <= 299) {
        context.rootState.loading = false;
        context.commit("SET_COMMENTS", data);
      }
    },
    postComment: async (context: any, opts: CommentShape): Promise<void> => {
      await articleService.postComment(opts);
    },
  },
  mutations: {
    CLEAR_ARTICLE: (state: articleState): void => {
      state.article = {
        content: "",
        id: "",
        rockstarId: "",
        rockstarName: "",
        title: "",
        tribeId: "",
        tribeName: "",
        thumbnail: "",
        viewCount: 0,
        totalViewCount: 0,
        likes: 0,
        publishDate: "",
      };
      state.comments = [
        {
          commentText: "",
          userId: "",
          userName: "",
          articleId: "",
          commentDate: "",
          id: "",
        },
      ];
    },
    SET_ARTICLE: (state: articleState, data: ArticleShape): void => {
      state.article = data;

      const custom = data.publishDate.toString();
      state.article.publishDate = getCustomDateTime(custom);
    },
    SET_ROCKSTAR: (state: articleState, data: RockstarShape): void => {
      state.rockstar = data;
    },
    SET_COMMENTS: (state: articleState, data: CommentShape[]) => {
      state.comments = data;
    },
    SET_LIKE_STATE: (state: articleState, data: boolean) => {
      state.likeState = data;
    },
  },
};

export default tribes;
