<template>
  <div class="container">
    <div class="mt-5">
      <h3 class="text-left">ถอนเงิน</h3>
      <hr />
    </div>
    <div class="center mt-5">
      <h3 v-if="content">
        <strong>เครดิตคงเหลือ: </strong>
        <span
          v-show="loading_balance"
          class="spinner-border spinner-border-md"
        ></span>
        <span class="tx" v-if="loading_balance == false && balance == undefined">
          {{ balance }}
        </span>
        <span v-else>0.00 ฿</span>
      </h3>
      <h3 v-else>
        <strong>เครดิตคงเหลือ:</strong>
      </h3>

      <span>
        <font-awesome-icon
          class="pointer"
          @click="refreshBalance"
          icon="sync"
        />
      </span>
      <span> ดึงข้อมูล เวลา {{ time }}</span>

      <div class="input-credit mt-3">
        <b-form v-on:submit.prevent="confirmModal">
          <b-form-group description="โปรดกรอกข้อมูลที่เป็นความจริงเท่านั้น">
            <b-input-group prepend="฿" is-text>
              <b-form-input
                v-model="credit"
                placeholder="ระบุจำนวนเงิน"
                required
              ></b-form-input>

              <b-input-group-append>
                <b-button type="submit" variant="warning" :disabled="loading"
                  ><b-spinner v-show="loading" small type="grow"></b-spinner>
                  <span>ยืนยัน</span>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-form>

        <div class="mt-3">
          <div
            v-if="message.success"
            class="alert alert-success"
            role="success"
          >
            {{ message.success }}
          </div>
          <div
            v-else-if="message.unsuccess"
            class="alert alert-danger"
            role="danger"
          >
            {{ message.unsuccess }}
          </div>
        </div>
      </div>
    </div>
    <footer class="mt-5">
      <div>
        <h4 class="text-left">5 รายการถอนล่าสุด</h4>
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
          <tbody v-if="content.length > 0">
            <tr v-for="(item, i) in content" :key="i">
              <td>{{ item.time }}</td>
              <td>{{ item.date }}</td>
              <td>ถอนเงิน {{ item.credit }} บาท</td>
              <td v-if="item.status == 0">
                <p class="alert-warning">กำลังดำเนินการ</p>
              </td>
              <td v-else>
                <p class="alert-success">ดำเนินการเสร็จสิ้น</p>
              </td>
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
import moment from "moment";

export default {
  name: "Withdraw",
  data() {
    return {
      time: "",
      balance: "",
      credit: "",
      message: {
        success: "",
        unsuccess: "",
      },
      content: [],
      loading: false,
      loading_balance: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    getTime() {
      const date = new Date();
      const newTime = moment(date, ["h:mm A"]).format("HH:mm");
      this.time = newTime;
    },
    confirmModal() {
      this.$bvModal
        .msgBoxConfirm(
          `ถอนเงิน ${this.credit} บาท เข้าบัญชี ${this.currentUser.bank_number} (${this.currentUser.first_name} ${this.currentUser.last_name})`,
          {
            title: "ยืนยันการถอนเงิน?",
            size: "md",
            buttonSize: "md",
            okVariant: "danger",
            okTitle: "ยืนยัน",
            cancelTitle: "ยกเลิก",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value == true) {
            this.withdraw();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async withdraw() {
      this.loading = true;
      const credentials = {
        credit: this.credit,
      };
      await UserService.postUserWithdraw(credentials)
        .then((res) => {
          this.loading = false;
          this.message.success = "";
          this.message.success = res.data.message;
          this.refreshWithdrawList();
        })
        .catch((err) => {
          this.loading = false;
          this.message.unsuccess = "";
          this.message.unsuccess =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
        });
      this.credit = "";
    },

    refreshBalance() {
      this.getBalance();
    },

    async getBalance() {
      this.loading_balance = true;
      await UserService.getUserBalanceFromUfabet()
        .then((response) => {
          this.loading_balance = false;
          this.balance = response.data.credit.balance;
          // console.log(this.content);
        })
        .catch((error) => {
          this.loading_balance = false;
          this.balance =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        });
    },

    async withdrawList() {
      await UserService.getUserWithdrawList()
        .then((res) => {
          this.content = res.data.datas;
        })
        .catch((err) => {
          this.content = err;
        });
    },

    refreshWithdrawList() {
      this.withdrawList();
    },
  },
  mounted() {
    this.getBalance();
    this.getTime();
    // setInterval(async () => {
    //   await this.getBalance();
    // }, 4000);
    this.withdrawList();
  },
};
</script>

<style scoped>
p {
  color: rgb(32, 32, 32);
  font-size: 16px;
}

.center {
  text-align: center;
}

.pointer {
  cursor: pointer;
}

.input-credit {
  width: 50%;
  margin: auto;
}
</style>
