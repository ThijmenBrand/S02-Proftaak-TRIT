import { TribeShape } from "@/models/Tribe";
import { createStore } from "vuex";

import exporeService from "@/services/callFunctions/explore";

import tribes from "@/views/tribes/store/tribes";
import ArticleShape from "@/models/Article";
import rockstars from "@/views/rockstar/store/rockstars";
import article from "@/views/article/store/article";

interface IState {
  loading: boolean;
  tribe: TribeShape[];
  articleList: ArticleShape[];
  cookieAccepted: boolean;
  currentPage: number;
  articleCount: number;
}

export default createStore({
  state: {
    loading: false,
    tribe: Array<TribeShape>(),
    articleList: Array<ArticleShape>(),
    cookieAccepted: false,
    currentPage: 1,
    articleCount: 0,
  },
  getters: {
    getAllArticles: (state: IState): ArticleShape[] => {
      return state.articleList;
    },
    isLoading: (state: IState) => {
      return state.loading;
    },
    cookieAccepted: (state: IState) => {
      return state.cookieAccepted;
    },
    getcurrentPage: (state: IState) => {
      return state.currentPage;
    },
    getArticleCount: (state: IState) => {
      return state.articleCount;
    },
  },
  actions: {
    getAllArticles: async (context: any, payload: any) => {
      context.state.loading = true;
      const { data, status } = await exporeService.getAllArticles((context.state.currentPage - 1)*payload, payload);

      if (status >= 200 && status <= 299) {
        context.state.loading = false;
        context.commit("SET_ALL_ARTICLES", data);
      }
    },
    getArticleCount: async (context: any) => {
      context.state.loading = true;
      const { data, status } = await exporeService.getArticleCount();

      if (status >= 200 && status <= 299) {
        context.state.loading = false;
        context.commit("SET_ARTICLE_COUNT", data);
      }
    },
  },
  mutations: {
    SET_ALL_ARTICLES: (state, data: ArticleShape[]) => {
      state.articleList = data;
    },
    SET_COOKIE_ACCEPTED: (state, data: boolean) => {
      state.cookieAccepted = data;
    },
    SET_CURRENT_PAGE: (state, data: number) => {
      state.currentPage = data;
    },
    SET_ARTICLE_COUNT: (state, data: number) => {
      state.articleCount = data;
    },

  },
  modules: {
    tribes: tribes,
    rockstars: rockstars,
    article: article,
  },
});

