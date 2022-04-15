import ArticleShape from "@/models/Article";
import { RockstarShape } from "@/models/Rockstar";
import articleService from "@/services/callFunctions/article";
import rockstarService from "@/services/callFunctions/rockstar";
import pfPlaceholder from "@/assets/profilePlaceholder";
import SetProfilePicture from "@/services/profilePictureHelper";
import { ViewCountShape } from "@/models/ViewCountShape";
import getCustomDateTime from "@/services/customDateTime";
import { ActionContext } from "vuex";

interface articleState {
  article: ArticleShape;
  rockstar: RockstarShape;
  viewCount: ViewCountShape;
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
        linkedIn: "",
        twitter: "",
        email: "",
        phone: "",
      },
      viewCount: {
        frontendUserId: "",
        articleId: "",
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
    getArticle: async (
      context: ActionContext<string, any>,
      articleId: string
    ): Promise<void> => {
      context.rootState.loading = true;
      const { data, status } = await articleService.getArticle(articleId);

      if (status >= 200 && status <= 299) {
        context.rootState.loading = false;
        context.commit("SET_ARTICLE", data);
      }
    },
    getRockstar: async (context: any): Promise<void> => {
      context.rootState.loading = true;
      const rockstarId = context.state.article.rockstarId;
      const { data, status } = await rockstarService.getRockstar(rockstarId);

      if (status >= 200 && status <= 299) {
        context.rootState.loading = false;
        context.commit("SET_ROCKSTAR", data);
      }
    },
    updateViewCount: async (context: any, articleId: string): Promise<void> => {
      const viewCount = context.state.viewCount;
      viewCount.articleId = articleId;
      viewCount.frontendUserId = localStorage.getItem("UUIDV4");
      const { data, status } = await articleService.updateViewCount(viewCount);
    },
  },
  mutations: {
    CLEAR_ARTICLE: (state: articleState): void => {
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
    SET_ARTICLE: (state: articleState, data: ArticleShape): void => {
      state.article = data;

      const custom = data.publishDate.toString();
      state.article.publishDate = getCustomDateTime(custom);
    },
    SET_ROCKSTAR: (state: articleState, data: RockstarShape): void => {
      state.rockstar = data;
      if (state.rockstar.image == null) {
        state.rockstar.image = pfPlaceholder;
      } else {
        state.rockstar.image = SetProfilePicture(data.image);
      }
    },
  },
};

export default tribes;
