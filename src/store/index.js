import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/login";
import shoppingCart from "./modules/shoppingCart";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    shoppingCart
  }
});
