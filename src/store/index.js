// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
 state: {
   report:{},
   count_cred:0,
   name:'',
   pipeline_id:'',
   build_url:'',
   status:'',
   pull_request_url:'',
   config_yaml:{
     config:{
       project_repos:[],
       deploy_template:'',
       credentials:[]
     },
     sqa_criteria:{},
     environment:{},
     timeout:600
   },
   docker_compose:{
     version:"3.7",
     id_cred_service:"",
     services:{

     }
   },

 },
 getters: {},
 mutations: {},
 actions: {}
});
