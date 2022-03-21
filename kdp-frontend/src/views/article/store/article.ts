import ArticleShape from "@/models/Article";
import articleService from "@/services/callFunctions/article";

interface articleState {
  article: ArticleShape;
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
      },
    };
  },
  getters: {
    getArticle: (state: articleState): ArticleShape => {
      return state.article;
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
      };
    },
    SET_ARTICLE: (state: articleState, data: ArticleShape) => {
      state.article = data;
    },
  },
};

export default tribes;
