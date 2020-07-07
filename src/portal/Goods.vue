<template>
  <div class="main" id="page-header">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-row>
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="font-size:18px; margin-top:20px"
        >
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>全部商品</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col :offset="17">
          <el-input
            placeholder="请输入商品名称"
            size="middle"
            style="width: 270px;"
            v-model="searchParams.name"
            clearable
          ></el-input>
          <el-button
            size="middle"
            icon="el-icon-search"
            @click="refresh()"
          ></el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 面包屑END -->

    <div class="goodsList">
      <el-row>
        <el-col
          :span="5"
          v-for="v in goodsList"
          :key="v.id"
          style="margin:25px"
        >
          <el-card @click.native="toDetail(v.id)" class="gcard">
            <div>
              <img
                :src="serverImageUrl + 'goods/' + v.imgpath"
                style="width: 180px;height: 150px;"
              />
            </div>

            <div>
              <p style="font-size: 20px;">{{ v.name }}</p>
              <p style="color: red;font-size: 28px;">{{ v.price }}</p>
              <p style="font-size: 14px;">{{ v.goodsdesc }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-pagination
      background
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      @current-change="changePage"
      align="center"
    >
    </el-pagination>
  </div>
</template>

<script>
import { goodsTypeList } from "@/api/goodsType/goodsType";
import { goods } from "@/api/goods/goods";
import { serverApiUrl } from "@/config/apiUrl";
export default {
  name: "MainNav",
  data() {
    return {
      serverImageUrl: serverApiUrl + "/upload/",
      selected: "",
      isNavEnter: false,
      isMenuEnter: false,
      goodsList: [],
      pageSize: 12,
      total: 0,
      pageNo: 1,
      loading: true,
      searchParams: {
        name: "",
        type: "",
      },
      goodsTypeData: [],
      id: null,
    };
  },
  methods: {
    // 返回顶部
    backtop() {
      const timer = setInterval(function() {
        const top =
          document.documentElement.scrollTop || document.body.scrollTop;
        const speed = Math.floor(-top / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          top + speed;

        if (top === 0) {
          clearInterval(timer);
        }
      }, 20);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toDetail(goodsid) {
      console.log(goodsid);
      this.$router.push({
        path: "GoodsDetails",
        query: { goodsid: goodsid },
      });
    },
    changePage(val) {
      this.pageNo = val;
      this.initData();
      this.backtop();
    },
    initData() {
      goods({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        name: this.searchParams.name,
        typeid: this.searchParams.type,
      })
        .then((r) => {
          this.goodsList = r.list;
          this.total = r.count;
        })
        .catch(() => {});
      goodsTypeList({})
        .then((r) => {
          this.goodsTypeData = r;
        })
        .catch(() => {});
    },
    refresh() {
      this.initData();
    },
  },
  activated() {
    this.searchParams.type = this.$route.query.goodTypeId;
    this.initData();
  },
};
</script>
<style lang="scss">
.main {
  width: 1220px;
  margin: 0 auto;
}
.breadcrumb .el-breadcrumb {
  width: 1225px;
  line-height: 30px;
  font-size: 16px;
  margin: 0 auto;
}
.page-header {
  height: 46px;
  margin-top: -20px;
  z-index: 4;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
}
.goodsList {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  background-color: rgb(250, 250, 250);
}
.goodsList p {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.gcard {
  height: 270px;
  background-color: #ffffff;
}
.gcard:hover {
  border-color: #cfb2f6;
}
/* 面包屑CSS */
.el-tabs--gcard .el-tabs__header {
  border-bottom: none;
}
</style>
