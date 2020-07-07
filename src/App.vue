<template>
  <div id="app" name="app">
    <el-container>
      <!-- 顶部导航栏 -->
      <div class="topbar" style>
        <div class="nav">
          <ul>
            <li v-if="Object.keys(this.$store.getters.getUser).length > 0">
              <el-popover
                placement="top"
                width="40"
                v-model="visible"
                trigger="hover"
              >
                <div style="text-align: center; margin: 0">
                  <el-button type="primary" @click.native="logout"
                    >注销</el-button
                  >
                </div>
                <span slot="reference">
                  {{ getUser.username }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
              </el-popover>
            </li>
            <li v-else>
              <!--              <el-button type="text">首页</el-button> -->
              <el-button type="text" @click="login">登录</el-button>
              <!--              <span class="sep">|</span> -->
              <!--              <el-button type="text" @click="register">注册</el-button> -->
            </li>
            <li :class="getNum > 0 ? 'shopCart-full' : 'shopCart'">
              <router-link to="/cart">
                <i class="el-icon-shopping-cart-full"></i> 购物车
                <span class="num">({{ getNum }})</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- 顶部导航栏END -->

      <!-- 顶栏容器 -->
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#409eff"
          router
        >
          <div class="logo">
            <router-link to="/">
              <img src="./assets/imgs/logo.png" style="width:150px" alt />
            </router-link>
          </div>
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/goods">全部商品</el-menu-item>
          <el-menu-item index="/news">母婴资讯</el-menu-item>
          <el-menu-item index="/about">关于我们</el-menu-item>
        </el-menu>
      </el-header>
      <!-- 顶栏容器END -->

      <!-- 主要区域容器 -->
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
      <!-- 主要区域容器END -->

      <!-- 底栏容器 -->
      <el-footer>
        <div class="footer">
          <div class="ng-promise-box">
            <div class="ng-promise">
              <p class="text">
                <a class="icon2">7天无理由退换货</a>
                <a class="icon2">满99元全场免邮</a>
                <a class="icon3" style="margin-right: 0">100%品质保证</a>
              </p>
            </div>
          </div>
          <div class="github">
            <a
              href="https://github.com/xiaomijiabuqiang/ofunsWeb"
              target="_blank"
            >
              <div class="github-but"></div>
            </a>
          </div>
          <div class="mod_help">
            <p>
              <router-link to="/about">关于我们</router-link>
              <span>|</span>
              <router-link to="/news">母婴资讯</router-link>
              <span>|</span>
              <router-link to="/404">帮助中心</router-link>
            </p>
            <p class="coty">ofuns母婴商城版权所有 &copy; 2017-2020</p>
          </div>
        </div>
      </el-footer>
      <!-- 底栏容器END -->
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { setShopCarInfo, getUserInfo } from "@/utils/common";
import { getCar } from "@/api/car/car";
export default {
  beforeUpdate() {
    this.activeIndex = this.$route.path;
  },
  data() {
    return {
      activeIndex: "", // 头部导航栏选中的标签
      visible: false, // 是否退出登录
    };
  },
  created() {
    // 获取浏览器localStorage，判断用户是否已经登录
    if (getUserInfo()) {
      // 如果已经登录，设置vuex登录状态
      this.setUser(getUserInfo());
    }
  },
  computed: {
    ...mapGetters(["getUser", "getNum", "getShoppingCart"]),
  },
  watch: {
    // 获取vuex的登录状态
    getUser: function(val) {
      if (val == null) {
        // 用户没有登录
        this.setShoppingCart([]);
      } else {
        // 用户已经登录,获取该用户的购物车信息
        this.setShoppingCart(val.id);
        getCar({
          userid: val.id,
        })
          .then((res) => {
            if (res.code == 200) {
              // 001 为成功, 更新vuex购物车状态
              this.setShoppingCart(res.data.shoppingCartData);
              setShopCarInfo(res.data.shoppingCartData);
            } else {
              // 提示失败信息
              this.notifyError(res.data.msg);
            }
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
    },
  },
  methods: {
    ...mapActions(["setUser", "setShowLogin", "setShoppingCart"]),

    login() {
      this.$router.push("/login");
      // 点击登录按钮, 通过更改vuex的showLogin值显示登录组件
      this.setShowLogin(true);
    },
    // 退出登录
    logout() {
      if (Object.keys(this.$store.getters.getUser).length > 0) {
        this.visible = false;
        // 清空本地登录信息
        localStorage.clear();
        this.notifySucceed("成功退出登录");
        location.reload();
      }
    },
    // 接收注册子组件传过来的数据
    register() {
      this.$router.push("/register");
    },
    isRegister(val) {
      this.register = val;
    },
  },
};
</script>

<style>
/* 全局CSS */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}
#app .el-header {
  padding: 0;
}
#app .el-main {
  min-height: 800px;
  padding: 0;
}
#app .el-footer {
  padding: 0;
}
a,
a:hover {
  text-decoration: none;
}
/* 全局CSS END */

