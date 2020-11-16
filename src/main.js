import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faPhone,
  faUserLock,
  faIdCard,
  faBullhorn,
  faEdit,
  faTrash,
  faSync,
  faCheck,
  faHourglass
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faPhone,
  faUserLock,
  faIdCard,
  faBullhorn,
  faEdit,
  faTrash,
  faSync,
  faCheck,
  faHourglass
);

Vue.config.productionTip = false;

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
