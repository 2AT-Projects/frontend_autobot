<template>
  <div v-if="currentUser" class="edit-form container">
    <header class="jumbotron">
      <h3>แก้ไขข้อมูลสมาชิก ({{ currentUser.user_ufabet }})</h3>
    </header>
    <h4>User</h4>
    <form>
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input
          type="text"
          class="form-control"
          id="first_name"
          v-model="currentUser.first_name"
        />
      </div>
      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="last_name"
          v-model="currentUser.last_name"
        />
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="currentUser.username"
        />
      </div>
      <div class="form-group">
        <label for="bank">Bank</label>
        <input
          type="text"
          class="form-control"
          id="bank"
          v-model="currentUser.bank"
        />
      </div>
      <div class="form-group">
        <label for="bank_number">Bank Number</label>
        <input
          type="text"
          class="form-control"
          id="bank_number"
          v-model="currentUser.bank_number"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2" @click="deleteUser">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateUser">
      Update
    </button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import UserDataService from '../services/admin.service';

export default {
  name: 'admin-user-details',
  data() {
    return {
      currentUser: null,
      message: '',
    };
  },
  methods: {
    getUser(id) {
      UserDataService.get(id)
        .then((response) => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateUser() {
      UserDataService.update(this.currentUser.id, this.currentUser)
        .then((response) => {
          console.log(response);
          this.message = 'The User was updated successfully!';
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteUser() {
      UserDataService.delete(this.currentUser.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: 'admin-userboard' });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = '';
    this.getUser(this.$route.params.id);
  },
};
</script>

<style scoped>
</style>