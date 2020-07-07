<template>
  <div class="main">
    <el-row>
      <el-col :span="3">
        <div class="main-nav" Opacity="0.25">
          <div
            class="nav-first"
            @mouseenter="isNavEnter = true"
            @mouseleave="isNavEnter = false"
          >
            <ul>
              <li
                v-for="(item, index) in navFirst"
                :key="index"
                :class="{ active: item.type === selected }"
                @click="togoods(item.id)"
                @mouseenter="selected = item.type"
              >
                <p>
                  <span>{{ item.name }}</span>
                  <span class="icon">></span>
                </p>
              </li>
            </ul>
          </div>
          <div
            class="nav-sec"
            v-show="isNavEnter || isMenuEnter"
            @mouseenter="isMenuEnter = true"
            @mouseleave="isMenuEnter = false"
          >
            <ul
              v-for="(item, index) in navFirst"
              v-show="item.type === selected"
              :key="index"
            >
              <li v-for="(key, index) in navSec[item.type]" :key="index">
                <div class="product">
                  <a :href="key.link">
                    <img :src="key.imgUrl" alt="" />
                    <p class="title">{{ key.title }}</p>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :offset="3">
        <el-carousel
          height="458px"
          :interval="3000"
          arrow="never"
          style="width:1069px;"
        >
          <el-carousel-item v-for="item in carousel" :key="item.id">
            <el-image
              style="width: 1069px;height: 458px;"
              :src="serverImageUrl + 'carousel/' + item.imgpath"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <div class="goodsrush">
      <el-row>
        <el-col :span="3">
          <div class="todayrush">
            <el-image
              style="width: 225px; height: 300px;"
              :src="todayrushadv"
            ></el-image>
          </div>
        </el-col>
        <el-col :span="20" class="rushlist">
          <el-row :gutter="20">
            <el-carousel style="margin-left:16px;width:995px">
              <el-carousel-item v-for="list in goodsrushList" :key="list.num">
                <el-col
                  :span="6"
                  v-for="item in list.goodsrushitem"
                  :key="item.id"
                >
                  <div class="rushitem">
                    <el-image
                      style="width: 180px; height: 180px;"
                      :src="serverImageUrl + 'goods/' + item.imgpath"
                    ></el-image>
                    <h3 style="font-size:18px;margin-left:48px">
                      {{ item.name }}
                    </h3>
                    <p style="margin-left:55px">￥{{ item.price }}</p>
                  </div>
                </el-col>
              </el-carousel-item>
            </el-carousel>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <el-row type="flex" style="margin-top:30px">
      <el-col :span="4">
        <img src="../assets/imgs/1F.png" width="188px" height="378px" />
      </el-col>
      <el-col :span="20">
        <a href="http://localhost:8080/#/goods"
          ><img src="../assets/imgs/sy_fushi.png" height="390px" width="1018px"
        /></a>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="6" style="margin-top:30px">
        <img src="../assets/imgs/2F.png" width="188px" height="378px" />
      </el-col>
      <el-col :span="20">
        <a href="http://localhost:8080/#/goods"
          ><img
            src="../assets/imgs/sy_shipin.png"
            height="395px"
            width="1018px"
            style="margin-top:15px"
        /></a>
      </el-col> </el-row
    ><el-row type="flex" style="margin-top:30px">
      <el-col :span="6">
        <img src="../assets/imgs/3F.png" width="188px" height="378px" />
      </el-col>
      <el-col :span="20">
        <a href="http://localhost:8080/#/goods"
          ><img
            src="../assets/imgs/sy_zhiniaoku.png"
            height="395px"
            width="1018px"
        /></a>
      </el-col>
    </el-row>
    <el-divider
      ><b style="font-size:32px;" class="el-icon-shopping-bag-1"
        >更多商品</b
      ></el-divider
    >
    <el-row type="flex" style="margin-top:30px">
      <el-col :span="24">
        <a href="http://localhost:8080/#/goods"
          ><img src="../assets/imgs/sy_xihu.png" width="1220px" height="400px"
        /></a>
      </el-col> </el-row
    ><el-row type="flex" style="margin-top:10px">
      <el-col :span="24">
        <a href="http://localhost:8080/#/goods"
          ><img src="../assets/imgs/sy_wanju.png" width="1220px" height="400px"
        /></a>
      </el-col> </el-row
    ><el-row type="flex" style="margin-top:30px">
      <el-col :span="24">
        <a href="http://localhost:8080/#/goods"
          ><img src="../assets/imgs/sy_cheche.png" width="1220px" height="400px"
        /></a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//   import {catelogy} from "../../api/goods";
