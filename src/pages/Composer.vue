<template>
  <div class="content">
    <div class="container-fluid">
			<!-- <span>User: {{username}}</span> -->
      <div style="margin-top: 30px;">
        <div class="col-xs-12 col-md-6" style="margin:auto;">
          <card style="height:75vh;overflow-y: auto;">
            <template slot="header">
              <h4 class="card-title text-center">DOCKER COMPOSE</h4>
            </template>

            <template>
              <!-- <div class="row"> -->
                <base-input style="padding-left:20px;" type="text"
                          label="Docker Image"
                          :disabled="false"
                          placeholder="worsica/worsica-backend:worsica-processing-dev_latest"
                          v-model="service.image">
                </base-input>
                <div class="row" style="justify-content: flex-end;padding-right:20px;">
                  <span class="custom-label">One shot image</span><base-checkbox name="workpace" v-model="oneshot"></base-checkbox>

                </div>

              <!-- </div> -->
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
        oneshot: false,
        showVolumes:false,
        showEnvCompose:false,
        showServices:false,
        showErrorCredId:false,
        showErrorCredPass:false,
        showErrorCredUser:false,
        showErrorCredType:false,
        showErrorRepoName:false,
        showErrorRepoUrl:false,
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
            horizontalAlign: 'center',
            verticalAlign: 'top',
            type: 'danger'
          })
      },

      addEnvCompose(){
        var envVars= {};
        var key= this.envCompose.key.replace(" ", "")
				var value = this.envCompose.value.replace(" ", "")
        envVars[key]=value
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
          type:this.volume.type.trim(),
          source:this.volume.source.trim(),
          target:this.volume.target.trim()
        }
        this.service.volumes.push(this.volumes[name])
        this.cleanVolume();

      },
      removeVolume(item1,item2){
        this.$delete(this.volumes,item2)
          if (this.isEmpty(this.service.volumes)) {
            this.showVolumes = false;
          }
        for (let i = 0; i < this.service.volumes.length; i++) {
          if(this.service.volumes[i].target == item1.target){
            this.service.volumes.splice(i,1)
          }
        }
      },
      cleanVolume(){
        this.volume.type = '';
        this.volume.source = '';
        this.volume.target = '';
      },
      addService(){
        if(this.oneshot== true){
          this.services[this.service.container_name]={
            image: this.service.image,
            container_name: this.service.container_name,
            hostname: this.service.hostname,
            volumes: this.service.volumes,
            command: 'sleep infinity',
            environment: this.service.envs
          }
        }else{
          this.services[this.service.container_name]={
            image: this.service.image,
            container_name: this.service.container_name,
            hostname: this.service.hostname,
            volumes: this.service.volumes,
            environment: this.service.envs
          }
        }
        this.showServices = true;
        this.$store.state.docker_compose.services = this.services;
        this.cleanService();
      },
      removeService(item){
        this.$delete(this.services,item)
        this.$store.state.docker_compose.services = this.services;
        this.$store.state.config_yaml.sqa_criteria={};
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
        this.oneshot = false;
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
       objectSize(obj){
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      }

    },
    created(){
       var sizeRepos = this.objectSize(this.$store.state.config_yaml.config.project_repos);
      if(sizeRepos == 0){
        this.notifyVue("Error you must add at least one repository",'nc-icon nc-simple-remove','danger')
        this.$router.push({name:"general"})
      }else{
        var sizeServices = this.objectSize(this.$store.state.docker_compose.services)
        for (let i = 0; i < sizeServices; i++) {
          this.services[Object.keys(this.$store.state.docker_compose.services)[i]]=this.$store.state.docker_compose.services[Object.keys(this.$store.state.docker_compose.services)[i]]
        }

        if(this.isEmpty(this.services)){
          this.showServices = false
        }else {
          this.showServices = true
        }
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
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    height: 40px;
}

.custom-div-append {
  padding:27px 0px 0px 0px;
  margin:0px;
  margin-left: -3px;
}



</style>
