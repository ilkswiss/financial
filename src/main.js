import Vue from 'vue'
import axios from 'axios'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import apiConfig from '../config/api.config.js'

import routes from './routes'

axios.defaults.baseURL=apiConfig.baseURL
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  mode:'history',
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('accountName');
    sessionStorage.removeItem('accountID');
  }
  let user = JSON.parse(sessionStorage.getItem('accountName'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

