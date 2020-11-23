<template>
  <div class="container">
    <line-chart :chartdata="chartdata" :options="options" />
    {{ content }}
    <b-button-group class="col-7">
      <span>from: </span><date-picker :language="th" v-model="startDate" />
      <span>to: </span><date-picker :language="th" v-model="toDate" />
      <b-button @click="getWithdrawWithDate">search</b-button>
    </b-button-group>
  </div>
</template>

<script>
import LineChart from "../Chart/LineChart.vue";
import UserService from "../../services/user.service";
import moment from "moment";
import DatePicker from "vuejs-datepicker";
import { en, es, th } from "vuejs-datepicker/dist/locale";

export default {
  name: "LineChartContainer",
  components: { LineChart, DatePicker },
  data: () => ({
    th: th,
    content: [],
    startDate: new Date(),
    toDate: new Date(),
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#dc3545",
          data: [],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  methods: {
    getWithdrawWithDate() {
      const startDateString = moment(this.startDate).format("YYYY-MM-DD");
      const toDateString = moment(this.toDate).format("YYYY-MM-DD");

      let startDate = startDateString;
      let toDate = toDateString;
      console.log({ startDate: startDate, todate: toDate });
      UserService.getAdminWithdrawBetweenDate(startDate, toDate)
        .then((res) => {
          this.content = res.data.result;
          this.content.forEach((el) => {
            this.chartdata.labels.push(el.date);
            this.chartdata.datasets[0].data.push(el.credit);
            console.log(el.credit + el.date);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>