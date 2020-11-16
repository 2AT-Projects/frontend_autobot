<template>
  <div>
    <header class="jumbotron">
      <h3>รายการถอนเงิน</h3>
    </header>
    <div>
      <b-card
        title="ถอนเงิน"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
      >
        <b-card-text>
          <p class="tx-sz">
            <span>ยอดถอนวันนี้: </span>
            <strong> {{ sumToday }} บาท </strong>
          </p>
          <p v-if="countNotDone" class="tx-sz">
            <span class="alert-warning"
              >รอทำรายการ:
              <strong>{{ countNotDone }} </strong>
              <span>รายการ</span>
            </span>
          </p>
        </b-card-text>
      </b-card>
    </div>

    <div class="mt-3">
      <div v-if="message" class="alert alert-success" role="success">
        {{ message }}
      </div>
    </div>

    <b-button-group>
      <b-button variant="warning" @click="handleStatusChange('0')">
        <span>
          <font-awesome-icon icon="hourglass" />
        </span>
        <span> รอทำรายการ</span>
      </b-button>

      <b-button variant="success" @click="handleStatusChange('1')">
        <span> <font-awesome-icon icon="check" /> </span>
        <span> ทำรายการแล้ว</span>
      </b-button>
    </b-button-group>

    <div class="col-md-12 mt-4">
      <div class="mb-3">
        Items per Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>
    </div>

    <table class="table table-hover cen mt-4">
      <thead>
        <tr>
          <th>id</th>
          <th>เวลา</th>
          <th>วันที่</th>
          <th>ชื่อ-สกุล</th>
          <th>ธนาคาร</th>
          <th>หมายเลขบัญชี</th>
          <th>จำนวนเงิน</th>
          <th>สถานะ</th>
          <th>ยืนยันการโอน</th>
        </tr>
      </thead>
      <!-- {{content}} -->
      <tbody v-if="content.length > 0">
        <tr
          v-for="(item, i) in content"
          :key="i"
          :class="{ active: i == currentIndex }"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.users.first_name }} {{ item.users.last_name }}</td>
          <td>{{ item.users.bank }}</td>
          <td>{{ item.users.bank_number }}</td>
          <td>เติมเงิน {{ item.credit }} บาท</td>
          <td v-if="item.status == 0">
            <p class="alert-warning">รอโอน</p>
          </td>
          <td v-else>
            <p class="alert-success">โอนแล้ว</p>
          </td>
          <td v-if="item.status == 0">
            <b-button
              type="submit"
              @click="
                confirmModal(
                  item.id,
                  item.users.first_name,
                  item.users.last_name,
                  item.users.bank,
                  item.users.bank_number,
                  item.credit
                )
              "
              variant="success"
              block
              :disabled="loading"
            >
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>ยืนยัน</span>
            </b-button>
          </td>
          <td v-else>
            <b-button variant="outline-success" disabled
              ><span><font-awesome-icon icon="check" /></span
            ></b-button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="4">-ยังไม่มีข้อมูลการทำรายการฝาก-</td>
        </tr>
      </tbody>
    </table>

    <div>
      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        @change="handlePageChange"
        pills
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import moment from "moment";

function sumDeposit(arr) {
  let sum = arr.reduce((a, b) => {
    return a + b;
  }, 0);
  return sum;
}

export default {
  name: "adminWithdrawList",
  data() {
    return {
      selected: '0',
      countNotDone: "",
      content: [],
      message: "",
      sumToday: "",
      toDay: new Date(),
      loading: false,
      username: "",

      options: [
        { value: "0", text: "not done..." },
        { value: "1", text: "done..." },
      ],

      currentWithdraw: null,
      currentIndex: -1,
      page: 1,
      count: 0,
      pageSize: 10,
      pageSizes: [10, 20],
    };
  },
  methods: {
    getRequestParams(status, page, pageSize) {
      let params = {};

      if (status) {
        params["status"] = status;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    handlePageChange(value) {
      this.page = value;
      // this.getWithdraw();
      this.getWithdrawByStatus();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      // this.getWithdraw();
      this.getWithdrawByStatus();
    },

    handleStatusChange(status) {
      this.selected = status;
      this.page = 1;
      console.log(status);

      this.getWithdrawByStatus();
    },

    getWithdrawToday() {
      const toDayString = moment(this.toDay).format("YYYY-MM-DD");
      UserService.getAdminWithdrawToDay(toDayString)
        .then((res) => {
          if (res) {
            const result = res.data.results;
            const arr = [];
            result.forEach((element) => {
              const credit = Number(element.credit);
              arr.push(credit);
            });
            const sum = sumDeposit(arr);
            this.sumToday = sum;
            console.log(sum);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getWithdraw() {
      const params = this.getRequestParams(
        this.username,
        this.page,
        this.pageSize
      );
      console.log(params);
      UserService.getAdminWithdraw(params)
        .then((res) => {
          console.log(res.data);
          const { withdraws, totalItems } = res.data;
          this.content = withdraws;
          this.count = totalItems;
          console.log(this.count);
          if (this.selected == 0) {
            this.countNotDone = this.count;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getWithdrawByStatus() {
      const param = this.getRequestParams(
        this.selected,
        this.page,
        this.pageSize
      );
      console.log(param);
      UserService.getAdminWithdrawByStatus(param)
        .then((res) => {
          const { withdraws, totalItems } = res.data;
          this.content = withdraws;
          this.count = totalItems;
          if (this.selected == 0) {
            this.countNotDone = this.count;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    refreshList() {
      this.getWithdrawByStatus();
      this.currentWithdraw = null;
      this.currentIndex = -1;
    },

    confirmModal(id, fname, lname, bank, bank_number, credit) {
      this.$bvModal
        .msgBoxConfirm(
          `ท่านได้ทำการโอนเงินจำนวน ${credit} บาท เข้าบัญชี (${fname} ${lname}
          ) ธนาคาร: ${bank} หมายเลขบัญชี: ${bank_number}
           แล้วใช่หรือไม่ ?`,
          {
            title: "ยืนยันการถอนเงิน?",
            size: "md",
            buttonSize: "md",
            okVariant: "danger",
            okTitle: "Yes",
            cancelTitle: "No",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value == true) {
            this.updateTransection(id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateTransection(id) {
      this.loading = true;
      const ob = {
        id: id,
      };
      UserService.updateStatus(ob)
        .then((res) => {
          if (res) {
            this.loading = false;
            this.message = res.data.message;
            this.refreshList();
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
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
    this.getWithdrawByStatus();
    this.getWithdrawToday();
  },
};
</script>

<style scoped>
.cen {
  text-align: center;
}
</style>