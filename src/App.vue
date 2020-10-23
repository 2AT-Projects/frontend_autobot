<template>
  <div id="app" class="background">
    <!-- <div v-if="showAdminBoard" class="sidenav">
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#clients">Clients</a>
      <a href="#contact">Contact</a>
    </div> -->
    <div class="">
      <nav v-if="currentUser" class="navbar navbar-expand navbar-dark bg-dark">
        <a href class="navbar-brand" @click.prevent>autobet</a>
        <div class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/home" class="nav-link">
              <font-awesome-icon icon="home" />หน้าแรก
            </router-link>
          </li>
          <li v-if="showAdminBoard" class="nav-item">
            <router-link to="/admin" class="nav-link">แผงควมคุม</router-link>
          </li>
          <li v-if="showAdminBoard" class="nav-item">
            <router-link to="/admin/scb-deposit" class="nav-link"
              >รายการฝาก(SCB)
            </router-link>
          </li>
          <li v-if="showAdminBoard" class="nav-item">
            <router-link to="/admin/users" class="nav-link"
              >จัดการสมาชิก (Ufabet)
            </router-link>
          </li>
          <li v-if="showAdminBoard" class="nav-item">
            <router-link to="/admin/withdraw" class="nav-link"
              >รายการถอนเงิน
            </router-link>
          </li>
          <li v-if="showModeratorBoard" class="nav-item">
            <router-link to="/mod" class="nav-link"
              >Moderator Board</router-link
            >
          </li>
          <li class="nav-item">
            <router-link v-if="showUserBoard" to="/user" class="nav-link"
              >กระเป๋าตัง</router-link
            >
          </li>
          <li class="nav-item">
            <router-link v-if="showUserBoard" to="/deposit" class="nav-link"
              >ฝาก</router-link
            >
          </li>
          <li class="nav-item">
            <router-link v-if="showUserBoard" to="/withdraw" class="nav-link"
              >ถอน</router-link
            >
          </li>
        </div>

        <div v-if="!currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/register" class="nav-link">
              <font-awesome-icon icon="user-plus" />Sign Up
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              <font-awesome-icon icon="sign-in-alt" />Login
            </router-link>
          </li>
        </div>

        <div v-if="currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">
              <font-awesome-icon icon="user" />
              {{ currentUser.username }}
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href @click.prevent="logOut">
              <font-awesome-icon icon="sign-out-alt" />LogOut
            </a>
          </li>
        </div>
      </nav>

      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showUserBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_USER");
      }

      return false;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }

      return false;
    },

    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MODERATOR");
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#app {
  font-family: Raleway;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* background-image: linear-gradient(#313131, #0a0a0a); */
  height: 100vh;
}
/* .background{
  background-color: rgba(0, 0, 0, 0.74);
} */
.sidenav {
  height: 100%;
  width: 160px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 20px;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  /* font-size: 25px; */
  color: #818181;
  display: block;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.main {
  margin-left: 150px; /* Same as the width of the sidenav */
  /* font-size: 28px; Increased text to enable scrolling */
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>
