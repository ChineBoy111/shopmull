import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
Vue.config.productionTip = false

Vue.use(toast)

FastClick.attach(document.body)

Vue.use(VueLazyload)
Vue.prototype.$bus =new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
