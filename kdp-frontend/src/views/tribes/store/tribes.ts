import ArticleShape from "@/models/Article";
import { RockstarShape } from "@/models/Rockstar";
import { TribeShape } from "@/models/Tribe";
import tribeService from "@/services/callFunctions/tribe";
import pfPlaceholder from "@/assets/profilePlaceholder";

interface tribesState {
  tribesList: TribeShape[];
  rockstarsList: RockstarShape[];
  articleList: ArticleShape[];
  currentTribe: TribeShape;
}

const tribes = {
  namespaced: true,
  state(): tribesState {
    return {
      tribesList: [],
      currentTribe: {
        id: "",
        name: "",
      },
      rockstarsList: [],
      articleList: [],
    };
  },
  getters: {
    getAllTribesList: (state: tribesState): TribeShape[] => {
      return state.tribesList;
    },
    getRockstarsByTribe: (state: tribesState): RockstarShape[] => {
      return state.rockstarsList;
    },
    getAllArticles: (state: tribesState): ArticleShape[] => {
      return state.articleList;
    },
    getCurrentTribe: (state: tribesState): TribeShape => {
      return state.currentTribe;
    },
    getArticlesbByTribe: (state: tribesState): ArticleShape[] => {
      return state.articleList;
    },
  },
  actions: {
    getAllTribes: async (context: any) => {
      context.rootState.loading = true;
      const { data, status } = await tribeService.getAllTribes();

      if (status >= 200 && status <= 299) {
        context.rootState.loading = false;
        context.commit("SET_TRIBE_LIST", data);
      }
    },
    getCurrentTribe: async (context: any, tribeId: string) => {
      context.rootState.loading = true;
      const { data, status } = await tribeService.getSpecificTribe(tribeId);

      if (status >= 200 && status <= 299) {
        context.rootState.loading = false;
        context.commit("SET_CURRENT_TRIBE", data);
      }
    },
    getRockstarsByTribe: async (context: any, tribeId: string) => {
      context.rootState.loading = true;
      const { data, status } = await tribeService.getRockstarsWithTribe(
        tribeId
      );

      if (status >= 200 && status <= 299) {
        context.rootState.loading = false;
        context.commit("SET_ROCKSTARS_BY_TRIBE", data);
      }
    },
    getArticlesByTribe: async (context: any, tribeId: string) => {
      context.rootState.loading = true;
      const { data, status } = await tribeService.getArticlesByTribe(tribeId);
      if (status >= 200 && status <= 299) {
        context.rootState.loading = false;
        context.commit("SET_ARTICLES_BY_TRIBE", data);
      }
    },
  },
  mutations: {
    SET_TRIBE_LIST: (state: tribesState, data: TribeShape[]) => {
      state.tribesList = data;
    },
    SET_ROCKSTARS_BY_TRIBE: (state: tribesState, data: RockstarShape[]) => {
      data.forEach((rockstar) => {
        if (!rockstar.role) {
          rockstar.role = "Rockstar";
        }
        if (rockstar.image == null) {
          rockstar.image = pfPlaceholder;
        }
      });
      state.rockstarsList = data
        .sort((a, b) => {
          if (a.role < b.role) return -1;

          if (a.role > b.role) return 1;

          return 0;
        })
        .reverse();
    },
    SET_CURRENT_TRIBE: (state: tribesState, data: TribeShape) => {
      state.currentTribe = data;
    },
    SET_ARTICLES_BY_TRIBE: (state: tribesState, data: ArticleShape[]) => {
      state.articleList = data;
    },
    EMPTY_STORE: (state: tribesState) => {
      state.articleList = [];
      state.rockstarsList = [];
    },
  },
};

export default tribes;
