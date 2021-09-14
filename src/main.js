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
  const AUTH_TOKEN = 'eyJraWQiOiJvaWRjIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2NmNiYjA1MWRhZDRiNmMzZGFjOGUwY2FiMWQ5YzBhNGMzODhmZDRhNTkzYTczYmEwZjhjYmY2MTU2MTI2MmRiQGVnaS5ldSIsImF6cCI6IjEwMzMzZjA4LTdlOGYtNGNjNC1iYmEwLWU2NmY0ZTU1MDVkMCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJpc3MiOiJodHRwczpcL1wvYWFpLWRldi5lZ2kuZXVcL29pZGNcLyIsImV4cCI6MTYzMTY1OTQxMiwiaWF0IjoxNjMxNTczMDEyLCJqdGkiOiI2NTBjODM0OC1iYjFiLTQzMWEtYWYzOC05OWUyZmM5MzRhMzMifQ.GKtArC3m4fj6WaAGNi1bq-sMGZasCgCm8drmL3cmlbd1LREMLkfEbLOBngxdKEOgREhyMu9O8COTWzR2DNRZHtAJiAvuqUyy2uSFHdglo9UqVPKJgk8-WUcfJ95z44OnF7Lq53-EIJHUIpqURo71yHorhnbUrfmcBYhm_CrUWqz-1slWae43Mb-XFOCujCd6M8CePfIP_NRYBlG-CLkYAZ7ti9spyanQ_CupCGg6TC-M_etp_H5xS4BIfsxjdI3pgkRhdePRqvsaZnJnrbaZOVwBwrO9QoZSfTqpXqMvn1I5CZr1GydLJ4gp2zkxeuLLO55O77xeZ_gpHs7poKlVqQ'
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
