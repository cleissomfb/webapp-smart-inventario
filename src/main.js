import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// Import CSS
import "./assets/css/geral.css";
import "./assets/css/login.css";
import "./assets/css/verificaEmail.css";
import "./assets/css/paginaInicial.css";
import "./assets/css/navbar.css";
import "./assets/css/inventario.css";
import "./assets/css/midia800px.css";

// Import do Bootstrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Import store
import { store } from "@/store";

// Import moment.js
import moment from "moment";
Vue.use(moment);

/* Vue Notification */
import Notifications from "vue-notification";
Vue.use(Notifications);

// Import Axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

// Import das maskaras de input
import VueMask from "v-mask";
Vue.use(VueMask);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
