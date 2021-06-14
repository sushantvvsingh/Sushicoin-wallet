import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue } from 'bootstrap-vue'
import { BToast } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.component('b-toast', BToast)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
