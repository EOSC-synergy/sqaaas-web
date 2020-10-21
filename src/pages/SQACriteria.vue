<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12" style="margin-top:40px;">
            <card >
              <template slot="header">
                <h4 class="card-title text-center" style="padding-top:2rem;">Select SQA Criteria</h4>
              </template>
              <template class="card-body">
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
                  <span v-show="showErrorCriteria" style="color:red">You must select a valid criteria</span>
                </div>
                <div v-show="showSelect" style="margin-top:3rem;margin-bottom:1rem;margin-left:20px;display:grid;">
                  <span>Select a repository</span>
                  <select class="custom-select col-md-6" id="respository" v-model='repository' >
                    <option value="default">Choose a repository...</option>
                    <option v-for="(repo,key) in $store.state.config_yaml.config.project_repos" :key="key" :value="key">{{key}}</option>
                  </select>
                  <span v-show="showErrorRepo" style="color:red">You must select a respository</span>
                </div>

                <div v-show="showSelect" style="margin-top:1rem;margin-bottom:3rem;margin-left:20px;display:grid;">
                  <span>Select a service</span>
                  <select class="custom-select col-md-6" id="service" v-model='service' >
                    <option value="default">Choose a service...</option>
                    <option v-for="(service,key) in $store.state.docker_compose.services" :key="key" :value="key">{{key}}</option>
                  </select>
                  <span v-show="showErrorService" style="color:red">You must select a service</span>
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
                    <base-input style="padding-left:40px;" type="text"
                            label="Tox file"
                            :disabled="false"
                            placeholder="/myrepo-testing/tox.ini"
                            v-model="tox.file">
                    </base-input>
                    <!-- <div style="padding-top:30px;">
                      <button type="button" class="btn-simple btn btn-xs btn-info" @click="addToxFile()"><i class="fa fa-plus"></i>ADD</button>
                    </div> -->
                    <base-input style="padding-left:40px;" type="text"
                            label="Test env"
                            :disabled="false"
                            placeholder="stylecheck"
                            v-model="tox.env">
                    </base-input>
                    <div style="padding-top:30px;">
                      <button type="button" class="btn-simple btn btn-xs btn-info" @click="addTestEnv()"><i class="fa fa-plus"></i>ADD</button>
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
                    <base-input style="padding-left:40px;" type="text"
                            label="Command"
                            :disabled="false"
                            placeholder="npm install"
                            v-model="command">
                    </base-input>
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
                  <button type="button" class="btn-fill btn btn-info" @click="addCriteria()"><i class="fa fa-plus"></i>ADD CRITERIA</button>
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
        criteria:'default',
        repository:'default',
        service:'default',
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
      notifyVue (message) {

        this.$notify(
          {
            message: message,
            icon: 'nc-icon nc-simple-remove',
            timeout:2000,
            horizontalAlign: 'center',
            verticalAlign: 'top',
            type: 'danger'
          })
      },
      addCriteria(){
        if(this.criteria == 'default' || this.repository == 'default' || this.service == "default"){
          // this.error_message = "Error: you must select a valid criteria";
          if(this.criteria == 'default'){
            this.showErrorCriteria = true;
          }else if(this.repository == 'default' || this.service == "default"){
            this.showErrorRepo = true;
            this.showErrorService = true;
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
          this.clearCommand();
          this.showCommands = false;
          this.showErrorRepo = false;
          this.showErrorService = false;
          this.showErrorCriteria = false;
          this.show_tool_tox = false;
          this.clearTox();

          var repoName = this.repository
          var service = this.service
          var repo = {}
          repo[repoName]={
                container:service,
                commands,
                tox

          }

          this.selected_criteria[this.criteria]={
            repos:''
          }
          console.log(this.selected_criteria)

          this.selected_criteria[this.criteria]["repos"]=repo


          console.log(this.selected_criteria);
          this.$store.state.config_yaml.sqa_criteria = this.selected_criteria;
          console.log(this.$store.state.config_yaml.sqa_criteria)
          this.commands=[];
          this.tox.file='';
          this.testenv=[];

        }
      },
      removeCriteria(key){
        this.$delete(this.selected_criteria,key)
        if (this.isEmpty(this.selected_criteria)) {
          this.showCriteria = false;
        }

      },
      addCommand(){
        this.commands.push(this.command);
        this.showCommands = true;
        this.command = '';
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
        this.testenv.push(this.tox.env);
        this.show_tool_tox = true;
        this.tox.env = ''

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


    },
    created(){

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

</style>
