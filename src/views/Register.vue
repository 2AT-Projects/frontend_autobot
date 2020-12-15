<template>
  <div class="col-md-12 mt-3">
    <div>
      <h2 class="cen">สมัครสมาชิก UFAVIP789</h2>
      <hr />
    </div>

    <div class="card-container">
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-row">
            <div class="col-md-6 mb-2">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroupPrepend2">
                    <font-awesome-icon icon="user" />
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.first_name"
                  name="first_name"
                  placeholder="ชื่อ"
                  required
                />
                <div
                  v-if="submitted && errors.has('first_name')"
                  class="alert-danger"
                >
                  {{ errors.first("first_name") }}
                </div>
              </div>
            </div>

            <div class="col-md-6 mb-2">
              <input
                type="text"
                v-model="user.last_name"
                class="form-control"
                name="last_name"
                placeholder="นามสกุล"
                required
              />
              <div
                v-if="submitted && errors.has('last_name')"
                class="alert-danger"
              >
                {{ errors.first("last_name") }}
              </div>
            </div>
          </div>

          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupPrepend2"
                ><font-awesome-icon icon="phone"
              /></span>
            </div>
            <input
              type="text"
              class="form-control"
              v-model="user.username"
              v-validate="'required|max:10'"
              name="username"
              placeholder="เบอร์มือถือ"
              required
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >
              {{ errors.first("username") }}
            </div>
          </div>

          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupPrepend2"
                ><font-awesome-icon icon="user-lock"
              /></span>
            </div>
            <input
              class="form-control"
              type="password"
              v-model="user.password"
              name="password"
              placeholder="รหัสผ่าน"
              required
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >
              {{ errors.first("password") }}
            </div>
          </div>

          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupPrepend2"
                ><font-awesome-icon icon="id-card"
              /></span>
            </div>
            <select class="form-control" v-model="user.bank" required>
              <option disabled value="">*โปรดเลือกธนาคารของท่าน</option>
              <option value="KBANK">กสิกรไทย</option>
              <option value="SCB">ไทยพานิช</option>
            </select>
          </div>

          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupPrepend2"
                ><font-awesome-icon icon="id-card"
              /></span>
            </div>
            <input
              class="form-control"
              type="text"
              v-model="user.bank_number"
              name="bank_number"
              placeholder="หมายเลขบัญชีธนาคาร"
              required
            />
            <div
              v-if="submitted && errors.has('bank_number')"
              class="alert-danger"
            >
              {{ errors.first("bank_number") }}
            </div>
          </div>

          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupPrepend2"
                ><font-awesome-icon icon="bullhorn"
              /></span>
            </div>
            <select class="form-control" v-model="user.know_me" required>
              <option disabled value="">รู้จักเราจากไหน</option>
              <option value="เฮียอ้น">เฮียอ้น</option>
              <option value="เสี่ยต้า">เสี่ยต้า</option>
            </select>
          </div>

          <div class="form-group">
            <button class="btn btn-warning btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>ยืนยัน</span>
            </button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "Register",
  data() {
    return {
      user: new User("", "", "", "", "", "", "", "", ""),
      submitted: false,
      successful: false,
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      this.loading = true;
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$store.dispatch("auth/register", this.user).then(
            (data) => {
              this.message = data.message;
              this.successful = true;
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
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
  max-width: 490px !important;
  padding: 40px 40px;
}

.f1 {
  color: black;
}

hr {
  background-color: rgb(255, 0, 0);
  max-width: 100%;
  border: 2px solid red;
}

h2 {
  color: rgb(255, 255, 255);
  font-weight: 900;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 20px;
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