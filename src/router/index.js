import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../portal/Home.vue"),
  },
  {
    path: "/error",
    name: "Error",
    component: () => import("../components/Error.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../components/404.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/goods",
    name: "Goods",
    component: () => import("../portal/Goods.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../portal/About.vue"),
  },
  {
    path: "/goodsDetails",
    name: "GoodsDetails",
    component: () => import("../portal/GoodsDetails.vue"),
  },
  {
    path: "/newsDetails",
    name: "NewsDetails",
    component: () => import("../portal/NewsDetails.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: () => import("../portal/News.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/order",
    name: "Order",
    meta: {
      title: "订单",
      keepAlive: false,
    },
    component: () => import("../views/Order.vue"),
  },
  {
    path: "/order1",
    name: "Order1",
    meta: {
      title: "订单",
      keepAlive: false,
    },
    component: () => import("../views/Order1.vue"),
  },
  {
    path: "/orderSave",
    name: "OrderSave",
    meta: {
      title: "提交订单",
      keepAlive: false,
    },
    component: () => import("../views/OrderSave.vue"),
  },
  {
    path: "/paySuccess",
    name: "PaySuccess",
    meta: {
      title: "订单",
      keepAlive: false,
    },
    component: () => import("../views/paySuccess.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
