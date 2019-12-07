<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="余额">
        <el-input type="text" v-model.number="balance" disabled></el-input>
      </el-form-item>
      <el-form-item label="保证金">
        <el-input type="text" v-model.number="guaranty" disabled></el-input>
      </el-form-item>
      <el-form-item label="充值">
        <el-select style="width:120px" v-model="charge">
          <el-option label="会员费充值" value="1"></el-option>
          <el-option label="保证金充值" value="2"></el-option>
        </el-select>
        <el-button type="info" @click="handleReCharge">充值</el-button>
      </el-form-item>
    </el-form>

    <!--搜索-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <h4 style="margin: 0 0 8px;padding:0">筛选查询</h4>
      <el-form :inline="true">
        <el-form-item label="输入搜索">
          <el-select v-model="charge_type" placeholder="充值类型">
            <el-option
              v-for="item in charge_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
      <el-table-column prop="status" label="订单状态"></el-table-column>
      <el-table-column prop="amount" label="订单金额"></el-table-column>
      <el-table-column prop="order_create_time" label="创建日期"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import qs from "qs";
import utils from "../../common/js/util.js";
import { getChargeList, recharge } from "../../api/api.js";
import orderStatus from "../../common/js/orderStatus.js";
export default {
  data() {
    return {
      charge_options: [
        {
          value: "1",
          label: "充值"
        },
        {
          value: "2",
          label: "退款"
        },
        {
          value: "3",
          label: "用户购买消费"
        },
        {
          value: "4",
          label: "平台扣费"
        }
      ],
      charge_type: "1",
      balance: "0",
      guaranty: "0",
      merchantID: "",
      shopID: "",
      checktime: "",
      charge: "1",
      orderList: []
    };
  },
  beforeMount() {
    this.getChargeList();
  },
  methods: {
    handleReCharge() {
      let params = {
        account_id: sessionStorage.getItem("accountID"),
        capital_type: this.charge,
        product_id: this.charge === "1" ? 100005 : 100006
      };
      recharge(qs.stringify(params)).then(res => {
        let { rechargeUrl } = res;
        let oA = document.createElement("a");
        oA.setAttribute("href", rechargeUrl);
        oA.setAttribute("target", "_blank");
        document.body.appendChild(oA);
        oA.click();
        document.body.removeChild(oA);
      });
    },
    handleCheckList() {
      this.getChargeList();
    },
    getChargeList() {
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
        is_show_balance: 1,
        capital_type: this.charge,
        charge_type: this.charge_type,
        start_time: startTime,
        end_time: endTime,
        page: 1,
        page_size: 100
      };
      getChargeList(qs.stringify(params)).then(res => {
        let { available_balance, order_list } = res;
        if (this.charge === '1') {
          this.balance = (available_balance / 100).toFixed(2);
        } else {
          this.guaranty = (available_balance / 100).toFixed(2);
        }
        this.balance = (available_balance / 100).toFixed(2);
        order_list = order_list.map(item => {
          item.order_create_time = utils.dateFormat(
            item.order_create_time * 1000
          );
          item.amount = utils.priceFormat(item.amount);
          item.status = orderStatus[item.status];
          return item;
        });
        this.orderList = order_list;
        params.capital_type = params.capital_type === '1' ? '2' : '1';
        getChargeList(qs.stringify(params)).then(res => {
          let { available_balance } = res;
          if (this.charge === '1') {
            this.guaranty = (available_balance / 100).toFixed(2);
          } else {
            this.balance = (available_balance / 100).toFixed(2);
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scope>
</style>