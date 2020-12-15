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
        <b-col cols="9">
          <b-carousel
            id="carousel-fade"
            style="text-shadow: 0px 0px 2px #000"
            fade
            indicators
            img-width="1024"
            img-height="430"
          >
            <b-carousel-slide
              v-for="(image, i) in img"
              v-bind:key="i"
              v-bind:img-src="image"
            >
            </b-carousel-slide>
          </b-carousel>
        </b-col>
        <b-col cols="3">
          <!-- <h2 class="font-color1">
            ระบบฝาก-ถอน Auto ที่รวดเร็วที่สุดในประเทศไทย
          </h2> -->
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
            <a
              href="http://localhost:8081/deposit"
              class="btn-wrapper btn-wrapper1"
            >
              <div class="btn-tail"></div>
              <div class="btn-body">
                <p>
                  ฝาก<span style="font-size: 0.7rem; margin-left: 5px"></span>
                </p>
              </div>
            </a>
          </div>
          <br />
          <div class="app-body" v-if="user">
            <!-- CSS ONLY -->
            <a
              href="http://localhost:8081/withdraw"
              class="btn-wrapper btn-wrapper1"
            >
              <div class="btn-tail"></div>
              <div class="btn-body">
                <p>
                  ถอน<span style="font-size: 0.7rem; margin-left: 5px"></span>
                </p>
              </div>
            </a>
          </div>
          <br />
          <div class="app-body" v-if="user">
            <!-- CSS ONLY -->
            <a
              href="http://localhost:8081/user"
              class="btn-wrapper btn-wrapper1"
            >
              <div class="btn-tail"></div>
              <div class="btn-body">
                <p>
                  กระเป๋าตัง<span
                    style="font-size: 0.7rem; margin-left: 5px"
                  ></span>
                </p>
              </div>
            </a>
          </div>
          <br />
          <div class="app-body" v-if="user">
            <!-- CSS ONLY -->
            <a
              href="http://localhost:8081/user"
              class="btn-wrapper btn-wrapper1"
            >
              <div class="btn-tail"></div>
              <div class="btn-body">
                <p>
                  เข้าเล่น UFABET<span
                    style="font-size: 0.7rem; margin-left: 5px"
                  ></span>
                </p>
              </div>
            </a>
          </div>
        </b-col>
      </b-row>
    </div>
    <div class="mt-4">
      <b-container>
        <b-row>
          <b-col v-for="(item, inx) in card_detail" v-bind:key="inx">
            <b-card
              v-bind:title="item.title"
              v-bind:img-src="item.img"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem"
              class="mb-2"
            >
              <b-card-text>
                {{ item.description }}
              </b-card-text>

              <router-link v-if="user" to="/user" class="font-color"
                ><b-button variant="danger">test</b-button></router-link
              >
              <router-link v-else to="/register">
                <b-button variant="danger">test</b-button></router-link
              >
            </b-card>
          </b-col>
        </b-row>
      </b-container>
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
    <div class="mt-9">
      <b-row>
        <b-col> <p>test</p> </b-col>
        <b-col> <img :src="card_detail[0].img" style="width: 100%" /> </b-col>
      </b-row>
    </div>
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
      img: [
        require("../assets/slider1.png"),
        require("../assets/slider1.png"),
        require("../assets/slider1.png"),
      ],
      card_detail: [
        {
          title: "card 1",
          img: require("../assets/slider1.png"),
          description: "test1",
        },
        {
          title: "card 2",
          img: require("../assets/slider1.png"),
          description: "test2",
        },
        {
          title: "card 3",
          img: require("../assets/slider1.png"),
          description: "test3",
        },
      ],
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
  },
  mounted() {
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
  --bg-color-hovered: #fd0000;
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
  --bg-color-hovered: #a10008;
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
  --bg-color-hovered: #a10008;
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

.bv-example-row {
  justify-content: center;
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