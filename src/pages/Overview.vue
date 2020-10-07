<template>
  <div class="content">
    <div class="container-fluid">
			<!-- <span>User: {{username}}</span> -->
      <div class="row">
        <div class="col-md-6" style="margin-top:40px;">
            <card style="height:75vh;overflow-y: auto;">
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

                <div class="row" style="padding-left:20px;margin-bottom:1rem;">
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
                </div>

                <div class="text-right">
                  <button type="button" class="btn-fill btn btn-info" @click="addRepo()"><i class="fa fa-plus"></i>ADD REPOSITORY</button>
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


                <div class="row" style="padding-left:20px;margin-top:1rem;margin-bottom:1rem;">
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
                        v-model="credentials.username_var">
                    </base-input>
                    <base-input class="col-md-4" type="password"
                        label="Password Var"
                        :disabled="false"
                        placeholder="GIT_PASSWORD"
                        v-model="credentials.password_var">
                    </base-input>
                  </div>
                  <div class="text-right">
                    <button type="button" class="btn-simple btn btn-xs btn-info" @click="addCred()"><i class="fa fa-plus"></i>ADD Credentials</button>
                  </div>
                </div>
                <div v-show="showCred" style="padding-top:20px;margin-bottom:2rem;">
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
                    <button type="button" class="btn-simple btn btn-xs btn-info" @click="addEnv()"><i class="fa fa-plus"></i>ADD Env Vars</button>
                  </div>
                </div>
                <div v-show="showEnv" style="padding-top:20px;margin-bottom:1rem;">
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

              </template>
            </card>
        </div>
        <div class="col-md-6" style="margin-top:40px;">
          <card style="height:75vh;overflow-y: auto;">
            <template slot="header">
              <h4 class="card-title text-center">DOCKER COMPOSE YAML</h4>
            </template>

            <template>
              <base-input style="padding-left:20px;" type="text"
                        label="Docker Image"
                        :disabled="false"
                        placeholder="worsica/worsica-backend:worsica-processing-dev_latest"
                        v-model="service.image">
              </base-input>
              <base-input style="padding-left:20px;" type="text"
                        label="Container Name"
                        :disabled="false"
                        placeholder="processing"
                        v-model="service.container_name">
              </base-input>
              <base-input style="padding-left:20px;" type="text"
                        label="Hostname"
                        :disabled="false"
                        placeholder="processing"
                        v-model="service.hostname">
              </base-input>
              <div class="row" style="padding-left:20px;">
                <base-input class="col-md-4" type="text"
                        label="Volume type"
                        :disabled="false"
                        placeholder="bind"
                        v-model="volume.type">
                </base-input>
                <base-input class="col-md-4" type="text"
                        label="Volume Source"
                        :disabled="false"
                        placeholder="worsica_web_products"
                        v-model="volume.source">
                </base-input>
                <base-input class="col-md-4" type="text"
                        label="Volume target"
                        :disabled="false"
                        placeholder="/usr/local/worsica_web_products"
                        v-model="volume.target">
                </base-input>

              </div>
              <div class="text-right">
                <button type="button" class="btn-simple btn btn-xs btn-info" @click="addVolume()"><i class="fa fa-plus"></i>ADD VOLUME</button>
              </div>
              <div v-show="showVolumes" style="padding-top:20px;">
                <span class="custom-label">Volume</span>
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between"
                    v-for="(vol,key) in volumes"
                    :key="key"
                  >
                  {{key}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeVolume(vol,key)"><i class="fa fa-minus"></i></button></span>

                  </li>

                </ul>
              </div>
              <div class="row" style="padding-left:20px;margin-bottom:1rem;margin-top:2rem;">
                <span class="custom-label">Environment variables:</span>
                <span class="custom-label">Yes</span><base-checkbox name="env" v-model="envComposeYesNo.yes"></base-checkbox>
                <span class="custom-label">No</span><base-checkbox name="env" v-model="envComposeYesNo.no"></base-checkbox>
              </div>

              <div class="row" v-show='envComposeYesNo.yes' style="padding-left:30px;">

                  <base-input class="col-md-6" type="text"
                        label="Key"
                        :disabled="false"
                        placeholder="Debug"
                        v-model="envCompose.key">
                  </base-input>
                  <base-input class="col-md-6" type="text"
                        label="value"
                        :disabled="false"
                        placeholder="1"
                        v-model="envCompose.value">
                  </base-input>


                  <div style="margin-bottom:30px;width:95%;" class="text-right">
                    <button type="button" class="btn-simple btn btn-xs btn-info" @click="addEnvCompose()"><i class="fa fa-plus"></i>ADD Env Vars</button>
                  </div>
                </div>
                <div v-show="showEnvCompose" style="padding-top:20px;">
                  <span class="custom-label">Env Vars</span>
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between"
                      v-for="(env,key) in service.envs"
                      :key="key"
                    >
                    {{Object.keys(env)[0]}}:{{Object.values(env)[0]}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeEnvCompose(key)"><i class="fa fa-minus"></i></button></span>

                    </li>

                  </ul>
                </div>

              <div class="text-right" style="padding-top:1rem;padding-bottom:10px;">
                <button type="button" class="btn-fill btn btn-info" @click="addService()"><i class="fa fa-plus"></i>ADD SERVICE</button>
              </div>

              <div v-show="showServices" style="padding-top:20px;margin-bottom:2rem;">
                <span class="custom-label">Services</span>
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between"
                    v-for="(env,key) in services"
                    :key="key"
                  >
                  {{key}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeService(key)"><i class="fa fa-minus"></i></button></span>

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
          username_var:'',
          password_var:'',
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
        service:{
          image:'',
          container_name:'',
          hostname:'',
          volumes:[],
          envs:[]
        },
        envComposeYesNo:{
          yes:false,
          no:true
        },
        envCompose:{
          key:'',
          value:''
        },
        services:{},
        volume:{
          type:'',
          source:'',
          target:''
        },
        volumes:{},
        count:0,



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
      'envComposeYesNo.yes'(val){
        if(val==true){
          this.envComposeYesNo.no = false;
        }else{
          this.envComposeYesNo.no = true;
        }
      },
      'envComposeYesNo.no'(val){
         if(val==true){
          this.envComposeYesNo.yes = false;
          this.service.envs=[];
        }else{
          this.envComposeYesNo.yes = true;
        }
      },

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
      addRepo(){
        if(this.repo.path == ''){
          this.repo.path = '.sqa/docker-compose.yml'
        }
        if(this.repo.branch == ''){
          this.repo.branch = 'master'
        }
        if(this.repo.name == '' || this.repo.url == ''){
          var error_message = "Repository Name and URL are required";
          this.notifyVue(error_message)
        }else{
          this.config.all_repos[this.repo.name]={
            'repo':this.repo.url,
            'branch':this.repo.branch,
            'deploy_template':this.repo.path
          }
          this.showRepo = true;
          this.config.workspace.no = true;
          this.$store.state.config_yaml.config.project_repos = this.config.all_repos
          var yamlText= YAML.stringify(this.$store.state.config_yaml)
          console.log(yamlText)
          this.cleanWorkspace()

        }

      },
      removeRepo(item){
        this.$delete(this.config.all_repos,item)
        this.$store.state.config_yaml.config.project_repos = this.config.all_repos
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
        // this.config.all_credentials={
        //   id:this.credentials.id,
        //   'username_var':this.credentials.username,
        //   'password_var':this.credentials.password
        // };
        var cred = {
          id: this.credentials.id,
          username_var: this.credentials.username_var,
          password_var: this.credentials.password_var,
        }
        this.all_credentials.push(cred)
        this.$store.state.config_yaml.config.credentials = this.all_credentials;
        var yamlText= YAML.stringify(this.$store.state.config_yaml)
        console.log(yamlText)

        this.showCred = true;
        this.cleanCred()
        console.log(this.all_credentials)

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
      },
      addEnv(){
        var envVars= {};
        var key= this.env.key.replace(" ", "")
				var value = this.env.value.replace(" ", "")
        envVars[key]=value
        console.log(envVars)
        this.config.all_envs[key]=value
        console.log(this.config.all_envs)
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
      addEnvCompose(){
        var envVars= {};
        var key= this.envCompose.key.replace(" ", "")
				var value = this.envCompose.value.replace(" ", "")
        envVars[key]=value
        console.log(envVars)
        console.log(this.service.envs)
        this.service.envs.push(envVars)
        this.showEnvCompose = true;
        this.cleanEnvCompose()
      },
      removeEnvCompose(item){
        this.$delete(this.service.envs,item)
        if (this.isEmpty(this.service.envs)) {
          this.showEnvCompose = false;
        }
      },
      cleanEnvCompose(){
        this.envCompose.key = '';
        this.envCompose.value = '';
      },
      addVolume(){
        this.showVolumes = true;
        this.count +=1;
        var name = "volume "+this.count;
        this.volumes[name]={
          type:this.volume.type,
          source:this.volume.source,
          target:this.volume.target
        }
        this.service.volumes.push(this.volumes[name])
        this.cleanVolume();
        console.log(this.service.volumes)

      },
      removeVolume(item1,item2){
        console.log(item1,item2)
        this.$delete(this.volumes,item2)
          if (this.isEmpty(this.service.volumes)) {
            this.showVolumes = false;
          }
        for (let i = 0; i < this.service.volumes.length; i++) {
          if(this.service.volumes[i].target == item1.target){
            console.log("entra",i)
            this.service.volumes.splice(i,1)
          }
        }
        console.log(this.service.volumes)
      },
      cleanVolume(){
        this.volume.type = '';
        this.volume.source = '';
        this.volume.target = '';
      },
      addService(){
        console.log(this.service.envs)
        this.services[this.service.container_name]={
          image: this.service.image,
          container_name: this.service.container_name,
          hostname: this.service.hostname,
          volumes: this.service.volumes,
          environment: this.service.envs
        }
        this.showServices = true;
        console.log(this.services)
        this.$store.state.docker_compose.services = this.services;
        var yamlText= YAML.stringify(this.$store.state.docker_compose)
        console.log(yamlText)
        this.cleanService()
        var yamlText= YAML.stringify(this.services)
        console.log(yamlText)
      },
      removeService(item){
        this.$delete(this.services,item)
        this.$store.state.docker_compose.services = this.services;
        var yamlText= YAML.stringify(this.$store.state.docker_compose)
        console.log(yamlText)
        if (this.isEmpty(this.services)) {
          this.showServices = false;
        }

      },
      cleanService(){
        this.service.image='';
        this.service.container_name='';
        this.service.hostname='';
        this.service.envs=[];
        this.volumes={};
        this.service.volumes=[];
        this.cleanEnvCompose();
        this.cleanVolume();
        this.envComposeYesNo.no = true;
        if (this.isEmpty(this.service.envs)) {
          this.showEnvCompose = false;
        }

        if (this.isEmpty(this.service.volumes)) {
          this.showVolumes = false;
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
input[type=number]::-webkit-inner-spin-button {
  opacity: 1;
}

</style>
