<template>
  <div>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="margin:50px auto;width: 70%"
    >
      <el-table-column label="商品信息">
        <template slot-scope="scope">{{ scope.row.goods.name }}</template>
      </el-table-column>
      <el-table-column label="单价">
        <template slot-scope="scope">{{ scope.row.goods.price }}</template>
      </el-table-column>
      <el-table-column label="数量" width="255">
        <template slot-scope="scope">{{ scope.row.num }}</template>
      </el-table-column>
      <el-table-column label="小计">
        <template slot-scope="scope">{{
          (scope.row.goods.price * scope.row.num) | toDecimal
        }}</template>
      </el-table-column>
      <div style="margin-top: 20px" slot="append">
        <div class="order-footer clear">
          <div class="submit-con">
            <span>合计：</span>
            <span class="submit-total">
              ￥
              <span id="selectGoodsMoney">{{ sum | toDecimal }}</span>
            </span>
            <el-button class="btn submit-btn" @click.native="toSaveOrderAndPay"
              >提交订单</el-button
            >
          </div>
        </div>
      </div>
    </el-table>
  </div>
</template>
<script>
import { saveOrderAndPay } from "@/api/order/order";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.tableData = this.$route.query.cartOrder;
    console.log(this.tableData);
  },
  methods: {
    toSaveOrderAndPay() {
      var vNow = new Date();
      var sNow = "";
      sNow += String(vNow.getFullYear());
      sNow += String(vNow.getMonth() + 1);
      sNow += String(vNow.getDate());
      sNow += String(vNow.getHours());
      sNow += String(vNow.getMinutes());
      sNow += String(vNow.getSeconds());
      sNow += String(vNow.getMilliseconds());
      saveOrderAndPay({
        out_trade_no: sNow,
        subject: "测试",
        total_amount: this.sum,
        body: "商品描述测试",
      })
        .then((r) => {
          const divForm = document.getElementsByTagName("divform");
          if (divForm.length) {
            document.body.removeChild(divForm[0]);
          }
          const div = document.createElement("divform");
          div.innerHTML = r; // data就是接口返回的form 表单字符串
          document.body.appendChild(div);
          document.forms[0].setAttribute("target", "_blank"); // 新开窗口跳转
          document.forms[0].submit();
        })
        .catch(() => {});
    },
  },
  computed: {
    sum: function() {
      //总价钱
      var totalSum = 0.0;
      this.tableData.forEach(function(v) {
        totalSum += v.goods.price * v.num; //等价于totalSum=totalSum+v.price*v.count
      });
      return totalSum;
    },
  },
};
</script>
<style lang="scss">
/* order-footer */
.order-footer {
  position: relative;
  line-height: 50px;
  background: #eee;
  overflow: hidden;
}
.order-footer .select-con {
  float: left;
  padding-left: 20px;
}
.order-footer .submit-con {
  float: right;
}
.btn {
  background: #c60023;
  color: #eee;
}
.order-footer .submit-con .submit-total,
#selectGoodsCount {
  font-size: 18px;
  color: #c60023;
  font-weight: bold;
  margin-right: 30px;
  vertical-align: middle;
}
#selectGoodsCount {
  margin-right: 5px;
}
.submit-con .submitDis {
  background: #b0b0b0;
  cursor: no-drop;
}
.order-footer .submit-con .btn-submit {
  width: 80px;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
</style>
