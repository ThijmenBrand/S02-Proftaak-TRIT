import ArticleShape, {articleCategory} from "@/models/Article";
import { RockstarShape } from "@/models/Rockstar";
import { TribeShape } from "@/models/Tribe";

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
      tribesList: [
        {
          tribeID: "1",
          tribeName: "VueJs",
        },
        {
          tribeID: "2",
          tribeName: "DotNet",
        },
        {
          tribeID: "3",
          tribeName: "Java",
        },
      ],
      currentTribe: {
        tribeID: "",
        tribeName: "",
      },
      rockstarsList: [
        {
          rockstarId: "1",
          rockstarName: "Hans",
          Description: "Hans knows a lot about Dotnet and is super cool",
          TribeID: "2",
        },
        {
          rockstarId: "2",
          rockstarName: "Frank",
          Description: "Hans knows a lot about Java and is super cool",
          TribeID: "3",
        },
        {
          rockstarId: "3",
          rockstarName: "Peter",
          Description: "Hans knows a lot about Dotnet and is super cool",
          TribeID: "2",
        },
        {
          rockstarId: "4",
          rockstarName: "Hans",
          Description: "Hans knows a lot about VueJs and is super cool",
          TribeID: "1",
        },
        {
          rockstarId: "5",
          rockstarName: "amber",
          Description: "Hans knows a lot about VueJs and is super cool",
          TribeID: "1",
        },
      ],
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
    getAllRockstars: (state: tribesState): RockstarShape[] => {
      return state.rockstarsList;
    },
    getAllArticles: (state: tribesState): ArticleShape[] => {
      return state.articleList;
    },
  },
  actions: {},
  mutations: {},
};

export default tribes;
