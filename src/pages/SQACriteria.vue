<template>
  <div class="content" style="background-color:#f8f9fa;">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12" style="margin-top:30px;">
            <card >
              <template slot="header">
                <h4 class="card-title text-center" style="padding-top:2rem;">SQA CRITERIA</h4>
              </template>
              <template class="card-body">
                <div class="col-12 col-md-6" >
                   <base-input type="text" class="no-margin"
                            label="Pipeline Name"
                            :disabled="false"
                            placeholder="worsica"
                            v-model="pipelineName">
                    </base-input>
                    <span v-show="showErrorPipeline" style="color:red; font-size:12px;">This field is required.</span>
                </div>
                <div style="margin-top:3rem;margin-bottom:1rem;margin-left:20px;display:grid;">
                  <div>

                    <select class="custom-select col-md-6" id="sqacriteria" v-model='criteria' >
                      <option value="default">Choose a criteria...</option>
                      <option value="qc_style">qc_style</option>
                      <option value="qc_coverage">qc_coverage</option>
                      <option value="qc_functional">qc_functional</option>
                      <option value="qc_security">qc_security</option>
                      <option value="qc_doc">qc_doc</option>
                    </select>
                    <a style="margin-left: 2rem;text-decoration: underline;" v-show="show_link" :href="criteria_link" target="_blank">Criteria Information</a>
                  </div>
                  <span v-show="showErrorCriteria" style="color:red; font-size:12px;">You must select a valid criteria</span>
                </div>
                <div v-show="showSelect" style="margin-top:3rem;margin-bottom:1rem;margin-left:20px;display:grid;">
                  <span>Select a repository</span>
                  <select class="custom-select col-md-6" id="respository" v-model='repository' >
                    <option value="default">Choose a repository...</option>
                    <option v-for="(repo,key) in $store.state.config_yaml.config.project_repos" :key="key" :value="key">{{key}}</option>
                  </select>
                  <span v-show="showErrorRepo" style="color:red; font-size:12px;">You must select a respository</span>
                </div>

                <div v-show="showSelect" style="margin-top:1rem;margin-bottom:3rem;margin-left:20px;display:grid;">
                  <span>Select a service</span>
                  <select class="custom-select col-md-6" id="service" v-model='service' >
                    <option value="default">Choose a service...</option>
                    <option v-for="(service,key) in $store.state.docker_compose.services" :key="key" :value="key">{{key}}</option>
                  </select>
                  <span v-show="showErrorService" style="color:red; font-size:12px;">You must select a service</span>
                </div>
              </template>
            </card>

            <div class="row">
              <div class="col-md-6">
                <card style="height:33vh;overflow-y: auto;" >
                  <template slot="header">
                    <h4 class="card-title text-center">Tox Tool</h4>
                  </template>
                  <div class="row">
                    <div class="col-12 col-md-6">

                      <base-input type="text" class="col-10 no-margin"
                              label="Tox file"
                              :disabled="false"
                              placeholder="/myrepo-testing/tox.ini"
                              v-model="tox.file">
                      </base-input>
                      <span v-show="showErrorFile" style="padding-left:40px;color:red; font-size:12px;">This field is required</span>
                    </div>
                    <div class="col-12 col-md-6" style="display:grid;">
                      <div style="display:flex;">
                        <base-input type="text" class="col-10 no-margin"
                                label="Test env"
                                :disabled="false"
                                placeholder="stylecheck"
                                v-model="tox.env">
                        </base-input>
                        <div class="col-2"  style="padding-top:30px;padding-left:0px;">
                          <button type="button" class="btn-simple btn btn-xs btn-info" @click="addTestEnv()"><i style="padding-top:3px;" class="fa fa-plus"></i>ADD</button>
                        </div>
                      </div>
                      <span v-show="showErrorEnv" style="padding-left:40px;color:red; font-size:12px;">This field is required</span>

                    </div>

                  </div>
                  <div v-show="show_tool_tox" style="padding-top:20px;margin-bottom:2rem;">
                    <span class="custom-label">Test Env</span>

                    <ul class="list-group">
                      <li style="padding-left:40px;" class="list-group-item d-flex justify-content-between"
                        v-for="(env,key) in testenv"
                        :key="key"
                      >
                      {{env}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removetestEnv(key)"><i class="fa fa-minus"></i></button></span>

                      </li>

                    </ul>
                  </div>

                  <template>
                  </template>
                </card>
              </div>
              <div class="col-md-6">
                <card style="height:33vh;overflow-y: auto;">
                  <template slot="header">
                    <h4 class="card-title text-center">Add Comands</h4>
                  </template>
                  <div class="row">
                    <div class="display:grid;">
                      <base-input style="padding-left:40px;" type="text" class="no-margin"
                              label="Command"
                              :disabled="false"
                              placeholder="npm install"
                              v-model="command">
                      </base-input>
                      <span v-show="showErrorCommand" style="padding-left:40px;color:red; font-size:12px;">This field is required</span>

                    </div>
                    <div style="padding-top:30px;">
                      <button type="button" class="btn-simple btn btn-xs btn-info" @click="addCommand()"><i class="fa fa-plus"></i>ADD</button>
                    </div>

                  </div>
                  <div v-show="showCommands" style="padding-top:20px;margin-bottom:2rem;">
                    <span class="custom-label">Commands</span>
                    <ul class="list-group">
                      <li class="list-group-item d-flex justify-content-between"
                        v-for="(command,key) in commands"
                        :key="key"
                      >
                      {{command}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeCommand(key)"><i class="fa fa-minus"></i></button></span>

                      </li>

                    </ul>
                  </div>
                  <template>
                  </template>
                </card>
              </div>
            </div>
            <card>
              <template slot="header">
                <!-- <h4 class="card-title text-center">ADD Criteria</h4> -->
              </template>
                <div class="text-right" style="padding-top:1rem;padding-bottom:10px;">
                  <button type="button" class="btn-outline btn btn-info" @click="addCriteria()"><i class="fa fa-plus"></i>ADD CRITERIA</button>
                </div>
              <template>
                <div v-show="showCriteria" style="padding-top:20px;margin-bottom:2rem;">
                    <span class="custom-label">Criterias</span>
                    <ul class="list-group">
                      <li class="list-group-item d-flex justify-content-between"
                        v-for="(val,key) in selected_criteria"
                        :key="key"
                      >
                      {{key}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeCriteria(key)"><i class="fa fa-minus"></i></button></span>

                      </li>

                    </ul>

                  </div>
              </template>
              <div class="row" style="margin-top:2rem; margin-bottom:2rem;">
                <div class="col-12 col-md-12 text-center">
                    <button @click="back()" type="button" class="btn btn-next-back btn-back" >
                        BACK
                    </button>
                    <button @click="next()" type="button" :disabled="disable_done"  class="btn btn-next btn-next-back">
                        NEXT
                    </button>
                </div>
              </div>
            </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import jwtDecode from "jwt-decode"
  import YAML from 'json-to-pretty-yaml'
  import Mustache from 'mustache';
  export default {
    components: {
      Card
    },
    data () {
      return {
        pipelineName:'',
        criteria:'default',
        repository:'default',
        service:'default',
        repos:{"repos":{}},
        command:'',
        commands:[],
        tox:{
          file:'',
          env:''
        },
        showCommands:false,
        testenv:[],
        show_tool_tox:false,
        error_message:'',
        show_link:false,
        criteria_link:'',
        showCriteria:false,
        selected_criteria:{},
        showSelect:false,
        showErrorRepo:false,
        showErrorService:false,
        showErrorCriteria:false,
        showErrorCommand: false,
        showErrorFile: false,
        showErrorEnv:false,
        showErrorPipeline:false,
        disable_done: true,

      }
    },
    watch:{
        'criteria'(val){
          if(val != "default"){
            this.show_link = true;
            this.showSelect = true;
            this.showErrorCriteria = false;
            if(val == "qc_style"){
              this.criteria_link = ""
            }else if(val == "qc_coverage"){
              this.criteria_link=""
            }else if(val == "qc_functional"){
              this.criteria_link = ""
            }else if(val == "qc_security"){
              this.criteria_link = ""
            }else if(val == "qc_doc"){
              this.criteria_link == ""
            }
          }else{
            this.show_link = false;
            this.showSelect = false;
            this.showErrorCriteria = true;
          }
        },
        'repository'(val){
          if(val != "default"){
            this.showErrorRepo = false;
          }

        },
        'service'(val){
          if(val != "default"){
            this.showErrorService = false;
          }

        }
    },
    methods:{
       next(){
         this.$router.push({name: 'Files'});
      },
      back(){
         this.$router.push({name: 'composer'});
      },
      notifyVue (message) {

        this.$notify(
          {
            title: "Error",
            message: message,
            icon: 'nc-icon nc-app',
            timeout:3000,
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
      },
      addCriteria(){
        if(this.criteria == 'default' || this.repository == 'default' || this.service == "default" || this.pipelineName==''){
          // this.error_message = "Error: you must select a valid criteria";
          if(this.criteria == 'default'){
            this.showErrorCriteria = true;
          }else if(this.repository == 'default' || this.service == "default"){
            this.showErrorRepo = true;
            this.showErrorService = true;
          }
          if(this.pipelineName == ''){
             this.showErrorPipeline = true;
          }else{
            this.showErrorPipeline = false;
          }
          // this.notifyVue(this.error_message)
        }else{
          var commands = {}
          var tox = {}
          commands=this.commands
          tox={
            tox_file:this.tox.file,
            testenv: this.testenv
          }
          this.showCriteria = true;
          this.disable_done = false;
          this.clearCommand();
          this.showCommands = false;
          this.showErrorRepo = false;
          this.showErrorService = false;
          this.showErrorCriteria = false;
          this.show_tool_tox = false;
          this.clearTox();
          var sizeCriteria = this.objectSize(this.$store.state.config_yaml.sqa_criteria)
          if(sizeCriteria > 0){
            var sizeSelectCriteria = this.objectSize(this.$store.state.config_yaml.sqa_criteria[this.criteria])
             if(sizeSelectCriteria > 0){
               this.repos["repos"] = this.$store.state.config_yaml.sqa_criteria[this.criteria]["repos"]
             }

          }else{
            this.repos["repos"]={};
          }
          // this.repos.repos[this.repository] = this.$store.state.config_yaml.sqa_criteria[this.criteria];

          var repoName = this.repository
          var service = this.service
          var repo = {}
          repo={
                container:service,
                commands,
                tox
          }

          this.repos.repos[this.repository]=repo
          this.selected_criteria[this.criteria]=this.repos
          this.$store.state.config_yaml.sqa_criteria = this.selected_criteria;
          this.$store.state.name = this.pipelineName;
          this.commands=[];
          this.tox.file='';
          this.testenv=[];

        }
      },
      removeCriteria(key){
        this.$delete(this.selected_criteria,key)
        this.$store.state.config_yaml.sqa_criteria = this.selected_criteria;
        if (this.isEmpty(this.selected_criteria)) {
          this.showCriteria = false;
          this.disable_done = true;
        }

      },
      addCommand(){
        if(this.command == ''){
          this.showErrorCommand = true;
        }else{
          this.showErrorCommand = false;
          this.commands.push(this.command);
          this.showCommands = true;
          this.command = '';
        }
      },
      removeCommand(key){
        this.$delete(this.commands,key)
        if (this.isEmpty(this.commands)) {
          this.showCommands = false;
        }

      },
      clearCommand(){
        this.command = '';
      },
      clearTox(){
        this.tox.file = '';
        this.testenv = [];
      },
      addTestEnv(){
        if(this.tox.env == '' || this.tox.file == ''){
          if(this.tox.env == '' ){
            this.showErrorEnv = true
          }
          if(this.tox.file == '' ){
            this.showErrorFile = true
          }
        }else{
          this.showErrorEnv = false
          this.showErrorTest = false
          this.testenv.push(this.tox.env);
          this.show_tool_tox = true;
          this.tox.env = ''
        }

      },
      removetestEnv(key){
        this.$delete(this.testenv,key)
        if (this.isEmpty(this.testenv) || this.tox.file == '') {
          this.show_tool_tox = false;
        }

      },
      isEmpty(obj) {
        for(var key in obj) {
          if(obj.hasOwnProperty(key))
            return false;
        }
        return true;
      },
      objectSize(obj){
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      }


    },
    created(){
        this.pipelineName = this.$store.state.name
        var sizeRepos = this.objectSize(this.$store.state.config_yaml.config.project_repos);
        var sizeServices = this.objectSize(this.$store.state.docker_compose.services)
        if(sizeRepos == 0 || sizeServices == 0){
          this.notifyVue("Error you must add at least one service")
          this.$router.push({name:"composer"})
        }else if(this.$store.state.docker_compose.push_services.length > 0 && this.$store.state.docker_compose.id_cred_service == ""){
          this.notifyVue("Error you must enter the ID of the credential in Jenkins.")
          this.$router.push({name:"composer"})

        }else{
          var sizeCriteria = this.objectSize(this.$store.state.config_yaml.sqa_criteria);
          var getCriteria = this.$store.state.config_yaml.sqa_criteria
          for (var i in getCriteria){
            this.selected_criteria[i] = getCriteria[i];
          }
          if(sizeCriteria != 0){
            this.showCriteria = true;
            this.disable_done = false;
          }else{
            this.showCriteria = false;
            this.disable_done = true;
          }
        }

      }
  }
</script>
<style scoped>
.custom-label{
  padding-top:5px;
  padding-left:20px;
  color: #9A9A9A;

}
input[type=number]::-webkit-inner-spin-button {
  opacity: 1;
}

.no-margin{
  margin:0px!important;
}

.btn-next {
    background-color: #1DC7EA !important;
    color: black !important;
    padding:1rem 0 1rem 0;
    font-weight: bold;
    border: 2px solid black;
  }

  .btn-next-back{
    width: 10%!important;
  }

.btn-back{
  padding:1rem 0 1rem 0;
  background-color:#ccc!important;
  margin-right:10%;
  font-weight: bold;
  border: 2px solid black;

}

.btn-info {
    border-color: #1185EB;
    color: #1185EB;
}

</style>
