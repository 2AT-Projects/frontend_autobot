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
            alt="" style="width:20%"
          />
          <div class="flex-grow-1" style="padding-left: 8px; text-align: right">
            <div>
              <p class="font15">{{ copy_code }}</p>
            </div>
            <div
              id="account"
              style="
                font-size: 24px;
                font-weight: bold;
                margin: -5px 0;
                letter-spacing: 3px;
              "
            >
              <font color="white">{{ content.acc_number }}</font>
            </div>
            <div class="font14 mt-2">{{ content.bank_type }}</div>
            <div class="font14">{{ content.acc_name }}</div>
            <span
              class="btn btn-primary btn-scb btn-sm justify-content-end copy-data"
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

    <footer class="mt-5 cen">
      <div>
        <h4 class="text-left">รายการฝากล่าสุด</h4>
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
          <tbody v-if="merged.length > 0">
            <tr v-for="(item, i) in merged" :key="i">
              <td>{{ item.time }}</td>
              <td>{{ item.date }}</td>
              <td>เติมเงิน {{ item.deposit }} บาท</td>
              <td>{{ item.status }}</td>
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
import UserService from '../services/user.service';

export default {
  name: 'Deposit',
  data() {
    return {
      content: '',
      merged: [],
      copy_code: null,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    copyTestingCode() {
      let testingCodeToCopy = document.querySelector('#testing-code');
      testingCodeToCopy.setAttribute('type', 'text'); // hidden
      testingCodeToCopy.select();

      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'สำเร็จ' : 'ไม่สำเร็จ';
        this.copy_code = `คัดลอกหมายเลขบัญชี${msg}`;
        // alert("Testing code was copied " + msg);
      } catch (err) {
        // alert("Oops, unable to copy");
        this.copy_code = 'Oops, unable to copy';
      }

      /* unselect the range */
      testingCodeToCopy.setAttribute('type', 'hidden');
      window.getSelection().removeAllRanges();
    },
    getDepositList() {
      UserService.getUserDepositList().then(
        (response) => {
          const list = response.data.datas;
          this.mergedStatus(list);
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
        0: 'กำลังดำเนินการ',
        1: 'ดำเนินการเสร็จสิ้น',
      };
      const status = [];
      list.forEach((element) => {
        const st = obj[element['status']];
        status.push({ status: st });
      });

      for (let i = 0; i < list.length; i++) {
        this.merged.push({
          ...list[i],
          ...status[i],
        });
      }
    },
    getBank() {
      UserService.getUserBoard().then(
        (response) => {
          this.content = response.data;
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
      this.$router.push('/login');
    }
    this.getDepositList();
    this.getBank();
  },
};
</script>

<style scoped>
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
  color: greenyellow;
  /* border: 1px solid greenyellow; */
  /* width: 35%; */
}
.font1 {
  text-align: center;
}
</style>
