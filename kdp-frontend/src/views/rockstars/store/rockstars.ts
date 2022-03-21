import { RockstarShape } from "@/models/Rockstar";
import Axios from "axios";
import ArticleShape from "@/models/Article";
import rockstarService from "@/services/rockstar";

interface rockstarState {
  rockstar: RockstarShape;
  articles: ArticleShape[];
}

const rockstar = {
  namespaced: true,
  state(): rockstarState {
    return {
      rockstar: {
        id: "",
        name: "",
        description: "",
        role: "",
      },
      articles: [],
    };
  },
  getters: {
    getRockstar: (state: rockstarState): RockstarShape => {
      return state.rockstar;
    },
    getArticles: (state: rockstarState): ArticleShape[] => {
      return state.articles;
    },
  },
  actions: {
    getRockstar: async (context: any, rockstarId: string) => {
      context.rootState.loading = true;
      const { data, status } = await rockstarService.getRockstar(rockstarId);

      if (status >= 200 && status <= 299) {
        context.rootState.loading = false;
        context.commit("SET_ROCKSTAR", data);
      }
    },
    getArticles: async (context: any, rockstarId: string) => {
      context.rootState.loading = true;
      const { data, status } = await rockstarService.getArticles(rockstarId);

      if (status >= 200 && status <= 299) {
        context.rootState.loading = false;
        context.commit("SET_ARTICLES", data);
      }
    },
  },
  mutations: {
    SET_ROCKSTAR: (state: rockstarState, data: RockstarShape) => {
      state.rockstar = data;
    },
    SET_ARTICLES: (state: rockstarState, data: ArticleShape[]) => {
      state.articles = data;
    },
  },
};

export default rockstar;
