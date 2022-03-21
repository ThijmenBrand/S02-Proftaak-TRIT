import { RockstarShape } from "@/models/Rockstar";
import { TribeShape } from "@/models/Tribe";
import { createStore } from "vuex";

import exporeService from "@/services/callFunctions/explore";

import tribes from "@/views/tribes/store/tribes";
import ArticleShape from "@/models/Article";
import rockstars from "@/views/rockstars/store/rockstars";
import article from "@/views/article/store/article";

export default createStore({
  state: {
    tribe: Array<TribeShape>(),
    articleList: Array<ArticleShape>(),
    loading: false,
  },
  getters: {
    getAllArticles: (state: any): ArticleShape[] => {
      console.log(state.articleList);
      return state.articleList;
    },
    isLoading: (state: any) => {
      return state.loading;
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
  },
  modules: {
    tribes: tribes,
    rockstars: rockstars,
    article: article,
  },
});
