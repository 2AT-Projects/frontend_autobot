<template>
  <div>
    <b-card-group deck>
      <b-card
        bg-variant="primary"
        text-variant="white"
        header="ยอดฝากวันนี้"
        class="text-center"
      >
        <b-card-text>{{ sumDepositToday }} บาท</b-card-text>
      </b-card>
      <b-card
        bg-variant="danger"
        text-variant="white"
        header="ยอดถอนวันนี้"
        class="text-center"
      >
        <b-card-text>{{ sumWithdrawToday }} บาท</b-card-text>
      </b-card>
      <b-card
        bg-variant="warning"
        text-variant="dark"
        header="--"
        class="text-center"
      >
        <b-card-text>---</b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>
<script>
import UserService from "../services/user.service";
import moment from "moment";
import UsersListVue from "./UsersList.vue";

export default {
  data() {
    return {
      content: [],
      sumDepositToday: "",
      sumWithdrawToday: "",
      toDay: new Date(),
    };
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
    descriptions: {
      type: String,
      default: null,
    },
  },
  methods: {
    sumDeposit(arr) {
      let sum = arr.reduce((a, b) => {
        return a + b;
      }, 0);
      return sum;
    },
    getDepositToday() {
      const toDayString = moment(this.toDay).format("YYYY-MM-DD");
      UserService.getAdminScbDepositToDay(toDayString)
        .then((res) => {
          const data = res.data.datas;
          this.content = data;

          const arr = [];
          data.forEach((element) => {
            const credit = Number(element.credit);
            arr.push(credit);
          });
          const sum = this.sumDeposit(arr);
          this.sumDepositToday = sum;
          console.log(sum);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getWithdrawToday() {
      const toDayString = moment(this.toDay).format("YYYY-MM-DD");
      UserService.getAdminWithdrawToDay(toDayString)
        .then((res) => {
          if (res) {
            const result = res.data.results;
            console.log(result);
            const arr = [];
            result.forEach((element) => {
              const credit = Number(element.credit);
              arr.push(credit);
            });
            const sum = this.sumDeposit(arr);
            this.sumWithdrawToday = sum;
            console.log(sum);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getDepositToday();
    this.getWithdrawToday();
  },
};
</script>