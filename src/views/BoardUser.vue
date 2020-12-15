<template>
  <div class="container">
    <div class="mt-4">
      <h5 class="tx text-left">บัญชีของฉัน</h5>
      <!-- <div class="tx text-left">{{ currentUser.user_ufabet }}</div> -->
      <span class="tx text-left">{{ currentUser.bank_number }}</span>
      <hr />
    </div>
    <div class="mt-3">
      <!-- <div class="text-left">
        <h4 class="tx">เดรดิตคงเหลือ</h4>
        <hr />
      </div> -->

      <div class="circletop mt-4">
        <span class="font15 tx">ยอดเงินที่ใช้ได้</span>
        <!-- <h2 class="tx">{{ balance }}</h2> -->
        <span
          v-show="loading_balance"
          class="spinner-border spinner-border-md"
        ></span>
        <h2 class="tx" v-if="loading_balance == false">{{ balance }} ฿</h2>
        <h2 class="tx" v-else>0.00 ฿</h2>
        <div class="icon tx">
          <font-awesome-icon
            class="pointer"
            @click="refreshBalance"
            icon="sync"
          />
          <span class="tx"> {{ time }}</span>
        </div>
      </div>
      <!-- 
      <div class="elem mt-4">
        <span class="icon tx">
          <font-awesome-icon
            class="pointer"
            @click="refreshBalance"
            icon="sync"
          />
        </span>
        <span class="tx"> ดึงข้อมูล เวลา {{ time }}</span>
      </div> -->

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
      <div class="font15">
        <b-row class="row">
          <b-col class="col-4">
            <router-link to="/deposit" class="color2">
              <div class="circle-icon">
                <img src="../assets/deposit.png" />
              </div>
            </router-link>
            <div class="mt-2">
              <p>ฝากเงิน</p>
            </div>
          </b-col>
          <b-col class="col-4">
            <router-link to="/withdraw" class="color2">
              <div class="circle-icon">
                <img src="../assets/withdraw.png" />
              </div>
            </router-link>
            <div class="mt-2">
              <p>ถอนเงิน</p>
            </div>
          </b-col>
          <b-col class="col-4">
            <router-link to="/deposit" class="color2">
              <div class="set-img"></div>
            </router-link>
            <div class="mt-2">
              <p>เมนูเกมส์</p>
            </div>
          </b-col>
        </b-row>
        <!-- <form
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
        </form> -->
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
          this.balance = response.data.balance;
          console.log(response.data);
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
  align-items: center;
  justify-content: space-around;
  display: flex;
}

p {
  color: white;
  font-size: 18px;
  font-weight: normal;
}

img {
  max-width: 80%;
  max-height: 100%;
}

.tx {
  text-align: center;
  color: white;
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

@keyframes rainbow {
  from,
  to {
    box-shadow: 0 0 15px 0 red;
  }
  16% {
    box-shadow: 0 0 15px 0 yellow;
  }
  32% {
    box-shadow: 0 0 15px 0 green;
  }
  48% {
    box-shadow: 0 0 15px 0 aqua;
  }
  64% {
    box-shadow: 0 0 15px 0 blue;
  }
  80% {
    box-shadow: 0 0 15px 0 fuchsia;
  }
}

hr {
  background-color: rgb(255, 0, 0);
  max-width: 40%;
  border: 2px solid red;
}

.set-img {
  background: url("../assets/ufabet.png") no-repeat;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  border: 2px solid rgba(230, 230, 230, 0.904);
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.circle-icon {
  border: 2px solid rgba(230, 230, 230, 0.904);
  border-radius: 50%;
  background: #202020;
  padding: 1em;
  line-height: 50px;
  width: 90px;
  height: 90px;
  text-align: center;

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

.circletop {
  /* circle styles */
  /* position: relative; */

  width: 230px;
  height: 230px;
  font-family: Raleway;
  border: 1px solid rgba(216, 216, 216, 0.897);
  border-radius: 50%;
  margin: 0 auto;
  /* box-shadow: 0 0 20px rgb(235, 58, 4)inset; */
  animation: rainbow 3s infinite;
  background-image: linear-gradient(
    to bottom,
    #1f1f1f,
    #222222,
    #252525,
    #282828,
    #2b2b2b
  );
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