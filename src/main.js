import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "../src/global.css";
import { store } from "./store/store.js";
import {router} from "./router/router.js";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
