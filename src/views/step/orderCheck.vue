<template>
  <div>
    <!--搜索-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <h4 style="margin: 0 0 8px;padding:0">筛选查询</h4>
      <el-form :inline="true">
        <el-form-item label="输入搜索">
          <el-input type="text" v-model="merchantID" placeholder="订单号"></el-input>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            style="width:320px"
            value-format="yyyy-MM-dd"
            format="yyyy 年 MM 月 dd 日"
            v-model="checktime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="info" @click="handleCheckList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 表格 -->
    <el-table :data="orderList" highlight-current-row style="width: 100%;">
      <el-table-column prop="order_id" label="订单ID"></el-table-column>
      <el-table-column prop="product_id" label="产品ID"></el-table-column>
      <el-table-column prop="order_create_time" label="创建时间"></el-table-column>
      <el-table-column prop="order_total_amount" label="订单总额"></el-table-column>
      <el-table-column prop="real_pay_amount" label="实付金额"></el-table-column>
      <el-table-column prop="status" label="订单状态"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import qs from "qs";
import utils from "../../common/js/util.js";
import orderStatus from "../../common/js/orderStatus.js";
import { queryOrderList, queryOrderInfo } from "../../api/api.js";
export default {
  data() {
    return {
      merchantID: "",
      shopID: "",
      checktime: "",
      orderList: []
    };
  },
  beforeMount() {
    this.queryAllList();
  },
  methods: {
    handleCheckList() {
      if (this.merchantID) {
        this.queryOrderInfo();
      } else {
        this.queryAllList();
      }
    },
    queryOrderInfo() {
      let params = {
        account_id: sessionStorage.getItem("accountID"),
        order_id: this.merchantID,
        is_query_sub_order: 1
      };
      queryOrderInfo(qs.stringify(params)).then(res => {
        res.order_create_time = utils.dateFormat(
          res.order_create_time * 1000
        );
        res.order_total_amount = utils.priceFormat(res.order_total_amount);
        res.real_pay_amount = utils.priceFormat(res.real_pay_amount);
        res.status = orderStatus[res.status];
        this.orderList.splice(0, this.orderList.length, res);
      });
    },
    queryAllList() {
      let startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      let startTime = parseInt(startDate.getTime() / 1000);
      let endTime = parseInt(Date.now() / 1000);
      if (this.checktime) {
        startTime = parseInt(this.checktime[0].getTime() / 1000);
        endTime = parseInt(this.checktime[1].getTime() / 1000) + 86400;
      }
      let params = {
        account_id: sessionStorage.getItem("accountID"),
        is_query_sub_order: 1,
        start_time: startTime,
        end_time: endTime,
        page: 1,
        page_size: 100
      };
      queryOrderList(qs.stringify(params)).then(res => {
        let { order_list } = res;
        order_list = order_list.map(item => {
          item.order_create_time = utils.dateFormat(
            item.order_create_time * 1000
          );
          item.order_total_amount = utils.priceFormat(item.order_total_amount);
          item.real_pay_amount = utils.priceFormat(item.real_pay_amount);
          item.status = orderStatus[item.status];
          return item;
        });
        this.orderList = order_list;
      });
    }
  }
};
</script>

<style lang="scss" scope>
</style>