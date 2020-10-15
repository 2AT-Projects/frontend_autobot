<template>
  <div class="container">
    <div class="mt-5">
      <div>
        <h4 class="text-left">เดรดิตคงเหลือ</h4>
        <hr />
      </div>
      <div v-if="content" class="jumbotron font15 grad">
        {{ content.balance }} {{ content.currency }}
      </div>
      <div v-else class="jumbotron font15 grad">0.00 ฿</div>
    </div>
    <div class="mt-5">
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

export default {
  name: "User",
  data() {
    return {
      content: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getBalance() {
      UserService.getUserBalanceFromUserbet().then(
        async (response) => {
          this.content = response.data.credit;
          // const res = await UserService.getUserDepositList();
          // console.log(res.data);
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
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.getBalance();
  },
};
</script>

<style scoped>
.font15 {
  font-size: 24px;
  text-align: center;
}
</style>