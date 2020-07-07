<template>
  <div>
    <div
      style="margin:20px;padding:10px;border:1px solid #EBEEF5"
      v-for="item in orderList"
      :key="item.orderid"
    >
      <div style="padding:10px;background-color: #f1f1f1;">
        <el-row>
          <el-col :span="6">
            <div class="grid-content">日期：{{ item.createtime }}</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content">订单号：{{ item.orderno }}</div>
          </el-col>
        </el-row>
      </div>
      <el-table
        :data="item.orderDetailList"
        style="width: 100%;text-align:center"
        :show-header="isShow"
        border
        :span-method="objectSpanMethod"
      >
        <el-table-column>
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px;"
              :src="serverImageUrl + 'goods/' + scope.row.goods.imgpath"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">{{ scope.row.goods.name }}</template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope"
            >￥{{ scope.row.goods.price | toDecimal }}</template
          >
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">{{ scope.row.num }}</template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope"
            >￥{{
              (scope.row.goods.price * scope.row.num) | toDecimal
            }}</template
          >
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
        <el-table-column> ￥{{ item.total | toDecimal }} </el-table-column>
        <el-table-column>
          <el-tooltip placement="bottom">
            <div slot="content">
              物流信息：{{ item.shipname }}<br />物流单号：{{ item.shipcode }}
            </div>
            <el-link type="danger">物流信息</el-link>
          </el-tooltip>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { orderAndDetailList } from "@/api/order/order";
import { serverApiUrl } from "@/config/apiUrl";
export default {
  data() {
    return {
      serverImageUrl: serverApiUrl + "/upload/",
      orderList: [],
      isShow: false,
      maxRow: 1
    };
  },
  created() {
    orderAndDetailList({ userid: 1 })
      .then(r => {
        this.orderList = r;
        var allnums = [];
        r.forEach(e => {
          allnums.push(e.orderDetailList.length);
        });
        this.maxRow = allnums.reduce((x, y) => {
          return x > y ? x : y;
        });
        // console.log(this.maxRow);
      })
      .catch(() => {});
  },
  methods: {
    objectSpanMethod({ rowIndex, columnIndex }) {
      let self = this;
      if (columnIndex === 6 || columnIndex === 7) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: self.maxRow,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  }
};
</script>
<style lang="scss">
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 10px 0;
}
.el-table td {
  text-align: center;
  vertical-align: top;
}
.el-table--enable-row-hover,
.el-table tbody tr:hover > td {
  background-color: #fff !important;
}

// .el-table tr:not(:last-child) td:nth-child(7),.el-table tr:not(:last-child) td:nth-child(8){
//   border-bottom: 0;
// }
.el-table td:nth-child(2),
.el-table td:nth-child(3),
.el-table td:nth-child(4),
.el-table td:nth-child(5) {
  border-left: 0;
  border-right: 0;
}
.el-table td:nth-child(1) {
  border-right: 0;
}
</style>
