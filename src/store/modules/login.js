import { getUserInfo} from "@/utils/common";
/*
 * @Description: 用户登录状态模块
 */


export default {
  state: {
    user: {}, // 登录的用户
    showLogin: Object.keys(getUserInfo()).length>0 // 用于控制是否显示登录组件
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getShowLogin(state) {
      return state.showLogin;
    }
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
    setShowLogin(state, data) {
      state.showLogin = data;
    }
  },
  actions: {
    setUser({ commit }, data) {
      commit("setUser", data);
    },
    setShowLogin({ commit }, data) {
      commit("setShowLogin", data);
    }
  }
};