import { carousels } from "@/api/carousel/carousel";
import hot1 from "../assets/imgs/s_img2.jpg";
import hot2 from "../assets/imgs/s_img3.jpg";
import hot3 from "../assets/imgs/s_img4.jpg";
import hot4 from "../assets/imgs/s_img5.jpg";
import hot5 from "../assets/imgs/hot1.png";
import hot6 from "../assets/imgs/hot2.png";
import hot7 from "../assets/imgs/hot3.png";
import hot8 from "../assets/imgs/hot4.png";
import common01 from "@/assets/imgs/s_img1.jpg";
import { serverApiUrl } from "@/config/apiUrl";
import { getUserInfo, logout } from "@/utils/common";
import { goods } from "@/api/goods/goods";
export default {
  name: "MainNav",
  data() {
    return {
      serverImageUrl: serverApiUrl + "/upload/",
      carousel: [],
      pageNo: 1,
      pageSize: 12,
      // 商品信息
      goodsrushList: [],
      todayrushadv: common01,
      hot: [
        { name: "宝宝五彩袜", imgpath: hot1, price: 39 },
        { name: "宝宝连体衣", imgpath: hot2, price: 59 },
        { name: "宝宝餐具", imgpath: hot3, price: 48 },
        { name: "宝宝两件套", imgpath: hot4, price: 69 },
        { name: "宝宝上衣", imgpath: hot5, price: 49 },
        { name: "宝宝上衣", imgpath: hot6, price: 49 },
        { name: "宝宝上衣", imgpath: hot7, price: 49 },
        { name: "宝宝上衣", imgpath: hot8, price: 49 },
      ],
      selected: "",
      isNavEnter: false,
      isMenuEnter: false,
      navFirst: [
        { id: 1, name: "日常用品", type: "rcyp" },
        { id: 2, name: "婴儿服饰", type: "yefs" },
        { id: 3, name: "婴儿食品", type: "sp" },
        { id: 4, name: "婴儿玩具", type: "wj" },
        { id: 5, name: "童鞋", type: "tx" },
        { id: 6, name: "喂养", type: "wy" },
        { id: 7, name: "医药", type: "yy" },
        { id: 8, name: "婴儿车床", type: "cc" },
        { id: 9, name: "孕产", type: "yc" },
      ],
      navSec: {
        rcyp: [
          {
            title: "儿童面霜",
            imgUrl: "../assets/imgs/rcyp (1).png",
            link: "",
          },
          {
            title: "强生搽脸巾",
            imgUrl: "../assets/imgs/rcyp (1).png",
            link: "",
          },
          {
            title: "婴儿牛油果防晒霜",
            imgUrl: "../assets/imgs/rcyp (1).png",
            link: "",
          },
          {
            title: "强生护肤露",
            imgUrl: "../assets/imgs/rcyp (1).png",
            link: "",
          },
          {
            title: "宝宝沐浴露",
            imgUrl: "../assets/imgs/rcyp (1).png",
            link: "",
          },
        ],
        yefs: [
          {
            title: "小黄鸭衣服",
            imgUrl: "../assets/imgs/yefs(1).png",
            link: "http://localhost:8080/goods/goods#/GoodsDetails?goodsid=1",
          },
          {
            title: "宝宝打底衣薄",
            imgUrl: "../assets/imgs/yefs(1).png",
            link: "",
          },
          {
            title: "宝宝白色衣服",
            imgUrl: "../assets/imgs/yefs(1).png",
            link: "",
          },
          {
            title: "宝宝蓝色衣服",
            imgUrl: "../assets/imgs/yefs(1).png",
            link: "",
          },
          {
            title: "宝宝粉红衣服",
            imgUrl: "../assets/imgs/yefs(1).png",
            link: "",
          },
        ],
        sp: [
          { title: "薄脆小饼干", imgUrl: "../assets/imgs/sp(1).png", link: "" },
          { title: "儿童奶酪棒", imgUrl: "../assets/imgs/sp(1).png", link: "" },
          {
            title: "雀巢能恩奶粉",
            imgUrl: "../assets/imgs/sp(1).png",
            link: "",
          },
          { title: "泰国香米饼", imgUrl: "../assets/imgs/sp(1).png", link: "" },
          {
            title: "有机鲜果酸奶",
            imgUrl: "../assets/imgs/sp(1).png",
            link: "",
          },
        ],
        wj: [
          {
            title: "数字拼图积木",
            imgUrl: "../assets/imgs/wj(1).png",
            link: "",
          },
          {
            title: "儿童早教吉他",
            imgUrl: "../assets/imgs/wj(1).png",
            link: "",
          },
          {
            title: "宝宝波浪鼓锤",
            imgUrl: "../assets/imgs/wj(1).png",
            link: "",
          },
          {
            title: "儿童拨浪鼓",
            imgUrl: "../assets/imgs/wj(1).png",
            link: "",
          },
          {
            title: "遥控赛车",
            imgUrl: "../assets/imgs/wj(1).png",
            link: "",
          },
        ],
        tx: [{ title: "童鞋", imgUrl: "", link: "" }],
        wy: [{ title: "喂养", imgUrl: "", link: "" }],
        yy: [{ title: "医药", imgUrl: "", link: "" }],
        cc: [
          { title: "婴儿车床", imgUrl: "../assets/imgs/cc(1).png", link: "" },
        ],
        yc: [{ title: "孕产", imgUrl: "", link: "" }],
      },
    };
  },
  methods: {
    togoods(goodTypeId) {
      this.$router.push({
        path: "/goods",
        query: { goodTypeId: goodTypeId },
      });
    },
    initData() {
      carousels({})
        .then((r) => {
          this.carousel = r.list;
        })
        .catch(() => {});
      goods({ pageNo: this.pageNo, pageSize: this.pageSize })
        .then((r) => {
          var list = r.list;
          var goodsrushitem = [];
          var o = {};
          list.forEach((e, i) => {
            goodsrushitem.push(e);
            if ((i + 1) % 4 == 0) {
              o = {};
              o.num = Math.floor((i + 1) / 4);
              o.goodsrushitem = goodsrushitem;
              goodsrushitem = [];
              this.goodsrushList.push(o);
            }
          });
          console.log(this.goodsrushList);
          // this.goodsrushList = r.list;
        })
        .catch(() => {});
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toLogout() {
      logout();
    },
  },
  created() {
    this.initData();
  },
  computed: {
    userInfo() {
      return getUserInfo();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 1220px;
  margin: 0 auto;
}
.todayrush {
  margin-top: 20px;
}
.rushitem {
  margin-top: 30px;
}
.rushlist {
  border: 1px solid #c2c2c2;
  border-left: none;
  margin-top: 20px;
  margin-left: 67px;
  width: 1000px;
  height: 300px;
}
.rushlist h3 {
  color: #000000;
  line-height: 30px;
}
.rushlist p {
  color: red;
  font-size: 24px;
}
.main-nav {
  font-size: 14px;
  width: 1226px;
  background: #fff;
  /*margin: 0 auto;*/
  position: absolute;
  display: flex;
  justify-content: flex-start;
  > .nav-first {
    /*width: 215px;*/
    width: 153px;

    text-align: center;
    height: 458px;
    position: relative;
    z-index: 99999;
    /*padding-top: 22px;*/
    ul {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      background: #ffffff;
      padding: 5px 0;
      color: #303133;
      li {
        padding-left: 30px;
        height: 50px;
        line-height: 45.5px;
        cursor: pointer;
        &:hover {
          /*background: #ff6700;*/
          background: #409eff;
          opacity: 0.7;
          transition: all 0.25s;
        }
        > p {
          display: flex;
          justify-content: space-between;
          > .icon {
            margin-right: 20px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .nav-sec {
    height: 400px;
    /*margin-top: 22px;*/
    width: 360px;
    // width: 40vw;
    position: relative;
    top: 0;
    left: 0.06vw;
    /*right: 1.5%;*/
    background: #ffffff;
    opacity: 0.8;
    z-index: 99999;
    overflow: hidden;
    border: 1px solid #cfb2f6;
    border-left: none;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35);
    ul {
      height: 458px;
      display: flex;
      flex-flow: wrap;
      flex-direction: column;
      align-items: flex-start;
      align-content: flex-start;
      justify-content: flex-start;
      li {
        width: 265px;
        height: 76px;
        .product {
          a {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            transition: color 0.2s;
            width: 265px;
            padding: 20px 20px;
            &:hover {
              color: #d33434;
            }
            img {
              width: 40px;
              height: 40px;
              margin-right: 12px;
            }
          }
        }
      }
    }
  }
}
li {
  list-style-type: none;
}
.el-carousel__item h3 {
  font-size: 30px;
  opacity: 0.8;

  color: rgb(0, 0, 0);
}
</style>
