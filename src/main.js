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
  const AUTH_TOKEN = 'eyJraWQiOiJvaWRjIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2NmNiYjA1MWRhZDRiNmMzZGFjOGUwY2FiMWQ5YzBhNGMzODhmZDRhNTkzYTczYmEwZjhjYmY2MTU2MTI2MmRiQGVnaS5ldSIsImF6cCI6IjEwMzMzZjA4LTdlOGYtNGNjNC1iYmEwLWU2NmY0ZTU1MDVkMCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJpc3MiOiJodHRwczpcL1wvYWFpLWRldi5lZ2kuZXVcL29pZGNcLyIsImV4cCI6MTYzMTc3NjMwMywiaWF0IjoxNjMxNjg5OTAzLCJqdGkiOiIzZjM4YzY1NS01MzMwLTQwMGItYTgzZS0zMDAxNzk3YmNjMmMifQ.dN4P4Z3uqkmD5FTVTBmFbX9zRk6rH7V4-dK_hs15BrE-xN-pPb4AHqCzjifQyINJX9UE4JYMDZW4L39DcMScFp4Dd5XTe6Ti1YgTJIrFKLZXoeFftq9_5cWDd7i2AeH9PCA2qUowNipizOpRu7LjbiU3eApX52G8yPjtv0H7vJEndgyzwWwt5wKC8_DWgaFPJUc_UA9XDAEvZNRH9ADvuc6jkz9W5ax-bvYAgKUUnj_lGlpe-yFoQypFY2ecT9MfT3FxafOasg5q3_F34LFtKrQEYRMKdU1iOyFEfvGQb9NK-OBn82I6rIABcluCt5vWjmqXeeqxxvhYJx5sk6vQTA'
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
