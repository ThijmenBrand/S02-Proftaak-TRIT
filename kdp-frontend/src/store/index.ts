import { RockstarShape } from "@/models/Rockstar";
import { TribeShape } from "@/models/Tribe";
import { createStore } from "vuex";

import tribes from "@/views/tribes/store/tribes";
import ArticleShape, { articleCategory } from "@/models/Article";
import rockstars from "@/views/rockstars/store/rockstars";

export default createStore({
  state: {
    rockstars: Array<RockstarShape>(),
    tribe: Array<TribeShape>(),
    articleList: [
      {
        id: "1",
        category: articleCategory.blog,
        writer: "Henk",
        title: "Vuejs article one",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
      },
      {
        id: "2",
        category: articleCategory.blog,
        writer: "Henk",
        title: "Reno is raar",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
      },
      {
        id: "3",
        category: articleCategory.blog,
        writer: "Henk",
        title: "test",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
      },
      {
        id: "4",
        category: articleCategory.blog,
        writer: "Henk",
        title: "Vuejs article two",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, enim aperiam. Molestiae minima praesentium ipsum similique vel quod hic facere?",
        content:
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
    rockstars: rockstars,
  },
});
