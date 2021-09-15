import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'
import env from './env.js'
import store from "./store"

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import routes from './routes/routes'

import './registerServiceWorker'
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)

Vue.prototype.$eventHub = new Vue();

window.axios = require('axios');
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // const AUTH_TOKEN = document.getElementsByName("token")["0"].content;
  var session = JSON.parse(localStorage.getItem("session"))
  // const AUTH_TOKEN = session.user.access_token
  const AUTH_TOKEN = this.env.token

  if(AUTH_TOKEN){
      config.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`
  }
  return config;
}, function (error) {
  // Do something with request error
  console.log(error);
  this.$router.replace(this.$route.query.redirect || "/logout");
  return Promise.reject(error.response);
});

Vue.mixin({
  data: function(){
    return {
      env:env,
    }
  }
})

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})

Vue.use(VueAnalytics, {
  id: 'UA-64569892-9',
  router,
  trackEvent: true
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})
