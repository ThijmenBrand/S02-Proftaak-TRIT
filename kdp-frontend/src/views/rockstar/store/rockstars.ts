import { RockstarShape } from "@/models/Rockstar";
import ArticleShape from "@/models/Article";
import rockstarService from "@/services/callFunctions/rockstar";

interface rockstarState {
  rockstar: RockstarShape;
  articles: ArticleShape[];
  articleCount: number;
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
        linkedIn: "",
        twitter: "",
        email: "",
        phone: "",
      },
      articles: [],
      articleCount: 0,
    };
  },
  getters: {
    getRockstar: (state: rockstarState): RockstarShape => {
      return state.rockstar;
    },
    getArticles: (state: rockstarState): ArticleShape[] => {
      return state.articles;
    },
    getArticleCount: (state: rockstarState): number => {
      return state.articleCount;
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
    getArticles: async (context: any, rockstarparams: any) => {
      context.rootState.loading = true;
      const { data, status } = await rockstarService.getArticles(rockstarparams.tribeId, (context.rootState.currentPage - 1)*rockstarparams.ArticlesPerPage, rockstarparams.ArticlesPerPage);

      if (status >= 200 && status <= 299) {
        context.rootState.loading = false;
        context.commit("SET_ARTICLES", data);
      }
    },
    getArticleCount: async (context: any, tribeId: string) => {
      context.state.loading = true;
      const { data, status } = await rockstarService.getArticleCount(tribeId);

      if (status >= 200 && status <= 299) {
        context.state.loading = false;
        context.commit("SET_ARTICLE_COUNT", data);
      }
    },
  },
  mutations: {
    SET_ROCKSTAR: (state: rockstarState, data: RockstarShape) => {
      // if (data.image != null) {
      //   data.image = SetProfilePicture(data.image);
      // }
      state.rockstar = data;
    },
    SET_ARTICLES: (state: rockstarState, data: ArticleShape[]) => {
      state.articles = data;
      // if (state.rockstar.image == null) {
      //   state.rockstar.image = pfPlaceholder;
      // }
    },
    SET_ARTICLE_COUNT: (state: rockstarState, data: number) => {
      state.articleCount = data;
    },

    CLEAR_ROCKSTAR: (state: rockstarState) => {
      state.articles = [];
      state.rockstar = {
        id: "",
        name: "",
        description: "",
        role: "",
        image: "",
        linkedIn: "",
        twitter: "",
        email: "",
        phone: "",
      };
    },
  },
};

export default rockstar;
