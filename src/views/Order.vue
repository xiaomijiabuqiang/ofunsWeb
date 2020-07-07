<template>
  <div>
    <el-table
      :data="tableData"
      style="margin:40px auto;width: 90%"
      border
      @expand-change="load"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <div style="margin-top: 20px" slot="append">
            <el-row>
              <el-col :span="12">
                <div class="grid-content">
                  地址：{{
                    props.row.tableData.hasOwnProperty("address")
                      ? props.row.tableData.address.address
                      : ""
                  }}
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  物流信息：{{ props.row.shipname }}
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content">
                  物流单号：{{ props.row.shipcode }}
                </div>
              </el-col>
            </el-row>
          </div>
          <el-table
            :data="props.row.tableData.orderDetailList"
            style="width: 100%"
            border
            :show-header="isShow"
          >
            <el-table-column>
              <template slot-scope="scope">
                <el-image
                  style="width: 150px; height: 150px;"
                  :src="serverImageUrl + 'goods/' + scope.row.goods.imgpath"
                ></el-image>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">{{ scope.row.goods.name }}</template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">{{
                scope.row.price | toDecimal
              }}</template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">{{ scope.row.num }}</template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">{{
                scope.row.total | toDecimal
              }}</template>
            </el-table-column>

            <el-table-column>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >退款</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="下单日期"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="orderno"
        label="订单号"
        width="180"
      ></el-table-column>
      <el-table-column label="总计">
        <template slot-scope="scope">{{
          scope.row.total | toDecimal
        }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { orderList, orderDetailList } from "@/api/order/order";
import { serverApiUrl } from "@/config/apiUrl";
export default {
  data() {
    return {
      serverImageUrl: serverApiUrl + "/upload/",
      tableData: [],
      isShow: false
    };
  },
  created() {
    orderList({ userid: 1 })
      .then(r => {
        this.tableData = r.map(k => {
          k.tableData = {};
          return k;
        });
      })
      .catch(() => {});
  },
  methods: {
    load(row) {
      orderDetailList({ orderid: row.orderid })
        .then(r => {
          row.tableData = r;
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss">
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
