import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Config from "@/config/app";
import "@/utils/v-auth.js";
// import AsyncRouterMap from "./router/index";
import { getToken, toDecimal2 } from "@/utils/common";
Vue.config.productionTip = false;
Vue.prototype.GlobalCfg = Config;

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.filter("toDecimal", function(value) {
  //全局过滤器，保留2位小数
  return toDecimal2(value); //使用上述decimal.js中的函数toDecimal2
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
    ? to.meta.title + "-" + Config.siteName
    : Config.siteName;
  const token = getToken();
  if (token) {
    if (router.options.routes.length > 2) {
      next();
    } else {
      // const asyncRouter = AsyncRouterMap.filter(function(k) {
      //   if (
      //     k.meta &&
      //     k.meta.role &&
      //     k.meta.role.indexOf(getUserInfo().role) >= 0
      //   ) {
      //     return true;
      //   }
      // });
      // router.options.routes.unshift(...asyncRouter);
      // router.addRoutes(asyncRouter);
      // router.addRoutes([
      //   {
      //     path: "/404",
      //     component: () => import("@/components/404.vue")
      //   },
      //   {
      //     path: "*",
      //     redirect: "/404"
      //   }
      // ]);

      next({ ...to, replace: true });
    }
  } else {
    // 如果没有登录，访问非登录页面,则跳转到登录页面
    if (to.path !== "/login") {
      // if (to.path === "/"||to.path === "/news"||to.path === "/newsDetails"||to.path === "/goods"||to.path === "/goodsDetails"||to.path === "/about") {
        if (to.path != "/cart") {
        next();
      } else {
        next({ path: "/login" });
      }
    } else {
      // 如果没有登录，但访问的是登录页面,直接进入
      next();
    }
  }
});

// 全局函数及变量
import Global from "./Global";
Vue.use(Global);

import Axios from "axios";
Vue.prototype.$axios = Axios;
// 全局请求拦截器
Axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 跳转error页面
    router.push({ path: "/error" });
    return Promise.reject(error);
  }
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
