<template>
  <div class="container">
    <header class="jumbotron">
      <h3>รายการเงินเข้า (SCB)</h3>
    </header>

    {{ message }}

    <div class="mt-4">
      <b-input-group>
        <b-button-group class="">
          <b-button variant="warning" @click="startGetDepositFromScb()"
            >ดึงข้อมูลจากธนาคาร</b-button
          >
          <b-button variant="info" @click="getDepositToday"
            >รายการวันนี้</b-button
          >
        </b-button-group>
        <b-button-group class="col-7">
          <span>from: </span><date-picker :language="th" v-model="startDate" />
          <span>to: </span><date-picker :language="th" v-model="toDate" />
          <b-button @click="searchDepositFromDate">search</b-button>
        </b-button-group>
      </b-input-group>
    </div>

    <div class="input-group mt-4"></div>

    <div class="jumbotron mt-4 cen card-jum">
      <p class="tx-sz">
        <span>ยอดฝากวันนี้: </span>
        <strong> {{ sumToday }} บาท </strong>
      </p>
    </div>

    <table class="table table-hover cen mt-4">
      <thead>
        <tr>
          <th>เวลา</th>
          <th>วันที่</th>
          <th>ชื่อ-สกุล</th>
          <th>ธนาคาร</th>
          <th>หมายเลขบัญชี</th>
          <th>จำนวนเงิน</th>
          <th>สถานะ</th>
        </tr>
      </thead>
      <tbody v-if="content.length > 0">
        <tr v-for="(item, i) in content" :key="i">
          <td>{{ item.time }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.first_name }} {{ item.last_name }}</td>
          <td>{{ item.bank }}</td>
          <td>{{ item.bank_number }}</td>
          <td>เติมเงิน {{ item.deposit }} บาท</td>
          <td v-if="item.status == 0">
            <p class="alert-warning">รอดำเนินการ</p>
          </td>
          <td v-else>
            <p class="alert-success">เติมเงินสำเร็จ</p>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="4">
            <!-- <p class="font1 mt-2">{{ message }}</p> -->
            -ยังไม่มีข้อมูลการทำรายการฝาก-
          </td>
        </tr>
      </tbody>
    </table>

    <div><strong>ยอดฝากโดยรวม:</strong> {{ sum }} บาท</div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import RobotService from "../services/robot.service";
import moment from "moment";
import DatePicker from "vuejs-datepicker";
import { en, es, th } from "vuejs-datepicker/dist/locale";
import User from "../models/user";

export default {
  name: "adminScbDeposit",
  components: {
    DatePicker,
  },
  data: () => {
    return {
      th: th,
      content: [],
      message: "",
      sum: "",
      sumToday: "",
      toDay: new Date(),
      startDate: new Date(),
      toDate: new Date(),
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    sumDeposit(arr) {
      let sum = arr.reduce((a, b) => {
        return a + b;
      }, 0);
      return sum;
    },

    startGetDepositFromScb() {
      RobotService.getDepositFromScb()
        .then((res) => {
          this.message = res.data.message;
          console.log(this.message);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getDepositToday() {
      const toDayString = moment(this.toDay).format("YYYY-MM-DD");
      UserService.getAdminScbDepositToDay(toDayString)
        .then((res) => {
          const data = res.data.datas;
          this.content = data;

          const arr = [];
          data.forEach((element) => {
            const credit = Number(element.deposit);
            arr.push(credit);
          });
          const sum = this.sumDeposit(arr);
          this.sumToday = sum;
          console.log(sum);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getTransectionsFromScb() {
      UserService.getAdminScbDeposit()
        .then((res) => {
          this.content = res.data.datas;
          const arr = [];
          this.content.forEach((element) => {
            const credit = Number(element.deposit);
            arr.push(credit);
          });
          const sum = this.sumDeposit(arr);
          this.sum = sum;
          //   console.log(sum);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    searchDepositFromDate() {
      const startDateString = moment(this.startDate).format("YYYY-MM-DD");
      const toDateString = moment(this.toDate).format("YYYY-MM-DD");

      let startDate = startDateString;
      let toDate = toDateString;
      console.log({ startDate: startDate, todate: toDate });

      UserService.getAdminScbDepositBetweenDate(startDate, toDate)
        .then((res) => {
          this.content = res.data.datas;
          console.log(this.content);
          const arr = [];
          this.content.forEach((element) => {
            const credit = Number(element.deposit);
            arr.push(credit);
          });
          const sum = this.sumDeposit(arr);
          this.sum = sum;
          //   console.log(sum);
        })
        .catch((err) => {
          console.log(err);
        });

      // this.startDate = new Date;
      // this.toDate = new Date
    },
  },

  mounted() {
    this.getDepositToday();
    this.getTransectionsFromScb();
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.cen {
  text-align: center;
}

.card-jum {
  padding: 35px 20px 25px;
}

.tx-sz {
  font-size: 20px;
}
</style>