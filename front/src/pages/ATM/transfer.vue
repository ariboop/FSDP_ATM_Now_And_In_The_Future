<template>
  <div class="page-container">
    <div class="bank-header">
      <div class="bank-logo">
        <img src="../../assets/ocbc_logo.png" />
      </div>
      <h1>Transfer Funds</h1>
    </div>

    <div class="bill-payment-container">
      <div class="payment-section">
        <h3>Transfer Info</h3>
        <el-form ref="formRef" :model="form" label-width="200px" :rules="rules">
          <el-form-item label="recipient name" prop="recipientName">
            <el-input v-model="form.recipientName" placeholder="Enter recipient name"></el-input>
          </el-form-item>
          <el-form-item label="recipient card number" prop="recipientCardNumber">
            <el-input v-model="form.recipientCardNumber" placeholder="Enter recipient card number"></el-input>
          </el-form-item>
          <el-form-item label="amount" prop="amount">
            <el-input v-model="form.amount" placeholder="Enter amount"></el-input>
          </el-form-item>
        </el-form>
        <div class="form-actions">
          <button type="submit" class="btn-primary" @click="submit">Pay Now</button>
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
      if (this.form.amount > this.dataInfo.jine) {
        this.$message({
          message: "Insufficient balance",
          type: "warning"
        });
        return;
      }
      this.dataInfo.jine -= this.form.amount;
      console.log("2222",this.dataInfo);
      
      this.$http
        .post("yinxingzhanghu/update", { ...this.dataInfo })
        .then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: "Transfer successful",
              type: "success"
            });
          }
        });

      const params = {
        recipientCardNumber: this.form.recipientCardNumber,
        recipientName: this.form.recipientName,
        recordNumber: this.getUUID(),
        amount: this.form.amount,
        cardNumber: this.dataInfo.kahao,
        bankDeposit: this.dataInfo.kaihuxing,
        customerPhone: this.dataInfo.kehushouji,
        customerName: this.dataInfo.kehuxingming,
        customerAccount: this.dataInfo.kehuzhanghao,
        bankCard: this.dataInfo.yinxingka,
        transferDate: this.getFormattedDateShort(),
        transferTime: this.getFormattedDateTimeCompact()
      };

      
      this.$http.post("zhuanzhangjilu/add", { ...params });
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

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 20px;
}

.page-container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.bank-header {
  background: linear-gradient(135deg, #ed2722 0%, #ed2722 100%);
  color: white;
  padding: 30px 40px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.bank-logo img {
  height: 35px;
  filter: brightness(0) invert(1);
}

.bank-header h1 {
  font-size: 24px;
  font-weight: 600;
}

.bill-payment-container {
  padding: 40px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

.payment-section h3 {
  color: #ed2722;
  margin-bottom: 25px;
  font-size: 20px;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.bottom-right-container {
  position: relative;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #ed2722;
}

.form-input,
.form-select {
  padding: 12px 15px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #ed2722;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.saved-billers h3 {
  color: #ed2722;
  margin-bottom: 20px;
  font-size: 18px;
}

.biller-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.biller-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e1e8ed;
  cursor: pointer;
  transition: all 0.3s ease;
}

.biller-item:hover {
  border-color: #ed2722;
  transform: translateX(5px);
}

.biller-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.biller-name {
  font-weight: 600;
  color: #ed2722;
}

.biller-account {
  color: #666;
  font-size: 14px;
}

.btn-primary {
  background: linear-gradient(135deg, #ed2722, #ed2722);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #ed2722, #ed2722);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 71, 171, 0.3);
}

.btn-secondary {
  background: #f8f9fa;
  color: #ed2722;
  border: 2px solid #e1e8ed;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #e9ecef;
  border-color: #ed2722;
}

.btn-small {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-small.use {
  background: #ed2722;
  color: white;
}

.btn-small.use:hover {
  background: #ed2722;
}

@media (max-width: 768px) {
  .page-container {
    margin: 10px;
  }

  .bank-header {
    padding: 20px;
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .bill-payment-container {
    padding: 20px;
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .form-actions {
    flex-direction: column;
  }
}
.red-btn {
  position: absolute;
  bottom: 20px;
  left: 780px;

  background-color: #e53935;
  border: none;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}

.red-btn img {
  width: 80%;
}
</style>