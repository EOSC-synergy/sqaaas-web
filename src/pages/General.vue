<template>
  <div class="content">
    <div class="container-fluid">
			<!-- <span>User: {{username}}</span> -->
      <div style="margin-top:30px;">
        <div class="col-12 col-md-10 col-lg-8 col-xl-6" style="margin:auto;padding:0px;">
            <card style="height:75vh;overflow-y: auto;">
              <template slot="header">
                <h4 class="card-title text-center">GENERAL OPTIONS</h4>
              </template>

              <template>
                <!-- <div class="col-12"> -->
                  <div class="row"  style="padding-left:20px;margin-bottom:1rem;">

                    <base-input class="col-12" type="text"
                              label="Repository Name"
                              :disabled="false"
                              placeholder="worsica-processing"
                              v-model="repo.name"
                              >
                    </base-input>



                  <span v-show="showErrorRepoName" style="color:red; font-size:12px;">This field is required.</span>
                  </div>

                  <div class="row"  style="padding-left:20px;margin-bottom:1rem;">

                    <base-input class="col-12" type="text"
                              label="Repository URL"
                              :disabled="false"
                              placeholder="https://github.com/WORSICA/worsica-processing.git"
                              v-model="repo.url"
                              >
                    </base-input>
                    <span v-show="showErrorRepoUrl" style="color:red; font-size:12px;">This field is required.</span>

                </div>

                <div class="row" style="padding-left:20px;margin-bottom:1rem;">
                  <div style="display:contents" class="col-12 col-md-6">
                    <span class="custom-label">Customize workspace:</span>
                    <div class="custom-div-append">
                        <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="Information <a target='blank' href='https://indigo-dc.github.io/jenkins-pipeline-library/release/2.1.0/user/config_file.html#docker-registry-upload-images' title='test add link'>More info</a>">
                          <i class="fa fa-question-circle"></i>
                        </button>
                      </div>
                  </div>
                  <div style="display:contents" class="col-12 col-md-6">
                    <span class="custom-label">Yes</span><base-checkbox name="workpace" v-model="config.workspace.yes"></base-checkbox>
                    <span class="custom-label">No</span><base-checkbox name="workspace" v-model="config.workspace.no"></base-checkbox>
                  </div>
                </div>
                <div v-show='config.workspace.yes' style="padding-left:30px;">
                  <!-- <base-input type="text"
                        label="Node Agent"
                        :disabled="false"
                        placeholder="docker-compose"
                        v-model="config.repo.agent">
                  </base-input> -->
                  <base-input type="text"
                        label="Path Deploy Template"
                        :disabled="false"
                        placeholder=".sqa/docker-compose.yml"
                        v-model="repo.path">
                  </base-input>

                  <div class="row">

                    <base-input class="col-md-4" type="text"
                        label="Branch"
                        :disabled="false"
                        placeholder="master"
                        v-model="repo.branch">
                    </base-input>
                    <!-- <base-input class="col-md-4" type="text"
                        label="Image"
                        :disabled="false"
                        placeholder="worsica/worsica-processing"
                        v-model="repo.image">
                    </base-input>
                    <base-input class="col-md-4" type="text"
                        label="Tag"
                        :disabled="false"
                        placeholder="latest"
                        v-model="repo.tag">
                    </base-input> -->
                  </div>
                </div>

                <div class="text-right" style="padding-right: 20px;">
                  <button type="button" class="btn-outline btn btn-info" @click="addRepo();track()"><i class="fa fa-plus"></i>ADD REPOSITORY</button>
                </div>

                <div v-show="showRepo" style="padding-top:20px;padding-left:20px;">
                  <span class="custom-label">Repositories</span>
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between"
                      v-for="(repo,key) in config.all_repos"
                      :key="key"
                    >
                    {{key}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeRepo(key)"><i class="fa fa-minus"></i></button></span>

                    </li>

                  </ul>
                </div>

                <div class="col-12" id="accordion_general_options" role="tablist" aria-multiselectable="true" style="padding-left:20px;margin-top:2rem;padding-right:0px;">
                  <!-- Accordion Item 1 -->
                  <div class="card">
                    <div class="card-header" role="tab" id="accordionHeadingGeneralOptions">
                      <div class="mb-0 row">
                        <div class="col-12 no-padding accordion-head">
                          <a data-toggle="collapse" data-parent="#accordion_general_options" href="#accordionBodyGeneralOptions" aria-expanded="false" aria-controls="accordionBodyGeneral"
                            class="collapsed ">
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                            <p>ADVANCED OPTIONS</p>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div id="accordionBodyGeneralOptions" class="collapse" role="tabpanel" aria-labelledby="accordionHeadingGeneralOptions" aria-expanded="false" data-parent="accordion_general_options">
                      <div class="card-block col-12">
                        <!-- <p>Accordion Item 1 - Body</p> -->
                        <div class="row" style="padding-left:20px;margin-top:1rem;margin-bottom:1rem;">
                          <span class="custom-label">Add Credentials:</span>
                          <span class="custom-label">Yes</span><base-checkbox name="credentials" v-model="config.credentials.yes"></base-checkbox>
                          <span class="custom-label">No</span><base-checkbox name="credentials" v-model="config.credentials.no"></base-checkbox>
                        </div>
                        <div v-show='config.credentials.yes' style="padding-left:30px;">

                          <base-input type="text" class="no-margin"
                                label="ID"
                                :disabled="false"
                                placeholder="userpass"
                                v-model="credentials.id">
                          </base-input>
                          <span v-show="showErrorCredId" style="color:red;font-size:12px;">This field is required</span>

                          <div class="row" style="margin-bottom:10px;">
                            <div class="col-md-6" style="display:grid;">
                              <base-input  type="text" class="no-margin"
                                  label="Username Var"
                                  :disabled="false"
                                  placeholder="GIT_USER"
                                  v-model="credentials.username_var">
                              </base-input>
                              <span v-show="showErrorCredUser" style="color:red;font-size:12px;">This field is required</span>
                            </div>
                            <div class="col-md-6" style="display:grid;" >
                              <base-input  type="password" class="no-margin"
                                  label="Password Var"
                                  :disabled="false"
                                  placeholder="GIT_PASSWORD"
                                  v-model="credentials.password_var">
                              </base-input>
                              <span v-show="showErrorCredPass" style="color:red;font-size:12px;">This field is required</span>
                            </div>
                          </div>
                          <select class="custom-select" id="cred" v-model='credentials.type' >
                            <option value="default">Choose a type...</option>
                            <option value="username_password">Username Password</option>
                            <option value="certificate">Certificate</option>
                            <option value="ssh_user_private-key">SSH User Private Key</option>
                          </select>
                          <span v-show="showErrorCredType" style="color:red;font-size:12px;">This field is required</span>
                          <div class="text-right" style="padding-top:15px;">
                            <button type="button" class="btn-simple btn btn-xs btn-info" @click="addCred()"><i class="fa fa-plus"></i>ADD CREDENTIALS</button>
                          </div>
                        </div>
                        <div v-show="showCred" style="padding-top:20px;margin-bottom:2rem;padding-left:30px;">
                          <span class="custom-label">Credentials</span>
                          <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between"
                              v-for="(cred,key) in all_credentials"
                              :key="key"
                            >
                            {{cred.id}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeCred(key)"><i class="fa fa-minus"></i></button></span>

                            </li>

                          </ul>
                        </div>
                      <div class="row" style="padding-left:20px;margin-top:2rem;margin-bottom:2rem;">
                        <span class="custom-label">Environment variables:</span>
                        <span class="custom-label">Yes</span><base-checkbox name="env" v-model="config.env.yes"></base-checkbox>
                        <span class="custom-label">No</span><base-checkbox name="env" v-model="config.env.no"></base-checkbox>
                      </div>
                      <div class="row" v-show='config.env.yes' style="padding-left:30px;">

                        <base-input class="col-md-6" type="text"
                              label="Key"
                              :disabled="false"
                              placeholder="GIT_USER"
                              v-model="env.key">
                        </base-input>
                        <base-input class="col-md-6" type="text"
                              label="value"
                              :disabled="false"
                              placeholder="GIT_USER"
                              v-model="env.value">
                        </base-input>
                        <div style="margin-bottom:30px;width:95%;" class="text-right">
                          <button type="button" class="btn-simple btn btn-xs btn-info" @click="addEnv()"><i class="fa fa-plus"></i>ADD ENV VAR</button>
                        </div>
                      </div>
                      <div v-show="showEnv" style="padding-top:20px;margin-bottom:1rem;padding-left:30px;">
                        <span class="custom-label">Env Vars</span>
                        <ul class="list-group">
                          <li class="list-group-item d-flex justify-content-between"
                            v-for="(env,key) in config.all_envs"
                            :key="key"
                          >
                          {{key}}:{{env}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeEnv(key)"><i class="fa fa-minus"></i></button></span>

                          </li>

                        </ul>
                      </div>
                      <div style="padding-left:5px;padding-bottom:5px;margin-bottom:2rem;margin-top:2rem;">
                        <span class="custom-label" for="timeout" style="padding-right:20px;">Timeout:</span>
                        <input style="width:80px;" type="number" id="timeout" value="600" step="100" v-model="$store.state.config_yaml.timeout">
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <div class="row" style="margin-top:2rem; margin-bottom:2rem;padding-bottom:2rem;">
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
  export default {
    components: {
      Card
    },
    data () {
      return {
        username:'',
        oneshot: false,

        repo:{
            name:'',
            path:'',
            url:'',
            branch:'',
            image:'',
            tag:''
          },
        credentials:{
          id:'',
          username_var:'',
          password_var:'',
          type:"default"
        },
        env:{
          key:'',
          value:''
        },
        all_credentials:[],
        config:{
          all_repos:{},
          workspace:{
            yes:false,
            no:true
          },
          credentials:{
            yes:false,
            no:true
          },
          env:{
            yes:false,
            no:true
          },
          all_envs:{}
        },
        showRepo:false,
        showCred:false,
        showEnv:false,
        showVolumes:false,
        showEnvCompose:false,
        showServices:false,
        showErrorCredId:false,
        showErrorCredPass:false,
        showErrorCredUser:false,
        showErrorCredType:false,
        showErrorRepoName:false,
        showErrorRepoUrl:false,
        disable_done: true,

      }
    },
    watch:{
      'config.workspace.yes'(val){
        if(val==true){
          this.config.workspace.no = false;
        }else{
          this.config.workspace.no = true;
        }
      },
      'config.workspace.no'(val){
         if(val==true){
          this.config.workspace.yes = false;
          // this.config.all_repos[this.repo.name]={
          //   'repo':this.repo.url,
          //   'branch':'master'
          // }
        }else{
          this.config.workspace.yes = true;
        }
      },
      'config.credentials.yes'(val){
        if(val==true){
          this.config.credentials.no = false;
        }else{
          this.config.credentials.no = true;
        }
      },
      'config.credentials.no'(val){
         if(val==true){
          this.config.credentials.yes = false;
          this.credentials.id='';
          this.credentials.username_var='';
          this.credentials.password_var='';
        }else{
          this.config.credentials.yes = true;
        }
      },
      'config.env.yes'(val){
        if(val==true){
          this.config.env.no = false;
        }else{
          this.config.env.no = true;
        }
      },
      'config.env.no'(val){
         if(val==true){
          this.config.env.yes = false;
          this.config.all_envs={};
        }else{
          this.config.env.yes = true;
        }
      },
      'repo.url'(val){
        if(val != ''){
          this.showErrorRepoUrl = false;
        }
      },
      'repo.name'(val){
        if(val != ''){
          this.showErrorRepoName = false;
        }
      }

    },
    methods:{
      next(){
         this.$router.push({name: 'composer'});
      },
      back(){
         this.$router.push({name: 'SelectOption'});
      },
      track(){
        this.$ga.event('button','add','repository',0)
        console.log(this.$ga)
      },
      notifyVue (message) {

        this.$notify(
          {
            title: "Error",
            message: message,
            icon: 'nc-icon nc-app',
            timeout:2000,
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
      },
      addRepo(){
        if(this.repo.path == ''){
          this.repo.path = '.sqa/docker-compose.yml'
        }
        if(this.repo.branch == ''){
          this.repo.branch = 'master'
        }
        if(this.repo.name == '' || this.repo.url == ''){
          if(this.repo.name == ''){
            this.showErrorRepoName = true;
          }
          if(this.repo.url == ''){
            this.showErrorRepoUrl = true;
          }
        }else{
          this.showErrorRepoName = false;
          this.showErrorRepoUrl = false;
          this.config.all_repos[this.repo.name.trim()]={
            'repo':this.repo.url.trim(),
            'branch':this.repo.branch.trim(),
            'deploy_template':this.repo.path.trim()
          }
          this.showRepo = true;
          this.config.workspace.no = true;
          this.$store.state.config_yaml.config.project_repos = this.config.all_repos
          this.disable_done = false;
          this.cleanWorkspace()

        }

      },
      removeRepo(item){
        this.$delete(this.config.all_repos,item)
        this.$store.state.config_yaml.config.project_repos = this.config.all_repos;
        this.$store.state.config_yaml.sqa_criteria={};
        if (this.isEmpty(this.config.all_repos)) {
          this.showRepo = false;
          this.disable_done = true;
        }
      },
      cleanWorkspace(){
        this.repo.name = '';
        this.repo.path = '',
        this.repo.url = '';
        this.repo.branch = '';
      },
      addCred(){
        if(this.credentials.type == "default" || this.credentials.id=="" || this.credentials.username_var=="" || this.credentials.password_var == ""){
          if(this.credentials.type == "default"){
            this.showErrorCredType = true;
          }else{
            this.showErrorCredType = false;
          }
          if(this.credentials.id==""){
            this.showErrorCredId = true;
          }else{
            this.showErrorCredId = false;
          }
          if(this.credentials.password_var == ""){
            this.showErrorCredPass = true;
          }else{
            this.showErrorCredPass = false;
          }
          if(this.credentials.username_var==""){
            this.showErrorCredUser = true;
          }else{
            this.showErrorCredUser = false;
          }

        }else{
          this.showErrorCredId = false;
          this.showErrorCredPass = false;
          this.showErrorCredType = false;
          this.showErrorCredUser = false;
          var cred = {
            id: this.credentials.id,
            username_var: this.credentials.username_var,
            password_var: this.credentials.password_var,
            type: this.credentials.type
          }
          this.all_credentials.push(cred)
          this.$store.state.config_yaml.config.credentials = this.all_credentials;

          this.showCred = true;
          this.cleanCred()
        }

      },
      removeCred(item){
        this.$delete(this.all_credentials,item)
        this.$store.state.config_yaml.config.credentials = this.all_credentials;
        if (this.isEmpty(this.all_credentials)) {
          this.showCred = false;
        }
      },
      cleanCred(){
        this.credentials.id = "";
        this.credentials.username_var = "";
        this.credentials.password_var = "";
        this.credentials.type = "default";
      },
      addEnv(){
        var envVars= {};
        var key= this.env.key.replace(" ", "")
				var value = this.env.value.replace(" ", "")
        envVars[key]=value
        this.config.all_envs[key]=value
        this.$store.state.config_yaml.environment = this.config.all_envs;
        this.showEnv = true;
        this.cleanEnv()

      },
      removeEnv(item){
        this.$delete(this.config.all_envs,item)
        this.$store.state.config_yaml.environment = this.config.all_envs;
        if (this.isEmpty(this.config.all_envs)) {
          this.showEnv = false;
        }
      },
      cleanEnv(){
        this.env.key = '';
        this.env.value = '';
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

      var sizeRepos = this.objectSize(this.$store.state.config_yaml.config.project_repos)
      for (let i = 0; i < sizeRepos; i++) {
        this.config.all_repos[Object.keys(this.$store.state.config_yaml.config.project_repos)[i]]=this.$store.state.config_yaml.config.project_repos[Object.keys(this.$store.state.config_yaml.config.project_repos)[i]]
      }
      for (let i = 0; i < this.$store.state.config_yaml.config.credentials.length; i++) {
        this.all_credentials.push(this.$store.state.config_yaml.config.credentials[i])
      }

      this.config.all_envs = this.$store.state.config_yaml.environment
      if(this.isEmpty(this.config.all_repos)){
        this.showRepo = false;
        this.disable_done = true;
      }else {
        this.showRepo = true;
        this.disable_done = false;
      }
      if(this.isEmpty(this.services)){
        this.showServices = false
      }else {
        this.showServices = true
      }
       if(this.isEmpty(this.all_credentials)){
        this.showCred = false
      }else {
        this.showCred = true
      }
      if(this.isEmpty(this.config.all_envs)){
        this.showEnv = false
      }else {
        this.showEnv = true
      }

      var session = JSON.parse(localStorage.getItem("session"));
      var token = session.user.access_token;
      var decode = jwtDecode(token)
      var _this = this

      $.ajax({
        url: this.env.url_user_info,
        type: 'POST',
        contentType: 'application/json',
        headers: {
          'Authorization': 'Bearer ' + token
			},
			success: function (result) {
        // CallBack(result);

        _this.username = result
			},
			error: function (error) {

			}
        });
      },
      mounted(){
        this.$nextTick(function(){
          $('#select_service').selectpicker({

          });

        });
        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })
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

.custom-append-button {
  padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    /* line-height: 1.5; */
    color: #495057;
    /* text-align: center; */
    /* white-space: nowrap; */

    border: none;

    height: 40px;
}

.btn-info {
    border-color: #1185EB;
    color: #1185EB;
}

.btn-next {
    background-color: #1DC7EA !important;
    color: black !important;
    padding:1rem 0 1rem 0;
    font-weight: bold;
    border: 2px solid black;
  }

  .btn-next-back{
    width: 20%!important;
  }

.btn-back{
  padding:1rem 0 1rem 0;
  background-color:#ccc!important;
  margin-right:10%;
  font-weight: bold;
  border: 2px solid black;

}
.custom-div-append {
  padding:0px 0px 0px 0px;
  margin:0px;
  margin-left: -3px;
}




@media (max-width: 576px) {
  .container-fluid{
    padding-left: 0px!important;
    padding-right: 0px!important;
  }


 }

 .accordion-head i{
    font-size: 1.5em;
    float: right;
}

.accordion-head > .collapsed > i:before{
    content: "\f105";
}

</style>
