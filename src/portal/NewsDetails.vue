<template>
  <div id="details" class="new">
    <!-- 头部END -->
    <!-- 主要内容 -->
    <div class="main">
      <!--      左侧资讯图 -->
      <div class="block">
        <img
          style="height:400px;width:400px;margin-left:80px;margin-top:30px"
          :src="serverImageUrl + 'news/' + newsInfo.imgpath"
          :alt="newsInfo.newsDesc"
        />
      </div>
      <!-- 左侧资讯图END      -->

      <!-- 右侧内容区 -->
      <div class="content">
        <p class="intro">{{ newsInfo.newsDesc }}</p>
        <!-- <p class="overflow" style="font-size:16px;font-family:'宋体';margin-top:30px; text-align: justify; text-justify: inter-ideograph; text-indent: 2em;">{{ newsInfo.newsinfo }}</p> -->
        <div style="text-indent:2em;margin-top:15px" v-html="newsInfo.newsinfo"></div>
      </div>
      <!-- 右侧内容区END -->
    </div>
    <!-- 主要内容END -->
  </div>
</template>
<script>
// import { mapActions } from "vuex";
import { selectNews } from "@/api/news/selectNews";
import { serverApiUrl } from "@/config/apiUrl";

export default {
  data() {
    return {
      serverImageUrl: serverApiUrl + "/upload/",
      newsInfo: {},
    };
  },
  activated() {
    selectNews({ id: this.$route.query.newsid })
      .then((r) => {
        this.newsInfo = r;
      })
      .catch(() => {});
  },
  watch: {
    // 监听资讯id的变化，请求后端获取资讯数据
    newsid: function() {
      this.selectNews();
    },
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
#details .main .content .intro {
  color: #b0b0b0;
  padding-top: 10px;
}
.overflow {
   position: relative;
   height: 100%;
   width: 600;
   left: 0;
   overflow: auto;
   margin-left: 20px;
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
