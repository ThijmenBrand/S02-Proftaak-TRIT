import ArticleShape, { articleCategory } from "@/models/Article";
import { RockstarShape } from "@/models/Rockstar";
import { TribeShape } from "@/models/Tribe";
import Axios from "axios";

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
        id: "",
        name: "",
      },
      rockstarsList: [],
      articleList: [
        {
          articleId: "1",
          tribeId: "1",
          articleCategory: articleCategory.blog,
          articleWriter: "1",
          articleTitle: "Vuejs article one",
          articleDescription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
          articleContent:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
        },
        {
          articleId: "2",
          tribeId: "1",
          articleCategory: articleCategory.podcast,
          articleWriter: "3",
          articleTitle: "Vuejs article two",
          articleDescription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
          articleContent:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
        },
        {
          articleId: "3",
          tribeId: "2",
          articleCategory: articleCategory.blog,
          articleWriter: "2",
          articleTitle: "DotNet article one",
          articleDescription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
          articleContent:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
        },
        {
          articleId: "4",
          tribeId: "2",
          articleCategory: articleCategory.video,
          articleWriter: "5",
          articleTitle: "DotNet article two",
          articleDescription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
          articleContent:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
        },
        {
          articleId: "5",
          tribeId: "3",
          articleCategory: articleCategory.podcast,
          articleWriter: "1",
          articleTitle: "Java article one",
          articleDescription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
          articleContent:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
        },
        {
          articleId: "6",
          tribeId: "1",
          articleCategory: articleCategory.blog,
          articleWriter: "4",
          articleTitle: "Vuejs article three",
          articleDescription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
          articleContent:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
        },
      ],
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
      console.log("Calling");
      const { data, status } = await Axios.get(
        "https://rockstar-api.azurewebsites.net/api/tribe"
      );

      if (status >= 200 && status <= 299) {
        commit("SET_TRIBE_LIST", data);
      }
    },
    getCurrentTribe: async ({ commit }: any, tribeId: string) => {
      const { data, status } = await Axios.get(
        `https://rockstar-api.azurewebsites.net/api/tribe/${tribeId}`
      );

      if (status >= 200 && status <= 299) {
        commit("SET_CURRENT_TRIBE", data);
      }
    },
    getRockstarsByTribe: async ({ commit, state }: any, tribeId: string) => {
      const { data, status } = await Axios.get(
        `https://rockstar-api.azurewebsites.net/api/tribe/getall/${tribeId}`
      );

      if (status >= 200 && status <= 299) {
        commit("SET_ROCKSTARS_BY_TRIBE", data);
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
