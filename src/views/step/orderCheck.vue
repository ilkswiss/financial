<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="余额">
        <el-input type="text" v-model.number="balance" disabled></el-input>
      </el-form-item>
      <el-form-item label="保证金">
        <el-input type="text" v-model.number="guaranty" disabled></el-input>
      </el-form-item>
    </el-form>
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
    <el-table highlight-current-row style="width: 100%;">
      <el-table-column v-model="tabel.orderID" label="订单ID"></el-table-column>
      <el-table-column v-model="tabel.productID" label="产品ID"></el-table-column>
      <el-table-column v-model="tabel.produtName" label="创建时间"></el-table-column>
      <el-table-column v-model="tabel.orderTotal" label="订单总额"></el-table-column>
      <el-table-column v-model="tabel.relPayed" label="实付金额"></el-table-column>
      <el-table-column v-model="tabel.planDesc" label="订单状态"></el-table-column>
      <el-table-column v-model="tabel.price" label="子订单ID"></el-table-column>
      <el-table-column label="操作">
        <template solt-scope="scope">
          <el-button size="small" @click="handleGoShop">去购买</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      balance: "10000",
      guaranty: "100000",
      merchantID: "",
	  shopID: "",
	  checktime:"",
      tabel: {
        productID: "",
        shopID: "",
        produtName: "",
        produtDesc: "",
        planID: "",
        planDesc: "",
        price: ""
      }
    };
  },
  methods: {
    handleGoShop() {
      console.log("goshop");
      if (false) {
      } else {
        this.$message({
          message: "http://www.baidu.com"
        });
      }
    },
    handleCheckList() {
      console.log("checklist");
    }
  }
};
</script>

<style lang="scss" scope>
</style>