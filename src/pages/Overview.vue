<template>
  <div class="content">
    <div class="container-fluid">
			<span>User: {{username}}</span>
      <div class="row">
        <div class="col-md-6" style="margin-top:40px;">
            <card>
              <template slot="header">
                <h4 class="card-title text-center">CONFIG YAML</h4>
              </template>

              <template>
                <div class="col-12">
                  <base-input type="text"
                            label="Repository Name"
                            :disabled="false"
                            placeholder="worsica-processing"
                            v-model="repo.name">
                  </base-input>
                  <base-input type="text"
                            label="Repository URL"
                            :disabled="false"
                            placeholder="https://github.com/WORSICA/worsica-processing.git"
                            v-model="repo.url">
                    </base-input>
                </div>
                <div class="row" style="padding-left:20px;">
                  <span class="custom-label">Customize workspace:</span>
                  <span class="custom-label">Yes</span><base-checkbox name="workpace" v-model="config.workspace.yes"></base-checkbox>
                  <span class="custom-label">No</span><base-checkbox name="workspace" v-model="config.workspace.no"></base-checkbox>
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
                  <div>
                    <button type="button" class="btn-simple btn btn-xs btn-info" @click="addRepo()"><i class="fa fa-plus"></i>ADD REPOSITORY</button>
                  </div>
                </div>

                <div v-show="showRepo" style="padding-top:20px;">
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


                <div class="row" style="padding-left:20px;">
                  <span class="custom-label">Add Credentials:</span>
                  <span class="custom-label">Yes</span><base-checkbox name="credentials" v-model="config.credentials.yes"></base-checkbox>
                  <span class="custom-label">No</span><base-checkbox name="credentials" v-model="config.credentials.no"></base-checkbox>
                </div>
                <div v-show='config.credentials.yes' style="padding-left:30px;">

                  <base-input type="text"
                        label="ID"
                        :disabled="false"
                        placeholder="userpass"
                        v-model="credentials.id">
                  </base-input>

                  <div class="row">

                    <base-input class="col-md-4" type="text"
                        label="Username Var"
                        :disabled="false"
                        placeholder="GIT_USER"
                        v-model="credentials.username">
                    </base-input>
                    <base-input class="col-md-4" type="text"
                        label="Password Var"
                        :disabled="false"
                        placeholder="GIT_PASSWORD"
                        v-model="credentials.password">
                    </base-input>
                  </div>
                  <div>
                    <button type="button" class="btn-simple btn btn-xs btn-info" @click="addCred()"><i class="fa fa-plus"></i>ADD Credentials</button>
                  </div>
                </div>
                <div v-show="showCred" style="padding-top:20px;">
                  <span class="custom-label">Credentials Var</span>
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between"
                      v-for="(cred,key) in config.all_credentials"
                      :key="key"
                    >
                    {{key}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeCred(key)"><i class="fa fa-minus"></i></button></span>

                    </li>

                  </ul>
                </div>
                <div class="row" style="padding-left:20px;">
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
                        label="Username Var"
                        :disabled="false"
                        placeholder="GIT_USER"
                        v-model="env.value">
                  </base-input>


                  <div>
                    <button type="button" class="btn-simple btn btn-xs btn-info" @click="addEnv()"><i class="fa fa-plus"></i>ADD Env Vars</button>
                  </div>
                </div>
                <div v-show="showEnv" style="padding-top:20px;">
                  <span class="custom-label">Env Vars</span>
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between"
                      v-for="(cred,key) in config.all_envs.environment"
                      :key="key"
                    >
                    {{key}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeEnv(key)"><i class="fa fa-minus"></i></button></span>

                    </li>

                  </ul>
                </div>

              </template>
            </card>
          </div>
          <div class="col-md-6" style="margin-top:40px;">
            <card>
              <template slot="header">
                <h4 class="card-title text-center">DOCKER COMPOSE YAML</h4>
              </template>

              <template>
                <div class="" style="justify-content: center;margin-top:60px;">
                  <div style="padding:20px 80px;display:grid;">
                    <img style="height:150px;" src="../../public/img/full-assessment.jpg" alt="">
                    <button class="btn btn-primary btn-simple" @click="gotoFull()">Full Assessment</button>
                  </div>
                  <div style="padding:20px 80px;display:grid;">
                    <img style="height:150px;" src="../../public/img/customized-assessment.png" alt="">
                    <button class="btn btn-primary btn-simple" @click="gotoCustomized()">Customized Assessment</button>
                  </div>
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
  export default {
    components: {
      Card
    },
    data () {
      return {
        username:'',

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
          username:'',
          password:'',
        },
        env:{
          key:'',
          value:''
        },
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



      }
    },
    watch:{
      'config.workspace.yes'(val){
        console.log(val)
        if(val==true){
          this.config.workspace.no = false;
        }else{
          this.config.workspace.no = true;
        }
      },
      'config.workspace.no'(val){
        console.log(val)
         if(val==true){
          this.config.workspace.yes = false;
          this.showRepo = false;
          this.config.all_repos[this.repo.name]={
            'repo':this.repo.url,
            'branch':'master'
          }
        }else{
          this.config.workspace.yes = true;
        }
      },
      'config.credentials.yes'(val){
        console.log(val)
        if(val==true){
          this.config.credentials.no = false;
        }else{
          this.config.credentials.no = true;
        }
      },
      'config.credentials.no'(val){
        console.log(val)
         if(val==true){
          this.config.credentials.yes = false;
          this.showCred = false;
          this.config.all_credentials={};
        }else{
          this.config.credentials.yes = true;
        }
      },
      'config.env.yes'(val){
        console.log(val)
        if(val==true){
          this.config.env.no = false;
        }else{
          this.config.env.no = true;
        }
      },
      'config.env.no'(val){
        console.log(val)
         if(val==true){
          this.config.env.yes = false;
          this.showEnv = false;
          this.config.all_envs["environment"]={};
        }else{
          this.config.env.yes = true;
        }
      },

    },
    methods:{
      addRepo(){
        this.config.all_repos[this.repo.name]={
          'repo':this.repo.url,
          'branch':this.repo.branch
        }
        this.showRepo = true;
        var yamlText= YAML.stringify(this.config.all_repos)
        console.log(yamlText)
        this.cleanWorkspace()

      },
      removeRepo(item){
        this.$delete(this.config.all_repos,item)
        if (this.isEmpty(this.config.all_repos)) {
          this.showRepo = false;
        }
      },
      cleanWorkspace(){
        this.repo.name = '';
        this.repo.path = '',
        this.repo.url = '';
        this.repo.branch = '';
      },
      addCred(){
        this.config.all_credentials[this.credentials.id]={
          'username_var':this.credentials.username,
          'password_var':this.credentials.password
        };
        this.showCred = true;
        this.cleanCred()

      },
      removeCred(item){
        this.$delete(this.config.all_credentials,item)
        if (this.isEmpty(this.config.all_credentials)) {
          this.showCred = false;
        }
      },
      cleanCred(){
        this.credentials.id = '';
        this.credentials.username = '',
        this.credentials.password = '';
      },
      addEnv(){
        var envVars= [];
        var key= this.env.key.replace(" ", "")
				var value = this.env.value.replace(" ", "")
        envVars[key]=value
        console.log(envVars)
        this.config.all_envs['environment']={
          key:value
        };
        console.log(this.config.all_envs)
        this.showEnv = true;
        this.cleanCred()

      },
      removeEnv(item){
        this.$delete(this.config.all_envs.environment,item)
        if (this.isEmpty(this.config.all_envs.environment)) {
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

    },
    created(){
        var token = JSON.parse(localStorage.getItem("access_token"));
        console.log(token)
        var decode = jwtDecode(token.access_token)
        console.log(decode)
        var _this = this
        $.ajax({
			url: this.env.url_user_info,
			type: 'POST',
			contentType: 'application/json',
			headers: {
				'Authorization': 'Bearer ' + token.access_token
			},
			success: function (result) {
        // CallBack(result);

        _this.username = result
			},
			error: function (error) {

			}
        });
      }
  }
</script>
<style scoped>
.custom-label{
  padding-top:5px;
  padding-left:20px;
  color: #9A9A9A;

}

</style>
