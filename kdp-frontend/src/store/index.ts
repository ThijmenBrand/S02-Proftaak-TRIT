import { RockstarShape } from "@/models/Rockstar";
import { TribeShape } from "@/models/Tribe";
import { createStore } from "vuex";

import tribes from "@/views/tribes/store/tribes";

export default createStore({
  state: {
    loading: false,
    rockstars: Array<RockstarShape>(),
    tribe: Array<TribeShape>(),
  },
  getters: {
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
