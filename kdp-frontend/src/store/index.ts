import { RockstarShape } from "@/models/Rockstar";
import { TribeShape } from "@/models/Tribe";
import { createStore } from "vuex";

export default createStore({
  state: {
    rockstars: Array<RockstarShape>(),
    tribe: Array<TribeShape>()
  },
  mutations: {},
  actions: {},
  modules: {},
});
