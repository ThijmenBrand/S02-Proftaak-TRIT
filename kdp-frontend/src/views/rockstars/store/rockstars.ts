import { RockstarShape } from "@/models/Rockstar";
import ArticleShape from "@/models/Article";
import rockstarService from "@/services/callFunctions/rockstar";
import pfPlaceholder from "@/assets/profilePlaceholder";

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
        image: "",
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
      if (state.rockstar.image == null) {
        state.rockstar.image = pfPlaceholder;
      }
    },
    CLEAR_ROCKSTAR: (state: rockstarState) => {
      state.articles = [];
      state.rockstar = { id: "", name: "", description: "", role: "", image: "" };
    },
  },
};

export default rockstar;
