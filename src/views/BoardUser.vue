<template>
  <div class="container">
    <div class="mt-5">
      <div>
        <h4 class="text-left">เดรดิตคงเหลือ</h4>
        <hr />
      </div>

      <div class="circletop">
        <span class="font15">ยอดเงินที่ใช้ได้</span>
        <!-- <h2 class="tx">{{ balance }}</h2> -->
        <span
          v-show="loading_balance"
          class="spinner-border spinner-border-md"
        ></span>
        <h2 class="tx" v-if="loading_balance == false && balance">
          {{ balance }}
        </h2>
        <h2 v-else>0.00 ฿</h2>
      </div>

      <div class="elem mt-4">
        <span class="icon">
          <font-awesome-icon
            class="pointer"
            @click="refreshBalance"
            icon="sync"
          />
        </span>
        <span> ดึงข้อมูล เวลา {{ time }}</span>
      </div>

      <!-- <div v-if="balance" class="jumbotron font15 grad elem mt-5">
        <div class="icon">
          <font-awesome-icon
            class="pointer"
            @click="refreshBalance"
            icon="sync"
          />
        </div>
        <span> {{ balance }} ฿ </span>
      </div>
      <div v-else class="jumbotron font15 grad">0.00 ฿</div> -->
    </div>
    <div class="mt-4">
      <div>
        <h4 class="text-left">เข้าเล่นเกมส์</h4>
        <hr />
      </div>
      <div class="font15">
        <form
          method="post"
          action="https://www.ufabet.com/Default8.aspx?lang=EN-GB"
          target="_blank"
        >
          <input
            type="hidden"
            name="__EVENTTARGET"
            id="__EVENTTARGET"
            value="btnLogin"
          />
          <div>
            <input
              style="display: none"
              v-model="currentUser.user_ufabet"
              name="txtUserName"
              type="text"
              id="txtUserName"
              class="UsernameCss"
              maxlength="16"
              placeholder="ชื่อผู้ใช้"
              required="required"
              aria-required="true"
            />

            <input
              style="display: none"
              v-model="currentUser.password_ufabet"
              type="password"
              name="password"
              id="password"
              class="UsernameCss"
              maxlength="16"
              placeholder="รหัสผ่าน"
              required="required"
              aria-required="true"
            />

            <button type="submit" class="btn btn-warning">
              Login Ufabet..
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import moment from "moment";

export default {
  name: "User",
  data() {
    return {
      content: "",
      time: new Date(),
      balance: "",
      currentIndex: -1,
      loading_balance: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    refreshBalance() {
      this.getBalance();
      this.getTime();
      this.currentIndex = -1;
    },
    getBalance() {
      this.loading_balance = true;
      UserService.getUserBalanceFromUfabet()
        .then(async (response) => {
          this.loading_balance = false;
          this.balance = response.data.credit.balance;
        })
        .catch((err) => {
          this.loading_balance = false;
          this.balance =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        });
    },
    getTime() {
      const date = new Date();
      const newTime = moment(date, ["h:mm A"]).format("HH:mm");
      this.time = newTime;
    },
  },
  mounted() {
    this.getTime();
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.getBalance();
  },
};
</script>

<style scoped>
.font15 {
  font-size: 15px;
  text-align: center;
}
.tx {
  text-align: center;
}
.pointer {
  cursor: pointer;
}

.elem {
  text-align: center;
}

.icon {
  text-align: center;
}

.circletop {
  /* circle styles */
  /* position: relative; */
  width: 300px;
  height: 300px;
  font-family: Raleway;
  border: 1px solid rgba(223, 223, 223, 0.897);
  border-radius: 50%;
  margin: 0 auto;
  box-shadow: 0 0 20px rgb(99, 99, 99);

  /* become a flex container */
  /* its children will be flex items */
  display: flex;
  /* place items in column */
  flex-direction: column;
  /* center flex items horizontally */
  align-items: center;
  /* center all content vertically */
  justify-content: center;
}
</style>