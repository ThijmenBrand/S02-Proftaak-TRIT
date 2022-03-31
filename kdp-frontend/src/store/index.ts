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
}

export default createStore({
  state: {
    loading: false,
    tribe: Array<TribeShape>(),
    articleList: Array<ArticleShape>(),
  },
  getters: {
    getAllArticles: (state: IState): ArticleShape[] => {
      return state.articleList;
    },
    isLoading: (state: IState) => {
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
