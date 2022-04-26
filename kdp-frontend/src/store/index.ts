import { TribeShape } from "@/models/Tribe";
import { createStore } from "vuex";
import LocalStorageHandler from "@/services/localStorageHelper/LocalStorageHelper";

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
}

export default createStore({
  state: {
    loading: false,
    tribe: Array<TribeShape>(),
    articleList: Array<ArticleShape>(),
    cookieAccepted: false,
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
  },
  actions: {
    getAllArticles: async (context: any) => {
      context.state.loading = true;
      const { data, status } = await exporeService.getAllArticles();

      if (status >= 200 && status <= 299) {
        context.state.loading = false;
        context.commit("SET_ALL_ARTICLES", data);
      }
    },
  },
  mutations: {
    SET_ALL_ARTICLES: (state, data: ArticleShape[]) => {
      state.articleList = data;
    },
    SET_COOKIE_ACCEPTED: (state, data: boolean) => {
      const types = {
        allCookies: data,
      };
      LocalStorageHandler.setItem("cookieAccepted", types);
      state.cookieAccepted = data;
    },
  },
  modules: {
    tribes: tribes,
    rockstars: rockstars,
    article: article,
  },
});
