import Vuex from "vuex";
import Vue from "vue";

import { usuario } from "./usuario.module";

import createPersistedState from "vuex-persistedstate";

// Load Vuex
Vue.use(Vuex);

// Create store
export const store = new Vuex.Store({
  modules: {
    usuario,
  },
  plugins: [createPersistedState()],
});
