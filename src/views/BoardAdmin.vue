<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
      <!-- {{ list }} -->
    </header>

    <div>
      <dashboard />
    </div>

    <div>
      <b-button @click="topUp">Top Up</b-button>
    </div>
    {{ message }}
    <div class="">
      <h4 class="text-left">รายการเติมเงิน</h4>
      <hr />
    </div>

    <div v-for="item in list" :key="item.idx">
      <div class="jumbotron size-box">
        <!-- <p><strong>index:</strong> {{ item.idx }}</p> -->
        <p>
          <strong>เวลา/วันที่:</strong> {{ item.time }} น. | {{ item.date }}
        </p>
        <p><strong>username:</strong> {{ item.user }}</p>
        <p><strong>เติมเครดิต:</strong> {{ item.credit }} บาท</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import RobotService from "../services/robot.service";
import Dashboard from "../views/Dashboard.vue";

export default {
  name: "Admin",
  components: {
    Dashboard,
  },
  data() {
    return {
      content: "",
      message: "",
      list: [],
    };
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
    getTransections() {
      UserService.getAdminQueTransfer().then(
        (res) => {
          const data = res.data.data;
          console.log(data);
          data.forEach((element) => {
            this.list.push(element);
          });
        },
        (err) => {
          this.list =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
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
    this.getDashboard();
    // this.getTransections();
    this.setBalance();
  },
};
</script>

<style scoped>
.size-box {
  padding: 29px;
}
</style>