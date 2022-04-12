import ArticleShape from "@/models/Article";
import { RockstarShape } from "@/models/Rockstar";
import articleService from "@/services/callFunctions/article";
import rockstarService from "@/services/callFunctions/rockstar";
import pfPlaceholder from "@/assets/profilePlaceholder";

interface articleState {
  article: ArticleShape;
  rockstar: RockstarShape;
}

const tribes = {
  namespaced: true,
  state(): articleState {
    return {
      article: {
        id: "",
        rockstarId: "",
        rockstarName: "",
        content: "",
        title: "",
        tribeId: "",
        tribeName: "",
        publishDate: new Date(),
      },
      rockstar: {
        id: "",
        name: "",
        description: "",
        image: "",
        role: "",
      },
    };
  },
  getters: {
    getArticle: (state: articleState): ArticleShape => {
      return state.article;
    },
    getRockstar: (state: articleState): RockstarShape => {
      return state.rockstar;
    },
  },
  actions: {
    getArticle: async (context: any, articleId: string) => {
      context.rootState.loading = true;
      const { data, status } = await articleService.getArticle(articleId);

      if (status >= 200 && status <= 299) {
        context.rootState.loading = false;
        context.commit("SET_ARTICLE", data);
      }
    },
    getRockstar: async (context: any) => {
      context.rootState.loading = true;
      const rockstarId = context.state.article.rockstarId;
      console.log(rockstarId);
      const { data, status } = await rockstarService.getRockstar(rockstarId);

      if (status >= 200 && status <= 299) {
        context.rootState.loading = false;
        context.commit("SET_ROCKSTAR", data);
      }
    },
  },
  mutations: {
    CLEAR_ARTICLE: (state: articleState) => {
      state.article = {
        content: "",
        id: "",
        rockstarId: "",
        rockstarName: "",
        title: "",
        tribeId: "",
        tribeName: "",
        publishDate: "",
      };
    },
    SET_ARTICLE: (state: articleState, data: ArticleShape) => {
      state.article = data;

      let custom = data.publishDate;
      if (data.publishDate != "") {
        const language = navigator.language;
        custom = new Date(data.publishDate.toString()).toLocaleDateString(
          language
        );
      }

      state.article.publishDate = custom;
    },
    SET_ROCKSTAR: (state: articleState, data: RockstarShape) => {
      state.rockstar = data;
      if (state.rockstar.image == null) {
        state.rockstar.image = pfPlaceholder;
      }
    },
  },
};

export default tribes;
