<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div>
        <h2 class="cen">เข้าสู่ระบบ UFAVIP789</h2>
      </div>

      <b-form @submit.prevent="handleLogin">
        <b-form-group id="text-username" label="Username:" label-for="username">
          <b-form-input
            id="text-username"
            name="username"
            required
            type="text"
            v-model="user.username"
            placeholder="Enter Username"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="text-password" label="Password:" label-for="password">
          <b-input
            id="text-password"
            name="password"
            type="password"
            v-model="user.password"
            placeholder="Enter Username"
            required
            aria-describedby="password-help-block"
          ></b-input>
        </b-form-group>

        <div class="form-group">
          <b-button type="submit" variant="warning" block :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </b-button>
        </div>


        <div class="form-group mt-3">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      console.log('test');
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/profile");
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 400px !important;
  padding: 40px 40px;
  background-color: black;
}

.cen {
  text-align: center;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 20px;
  /* padding-top: 50px; */
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>