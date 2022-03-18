import { RockstarShape } from "@/models/Rockstar";
import { TribeShape } from "@/models/Tribe";
import { createStore } from "vuex";

import tribes from "@/views/tribes/store/tribes";
import ArticleShape, { articleCategory } from "@/models/Article";

export default createStore({
  state: {
    rockstars: Array<RockstarShape>(),
    tribe: Array<TribeShape>(),
    articleList: [
      {
        articleId: "1",
        tribeId: "1",
        articleCategory: articleCategory.blog,
        articleWriter: "Henk",
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
        articleWriter: "Pieter",
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
        articleWriter: "Pieter",
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
        articleWriter: "Gerard",
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
        articleWriter: "Gerard",
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
        articleWriter: "Jaap",
        articleTitle: "Vuejs article three",
        articleDescription:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
        articleContent:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
      },
    ],
  },
  getters: {
    getAllArticles: (state: any): ArticleShape[] => {
      return state.articleList;
    },
    isLoading: (state: any) => {
      return state.loading;
    },
  },
  mutations: {},
  actions: {},
  modules: {
    tribes: tribes,
  },
});
