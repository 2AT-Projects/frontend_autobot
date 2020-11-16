<template>
  <div class="container">
    <header class="jumbotron">
      <h3>จัดการสมาชิก (Ufabet)</h3>
    </header>
    <div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by User Ufabetname"
          v-model="user_ufabet"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>

      <div class="mt-3">
        <b-button-group>
          <b-button variant="warning" @click="getUserFromUfabet"
            >get user data</b-button
          >
          <b-button variant="danger" @click="stopTimer">stop get data</b-button>
        </b-button-group>
      </div>

      <div class="mt-3">
        <div v-if="message" class="alert alert-success" role="success">
          {{ message }}
        </div>
      </div>

      <div class="mt-3">
        Items per Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>
    </div>

    <div class="mt-3">
      <h4>รายชื่อสมาชิก</h4>
      <table class="table table-hover">
        <thead class="">
          <tr>
            <th>id</th>
            <th>ชื่อ-สกุล</th>
            <th>username_ufa</th>
            <th>username</th>
            <th>ธนาคาร</th>
            <th>หมายเลขบัญชี</th>
            <th>knowme</th>
            <th>roles</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody v-if="users.length > 0">
          <tr
            v-for="(item, i) in users"
            :key="i"
            @click="setActiveUser(item, i)"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.first_name }} {{ item.last_name }}</td>
            <td>{{ item.user_ufabet }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.bank }}</td>
            <td>{{ item.bank_number }}</td>
            <td>{{ item.know_me }}</td>
            <td v-for="(role, index) in item.roles" :key="index">
              {{ role.name }}
            </td>
            <td>
              <a class="pointer" @click="editUser(item.id)"
                ><font-awesome-icon class="bg-edit" icon="edit"
              /></a>
            </td>
            <td>
              <a class="pointer" @click="deleteUser(item.id)"
                ><font-awesome-icon class="bg-remove" icon="trash"
              /></a>
            </td>
          </tr>
        </tbody>
        <tbody class="cen" v-else>
          <tr>
            <td colspan="8">
              <!-- <p class="font1 mt-2">{{ message }}</p> -->
              -ยังไม่มีข้อมูล-
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(user, index) in users"
          :key="index"
          @click="setActiveUser(user, index)"
        >
          {{ user.user_ufabet }} {{ user.bank }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllUsers">
        Remove All
      </button> -->
    </div>
    <div class="col-md-12">
      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        @change="handlePageChange"
        pills
      ></b-pagination>
    </div>
    <div class="">
      <div v-if="currentUser">
        <h4>user</h4>
        <div>
          <label><strong>id:</strong></label> {{ currentUser.id }}
        </div>
        <div>
          <label><strong>User Ufabet:</strong></label>
          {{ currentUser.user_ufabet }}
        </div>
        <!-- <div>
          <label><strong>Status:</strong></label>
          {{ currentUser.published ? 'Published' : 'Pending' }}
        </div> -->

        <a class="badge badge-warning" :href="'/admin/users/' + currentUser.id">
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a user...</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/admin.service";
import RobotService from "../services/robot.service";

export default {
  name: "UserList",
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      user_ufabet: "",
      message: "",

      page: 1,
      count: 0,
      pageSize: 5,

      pageSizes: [5, 10, 30],
    };
  },
  methods: {
    getRequestParams(username, page, pageSize) {
      let params = {};

      if (username) {
        params["user_ufabet"] = username;
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
      this.retrieveUser();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveUser();
    },

    getUserFromUfabet() {
      RobotService.getUserDataFromUfabetAgent()
        .then((res) => {
          this.message = res.data.message;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    stopTimer() {
      RobotService.stopTimerAgent()
        .then((res) => {
          this.message = res.data.message;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    retrieveUser() {
      const params = this.getRequestParams(
        this.user_ufabet,
        this.page,
        this.pageSize
      );
      UserDataService.getAll(params)
        .then((response) => {
          const { users, totalItems } = response.data;
          this.users = users;
          this.count = totalItems;
          console.log(totalItems);
          console.log(this.users);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveUser();
      this.currentUser = null;
      this.currentIndex = -1;
    },

    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
    },

    editUser(id) {
      this.$router.push({ name: "admin-user-details", params: { id: id } });
    },

    deleteUser(id) {
      UserDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    removeAllUsers() {
      UserDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      UserDataService.findByUserUfabetName(this.user_ufabet)
        .then((response) => {
          const { users } = response.data;
          this.users = users;
          console.log(users);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveUser();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

.bg-remove {
  color: rgb(248, 95, 24);
}

.bg-edit {
  color: rgb(132, 90, 247);
}

.pointer {
  cursor: pointer;
}

.cen {
  text-align: center;
}
</style>

