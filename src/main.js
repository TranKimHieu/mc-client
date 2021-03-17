import Vue from 'vue'
import store from "./store/store";
import router from './router/index';
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/app.css'
import Bus from './evenBus'

Vue.use(Bus)
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
