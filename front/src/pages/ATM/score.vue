<template>
  <div class="atm-container">
    <div class="atm-header">
      <div class="bank-logo">
        <img src="../../assets/ocbc_logo.png" alt="OCBC Bank" />
      </div>
      <div class="atm-title">Cumulative Scoring</div>
    </div>

    <div class="atm-main">
      <div class="greeting">
        <h1>Hello!</h1>
        <p>What would you like to do today?</p>
      </div>

      <div class="services-grid">
        <button class="service-card" v-for="(i,index) in list" :key="index" @click="handleInfo(i)">
          <div class="service-icon">
            <img
              :src="`http://localhost:8080/springbootfwb318j0/${i.petPictures}`"
              width="70px"
              height="70px"
              alt
            />
          </div>
          <div class="service-content">
            <h3>{{i.giftName}}</h3>
            <p>{{i.giftDesc}}</p>
            <p>{{i.point}}point</p>
          </div>
          <div class="duihuan">
            <el-button type="primary" @click.stop="handleConvert(i)">Convert</el-button>
          </div>
        </button>
      </div>
    </div>

    <div class="atm-footer">
      <div class="control-panel">
        <button class="control-btn back-btn" @click="$router.back()">← Back</button>
        <div class="card-slot">
          <div class="card-icon">💳</div>
          <p>Insert Card Here</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      dataInfo: {}
    };
  },
  created() {
    this.getUSerInfo();
    this.getInit();
  },
  methods: {
    async getUSerInfo() {
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
    async getInit() {
      const { data } = await this.$http.get(`gift/page`);
      this.list = data.data.list;
    },
    async handleConvert(item) {
      const data = { ...this.dataInfo, ...item };
      const res = await this.$http.post(`giftExchange/add`, data);
      if (res.data.code === 0) {
        this.$message.success("Conversion Successful");
      }
    },
    handleInfo(item) {
      const data = JSON.stringify(item);
      this.$router.push({ path: "/scoreInfo", query: { data } });
    }
  }
};
</script>

<style scoped lang="scss">
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
  width: 900px;
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
  padding: 40px;
}

.greeting {
  text-align: center;
  margin-bottom: 40px;
}

.greeting h1 {
  color: #002d62;
  font-size: 28px;
  margin-bottom: 8px;
}

.greeting p {
  color: #666;
  font-size: 16px;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-height: 400px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}

.service-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px;
  background: #f8f9fa;
  border: 2px solid #e1e8ed;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  border: none;
}

.service-card:hover {
  background: #ff6b6b;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 71, 171, 0.2);
}

.service-card:hover .service-icon {
  background: white;
  color: #ff6b6b;
}

.service-card:hover .service-content h3,
.service-card:hover .service-content p {
  color: white;
}
.duihuan {
  position: absolute;
  right: 20px;
  .el-button {
    padding: 12px 20px;
  }
}

.service-icon {
  width: 60px;
  height: 60px;
  background: #ff6b6b;
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.service-content h3 {
  color: #002d62;
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: 600;
}

.service-content p {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
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

.back-btn {
  padding: 12px 30px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #ff6b6b;
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