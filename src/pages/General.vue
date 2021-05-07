<template>
  <div class="content">
    <div class="container-fluid">
			<!-- <span>User: {{username}}</span> -->
      <div class="col-12 col-lg-10 mx-auto" >
        <div class="" style="margin:auto;">
            <h4 style="margin-top:0px;" class="card-title text-center">REPOS OPTIONS</h4>
            <card style="height:90vh;overflow-y: auto;">
              <template slot="header" >
                <div class="text-center" style="padding-left:20px;padding-top:20px;">
                  <p style="font-weight:700;">Code repositories are the substrate for the CI/CD pipeline work.</p>
                  <p>CI/CD pipelines are commonly located next to the code, so they can react instantly to code changes. Nonetheless, alternative approaches maintain the pipelines in individual code repositories. Here you will be able to customize your CI/CD pipeline to adequate to one or both approaches (git code repositories only).</p>
                </div>
              </template>

              <template>
                <!-- <div class="col-12"> -->
                  <!-- <div class="col-12"  style="padding-left:20px;margin-bottom:1rem;">

                    <base-input style="margin-bottom:0px;" type="text"
                              label="Repository Name"
                              :disabled="false"
                              placeholder="Identifier of the repository name. Example: worsica-processing"
                              v-model="repo.name"
                              >
                    </base-input>
                    <div class="col-12 text-right">
                      <span v-show="showErrorRepoName" style="color:red; font-size:12px;">This field is required.</span>

                    </div>
                  </div> -->

                  <div class="col-12"  style="padding-left:20px;padding-top:20px;">

                    <base-input style="margin-bottom:0px;"  type="text"
                              label="Repository URL"
                              :disabled="false"
                              placeholder="The URL you can use to clone the project."
                              v-model="repo.url"
                              >
                    </base-input>
                    <div class="col-12 text-right">
                      <span v-show="showErrorRepoUrl" style="color:red; font-size:12px;">This field is required.</span>

                    </div>

                </div>

                <div class="row" style="padding-left:20px;padding-top:10px;margin-bottom:1rem;">
                  <div style="display:contents" class="col-12 col-md-6">
                    <span class="custom-label">Pipeline react to all changes:</span>
                    <div class="custom-div-append">
                      <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="Information <a target='blank' href='https://indigo-dc.github.io/jenkins-pipeline-library/release/2.1.0/user/config_file.html#docker-registry-upload-images' title='test add link'>More info</a>">
                        <i class="fa fa-question-circle"></i>
                      </button>
                    </div>
                    <!-- <span class="custom-label">Do you want the pipeline to react to all changes?</span> -->
                    <!-- <div class="custom-div-append">
                      <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="Information <a target='blank' href='https://indigo-dc.github.io/jenkins-pipeline-library/release/2.1.0/user/config_file.html#docker-registry-upload-images' title='test add link'>More info</a>">
                        <i class="fa fa-question-circle"></i>
                      </button>
                    </div> -->
                  </div>
                  <div style="display:contents" class="col-12 col-md-6">
                    <span class="custom-label">Yes</span><base-checkbox name="workpace" v-model="config.workspace.yes"></base-checkbox>
                    <span class="custom-label">No</span><base-checkbox name="workspace" v-model="config.workspace.no"></base-checkbox>
                  </div>
                </div>
                <div v-show='config.workspace.no' style="padding-left:10px;">
                  <!-- <base-input type="text"
                        label="Node Agent"
                        :disabled="false"
                        placeholder="docker-compose"
                        v-model="config.repo.agent">
                  </base-input> -->




                    <base-input class="col-md-6" type="text"
                        label="Branch"
                        :disabled="false"
                        placeholder="master"
                        v-model="repo.branch">
                    </base-input>
                    <span v-show="showBranchError" style="color:red;font-size:12px;padding-left:20px;">This field is required</span>
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

                <div class="text-right" style="padding-right: 20px;">
                  <button type="button" class="btn-outline btn btn-info" @click="addRepo();track()"><i class="fa fa-plus"></i>ADD REPOSITORY</button>
                </div>

                <div v-show="showRepo" style="padding-top:20px;padding-left:20px;">
                  <span class="custom-label">Configured Repositories</span>
                  <div class="table-responsive">
                    <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <thead>
                            <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Repo</th>
                            <th style="text-align:center;justify-content: center;,padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">Remove</th>
                        </thead>
                        <tbody v-for="(repo, index) in $store.state.config_yaml.config.project_repos" :key="index">
                                <tr
                                    style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                                    <td
                                        style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                        <div style="text-align:left;">
                                            {{repo.repo}}
                                        </div>
                                    </td>

                                    <td
                                        style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                        <button type="button" class="btn-simple btn btn-xs btn-info" @click="removeRepo(index)"><i style="font-size:15px;color:red;" class="fa fa-trash"></i>
                                        </button>
                                    </td>

                                </tr>
                        </tbody>
                    </table>
                  </div>
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
                            <p style="margin-bottom: 0px;">ADVANCED OPTIONS</p>
                            <p>(Credencials, Env Vars)</p>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div id="accordionBodyGeneralOptions" class="collapse" role="tabpanel" aria-labelledby="accordionHeadingGeneralOptions" aria-expanded="false" data-parent="accordion_general_options">
                      <div class="card-block col-12">
                        <!-- <p>Accordion Item 1 - Body</p> -->
                        <!-- <base-input style="padding-left:20px;padding-right:20px;" type="text"
                            label="Path Deploy Template"
                            :disabled="false"
                            placeholder=".sqa/docker-compose.yml"
                            :help="true"
                            link = 'https://indigo-dc.github.io/jenkins-pipeline-library/release/2.1.0/user/config_file.html#deploy-template'
                            message = 'Path where the docker compose file is.'
                            v-model="repo.path">
                      </base-input> -->
                      <!-- <div class="custom-div-append">
                          <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="Information <a target='blank' href='https://indigo-dc.github.io/jenkins-pipeline-library/release/2.1.0/user/config_file.html#docker-registry-upload-images' title='test add link'>More info</a>">
                            <i class="fa fa-question-circle"></i>
                          </button>
                      </div> -->
                        <div class="row" style="padding-left:20px;margin-top:1rem;margin-bottom:1rem;">
                          <span class="custom-label">Add Credentials:</span>
                          <div class="custom-div-append">
                            <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="Information <a target='blank' href='https://indigo-dc.github.io/jenkins-pipeline-library/release/2.1.0/user/config_file.html#docker-registry-upload-images' title='test add link'>More info</a>">
                              <i class="fa fa-question-circle"></i>
                            </button>
                        </div>
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

                          <!-- <div class="row" style="margin-bottom:10px;">
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
                          </div> -->
                          <div style="padding-top:20px;">

                            <select  class="custom-select" id="cred" v-model='credentials.type' >
                              <!-- <option value="default">Choose a type...</option> -->
                              <option value="username_password">Username Password</option>
                              <option disabled value="certificate">Certificate</option>
                              <option disabled value="ssh_user_private-key">SSH User Private Key</option>
                            </select>
                            <span v-show="showErrorCredType" style="color:red;font-size:12px;">This field is required</span>
                            <div class="text-right" style="padding-top:15px;">
                              <button type="button" class="btn-simple btn btn-xs btn-info" @click="addCred()"><i class="fa fa-plus"></i>ADD CREDENTIALS</button>
                            </div>
                          </div>
                        </div>
                        <div v-show="showCred" style="padding-top:20px;margin-bottom:2rem;">
                          <span class="custom-label">Credentials</span>
                          <div class="table-responsive">
                            <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <thead>
                                    <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">ID</th>
                                    <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">USER</th>
                                    <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">PASS</th>
                                    <th style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">REMOVE</th>
                                </thead>
                                <!-- <tbody v-for="(repo, index) in selected_criteria" :key="index"> -->
                                <tbody v-for="(cred, index) in all_credentials" :key="index">
                                        <tr
                                            style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                                            <td
                                                style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                                <div style="text-align:left;">
                                                    {{cred.id}}
                                                </div>
                                            </td>
                                            <td
                                                style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                                <div style="text-align:center;">
                                                    {{cred.username_var}}
                                                </div>
                                            </td>
                                            <td
                                                style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                                <div style="text-align:center;">
                                                    {{cred.password_var}}
                                                </div>
                                            </td>

                                            <td
                                                style="text-align:right;justify-content:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                                <button type="button" class="btn-simple btn btn-xs btn-info" @click="removeCred(index)"><i style="font-size:15px;color:red;" class="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                </tbody>
                            </table>
                          </div>
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
                        <div style="margin-bottom:10px;width:95%;" class="text-right">
                          <button type="button" class="btn-simple btn btn-xs btn-info" @click="addEnv()"><i class="fa fa-plus"></i>ADD ENV VAR</button>
                        </div>
                      </div>
                      <div v-show="showEnv" style="padding-top:5px;margin-bottom:1rem;">
                        <span class="custom-label">Env Vars</span>
                        <div class="table-responsive">
                          <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                              <thead>
                                  <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">KEY</th>
                                  <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">VALUE</th>
                                  <th style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">REMOVE</th>
                              </thead>
                              <!-- <tbody v-for="(repo, index) in selected_criteria" :key="index"> -->
                              <tbody v-for="(env, index) in config.all_envs" :key="index">
                                      <tr
                                          style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                                          <td
                                              style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                              <div style="text-align:left;">
                                                  {{index}}
                                              </div>
                                          </td>
                                          <td
                                              style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                              <div style="text-align:center;">
                                                  {{env}}
                                              </div>
                                          </td>
                                          <td
                                              style="text-align:right;justify-content:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                              <button type="button" class="btn-simple btn btn-xs btn-info" @click="removeEnv(index)"><i style="font-size:15px;color:red;" class="fa fa-trash"></i>
                                              </button>
                                          </td>
                                      </tr>
                              </tbody>
                          </table>
                        </div>
                      </div>
                      <!-- <div style="padding-left:5px;padding-bottom:5px;margin-bottom:2rem;margin-top:2rem;">
                        <span class="custom-label" for="timeout" style="padding-right:20px;">Timeout:</span>
                        <input style="width:80px;" type="number" id="timeout" value="600" step="100" v-model="$store.state.config_yaml.timeout">
                      </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <div class="row" style="margin-top:2rem;">
                <!-- style="position:absolute;bottom:40px;" -->
                <div class="col-12 col-md-12 text-center" style="margin-bottom:2rem;" >
                    <button @click="back()" type="button" class="btn btn-next-back btn-back" >
                        BACK
                    </button>
                    <button @click="next()" type="button" class="btn btn-next btn-next-back">
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
   import Services from '../services/services'
  export default {
    components: {
      Card
    },
    mixins: [Services],
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
          type:"username_password"
        },
        env:{
          key:'',
          value:''
        },
        all_credentials:[],
        config:{
          all_repos:[],
          workspace:{
            yes:true,
            no:false
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
        showBranchError: false

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
      },
      'repo.branch'(val){
        if(val != ''){
          this.showBranchError = false;
        }
      }

    },
    methods:{
      next(){
        if(this.repo.path != ''){
          this.$store.state.config_yaml.config.deploy_template = this.repo.path.trim()
        }
         this.$router.push({name: 'composer'});
      },
      back(){
         this.$router.push({name: 'PipelineName'});
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
        // if(this.repo.branch == ''){
        //   this.repo.branch = 'master'
        // }
          console.log(this.config.workspace.yes)
        if(this.repo.url == ''){
          if(this.repo.url == ''){
            this.showErrorRepoUrl = true;
          }
        }else if(this.config.workspace.yes == false && this.repo.branch == ''){
          this.showBranchError = true;

        }else{
          // this.showErrorRepoName = false;
          this.showErrorRepoUrl = false;
          if(this.config.workspace.yes == true){
            this.repo.branch = ''
          }
          var push_repos = {

            'repo':this.repo.url.trim(),
            'branch':this.repo.branch.trim(),
            // 'deploy_template':this.repo.path.trim()

          }
          this.config.all_repos.push(push_repos)
          this.showRepo = true;
          this.config.workspace.no = true;
          this.$store.state.config_yaml.config.project_repos = this.config.all_repos

          this.disable_done = false;
          this.cleanWorkspace()

        }

      },
      removeRepo(item){
        console.log(item)
        this.$delete(this.$store.state.config_yaml.config.project_repos,item)
        // this.$store.state.config_yaml.config.project_repos = this.config.all_repos;
        this.$store.state.config_yaml.sqa_criteria={};
        if (this.isEmpty(this.$store.state.config_yaml.config.project_repos)) {
          this.showRepo = false;
          this.disable_done = true;
        }
      },
      cleanWorkspace(){
        this.repo.name = '';
        this.repo.path = '',
        this.repo.url = '';
        this.repo.branch = '';
        this.config.workspace.yes = true;
        this.config.workspace.no = false;
      },
      addCred(){
        if(this.credentials.type == "default" || this.credentials.id==""){
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
          // if(this.credentials.password_var == ""){
          //   this.showErrorCredPass = true;
          // }else{
          //   this.showErrorCredPass = false;
          // }
          // if(this.credentials.username_var==""){
          //   this.showErrorCredUser = true;
          // }else{
          //   this.showErrorCredUser = false;
          // }

        }else{
          this.showErrorCredId = false;
          this.showErrorCredPass = false;
          this.showErrorCredType = false;
          this.showErrorCredUser = false;
          this.$store.state.count_cred =  this.$store.state.count_cred + 1;
          var cred = {
            id: this.credentials.id,
            username_var: "GIT_USER_"+this.$store.state.count_cred,
            password_var: "GIT_PASS_"+this.$store.state.count_cred,
            type: this.credentials.type
          }
          this.all_credentials.push(cred)
          this.$store.state.config_yaml.config.credentials = this.all_credentials;

          this.showCred = true;
          this.cleanCred()
        }

      },
      removeCred(item){
        console.log(item)
        this.$delete(this.$store.state.config_yaml.config.credentials,item)
        // this.$store.state.config_yaml.config.credentials = this.all_credentials;
        if (this.isEmpty(this.$store.state.config_yaml.config.credentials)) {
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
      },
      checkauthCallBack(response){
        if(response.status == 401){
           this.$router.push({name:"logout"})
        }else{
          this.username = response;
        }
      }

    },
    created(){
       this.checkauthCall(this.checkauthCallBack);
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

     },
      mounted(){
        this.$nextTick(function(){
          $('#select_service').selectpicker({

          });
          this.$eventHub.$emit('steps', 1);


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
  padding-top: 0px !important;
  padding-bottom: 0.38rem !important;
  padding-left:0.75rem !important;
  padding-right:0.75rem !important;
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

@media (min-width: 992px){
    .col-lg-10 {
        -ms-flex: 0 0 83.333333%;
        -webkit-box-flex: 0;
        flex: 0 0 83.333333%;
        max-width: 100%;
  }
 }

</style>
