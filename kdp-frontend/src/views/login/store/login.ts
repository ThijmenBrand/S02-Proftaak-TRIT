import ArticleShape from "@/models/Article";
import { RockstarShape } from "@/models/Rockstar";
import articleService from "@/services/callFunctions/article";
import rockstarService from "@/services/callFunctions/rockstar";
import pfPlaceholder from "@/assets/profilePlaceholder";
import SetProfilePicture from "@/services/profilePictureHelper";
import { AccountInfo } from "@azure/msal-browser";

interface loginState {
  accessToken: string,
}

const login = {
  namespaced: true,
  state(): loginState {
    return {
        accessToken: ''
    };
  },
  getters: {
  },
  actions: {

  },
  mutations: {
    SET_ACCESS_TOKEN(state: loginState, token: string) {
        state.accessToken = token;
    }
  },
};

export default login;
