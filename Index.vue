<template>
  <div>
    <ToolBar>
      <div>
        <el-button type="primary" size="small" @click="showEditDialog = true"
          >添加商品</el-button
        >
        <el-button type="primary" size="small" @click="exportTable"
          >本地导出表格</el-button
        >
      </div>
      <div>
        <el-input
          placeholder="请输入商品名"
          size="small"
          style="width: 140px"
          v-model="searchParams.title"
          clearable
        ></el-input>
        <el-select
          v-model="searchParams.type"
          clearable
          style="width: 140px"
          placeholder="请选择商品类型"
          size="small"
        >
          <el-option label="手机" value="1"></el-option>
          <el-option label="吃的" value="2"></el-option>
        </el-select>
        <el-button type="success" size="small" @click="refresh()"
          >查询</el-button
        >
        <el-button type="warning" size="small" @click="clearSearchParams()"
          >重置</el-button
        >
      </div>
    </ToolBar>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="商品名"> </el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
	  <el-table-column prop="detail" label="介绍"></el-table-column>
	  <el-table-column prop="" label="图片">
	  		  <template slot-scope="s">
	  			  <el-image style="width: 150px; height: 150px;" :src="s.row.url"></el-image>
	  		  </template>
	  	  </el-table-column>
      <el-table-column fixed="right" label="操作" width="240">
        <div slot-scope="s">
          <el-button type="primary" size="small" @click="routeDemo(s.row)"
            >调整</el-button
          >
          <el-button type="danger" size="small" @click="removeItem(s.row)"
            >删除</el-button
          >
        </div>
      </el-table-column>
    </el-table>
    <!--    <Pagination-->
    <!--      :params="searchParams"-->
    <!--      :requestFunc="requestFunc"-->
    <!--      ref="pagination"-->
    <!--      @returnData="returnData"-->
    <!--    />-->
    <Edit :showEditDialog="showEditDialog" @close="showEditDialog = false" />
  </div>
</template>

<script>
	import goods01 from "@/assets/images/goods/2018110101.jpg";
	import goods02 from "@/assets/images/goods/2018110102.jpg";
	import goods03 from "@/assets/images/goods/2018110103.jpg";
	
//import { topics } from "@/api/articleManage/list";
import { exportCvsTable } from "@/utils/cvs";
import { resetObject } from "@/utils/common";
import Edit from "./Edit.vue";
export default {
  data() {
    return {
      searchParams: {
        title: "",
        type: ""
      },
      showEditDialog: false,
      tableData: [
		  {name:"Apple MacBook Pro",
	  price:9000,
	  url: goods01,
			detail:"15.4英寸笔记本电脑 银色(Core i7 处理器/16GB内存/256GB SSD闪存/Retina屏 MJLQ2CH/A)"},
			{name:"Apple iPhone 8",price:8000,url: goods02,
			detail:"Apple iPhone 8 (A1863) 64GB 金色 移动联通电信4G手机"},
			{name:"三星 Galaxy S8",price:8000,url: goods03,
			detail:"三星 Galaxy S8（SM-G9500）4GB+64GB 谜夜黑（加勒比海盗定制版）移动联通电信4G手机 双卡双待"},
			],	
    };
  },
  created() {
    // topics()
    //   .then(r => {
    //     this.tableData = r;
    //   })
    //   .catch(() => {});
  },
  methods: {
    routeDemo() {
      this.$message.info("待添加");
    },
    exportTable() {
      exportCvsTable(
        [
          { title: "文章标题", field: "title" },
          { title: "浏览量", field: "visit_count" }
        ],
        this.tableData,
        "文章列表"
      );
    },
    refresh() {
      //this.$refs.pagination.Refresh(); //分页刷新
    },
    returnData(pageList) {
      this.tableData = pageList.list;
    },
    clearSearchParams() {
      resetObject(this.searchParams);
      this.refresh();
    },
    removeItem(row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          row.d = 0;
          // updateStatus({ id: row.id})
          //   .then(r => {
          //     this.$message({
          //       type: "success",
          //       message: "操作成功!"
          //     });
          //     this.refresh();
          //   })
          //   .catch(() => {});
        })
        .catch(() => {});
    }
  },
  components: { Edit }
};
</script>
