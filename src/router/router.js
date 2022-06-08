import Vue from 'vue';
import VueRouter from 'vue-router';
import Calculator from "../components/calculator/calculatorHome.vue";
import Converter from "../components/converter/converterHome.vue";
// import Store from '../store/store.js';

// Vue Router
Vue.use(VueRouter);
export const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: 'homepage',
      component: Calculator,
    },
    {
      path: "/converter",
      name: 'page converter to currency',
      component: Converter, 
    },
  ],
});
// export default router;