/* 顶部导航栏CSS */
.topbar {
  height: 40px;
  background-color: #3d3d3d;
  margin-bottom: 20px;
}
.topbar .nav {
  width: 1225px;
  margin: 0 auto;
}
.topbar .nav ul {
  float: right;
}
.topbar .nav li {
  float: left;
  height: 40px;
  color: #b0b0b0;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
}
.topbar .nav .sep {
  color: #b0b0b0;
  font-size: 12px;
  margin: 0 5px;
}
.topbar .nav li .el-button {
  color: #b0b0b0;
}
.topbar .nav .el-button:hover {
  color: #fff;
}
.topbar .nav li a {
  color: #b0b0b0;
}
.topbar .nav a:hover {
  color: #fff;
}
.topbar .nav .shopCart {
  width: 120px;
  background: #424242;
}
.topbar .nav .shopCart:hover {
  background: #fff;
}
.topbar .nav .shopCart:hover a {
  color: #ff6700;
}
.topbar .nav .shopCart-full {
  width: 120px;
  background: #ff6700;
}
.topbar .nav .shopCart-full a {
  color: white;
}
/* 顶部导航栏CSS END */

/* 顶栏容器CSS */
.el-header .el-menu {
  max-width: 1225px;
  margin: 0 auto;
}
.el-header .logo {
  height: 60px;
  width: 189px;
  float: left;
}
.el-header .so {
  margin-top: 10px;
  width: 300px;
  float: right;
}
/* 顶栏容器CSS END */

/* 底栏容器CSS */
.footer {
  width: 100%;
  text-align: center;
  background: #2f2f2f;
  padding-bottom: 20px;
}
.footer .ng-promise-box {
  border-bottom: 1px solid #3d3d3d;
  line-height: 145px;
}
.footer .ng-promise-box {
  margin: 0 auto;
  border-bottom: 1px solid #3d3d3d;
  line-height: 145px;
}
.footer .ng-promise-box .ng-promise p a {
  color: #fff;
  font-size: 20px;
  margin-right: 210px;
  padding-left: 44px;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  text-decoration: none;
  background: url("./assets/imgs/us-icon.png") no-repeat left 0;
}
.footer .github {
  height: 50px;
  line-height: 50px;
  margin-top: 20px;
}
.footer .github .github-but {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  background: url("./assets/imgs/github.png") no-repeat;
}
.footer .mod_help {
  text-align: center;
  color: #888888;
}
.footer .mod_help p {
  margin: 20px 0 16px 0;
}

.footer .mod_help p a {
  color: #888888;
  text-decoration: none;
}
.footer .mod_help p a:hover {
  color: #fff;
}
.footer .mod_help p span {
  padding: 0 22px;
}
/* 底栏容器CSS END */
</style>
