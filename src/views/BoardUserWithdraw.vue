<template>
  <div class="container">
    <div class="mt-5">
      <h3 class="text-left">ถอนเงิน</h3>
      <hr />
    </div>
    <div class="center mt-5">
      <p v-if="content">
        <strong>เครดิตคงเหลือ:</strong> {{ content.balance }}
        {{ content.currency }}
      </p>
      <p v-else><strong>เครดิตคงเหลือ:</strong> 0.00 ฿</p>
      <form v-on:submit.prevent="withdraw">
        <input v-model="credit" placeholder="ถอน" />
        <button type="submit">ยืนยัน</button>
      </form>
    </div>
    <footer class="mt-5">
      <div>
        <h4 class="text-left">รายการถอนล่าสุด</h4>
        <hr />
      </div>
      <div class="center">
        <table class="table table-hover table-dark">
          <thead>
            <tr>
              <th>เวลา</th>
              <th>วันที่</th>
              <th>จำนวนเงิน</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody v-if="mergedList.length > 0">
            <tr v-for="(item, i) in mergedList" :key="i">
              <td>{{ item.time }}</td>
              <td>{{ item.date }}</td>
              <td>เติมเงิน {{ item.credit }} บาท</td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="4">
                <!-- <p class="font1 mt-2">{{ message }}</p> -->
                -ยังไม่มีข้อมูลการทำรายการถอน-
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </footer>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Withdraw",
  data() {
    return {
      credit: "",
      content: [],
      mergedList: [],
    };
  },
  methods: {
    async withdraw() {
      const credentials = {
        credit: this.credit,
      };
      console.log(this.credit);
      const response = await UserService.postUserWithdraw(credentials);
      console.log(response);
    },

    async getBalance() {
      await UserService.getUserBalanceFromUserbet().then(
        (response) => {
          this.content = response.data.credit;
          console.log(this.content);
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

    mergedStatus(list) {
      const obj = {
        0: "กำลังดำเนินการ",
        1: "ดำเนินการเสร็จสิ้น",
      };
      const status = [];
      list.forEach((element) => {
        const st = obj[element["status"]];
        status.push({ status: st });
      });

      for (let i = 0; i < list.length; i++) {
        this.mergedList.push({
          ...list[i],
          ...status[i],
        });
      }
    },

    async withdrawList() {
      try {
        const response = await UserService.getUserWithdrawList();
        const list = response.data;
        this.mergedStatus(list);
      } catch (err) {
        this.mergedList = "";
        this.mergedList = `fail.${err}`;
      }
    },
  },
  mounted() {
    this.getBalance();
    this.withdrawList();
  },
};
</script>

<style scoped>
p {
  color: rgb(32, 32, 32);
  font-size: 25px;
}

.center {
  text-align: center;
}
</style>
