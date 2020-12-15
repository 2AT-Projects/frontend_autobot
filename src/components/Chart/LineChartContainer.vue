<template>
  <div class="container">
    <div class="text-center font">
      <strong>สรุปรายการฝาก-ถอน 7 วันที่ผ่านมา</strong>
    </div>
    <line-chart
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"
      :bind="true"
    />
    <div class="font">
      <span
        ><strong>ยอดฝาก:</strong> {{ sumdeposit + sumdepositKbank }} บาท</span
      >
      <span><strong> ยอดถอน:</strong> {{ sumwithdraw }} บาท</span>
    </div>
  </div>
</template>

<script>
import LineChart from "../Chart/LineChart.vue";
import UserService from "../../services/user.service";

const sumTransections = (arr) => {
  let sum = arr.reduce((a, b) => {
    return a + b;
  }, 0);
  return sum;
};

export default {
  name: "LineChartContainer",
  components: { LineChart },
  data: () => ({
    loaded: false,
    sumdeposit: "",
    sumdepositKbank: "",
    sumwithdraw: "",
    chartdata: {
      labels: null,
      datasets: [
        {
          label: "ฝาก (KBANK)",
          fill: false,
          borderColor: "#218839",
          borderDash: [5, 5],
          backgroundColor: "#218839",
          lineTension: 0.1,
          pointBackgroundColor: "#218839",
          pointBorderColor: "#218839",
          pointHoverBackgroundColor: "#ffc107",
          pointHoverBorderColor: "#ffc107",
          data: null,
        },
        {
          label: "ฝาก (SCB)",
          fill: false,
          borderColor: "#6f42c1",
          borderDash: [5, 5],
          backgroundColor: "#ffc107",
          lineTension: 0.1,
          pointBackgroundColor: "#6f42c1",
          pointBorderColor: "#6f42c1",
          pointHoverBackgroundColor: "#ffc107",
          pointHoverBorderColor: "#ffc107",
          data: null,
        },
        {
          label: "ถอน",
          borderColor: "rgb(228, 5, 5)",
          fill: false,
          borderDash: [5, 5],
          backgroundColor: "#007bff",
          lineTension: 0.1,
          pointBackgroundColor: "#ffc107",
          pointBorderColor: "#ffc107",
          pointHoverBackgroundColor: "#ffc107",
          pointHoverBorderColor: "#ffc107",
          data: null,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        mode: "x",
      },
    },
  }),
  methods: {
    getLebel(result) {
      let label = [];
      result.forEach((element) => {
        label.push(element.date);
      });
      return label;
    },
    getResult(result) {
      let sumValue = [];
      let deposit_data = [];
      result.forEach((element) => {
        let sumCredit = Number(element.sum);
        sumValue.push(sumCredit);
        deposit_data.push(element.sum);
      });
      return [sumValue, deposit_data];
    },
    async getScbDepositLast7day() {
      await UserService.getAdminScbDepositSevenday()
        .then(async (res) => {
          const result = res.data;
          let arr_date = this.getLebel(result);
          this.chartdata.labels = arr_date;
          let [sumValue, deposit_data] = this.getResult(result);
          this.chartdata.datasets[1].data = deposit_data;
          // dataset.data = arr_2;
          //   const sum = sumTransections(arr);
          //   this.sumdeposit = sum;
          this.loaded = true;
          this.loaded = false;
          await UserService.getAdminKbankDepositSevenDay()
            .then(async (res) => {
              const result = res.data;
              let [sumValue, deposit_data] = this.getResult(result);
              console.log(deposit_data);
              this.chartdata.datasets[0].data = deposit_data;
              //   const sum = sumTransections(...arr);
              //   this.sumdepositKbank = sum;
              this.loaded = true;
              this.loaded = false;
              await UserService.getAdminWithdrawSevenDay()
                .then((res) => {
                  const result = res.data;
                  let [sumValue, deposit_data] = this.getResult(result);
                  console.log(deposit_data);
                  this.chartdata.datasets[2].data = deposit_data;
                  //   let sum = sumTransections(arr);
                  //   this.sumwithdraw = sum;
                  //   console.log(sum);
                  //   console.log(this.chartdata);
                  this.loaded = true;
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
          // this.getDepositLast7day()

          //   console.log(this.chartdata);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getDepositLast7day() {
      await UserService.getAdminKbankDepositSevenDay()
        .then((res) => {
          const result = res.data;
          let [sumValue, deposit_data] = this.getResult(result);
          console.log(deposit_data);
          this.chartdata.datasets[0].data = deposit_data;
          //   const sum = sumTransections(...arr);
          //   this.sumdepositKbank = sum;
          this.loaded = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getWithdrawLast7Day() {
      await UserService.getAdminWithdrawSevenDay()
        .then((res) => {
          const result = res.data;
          let [sumValue, deposit_data] = this.getResult(result);
          console.log(deposit_data);
          this.chartdata.datasets[2].data = deposit_data;
          //   let sum = sumTransections(arr);
          //   this.sumwithdraw = sum;
          //   console.log(sum);
          //   console.log(this.chartdata);
          this.loaded = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async app() {
      await this.getScbDepositLast7day();
      this.loaded == false;
      await this.getWithdrawLast7Day();

      await this.getDepositLast7day();

      // this.getWithdrawLast7Day();
    },
  },

  mounted() {
    this.app();
    console.log(this.chartdata);
  },
};
</script>

<style scoped>
.font {
  color: white;
}
</style>