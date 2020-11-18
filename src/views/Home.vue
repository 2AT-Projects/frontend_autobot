<template>
  <div class="container">
    <br />
    <header class="fix">
      <h3 class="font-color centerhead">
        ยินดีต้อนรับเข้าสู่ระบบฝาก-ถอน Auto UFAVIP789
      </h3>
    </header>
    <div class="app-wrapper">
      <div class="app-header"></div>
      <br />
      <div class="app-footer"></div>
    </div>
    <div class="bv-example-row">
      <b-row>
        <b-col class="ss">
          <vue-displacement-slideshow
            :images="images"
            displacement="require('../assets/test.jpg')"
            intensity.number="0.2"
            speedIn.number="1.4"
            speedOut.number="1.4"
            ease="Expo.easeInOut"
            ref="slideshow"
          ></vue-displacement-slideshow>
        </b-col>
        <b-col>
          <h2 class="font-color1">
            ระบบฝาก-ถอน Auto ที่รวดเร็วที่สุดในประเทศไทย
          </h2>
          <div class="app-body" v-if="!user">
            <!-- CSS ONLY -->
            <a
              class="btn-wrapper btn-wrapper1"
              id="show-btn"
              @click="$bvModal.show('aaa')"
            >
              <div class="btn-tail"></div>
              <div class="btn-body">
                <p>
                  สมัครสมาชิก<span
                    style="font-size: 0.7rem; margin-left: 5px"
                  ></span>
                </p>
              </div>
            </a>
            <b-modal id="aaa" hide-footer>
              <div class="d-block text-center">
                <register />
              </div>
            </b-modal>
          </div>
		  <div class="app-body" v-if="user">
      <!-- CSS ONLY -->
      <a href="http://localhost:8081/deposit" class="btn-wrapper btn-wrapper1">
        <div class="btn-tail"></div>
        <div class="btn-body">
          <p>ฝาก<span style="font-size: 0.7rem; margin-left: 5px"></span></p>
        </div>
      </a>
    </div>
    <br />
    <div class="app-body" v-if="user">
      <!-- CSS ONLY -->
      <a href="http://localhost:8081/withdraw" class="btn-wrapper btn-wrapper1">
        <div class="btn-tail"></div>
        <div class="btn-body">
          <p>ถอน<span style="font-size: 0.7rem; margin-left: 5px"></span></p>
        </div>
      </a>
    </div>
    <br />
    <div class="app-body" v-if="user">
      <!-- CSS ONLY -->
      <a href="http://localhost:8081/user" class="btn-wrapper btn-wrapper1">
        <div class="btn-tail"></div>
        <div class="btn-body">
          <p>
            กระเป๋าตัง<span style="font-size: 0.7rem; margin-left: 5px"></span>
          </p>
        </div>
      </a>
    </div>
	<br>
		<div class="app-body" v-if="user">
      <!-- CSS ONLY -->
      <a href="http://localhost:8081/user" class="btn-wrapper btn-wrapper1">
        <div class="btn-tail"></div>
        <div class="btn-body">
          <p>
            เข้าเล่น UFABET<span style="font-size: 0.7rem; margin-left: 5px"></span>
          </p>
        </div>
      </a>
    </div>

        </b-col>
      </b-row>
    </div>

    <!-- <div class="app-body" v-if="user == null">
      <a href="http://localhost:8081/Login" class="btn-wrapper btn-wrapper1">
        <div class="btn-tail"></div>
        <div class="btn-body">
          <p>
            สมัครสมาชิก<span
              style="font-size: 0.7rem; margin-left: 5px"
            ></span>
          </p>
        </div>
      </a>
    </div> -->
    <br />
    
  </div>
</template>

<script>
import UserService from "../services/user.service";
import VueDisplacementSlideshow from "vue-displacement-slideshow";
import Register from "./Register";

export default {
  name: "Home",
  data() {
    return {
      content: "",
      user: "",
    };
  },
  components: {
    VueDisplacementSlideshow,
    Register,
  },
  computed: {
    images() {
      return [require("../assets/bg.jpg"), require("../assets/p1.png")];
    },
  },
  methods: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    init() {
      //We loop through all our images by calling the 'next' method of our component every 2 seconds
      setInterval(() => {
        this.$refs.slideshow.next();
      }, 2000);
    },
  },
  mounted() {
    this.init();
    this.user = this.currentUser();
    UserService.getPublicContent().then(
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
};
</script>


<style lang="scss">
.fix {
  top: 0;
  left: 0;

  /* Preserve aspet ratio */
  min-width: 100%;
  min-height: 100%;
}

.font-color {
  color: #ccccff;
}

.centerhead {
  max-width: 600px;
  margin: auto;
}
/*** CSS - APP USE ***/
.btn-wrapper:not(:first-child) {
  margin-top: 15px;
}

.btn-wrapper1 {
  display: grid;
  grid-template-columns: 20px auto;
  grid-gap: 10px;
  min-width: 250px;
  height: 35px;
  margin-left: 10px;
  transform: skewX(-30deg);

  --bg-color: #fffff0;
  --font-color: #000000;
  --bg-color-hovered: #ffafeb;
  --font-color-hovered: #000000;
}

.btn-wrapper2 {
  display: grid;
  grid-template-columns: 20px auto;
  grid-gap: 10px;
  min-width: 250px;
  height: 35px;
  margin-left: 10px;
  transform: skewX(-30deg);

  --bg-color: #fffff0;
  --font-color: #000000;
  --bg-color-hovered: #ffafeb;
  --font-color-hovered: #000000;
}

.btn-wrapper3 {
  display: grid;
  grid-template-columns: 20px auto;
  grid-gap: 10px;
  min-width: 250px;
  height: 35px;
  margin-left: 10px;
  transform: skewX(-30deg);

  --bg-color: #fffff0;
  --font-color: #000000;
  --bg-color-hovered: #ffafeb;
  --font-color-hovered: #000000;
}

.btn-wrapper > * {
  background-color: var(--bg-color);
}

.btn-wrapper:hover .btn-tail {
  background-color: var(--bg-color-hovered);
}

.btn-body {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--font-color);
}

.btn-wrapper:hover .btn-body {
  color: var(--font-color-hovered);
}

.btn-body::before {
  content: "";
  position: absolute;
  width: 0;
  height: 100%;
  left: 0;
  top: 0;
  background-color: var(--bg-color-hovered);
  transition: all 0.3s ease-out;
}

.btn-wrapper:hover .btn-body::before {
  width: 100%;
}

.btn-body p {
  margin-left: 15px;
  font-size: 1.5rem;
  text-transform: uppercase;
  transform: skewX(30deg);
}

.btn-tail {
  transition: all 0s ease-out 0.3s;
}

.btn-wrapper:hover .btn-tail {
  transition: none;
}

.app-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.ss {
  width: auto;
  height: 500px;
}

.sizecolunm {
  width: 1000px;
  height: 100%;
}
.font-color {
  color: white;
}
.font-color1 {
  color: #00cc99;
}
</style>