import { TribeShape } from "@/models/Tribe";
import { createStore } from "vuex";
import LocalStorageHandler from "@/services/localStorageHelper/LocalStorageHelper";

import exploreService from "@/services/callFunctions/explore";
import rockstarService from "@/services/callFunctions/rockstar"

import tribes from "@/views/tribes/store/tribes";
import ArticleShape from "@/models/Article";
import rockstars from "@/views/rockstar/store/rockstars";
import article from "@/views/article/store/article";
import CookieShape, { BaseCookieShape } from "@/models/Cookie";
import { RockstarShape } from "@/models/Rockstar";

interface IState {
  loading: boolean;
  tribe: TribeShape[];
  articleList: ArticleShape[];
  rockstarList: RockstarShape[];
  currentPage: number;
  articleCount: number;
  cookieAccepted: CookieShape;
  searchData: string;
  foundedArticles: ArticleShape[];
}

export default createStore({
  state: {
    loading: false,
    tribe: Array<TribeShape>(),
    articleList: Array<ArticleShape>(),
    rockstarList: Array<RockstarShape>(),
    currentPage: 1,
    articleCount: 0,
    cookieAccepted: new BaseCookieShape({
      ShowCookieBanner: true,
      AcceptedAllCookies: false,
      AcceptedAnalyticalCookies: false,
      AcceptedFunctionalCookies: false,
    }),
    searchData: "",
    foundedArticles: Array<ArticleShape>(),
  },
  getters: {
    getAllArticles: (state: IState): ArticleShape[] => {
      return state.articleList;
    },
    getAllRockstars: (state: IState): RockstarShape[] => {
      return state.rockstarList;
    },
    isLoading: (state: IState) => {
      return state.loading;
    },
    cookieAccepted: (state: IState): CookieShape => {
      return state.cookieAccepted;
    },
    getArticleCount: (state: IState) => {
      return state.articleCount;
    },
    showCookieBanner: (state: IState) => {
      return state.cookieAccepted.ShowCookieBanner;
    },
    getFoundedArticles: (state: IState): ArticleShape[] => {
      return state.foundedArticles;
    },
  },
  actions: {
    getAllArticles: async (context: any, payload: any) => {
      context.state.loading = true;
      const { data, status } = await exploreService.getAllArticles(
        (context.state.currentPage - 1) * payload,
        payload
      );

      if (status >= 200 && status <= 299) {
        context.state.loading = false;
        context.commit("SET_ALL_ARTICLES", data);
      }
    },
    getAllRockstars: async (context: any) => {
      context.state.loading = true;
      const { data, status } = await rockstarService.getAllRockstars();
    
      if (status >= 200 && status <= 299) {

        await data.forEach((data: any) => {
          data.image = rockstarService.getRockstarImage(data.id);
        });
        
        context.state.loading = false;
        context.commit("SET_ALL_ROCKSTARS", data);
      }
    },
    getArticleCount: async (context: any) => {
      context.state.loading = true;
      const { data, status } = await exploreService.getArticleCount();

      if (status >= 200 && status <= 299) {
        context.state.loading = false;
        context.commit("SET_ARTICLE_COUNT", data);
      }
    },
    getFoundedArticles: async (context: any, payload: any) => {
      context.state.loading = true;
      const { data, status } = await exploreService.getFoundedArticles(
        (context.state.currentPage - 1) * payload,
        payload,
        context.state.searchData
      );
      console.log(context.state.foundedArticles);
      console.log(data);
      if (status >= 200 && status <= 299) {
        context.state.loading = false;
        context.commit("SET_FOUNDED_ARTICLES", data);
      }
    },
  },
  mutations: {
    SET_ALL_ROCKSTARS: (state, data: RockstarShape[]) => {
      state.rockstarList = data;
    },
    SET_ALL_ARTICLES: (state, data: ArticleShape[]) => {
      state.articleList = data;
    },
    SET_COOKIE_ACCEPTED: (state, data: CookieShape) => {
      console.log(data);
      let types: CookieShape;
      if (data == null || data.ShowCookieBanner) {
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
    SET_CURRENT_PAGE: (state, data: number) => {
      state.currentPage = data;
    },
    SET_ARTICLE_COUNT: (state, data: number) => {
      state.articleCount = data;
    },
    SET_COOKIE_BANNER_SHOW_FALSE: (state: IState) => {
      state.cookieAccepted.ShowCookieBanner = true;
    },
    SET_SEARCH_DATA: (state: IState, data: string) => {
      state.searchData = data;
    },
    SET_FOUNDED_ARTICLES: (state: IState, data: ArticleShape[]) => {
      state.foundedArticles = data;
    },
  },
  modules: {
    tribes: tribes,
    rockstars: rockstars,
    article: article,
  },
});
