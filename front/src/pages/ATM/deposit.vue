<template>
  <div class="page-container">
    <div class="bank-header">
      <div class="bank-logo">
        <img src="@/assets/ocbc_logo.png" />
      </div>
      <h1>Deposit Cash</h1>
    </div>

    <div class="bill-payment-container">
      <div class="payment-section">
        <h3>Deposit Info</h3>
        <el-form ref="formRef" :model="form" label-width="200px" :rules="rules">
          <el-form-item label="amount" prop="amount">
            <el-input v-model="form.amount" placeholder="Enter amount"></el-input>
          </el-form-item>
        </el-form>
        <div class="form-actions">
          <button type="submit" class="btn-primary" @click="submit">Confirm</button>
          <button type="button" class="btn-secondary" @click="$router.back()">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataInfo: {},
      form: {},
      rules: {
        recipientName: [
          {
            required: true,
            message: "Please Enter recipientName",
            trigger: "blur"
          }
        ],
        recipientCardNumber: [
          {
            required: true,
            message: "Please Enter recipient card number",
            trigger: "blur"
          }
        ],
        amount: [
          { required: true, message: "Please Enter amount", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getInit();
  },
  methods: {
    getInit() {
      const params = {
        page: 1,
        limit: 16,
        sort: "id",
        order: "desc"
      };
      this.$http.get(`yinxingzhanghu/page`, { params }).then(({ body }) => {
        if (body.code == 0) {
          if (body.data.list.length > 0) {
            this.dataInfo = body.data.list[0];
          }
        }
      });
    },
    async submit() {
      await this.$refs.formRef.validate();
      console.log(this.dataInfo);
      this.dataInfo.jine += this.form.amount;

      this.$http
        .post("yinxingzhanghu/update", { ...this.dataInfo })
        .then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: "Deposit successful",
              type: "success"
            });
          }
        });

      const params = {

        recordNumber: this.getUUID(),
        depositTime: this.getFormattedDateTimeCompact(),
        amount: this.form.amount,
        cardNumber: this.dataInfo.kahao,
        bankDeposit: this.dataInfo.kaihuxing,
        customerPhone: this.dataInfo.kehushouji,
        customerName: this.dataInfo.kehuxingming,
        customerAccount: this.dataInfo.kehuzhanghao,
        bankCard: this.dataInfo.yinxingka,
      };
      console.log("1111", params);

      this.$http.post("cunkuanjilu/add", { ...params });
    },
    // 获取uuid
    getUUID() {
      return new Date().getTime();
    },
    getFormattedDateShort() {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getDate()).padStart(
        2,
        "0"
      )}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    },
    getFormattedDateTimeCompact() {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")} ${String(
        d.getHours()
      ).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(
        d.getSeconds()
      ).padStart(2, "0")}`;
    }
  }
};
</script>
