<template>
  <div class="mian">
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      style="width:70%;margin:50px auto"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="商品信息">
        <template slot-scope="scope">{{ scope.row.goods.imgpath }}</template>
        <template slot-scope="scope">{{ scope.row.goods.name }}</template>
      </el-table-column>
      <el-table-column label="单价">
        <template slot-scope="scope">￥{{ scope.row.goods.price }}</template>
      </el-table-column>
      <el-table-column label="数量" width="225">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.num"
            @change="handleChange"
            :min="1"
            :max="99"
            label="数量"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="合计">
        <template slot-scope="scope">{{
          (scope.row.goods.price * scope.row.num) | toDecimal
        }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
            >移除</el-button
          >
        </template>
      </el-table-column>
      <div style="padding: 20px" slot="append" class="cart-footer">
        <div class="delete-con">
          <el-button class="cart-delete-seleced link">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            <span @click="dels">删除选中</span>
          </el-button>
        </div>
        <div class="submit-con">
          <span
            >已选商品
            <span id="selectGoodsCount">{{ totalCount }}</span> 件</span
          >
          <span>总价：</span>
          <span class="submit-total"
            >￥<span id="selectGoodsMoney">{{ sum | toDecimal }}</span></span
          >
          <el-button
            class="btn submit-btn"
            :class="totalCount > 0 ? '' : 'submitDis'"
            @click.native="toOrderSave"
            >去结算</el-button
          >
        </div>
      </div>
    </el-table>
  </div>
</template>
<script>
import { getShopCarInfo } from "@/utils/common";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
    };
  },
  activated() {
    this.tableData = getShopCarInfo();
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleChange(value) {
      console.log(value);
    },
    dels() {},

    numChange(value) {
      console.log(value);
    },
    toOrderSave() {
      var cartOrder = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        cartOrder[i] = this.multipleSelection[i];
      }
      this.$router.push({
        path: "/orderSave",
        query: { cartOrder: cartOrder },
      });
    },
  },
  computed: {
    totalCount: function() {
      //总件数：遍历对象数组统计数组中每个对象的count值
      var counts = 0;
      this.multipleSelection.forEach(function(v) {
        counts += v.num; //counts+=v.count等价于counts=counts+v.count
      });
      return counts;
    },
    sum: function() {
      //总价钱
      var totalSum = 0.0;
      this.multipleSelection.forEach(function(v) {
        totalSum += v.goods.price * v.num; //等价于totalSum=totalSum+v.price*v.count
      });
      return totalSum;
    },
  },
};
</script>
<style lang="scss">
.main {
  width: 1220px;
  margin: 0 auto;
}
.cart-footer {
  position: relative;
  line-height: 50px;
  background: #eee;
  overflow: hidden;
}
.cart-footer .select-con {
  float: left;
  padding-left: 20px;
}
.cart-footer .delete-con {
  float: left;
  margin-left: 20px;
}
.cart-footer .submit-con {
  float: right;
}

.cart-footer .submit-con .submit-total,
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
.cart-footer .submit-con .btn-submit {
  width: 80px;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
</style>
