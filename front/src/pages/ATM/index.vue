<template>
  <div class="atm-container">
    <div class="atm-header">
      <div class="bank-logo">
        <img src="../../assets/ocbc_logo.png" alt="OCBC Bank" />
      </div>
      <div class="atm-title">Welcome to OCBC ATM</div>
      <div class="atm-title" style="cursor: pointer;" @click="logout">logout</div>
    </div>

    <div class="atm-main">
      <div class="left-panel">
        <div class="greeting">
          <h1>Hello!</h1>
          <p>What would you like to do today?</p>
        </div>

        <div class="service-category">
          <h2>Get Cash</h2>
          <div class="amount-grid">
            <button class="amount-btn" data-amount="50" @click="handleWithdraw(50)">$50</button>
            <button class="amount-btn" data-amount="80" @click="handleWithdraw(80)">$80</button>
            <button class="amount-btn" data-amount="100" @click="handleWithdraw(100)">$100</button>
            <button class="amount-btn" data-amount="500" @click="handleWithdraw(500)">$500</button>
          </div>
          <el-form ref="formRef" :model="form" label-width="200px" :rules="rules">
            <el-input v-model.trim="money" type="number" placeholder="Other cash amounts"></el-input>

            <button
              class="other-amount-btn"
              id="other-amount"
              @click="qukuanFn(money)"
            >Withdrem money</button>
          </el-form>
          <!-- <el-button type="primary" class="qukuan"></el-button> -->
        </div>
      </div>

      <div class="right-panel">
        <div class="non-cash-services">
          <h2>Non Cash Services</h2>
          <div class="service-buttons">
            <button class="service-btn" data-service="activate-card">
              <span class="icon">💳</span>
              Activate card
            </button>
            <button class="service-btn" data-service="balance">
              <span class="icon">📊</span>
              Balance enquiry
            </button>
            <button class="service-btn" data-service="more" @click="$router.push('/More')">
              <span class="icon">📋</span>
              More services
            </button>
          </div>
        </div>

        <div class="transaction-display">
          <div class="display-content active">
            <div class="welcome-message">
              <div class="welcome-icon">👋</div>
              <h3>Welcome to OCBC</h3>
              <p>Please select a service to begin</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="atm-footer">
      <div class="control-panel">
        <div class="card-slot">
          <div class="card-icon">💳</div>
          <p>Insert Card Here or Scan QR Code</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      userTableName: localStorage.getItem("UserTableName"),
      dataInfo: {},
      form: {},
      rules: {
        money: [
          { required: true, message: "Please Enter money", trigger: "blur" }
        ]
      },
      money: ""
    };
  },
  created() {
    this.getInit();
  },
  methods: {
    logout() {
      localStorage.clear();
      Vue.http.headers.common["Token"] = "";
      this.$router.push("/login");
      this.activeIndex = "0";
      localStorage.setItem("keyPath", this.activeIndex);
      this.Token = "";
      this.$forceUpdate();
      this.$message({
        message: "登出成功",
        type: "success",
        duration: 1000
      });
    },
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

    handleWithdraw(amount) {
      this.$confirm(
        `Whether to confirm the withdrawal of ${amount} dollar?`,
        "prompt",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      )
        .then(() => {
          this.qukuanFn(amount);
        })
        .catch(() => {});
    },
    qukuanFn(amount) {
      if (this.money === "") return;
      if (amount > this.dataInfo.jine) {
        this.$message({
          message: "Insufficient balance",
          type: "warning"
        });
        return;
      }
      this.dataInfo.jine = this.dataInfo.jine - amount;
      debugger;
      this.$http
        .post("yinxingzhanghu/update", { ...this.dataInfo })
        .then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: "Withdrawal successful",
              type: "success"
            });
            // 更新账户余额
            this.dataInfo.jine -= amount;
          }
        });
      this.$http
        .get(this.userTableName + "/session", { emulateJSON: true })
        .then(res => {
          if (res.data.code == 0) {
            let json = {
              amount,
              id: res.data.data.id,
              customerPhone: res.data.data.kehushouji,
              customerName: res.data.data.kehuxingming,
              customerNccount: res.data.data.kehuzhanghao
              // mima: res.data.data.mima,
              // shenfenzheng: res.data.data.shenfenzheng,
              // touxiang: res.data.data.touxiang,
              // xingbie: res.data.data.xingbie,
            };
            // json.jine = amount;
            // console.log("1`111",json);

            this.$http.post("qukuanjilu/add", { ...json });
          }
        });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.atm-container {
  width: 1000px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e1e8ed;
  margin: 5vh auto;
}

.atm-header {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff6b6b 100%);
  color: white;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bank-logo img {
  height: 35px;
  filter: brightness(0) invert(1);
}

.atm-title {
  font-size: 18px;
  font-weight: 300;
}

.atm-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  min-height: 500px;
}

.left-panel {
  background: #f8f9fa;
  padding: 40px;
  border-right: 1px solid #e1e8ed;
}

.greeting {
  margin-bottom: 40px;
}

.greeting h1 {
  color: #ff6b6b;
  font-size: 28px;
  margin-bottom: 8px;
}

.greeting p {
  color: #666;
  font-size: 16px;
}

.service-category h2 {
  color: #ff6b6b;
  font-size: 22px;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 3px solid #ff6b6b;
}

.amount-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.amount-btn {
  padding: 25px 20px;
  background: linear-gradient(135deg, #ff6b6b, #ff6b6b);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 71, 171, 0.2);
}

.amount-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 71, 171, 0.3);
  background: linear-gradient(135deg, #ff6b6b, #ff6b6b);
}

.other-amount-btn {
  margin-top: 15px;
  width: 100%;
  padding: 18px;
  background: #f0f4f8;
  color: #ff6b6b;
  border: 2px dashed #ff6b6b;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.qukuan {
  margin-top: 15px;
  width: 100%;
  padding: 18px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.other-amount-btn:hover {
  background: #e3ecf7;
  border-style: solid;
}

.right-panel {
  display: flex;
  flex-direction: column;
}

.non-cash-services {
  background: #f8f9fa;
  padding: 30px;
  border-bottom: 1px solid #e1e8ed;
}

.non-cash-services h2 {
  color: #ff6b6b;
  font-size: 22px;
  margin-bottom: 25px;
  text-align: center;
}

.service-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.service-btn {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: white;
  color: #ff6b6b;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.service-btn:hover {
  background: #ff6b6b;
  color: white;
  border-color: #ff6b6b;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 71, 171, 0.2);
}

.service-btn .icon {
  font-size: 20px;
  flex-shrink: 0;
}

.transaction-display {
  flex: 1;
  background: white;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-message {
  text-align: center;
  color: #666;
}

.welcome-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.welcome-message h3 {
  color: #ff6b6b;
  font-size: 24px;
  margin-bottom: 10px;
}

.atm-footer {
  background: #f8f9fa;
  padding: 20px 40px;
  border-top: 1px solid #e1e8ed;
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.control-buttons {
  display: flex;
  gap: 15px;
}

.control-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #e17055;
  color: white;
}

.clear-btn {
  background: #fdcb6e;
  color: white;
}

.enter-btn {
  background: #00b894;
  color: white;
}

.control-btn:hover {
  transform: scale(1.05);
}

.card-slot {
  text-align: center;
  color: #666;
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-icon {
  font-size: 24px;
}
</style>