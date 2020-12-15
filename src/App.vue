<template>
  <div id="app" class="background">
    <b-navbar toggleable="lg" type="dark" class="navcolor">
      <b-navbar-brand href="#">AUTO789</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />หน้าแรก
          </router-link>
        </b-navbar-nav>
        <b-navbar-nav v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">แผงควมคุม</router-link>
        </b-navbar-nav>
        <b-navbar-nav v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin/scb-deposit" class="nav-link"
            >รายการฝาก(SCB)
          </router-link>
        </b-navbar-nav>
        <b-navbar-nav v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin/users" class="nav-link"
            >จัดการสมาชิก (Ufabet)
          </router-link>
        </b-navbar-nav>
        <b-navbar-nav v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin/withdraw" class="nav-link"
            >รายการถอนเงิน
          </router-link>
        </b-navbar-nav>
        <b-navbar-nav v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </b-navbar-nav>
        <b-navbar-nav>
          <router-link to="/promotion" class="nav-link">โปรโมชั่น</router-link>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <div v-if="!currentUser" class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link">
                <b-button
                  id="show-btn"
                  @click="$bvModal.show('bv-modal-example')"
                >
                  <font-awesome-icon icon="sign-in-alt" /> เข้าสู่ระบบ</b-button
                >
                <b-modal id="bv-modal-example" hide-footer>
                  <div class="d-block text-center">
                    <login />
                  </div>
                </b-modal>
              </a>
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
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <footer>
      <div v-if="!currentUser" class="myBlock myCn">
        <!-- <div class="row">
          <div class="col-md-4">
            <router-link to="/register" class="color2">
              <span> <font-awesome-icon icon="user-plus" /></span>
              <div>สมัครสมาชิก</div>
            </router-link>
          </div>
          <div class="col-4">
            <div class="rcorners4">
              <router-link to="/" class="color1">
                <div><font-awesome-icon icon="home" /></div>
                <div>หน้าแรก</div>
              </router-link>
            </div>
          </div>
          <div class="col-md-4">
            <router-link to="/login" class="color2">
              <span><font-awesome-icon icon="sign-in-alt" /></span>
              <div>เข้าสู่ระบบ</div>
            </router-link>
          </div>
        </div> -->
        <b-row>
          <b-col
            ><router-link to="/register" class="color2">
              <div> <font-awesome-icon icon="user-plus" /></div>
              <div>สมัครสมาชิก</div>
            </router-link></b-col
          >
          <b-col>
            <div class="rcorners4">
              <router-link to="/" class="color1">
                <div><font-awesome-icon icon="home" /></div>
                <div>หน้าแรก</div>
              </router-link>
            </div></b-col
          >
          <b-col>
            <router-link to="/login" class="color2">
              <span><font-awesome-icon icon="sign-in-alt" /></span>
              <div>เข้าสู่ระบบ</div>
            </router-link></b-col
          >
        </b-row>
      </div>

      <div v-if="showUserBoard" class="myBlock myCn">
        <div class="row">
          <div class="col-2">
            <router-link to="/deposit" class="color2">
              <font-awesome-icon icon="university" />
              <div>ฝาก</div>
            </router-link>
          </div>
          <div class="col-2">
            <router-link to="/withdraw" class="color2">
              <font-awesome-icon icon="university" />
              <div>ถอน</div>
            </router-link>
          </div>
          <div class="col-4">
            <div class="rcorners4">
              <router-link to="/user" class="color1">
                <div><font-awesome-icon icon="wallet" /></div>
                <div>กระเป๋า</div>
              </router-link>
            </div>
          </div>
          <div class="col-2">
            <router-link to="/profile" class="color2">
              <span><font-awesome-icon icon="dice" /></span>
              <span>let's</span>
            </router-link>
          </div>
          <div class="col-2">
            <router-link to="/register" class="color2">
              <font-awesome-icon icon="list-alt" />
              <div>ประวัติ</div>
            </router-link>
          </div>
        </div>
      </div>
    </footer>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Login from "../src/views/Login";

export default {
  data() {
    return {
      modalShow: false,
    };
  },

  components: {
    Login,
  },

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
  font-family: myFirstFont;
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

.navcolor {
  border-top: 1px solid rgb(250, 8, 0);
  border-bottom: 1px solid rgb(250, 29, 0);
  background-image: linear-gradient(
    to bottom,
    #000000,
    #121212fd,
    #1b1b1bfd,
    #232323,
    #2b2b2bee
  );
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

@media screen and (max-height: 768px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}

@font-face {
  font-family: myFirstFont;
  src: url("../font/Cloud-Light.ttf");
}

/* .myBlock {
  display: none;
} */
.myCn {
 
 
  /* center flex items horizontally */
  align-items:initial;
  /* center all content vertically */
  justify-content: center;
}

/* @media only screen and (max-width: 767px) { */
.myBlock {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 40;
  width: 100%;
  display: block;
  padding: 15px;
  border-top: 2px solid rgb(250, 8, 0);
  background-image: linear-gradient(
    to bottom,
    #080808,
    #1f1f1f,
    #242424,
    #222222,
    #303030
  );
  /* its children will be flex items */
  display: flex;
  
  /* border-top-right-radius: 25px;
    border-top-left-radius: 25px; */
}

.myBlock div div {
  color: white;
  text-align: center;
}

.color1 {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.color2 {
  color: white;
  font-size: 15px;
  /* font-weight: 600; */
}

.rcorners3 {
  border: 2px solid rgba(255, 24, 8, 0.904);
  border-radius: 50%;
  background: #313131;
  padding: 20px;
  width: 100px;
  height: 100px;
  margin-top: -70px;
  margin-bottom: -50px;
}

.rcorners4 {
  border: 2px solid rgba(255, 8, 8, 0.904);
  border-radius: 50%;
  background: #202020;
  padding: 20px;
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-bottom: -20px;
}
/* } */

body {
  /* background-image: linear-gradient(
    to top,
    #000000,
    #0c0909,
    #141210,
    #191815,
    #1c1e1a
  ); */
  background: url("assets/bg-2.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
