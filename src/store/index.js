// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
 state: {
   config_yaml:{
     config:{
       project_repos:"",
       credentials:""
     },
     sqa_criteria:{},
     environment:{},
     timeout:"600"
   },
   docker_compose:{
     version:"3.6",
     services:{

     }
   },
 },
 getters: {},
 mutations: {},
 actions: {}
});
