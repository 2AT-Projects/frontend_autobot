<template>
  <div class="container">
    <div class="mt-3">
      <card-container />
    </div>
    <div class="mt-3">
      <b-row>
        <b-col>
          <line-chart class="backgroundCo" />
        </b-col>
        <!-- <b-col>
          <line-chart-withdraw class="backgroundCo" />
        </b-col> -->
      </b-row>
    </div>
    <div class="mt-3">
      <b-row>
        <b-col>
          <b-card-group deck>
            <b-card
              text-variant="white"
              header="รายการฝากล่าสุด (KBANK)"
              class="text-center cardkbank"
            >
              <b-card-text>
                <marquee direction="up" scrollamount="3" style="height: 150px"
                  ><div
                    v-for="items in transections[0].data_list[0]"
                    :key="items.id"
                    class="font"
                  >
                    {{ items.time }}
                    {{ items.first_name }}
                    {{ items.last_name }}
                    {{ items.credit }}฿
                    <hr />
                  </div>
                </marquee>
              </b-card-text>
              <template #footer>
                <small class="text-muted">Last updated {{ time }}</small>
              </template>
            </b-card>
          </b-card-group>
        </b-col>
        <b-col>
          <b-card-group deck>
            <b-card
              text-variant="white"
              header="รายการฝากล่าสุด (SCB)"
              class="text-center cardscb"
            >
              <b-card-text>
                <marquee direction="up" scrollamount="3" style="height: 150px"
                  ><div
                    v-for="items in transections[1].data_list[0]"
                    :key="items.id"
                    class="font"
                  >
                    {{ items.time }} {{ items.username }} {{ items.credit }}฿
                    <hr />
                  </div>
                </marquee>
              </b-card-text>
              <template #footer>
                <small class="text-muted">Last updated {{ time }}</small>
              </template>
            </b-card>
          </b-card-group>
        </b-col>
        <b-col>
          <b-card-group deck>
            <b-card
              bg-variant="danger"
              text-variant="white"
              header="รายการถอนล่าสุด"
              class="text-center"
            >
              <b-card-text>
                <marquee direction="up" scrollamount="3" style="height: 150px"
                  ><div
                    v-for="items in transections[2].data_list[0]"
                    :key="items.id"
                    class="font"
                  >
                    {{ items.time }} {{ items.username }} {{ items.credit }}฿
                    <hr />
                  </div>
                </marquee>
              </b-card-text>
              <template #footer>
                <small class="text-muted">Last updated {{ time }}</small>
              </template>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>

    <div class="mt-3">
      <b-button @click="topUp">Top Up</b-button>
    </div>

    <!-- {{ withdraw_list }} -->
    <div class="mt-4">
      <h4 class="text-left font">รายการเติมเงิน</h4>
      <hr />
    </div>

    <div v-for="item in list" :key="item.idx">
      <div class="jumbotron size-box font">
        <!-- <p><strong>index:</strong> {{ item.idx }}</p> -->
        <p>
          <strong>เวลา/วันที่:</strong> {{ item.time }} น. | {{ item.date }}
        </p>
        <p><strong>username:</strong> {{ item.username }}</p>
        <p><strong>เติมเครดิต:</strong> {{ item.credit }} บาท</p>
      </div>
    </div>
    <div class="mt-4">test</div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import RobotService from "../services/robot.service";
import moment from "moment";
import LineChart from "../components/Chart/LineChartContainer.vue";
import CardContainer from "../components/CardContainer.vue";

export default {
  name: "Admin",
  components: {
    LineChart,
    CardContainer,
  },
  data() {
    return {
      content: "",
      message: "",
      today: new Date(),
      time: "",
      sumToday: "",
      list: [],
      transections: [
        {
          title: "รายการฝาก (Kbank)",
          bg: "warning",
          tx: "dark",
          data_list: [],
        },
        {
          title: "รายการฝาก (SCB)",
          bg: "dark",
          tx: "white",
          data_list: [],
        },
        {
          title: "รายการถอน",
          bg: "warning",
          tx: "dark",
          data_list: [],
        },
      ],
    };
  },
  created() {
    this.time = moment().fromNow();
    console.log(this.time);
  },
  methods: {
    topUp() {
      RobotService.topUp()
        .then((res) => {
          const data = res.data.data;
          console.log(data);
          data.forEach((element) => {
            this.list.push(element);
          });
          this.message = res.data.message;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getWithdraw() {
      UserService.getAdminWithdrawList()
        .then((res) => {
          this.message = res.data.message;
          const data_1 = res.data.result;
          this.transections[2].data_list.push(data_1);
          console.log(this.message);
          // console.log(this.withdraw_list);
        })
        .catch((err) => {
          this.message = err;
        });
    },

    getKbankDepositStatus() {
      UserService.getAdminKbankDepositWithStatus()
        .then((user) => {})
        .catch((err) => {});
    },

    getTransectionsFromKbank() {
      UserService.getAdminKbankDepositWithStatus()
        .then((res) => {
          const data = res.data;
          this.transections[0].data_list.push(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getTransections() {
      UserService.getAdminScbDepositWithStatus().then(
        (res) => {
          const data = res.data.datas;
          console.log(data);
          this.transections[1].data_list.push(data);
          if (data) {
            data.forEach((element) => {
              this.list.push(element);
            });
          }
          // data.forEach((element) => {
          //   this.list.push(element);
          // });
        },
        (err) => {
          this.deposit_list =
            (err.res && err.res.data && err.res.data.message) ||
            err.message ||
            err.toString();
        }
      );
    },
    setBalance() {
      console.log(this.list);
    },
    getDashboard() {
      UserService.getAdminBoard().then(
        (response) => {
          this.content = response.data;
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
  mounted() {
    this.getTransectionsFromKbank();
    this.getDashboard();
    this.getWithdraw();
    this.getTransections();
    this.setBalance();
  },
};
</script>

<style scoped>
.size-box {
  padding: 29px;
  color: white;
}

.font {
  color: rgb(29, 29, 29);
  font-weight: 600;
}

.font1 {
  color: rgb(0, 0, 0);
}

@keyframes rainbow {
  from,
  to {
    box-shadow: 0 0 10px 0 rgb(228, 5, 5);
  }
  16% {
    box-shadow: 0 0 10px 0 rgb(162, 0, 255);
  }
  48% {
    box-shadow: 0 0 10px 0 aqua;
  }
  64% {
    box-shadow: 0 0 10px 0 blue;
  }
  80% {
    box-shadow: 0 0 10px 0 fuchsia;
  }
}

.card {
  animation: rainbow 3s infinite;
}

hr {
  background-color: rgb(37, 37, 37);
}

.backgroundCo {
  padding: 10px;
  background-color: rgba(46, 46, 46, 0.658);
}

.cardscb {
  background-color: #6f42c1;
}

.cardkbank {
  background-color: #03a44e;
}
</style>