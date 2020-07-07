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
          <el-breadcrumb-item>母婴资讯</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </div>
    <!-- 面包屑END -->

    <div class="newsList">
      <el-row>
        <el-col :span="12" v-for="v in newsList" :key="v.id">
          <el-card @click.native="toDetail(v.id)" class="ccard">
            <div>
              <img
                :src="serverImageUrl + 'news/' + v.imgpath"
                style="width: 250px;height: 220px;float:left"
              />
            </div>

            <div>
              <p style="font-size: 20px; margin-top:30px;">{{ v.newsDesc }}</p>
              <p style="font-size: 14px; margin-top:100px;">
                {{ v.createTime | formatDate }}
              </p>
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
import { news } from "@/api/news/news";
import { serverApiUrl } from "@/config/apiUrl";
import { formatDate } from "@/config/time.js";
export default {
  name: "MainNav",
  data() {
    return {
      serverImageUrl: serverApiUrl + "/upload/",
      selected: "",
      isNavEnter: false,
      isMenuEnter: false,
      newsList: [],
      pageSize: 6,
      total: 0,
      pageNo: 1,
      loading: true,
      id: null,
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
  methods: {
    newsDetail() {
      this.$router.push("/404");
    },
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
    toDetail(newsid) {
      console.log(newsid);
      this.$router.push({
        name: "NewsDetails",
        query: { newsid: newsid },
      });
    },
    changePage(val) {
      this.pageNo = val;
      this.initData();
      this.backtop();
    },
    initData() {
      news({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }).then((r) => {
        this.newsList = r.list;
        this.total = r.count;
      });
    },
    refresh() {
      this.initData();
    },
  },
  created() {
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
.newsList {
  margin-top: 50px;
  margin-bottom: 20px;
  text-align: center;
  background-color: rgb(250, 250, 250);
}
.newsList p {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card {
  width: 600px;
  height: 300px;
  background-color: #ffffff;
  margin-bottom: 10px;
}
.card:hover {
  border-color: #cfb2f6;
}
/* 面包屑CSS */
.el-tabs--card .el-tabs__header {
  border-bottom: none;
}
</style>
