import { TribeShape } from "@/models/Tribe";
import { createStore } from "vuex";
import LocalStorageHandler from "@/services/localStorageHelper/LocalStorageHelper";

import exporeService from "@/services/callFunctions/explore";

import tribes from "@/views/tribes/store/tribes";
import ArticleShape from "@/models/Article";
import rockstars from "@/views/rockstar/store/rockstars";
import article from "@/views/article/store/article";
import { CookieOptions } from "tiny-cookie";
import CookieShape, { BaseCookieShape } from "@/models/Cookie";

interface IState {
  loading: boolean;
  tribe: TribeShape[];
  articleList: ArticleShape[];
  cookieAccepted: CookieShape;
}

export default createStore({
  state: {
    loading: false,
    tribe: Array<TribeShape>(),
    articleList: Array<ArticleShape>(),
    cookieAccepted: new BaseCookieShape({
      ShowCookieBanner: true,
      AcceptedAllCookies: false,
      AcceptedAnalyticalCookies: false,
      AcceptedFunctionalCookies: false,
    }),
  },
  getters: {
    getAllArticles: (state: IState): ArticleShape[] => {
      return state.articleList;
    },
    isLoading: (state: IState) => {
      return state.loading;
    },
    cookieAccepted: (state: IState): CookieShape => {
      return state.cookieAccepted;
    },
    showCookieBanner: (state: IState) => {
      return state.cookieAccepted.ShowCookieBanner;
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
    SET_COOKIE_ACCEPTED: (state, data: CookieShape) => {
      console.log(data);
      let types: CookieShape;
      if (data == null || data.ShowCookieBanner == true) {
        types = {
          ShowCookieBanner: true,
          AcceptedAllCookies: false,
        };
      } else {
        types = data;
      }

      LocalStorageHandler.setItem("cookieAccepted", types);
      state.cookieAccepted = types;
    },
    SET_COOKIE_BANNER_SHOW_FALSE: (state:IState) => {
      state.cookieAccepted.ShowCookieBanner = true;
    }
  },
  modules: {
    tribes: tribes,
    rockstars: rockstars,
    article: article,
  },
});
