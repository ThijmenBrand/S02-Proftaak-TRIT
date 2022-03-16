import ArticleShape, { articleCategory } from '@/models/Article';
import { RockstarShape } from '@/models/Rockstar';
import { TribeShape } from '@/models/Tribe';
import Axios from 'axios';

interface tribesState {
  loading: boolean;
  tribesList: TribeShape[];
  rockstarsList: RockstarShape[];
  articleList: ArticleShape[];
  currentTribe: TribeShape;
}

const tribes = {
  namespaced: true,
  state(): tribesState {
    return {
      loading: false,
      tribesList: [],
      currentTribe: {
        id: '',
        name: '',
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
  },
  actions: {
    getAllTribes: async ({ commit }: any) => {
      console.log('Calling');
      const { data, status } = await Axios.get(
        'https://rockstar-api.azurewebsites.net/api/tribe'
      );

      if (status >= 200 && status <= 299) {
        commit('SET_TRIBE_LIST', data);
      }
    },
    getCurrentTribe: async ({ commit }: any, tribeId: string) => {
      const { data, status } = await Axios.get(
        `https://rockstar-api.azurewebsites.net/api/tribe/${tribeId}`
      );

      if (status >= 200 && status <= 299) {
        commit('SET_CURRENT_TRIBE', data);
      }
    },
    getRockstarsByTribe: async ({ commit, state }: any, tribeId: string) => {
      const { data, status } = await Axios.get(
        `https://rockstar-api.azurewebsites.net/api/tribe/getall/${tribeId}`
      );

      if (status >= 200 && status <= 299) {
        commit('SET_ROCKSTARS_BY_TRIBE', data);
      }
    },
  },
  mutations: {
    SET_TRIBE_LIST: (state: tribesState, data: TribeShape[]) => {
      state.tribesList = data;
    },
    SET_ROCKSTARS_BY_TRIBE: (state: tribesState, data: RockstarShape[]) => {
      state.rockstarsList = data;
    },
    SET_CURRENT_TRIBE: (state: tribesState, data: TribeShape) => {
      state.currentTribe = data;
    },
  },
};

export default tribes;
