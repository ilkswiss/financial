<template>
  <div>
    <!--搜索-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <h4 style="margin: 0 0 8px;padding:0">筛选查询</h4>
      <el-form :inline="true">
        <el-form-item label="输入搜索">
          <el-input type="text" v-model="merchantID" placeholder="商户ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="shopID" placeholder="店铺ID"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="info" @click="handleCheckList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 表格 -->
    <el-table :data="product_list" highlight-current-row style="width: 100%;">
      <el-table-column prop="merchants_id" label="商户ID"></el-table-column>
      <el-table-column prop="product_id" label="产品ID"></el-table-column>
      <el-table-column prop="product_name" label="产品名称"></el-table-column>
      <el-table-column prop="product_desc" label="产品描述"></el-table-column>
      <el-table-column prop="product_plan_id" label="计划ID"></el-table-column>
      <el-table-column prop="product_plan_desc" label="计划描述"></el-table-column>
      <el-table-column prop="product_price" label="价格"></el-table-column>
      <el-table-column prop="payUrl" label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleGoShop(scope.row)">去购买</el-button>
          <!-- <a :href="scope.row.payUrl" target="_blank">去购买</a> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getChargeList, getBuyUrl } from "../../api/api.js";
import qs from "qs";
export default {
  data() {
    return {
      merchantID: "77073240608545",
      shopID: "77079236920110",
      product_list: []
    };
  },
  methods: {
    handleGoShop(row) {
      let oA = document.createElement('a');
      oA.setAttribute('href', row.payUrl);
      oA.setAttribute('target', '_blank');
      document.body.appendChild(oA);
      oA.click();
      document.body.removeChild(oA);
    },
    handleCheckList() {
      const params = {
        account_id: sessionStorage.getItem("accountID"),
        merchants_id: this.merchantID,
        shop_id: this.shopID
      };
      getChargeList(qs.stringify(params)).then(res => {
        const { product_list } = res;
        this.product_list = product_list.map(item => {
          item.merchants_id = this.merchantID
          const params = {
            account_id: sessionStorage.getItem("accountID"),
            merchants_id: item.merchants_id,
            shop_id: this.shopID,
            product_id: item.product_id,
            plan_id: item.product_plan_id
          }
          getBuyUrl(qs.stringify(params)).then(res => {
            const { payUrl } = res;
            item.payUrl = payUrl;
          })
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scope>
</style>