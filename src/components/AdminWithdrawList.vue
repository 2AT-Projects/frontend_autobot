<template>
  <div>
    <header class="jumbotron">
      <h3>รายการถอนเงิน</h3>
    </header>

    <div class="mt-3">
      <div v-if="message" class="alert alert-success" role="success">
        {{ message }}
      </div>
    </div>

    <table class="table table-dark table-hover cen mt-4">
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
      <tbody v-if="content.length > 0">
        <tr v-for="(item, i) in content" :key="i">
          <td>{{ item.id }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.first_name }} {{ item.last_name }}</td>
          <td>{{ item.bank }}</td>
          <td>{{ item.bank_number }}</td>
          <td>เติมเงิน {{ item.credit }} บาท</td>
          <td v-if="item.status == 0">
            <p class="alert-warning">รอโอน</p>
          </td>
          <td v-else>โอนแล้ว</td>
          <td>
            <b-button
              type="submit"
              @click="
                confirmModal(
                  item.id,
                  item.first_name,
                  item.last_name,
                  item.bank,
                  item.bank_number,
                  item.credit
                )
              "
              variant="warning"
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
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="4">-ยังไม่มีข้อมูลการทำรายการฝาก-</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserService from "../services/user.service";
export default {
  name: "adminWithdrawList",
  data() {
    return {
      content: [],
      message: "",
      loading: false,
    };
  },
  methods: {
    getWithdraw() {
      UserService.getAdminWithdraw()
        .then((res) => {
          this.content = res.data.result;
          // this.message = res.data.message;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    refreshList() {
      this.getWithdraw();
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
            okVariant: "primary",
            okTitle: "ใช่",
            cancelTitle: "ยังเลย",
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
            this.refreshList();
            this.message = res.data.message;
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
  },
  mounted() {
    this.getWithdraw();
  },
};
</script>

<style scoped>
.cen {
  text-align: center;
}
</style>