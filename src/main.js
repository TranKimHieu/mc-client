import Vue from 'vue'
import store from "./store/store";
import router from './router/index';
import App from './App.vue'

// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
