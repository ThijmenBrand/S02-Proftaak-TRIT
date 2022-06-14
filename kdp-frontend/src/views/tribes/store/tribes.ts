import ArticleShape from "@/models/Article";
import { RockstarShape } from "@/models/Rockstar";
import { TribeShape } from "@/models/Tribe";
import tribeService from "@/services/callFunctions/tribe";
import rockstarService from "@/services/callFunctions/rockstar";
import PfPlaceholder from "@/assets/PfPlaceholder";

interface tribesState {
  tribesList: TribeShape[];
  rockstarsList: RockstarShape[];
  articleList: ArticleShape[];
  currentTribe: TribeShape;
  spotifyList: [];
  articleCount: number;
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
      spotifyList: [],
      articleCount: 0,
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
    getAllSpotifyByTribe: (state: tribesState): [] => {
      return state.spotifyList;
    },
    getArticleCount: (state: tribesState): number => {
      return state.articleCount;
    },
  },
  actions: {
    getAllTribes: async (context: any) => {
      const { data, status } = await tribeService.getAllTribes();

      if (status >= 200 && status <= 299) {
        context.commit("SET_TRIBE_LIST", data);
      }
    },
    getCurrentTribe: async (context: any, tribeId: string) => {
      const { data, status } = await tribeService.getSpecificTribe(tribeId);

      if (status >= 200 && status <= 299) {
        context.commit("SET_CURRENT_TRIBE", data);
      }
    },
    getRockstarsByTribe: async (context: any, tribeId: string) => {
      const { data, status } = await tribeService.getRockstarsWithTribe(
        tribeId
      );

      if (status >= 200 && status <= 299) {
        for (const rockstar of data) {
          const rockstarImage = await rockstarService.getImage(rockstar.id);
          if (rockstarImage.data != "") {
            rockstar.image = rockstarImage.data;
          } else {
            rockstar.image = PfPlaceholder;
          }
        }
        context.commit("SET_ROCKSTARS_BY_TRIBE", data);
      }
    },
    getArticlesByTribe: async (context: any, tribeparams: any) => {
      const { data, status } = await tribeService.getArticlesByTribe(
        tribeparams.tribeId,
        (context.rootState.currentPage - 1) * tribeparams.ArticlesPerPage,
        tribeparams.ArticlesPerPage
      );

      if (status >= 200 && status <= 299) {
        context.commit("SET_ARTICLES_BY_TRIBE", data);
      }
    },
    getAllSpotifyByTribe: async (context: any, tribeId: string) => {
      const { data, status } = await tribeService.getAllSpotifyByTribe(tribeId);
      if (status >= 200 && status <= 299) {
        context.commit("SET_SPOTIFY_BY_TRIBE", data);
      }
    },
    getArticleCount: async (context: any, tribeId: string) => {
      const { data, status } = await tribeService.getArticleCount(tribeId);

      if (status >= 200 && status <= 299) {
        context.commit("SET_ARTICLE_COUNT", data);
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
        // if (rockstar.image == null) {
        //   rockstar.image = pfPlaceholder;
        // } else {
        //   rockstar.image = SetProfilePicture(rockstar.image);
        // }
      });
      state.rockstarsList = data.sort((a, b) => {
        if (a.role < b.role) return -1;

        if (a.role > b.role) return 1;

        return 0;
      });
    },
    SET_CURRENT_TRIBE: (state: tribesState, data: TribeShape) => {
      state.currentTribe = data;
    },
    SET_ARTICLES_BY_TRIBE: (state: tribesState, data: ArticleShape[]) => {
      data.forEach((article) => {
        if (article.thumbnail) {
          const thumbnail = article.thumbnail;
          article.thumbnail =
            "https://tritkdpstorageaccount.blob.core.windows.net/articlepictures/" +
            thumbnail;
        } else {
          article.thumbnail =
            "https://tritkdpstorageaccount.blob.core.windows.net/articlepictures/article-placeholder-image.dfb114aa.jpg";
        }
      });
      state.articleList = data;
    },
    EMPTY_STORE: (state: tribesState) => {
      state.articleList = [];
      state.rockstarsList = [];
      state.spotifyList = [];
      state.currentTribe = {
        id: "",
        name: "",
      };
    },
    SET_SPOTIFY_BY_TRIBE: (state: tribesState, data: []) => {
      state.spotifyList = data;
    },
    SET_ARTICLE_COUNT: (state: tribesState, data: number) => {
      state.articleCount = data;
    },
  },
};

export default tribes;
