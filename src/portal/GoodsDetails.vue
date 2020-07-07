<template>
  <div id="details" class="quan">
    <!-- 头部 -->
    <!-- 面包屑 -->
    <!--    <div class="breadcrumb">
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="font-size:18px;"
      >
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item to="/goods">全部商品</el-breadcrumb-item>
        <el-breadcrumb-item>产品详情</el-breadcrumb-item>
        <el-breadcrumb-item
          ><p>{{ goodsInfo.name }}</p></el-breadcrumb-item
        >
      </el-breadcrumb>
      <div class="page-header"></div>
    </div>-->

    <!-- 头部END -->
    <!-- 主要内容 -->
    <div class="main">
      <!-- 左侧商品图 -->
      <div class="block">
        <img
          style="height:400px;width:400px;margin-left:80px;margin-top:30px"
          :src="serverImageUrl + 'goods/' + goodsInfo.imgpath"
          :alt="goodsInfo.goodsDesc"
        />
      </div>
      <!-- 左侧商品图END -->

      <!-- 右侧内容区 -->
      <div class="content">
        <h1 class="name">{{ goodsInfo.name }}</h1>
        <p class="intro">{{ goodsInfo.goodsDesc }}</p>
        <p class="store">ofun自营</p>
        <div class="price">
          <span>{{ goodsInfo.price }}元</span>
        </div>
        <div class="pro-list">
          <span class="pro-name">{{ goodsInfo.name }}</span>
          <span class="pro-price">
            <span>{{ goodsInfo.price }}元</span>
          </span>
          <p class="price-sum">总计 : {{ goodsInfo.price }}元</p>
        </div>
        <!-- 内容区底部按钮 -->
        <div class="button">
          <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart"
            >加入购物车</el-button
          >
          <el-button class="buy" @click="addCollect">立即购买</el-button>
        </div>
        <!-- 内容区底部按钮END -->
        <div class="pro-policy">
          <ul>
            <li><i class="el-icon-circle-check"></i> ofuns自营</li>
            <li><i class="el-icon-circle-check"></i> 顺丰包邮</li>
            <li><i class="el-icon-circle-check"></i> 7天无理由退换货</li>
          </ul>
        </div>
      </div>
      <!-- 右侧内容区END -->

      <!-- 商品详情区 -->
      <el-row style="margin-top:600px">
        <el-divider>
          <b style="font-size:32px;" class="el-icon-shopping-bag-1">商品详情</b>
        </el-divider>
      </el-row>
    </div>
    <!-- 主要内容END -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { selectGoods } from "@/api/goods/selectGoods";
import { serverApiUrl } from "@/config/apiUrl";

export default {
  data() {
    return {
      dis: false,
      serverImageUrl: serverApiUrl + "/upload/",
      goodsInfo: {},
    };
  },
  activated() {
    selectGoods({ id: this.$route.query.goodsid })
      .then((r) => {
        this.goodsInfo = r;
      })
      .catch(() => {});
  },
  watch: {
    // 监听商品id的变化，请求后端获取商品数据
    goodsid: function() {
      this.selectGoods();
    },
  },
  methods: {
    ...mapActions([
      "unshiftShoppingCart",
      "addShoppingCartNum",
      "addCollect",
      "setShoppingCart",
    ]),
    // 加入购物车
    addShoppingCart() {
      // 判断是否登录,没有登录则显示登录组件
      if (Object.keys(this.$store.getters.getUser).length<=0) {
        this.$router.push({path:'/login'});
        return;
      }
      let cars = this.$store.getters.getShoppingCart;
      let result = cars.find((v) => v.goods_id == this.goodsInfo.id);
      let saveResult = {};
      if (result) {
        saveResult = {
          id: result.id,
          num: result.num + 1,
          userid: this.$store.getters.getUser.id,
        };
      } else {
        saveResult = {
          create_date: new Date(),
          goods_id: this.goodsInfo.id,
          num: 1,
          userid: this.$store.getters.getUser.id,
        };
      }
      this.setShoppingCart({ type: 1, saveResult });
    },
    addCollect() {},
  },
};
</script>
<style>
.quan {
  width: 1220px;
  margin: 0 auto;
}
/* 头部CSS */
.breadcrumb {
  height: 50px;
  background-color: white;
}
.breadcrumb .el-breadcrumb {
  width: 1225px;
  line-height: 30px;
  font-size: 18px;
  margin: 0 auto;
}
#details .page-header {
  height: 46px;
  margin-top: -20px;
  z-index: 4;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
}
#details .page-header .title p {
  float: left;
}
#details .page-header .title .list {
  height: 64px;
  float: right;
}
#details .page-header .title .list li {
  float: left;
  margin-left: 20px;
}
#details .page-header .title .list li a {
  font-size: 14px;
  color: #616161;
}
#details .page-header .title .list li a:hover {
  font-size: 14px;
  color: #ff6700;
}
/* 头部CSS END */

/* 主要内容CSS */
#details .main {
  width: 1225px;
  height: 560px;
  padding-top: 30px;
  margin: 0 auto;
}
#details .main .block {
  float: left;
  width: 560px;
  height: 560px;
}
#details .main .content {
  float: left;
  margin-left: 25px;
  width: 640px;
  background-color: rgb(250, 250, 250);
}
#details .main .content .name {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  font-weight: normal;
  color: #212121;
}
#details .main .content .intro {
  color: #b0b0b0;
  padding-top: 10px;
}
#details .main .content .store {
  color: #ff6700;
  padding-top: 10px;
}
#details .main .content .price {
  display: block;
  font-size: 18px;
  color: #ff6700;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0 25px;
}

#details .main .content .pro-list {
  background: #f9f9fa;
  padding: 30px 60px;
  margin: 50px 0 50px;
}
#details .main .content .pro-list span {
  line-height: 30px;
  color: #616161;
}
#details .main .content .pro-list .pro-price {
  float: right;
}
#details .main .content .pro-list .price-sum {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}
#details .main .content .button {
  height: 55px;
  margin: 10px 0 20px 0;
}
#details .main .content .button .el-button {
  float: left;
  height: 55px;
  font-size: 16px;
  color: #fff;
  border: none;
  text-align: center;
}
#details .main .content .button .shop-cart {
  width: 340px;
  background-color: #ff6700;
}
#details .main .content .button .shop-cart:hover {
  background-color: #f25807;
}

#details .main .content .button .buy {
  width: 260px;
  margin-left: 40px;
  background-color: #ff0000;
}
#details .main .content .button .buy:hover {
  background-color: #ec0c0c;
}
#details .main .content .pro-policy li {
  float: left;
  margin-right: 20px;
  color: #b0b0b0;
}
/* 主要内容CSS END */
</style>
