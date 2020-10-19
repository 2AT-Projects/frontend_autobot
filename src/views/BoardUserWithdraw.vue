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

      <div class="input-credit">
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
                  ><span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
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
          <tbody v-if="mergedList.length > 0">
            <tr v-for="(item, i) in mergedList" :key="i">
              <td>{{ item.time }}</td>
              <td>{{ item.date }}</td>
              <td>ถอนเงิน {{ item.credit }} บาท</td>
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
import moment from "moment";

export default {
  name: "Withdraw",
  data() {
    return {
      credit: "",
      message: {
        success: "",
        unsuccess: "",
      },
      content: [],
      mergedList: [],
      loading: false,
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

    async getBalance() {
      await UserService.getUserBalanceFromUserbet()
        .then((response) => {
          this.content = response.data.credit;
          console.log(this.content);
        })
        .catch((error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        });
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
        const list = response.data.datas;
        this.mergedStatus(list);
      } catch (err) {
        this.mergedList = "";
        this.mergedList = `fail.${err}`;
      }
    },
  },
  mounted() {
    this.getBalance();
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
  font-size: 25px;
}

.center {
  text-align: center;
}

.input-credit {
  width: 50%;
  margin: auto;
}
</style>
