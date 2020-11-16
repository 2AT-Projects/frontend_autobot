<template>
  <div class="container">
    <div class="mt-5">
      <div>
        <h3 class="text-left">บัญชีฝากเงิน</h3>
        <hr />
      </div>
      <div class="jumbotron" style="background: #4e2e7f">
        <div
          class="scb-box d-flex flex-row align-items-center justify-content-start"
        >
          <img
            src="https://www.jobthaiweb.com/company/picture/matawin1983_logo.gif"
            class="img-icon rounded-circle"
            alt=""
            style="width: 20%"
          />

          <div class="flex-grow-1" style="padding-left: 8px; text-align: right">
            <div v-if="copy_code">
              <span class="font15 alert-success copycode">{{ copy_code }}</span>
            </div>
            <div
              id="account"
              style="
                font-size: 24px;
                font-weight: bold;
                margin-top: 10px;
                letter-spacing: 3px;
              "
            >
              <font color="white">{{ bank_detail.acc_number }}</font>
            </div>
            <div class="font14 mt-2">{{ bank_detail.bank_type }}</div>
            <div class="font14">{{ bank_detail.acc_name }}</div>
            <span
              class="btn btn-success btn-scb btn-sm justify-content-end copy-data"
              @click="copyTestingCode()"
              >คัดลอกเลขบัญชี</span
            >

            <input
              type="hidden"
              id="testing-code"
              :value="content.acc_number"
            />
          </div>
        </div>
      </div>
    </div>

    <div>
      <h6 class="text-left">*โปรดใช้บัญชีของท่านโอนมาเท่านั้น</h6>
    </div>
    <div id="rcorners1">
      <p>
        <strong>ชื่อบัญชี: </strong>{{ currentUser.first_name }}
        {{ currentUser.last_name }} | <strong>ธนาคาร: </strong
        >{{ currentUser.bank }} | <strong>หมายเลขบัญชี: </strong
        >{{ currentUser.bank_number }}
      </p>
    </div>

    <div>
      <b-form v-on:submit.prevent="deposit">
        <b-form-group>
          <b-form-input
            v-model="time"
            placeholder="time"
            type="time"
          ></b-form-input>
          <b-form-input v-model="credit" placeholder="credit"></b-form-input>
          <b-form-file v-model="file" @change="onFileChange"></b-form-file>
          <div id="preview">
            <div class="text-center">
              <b-spinner
                v-show="loading"
                variant="warning"
                label="Text Centered"
              ></b-spinner>
            </div>
            <img v-if="url" :src="url" />
            {{ this.url }}
          </div>
          <b-button type="submit">ยืนยัน</b-button>
        </b-form-group>
      </b-form>
    </div>

    <footer class="mt-5 cen">
      <div>
        <h4 class="text-left">5 รายการฝากล่าสุด</h4>
        <hr />
      </div>
      <div>
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
              <td>เติมเงิน {{ item.deposit }} บาท</td>
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
                -ยังไม่มีข้อมูลการทำรายการฝาก-
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
  name: "Deposit",
  data() {
    return {
      content: [],
      copy_code: null,
      bank_detail: [],
      infoDeposit: {},
      credit: "",
      time: "",
      file: null,
      url: null,
      loading: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    async onFileChange(e) {
      this.loading = true;
      try {
        setTimeout(() => {
          this.loading = false;
          const file = e.target.files[0];
          this.url = URL.createObjectURL(file);
        }, 500);
      } catch (err) {
        console.log(err);
      }
    },
    copyTestingCode() {
      let testingCodeToCopy = document.querySelector("#testing-code");
      testingCodeToCopy.setAttribute("type", "text"); // hidden
      testingCodeToCopy.select();

      try {
        const successful = document.execCommand("copy");
        const msg = successful ? "สำเร็จ" : "ไม่สำเร็จ";
        this.copy_code = `คัดลอกหมายเลขบัญชี${msg}`;
        // alert("Testing code was copied " + msg);
      } catch (err) {
        // alert("Oops, unable to copy");
        this.copy_code = "Oops, unable to copy";
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    },

    getDepositList() {
      UserService.getUserDepositList().then(
        (response) => {
          this.content = response.data.datas;
          // this.mergedStatus(list);
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

    getBank() {
      UserService.getUserBoard().then(
        (response) => {
          this.bank_detail = response.data;
        },
        (error) => {
          this.bank_detail =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },

    deposit() {
      const toDay = new Date();
      const newDate = moment(toDay).format("DD/MM/YYYY");
      
      this.infoDeposit = {
        time: this.time,
        date: newDate,
        credit: this.credit,
        imgUrl: this.url,
        userDetail: {
          fist_name: this.currentUser.first_name,
          last_name: this.currentUser.last_name,
          bank_type: this.currentUser.bank,
          bank_number: this.currentUser.bank_number,
        },
      };
      console.log(this.infoDeposit);
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.getDepositList();
    this.getBank();
  },
};
</script>

<style scoped>
.copycode {
  padding: 7px;
  border-radius: 5px;
}

#rcorners1 {
  border-radius: 5px;
  background: #1a1a1ae3;
  text-align: center;
  padding: 8px 2px -5px;
  width: 100%;
  color: rgb(255, 76, 22);
}
.cen {
  text-align: center;
}
.font14 {
  font-size: 16px;
  color: white;
}
.font15 {
  color: rgb(31, 31, 31);
  /* border: 1px solid greenyellow; */
  /* width: 35%; */
}
.font1 {
  text-align: center;
}
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>
