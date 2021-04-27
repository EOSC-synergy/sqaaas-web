<template>
  <div class="content">
    <div class="container-fluid">
			<!-- <span>User: {{username}}</span> -->
      <div style="margin-top: 30px;">
        <div class="col-12 col-md-10 col-lg-8 col-xl-6" style="margin:auto;padding:0px;">
          <card style="height:75vh;overflow-y: auto;">
            <template slot="header">
              <h4 class="card-title text-center">COMPOSER OPTIONS</h4>
            </template>

            <template>
              <!-- <div class="row"> -->
                <base-input style="padding-left:20px;margin-bottom:0px;" type="text"
                          label="Docker Image"
                          :disabled="false"
                          placeholder="Name of the image used by the container. Example: worsica/worsica-backend"
                          v-model="service.image">
                </base-input>
                <div class="col-12 text-right">
                    <span v-show="showErrorImageName" style="color:red;font-size:12px;">This field is required</span>
                </div>
                <div class="row" style="justify-content: flex-end;padding-right:20px;">
                  <span class="custom-label">One shot image</span><base-checkbox name="workpace" v-model="oneshot"></base-checkbox>

                </div>



              <!-- </div> -->
              <base-input style="padding-left:20px;margin-bottom:0px;" type="text"
                        label="Container Name"
                        :disabled="false"
                        placeholder="Container name. Example: processing"
                        v-model="service.container_name">
              </base-input>
              <div class="col-12 text-right">
                  <span v-show="showErrorContName" style="color:red;font-size:12px;">This field is required</span>
              </div>


              <div class="col-12" id="accordion_general" role="tablist" aria-multiselectable="true" style="padding-left:20px;margin-top:2rem;padding-right:0px;">
                <!-- Accordion Item 1 -->
                <div class="card">
                  <div class="card-header" role="tab" id="accordionHeadingGeneral">
                    <div class="mb-0 row">
                      <div class="col-12 no-padding accordion-head">
                        <a data-toggle="collapse" id='link_accordion' data-parent="#accordion_general" href="#accordionBodyGeneral" aria-expanded="false" aria-controls="accordionBodyGeneral"
                          class="collapsed ">
                          <i class="fa fa-angle-down" aria-hidden="true"></i>
                          <p>ADVANCED OPTIONS</p>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div id="accordionBodyGeneral" class="collapse" role="tabpanel" aria-labelledby="accordionHeadingGeneral" aria-expanded="false" data-parent="accordion_general">
                    <div class="card-block col-12">
                      <!-- <p>Accordion Item 1 - Body</p> -->
                      <base-input style="padding-left:5px;" type="text"
                        label="Hostname"
                        :disabled="false"
                        placeholder="Container hostname. Example: processing"
                         :help="true"
                          link = 'https://docs.docker.com/compose/'
                          message = 'Docker compose oficial documentation'
                        v-model="service.hostname">
                      </base-input>
                      <div class="row" style="padding-left:5px;">
                        <div class="col-12 col-md-4" >
                          <div class="row">
                            <label class="control-label">
                              Volume Type
                            </label>
                            <!-- <span class="custom-label">Volume Type</span> -->
                            <div class="custom-div-append">
                              <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="Information <a target='blank' href='https://indigo-dc.github.io/jenkins-pipeline-library/release/2.1.0/user/config_file.html#docker-registry-upload-images' title='test add link'>More info</a>">
                                <i class="fa fa-question-circle"></i>
                              </button>
                            </div>

                          </div>
                            <select class="custom-select" id="sqacriteria" v-model='volume.type' >
                              <option value="bind">bind</option>
                              <option disabled value="volume">volume</option>
                              <option disabled value="tmpfs">tmpfs</option>
                            </select>
                        </div>
                        <base-input class="col-12 col-md-4" type="text"
                                label="Volume Source"
                                :disabled="false"
                                placeholder="worsica_web_products"
                                v-model="volume.source">
                        </base-input>
                        <base-input class="col-12 col-md-4" type="text"
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
                      <div class="row" style="padding-left:5px;margin-bottom:1rem;margin-top:2rem;">
                        <span class="custom-label">Environment variables:</span>
                        <!-- <div class="custom-div-append">
                              <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="Information <a target='blank' href='https://indigo-dc.github.io/jenkins-pipeline-library/release/2.1.0/user/config_file.html#docker-registry-upload-images' title='test add link'>More info</a>">
                                <i class="fa fa-question-circle"></i>
                              </button>
                            </div> -->
                        <span class="custom-label">Yes</span><base-checkbox name="env" v-model="envComposeYesNo.yes"></base-checkbox>
                        <span class="custom-label">No</span><base-checkbox name="env" v-model="envComposeYesNo.no"></base-checkbox>
                      </div>

                      <div class="row" v-show='envComposeYesNo.yes' style="padding-left:10x;">

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
                        <div v-show="showEnvCompose" style="padding-top:20px;padding-bottom:20px;">
                          <span class="custom-label">Env Vars</span>
                          <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between"
                              v-for="(env,key) in service.envs"
                              :key="key"
                            >
                            {{key}} : {{env}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeEnvCompose(key)"><i class="fa fa-minus"></i></button></span>

                            </li>

                          </ul>
                        </div>
                    </div>
                    <div  class="row" style="padding-left:20px;margin-bottom:1rem;margin-top:2rem;">
                      <span class="custom-label">Push Image to Docker Registry?</span>
                      <div class="custom-div-append">
                              <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="Push the docker-compose service image to the Docker Registry <a target='blank' href='https://indigo-dc.github.io/jenkins-pipeline-library/release/2.1.0/user/config_file.html?highlight=push#environment' title='test add link'>More info</a>">
                                <i class="fa fa-question-circle"></i>
                              </button>
                            </div>
                      <span class="custom-label">Yes</span><base-checkbox name="env" v-model="push_image.yes"></base-checkbox>
                      <span class="custom-label">No</span><base-checkbox name="env" v-model="push_image.no"></base-checkbox>
                    </div>


                    <div class="row" v-show='push_image.yes == true' style="padding-left:10px;margin-bottom: 2rem;">
                      <div class="col-12" style="padding-left:30px;padding-right:30px;">
                        <p style="color:#C79804;text-align:justify" ><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Before proceeding you will need to provide the ID of the credentials created in Jenkins or <a target="blank" href="https://jenkins.eosc-synergy.eu/"> go now</a> and create them. You also need to provide the path to a Dockerfile. </p>
                        <div style="margin-top:2rem;padding-left:0px;padding-right:0px;" class="col-12 col-md-12 text-left">
                          <base-input type="text" class="no-margin"
                                label="Enter the ID of the Jenkins credentials."
                                :disabled="false"
                                placeholder="userpass"
                                v-model="id_cred_service">
                          </base-input>
                          <div class="col-12 text-right">
                              <span v-show="showErrorCredID" style="color:red;font-size:12px;">This field is required</span>
                          </div>
                           <base-input style="padding-top:1rem;" type="text" class="no-margin"
                                label="Enter the url of the registry"
                                :disabled="false"
                                placeholder=""
                                v-model="url_service">
                          </base-input>
                          <base-input style="padding-top:1rem;" type="text" class="no-margin"
                                label="Path to Dockerfile"
                                :disabled="false"
                                placeholder="./"
                                v-model="path_dockerfile">
                          </base-input>
                           <div class="col-12 text-right">
                              <span v-show="showErrorPathDockerfile" style="color:red;font-size:12px;">This field is required</span>
                          </div>
                          <base-input style="padding-top:1rem;" type="text" class="no-margin"
                                label="context (optional)"
                                :disabled="false"
                                placeholder="./"
                                v-model="context">
                          </base-input>
                          <!-- <base-input style="padding-top:1rem;" type="text" class="no-margin"
                                label="cache_from (optional)"
                                :disabled="false"
                                placeholder="cache_from"
                                v-model="cache">
                          </base-input> -->
                           <label for="" style="padding-top:20px;">ARG (OPTIONAL)</label>
                          <div class="row" >


                            <base-input class="col-12 col-md-5" type="text"
                                  label="Key"
                                  :disabled="false"
                                  placeholder="Debug"
                                  v-model="arg.key">
                            </base-input>
                            <base-input class="col-12 col-md-5" type="text"
                                  label="value"
                                  :disabled="false"
                                  placeholder="1"
                                  v-model="arg.value">
                            </base-input>


                            <div style="margin-bottom:10px;width:95%;padding-top:30px;" class="text-right col-12 col-md-2">
                              <button type="button" class="btn-simple btn btn-xs btn-info" @click="addArg()"><i class="fa fa-plus"></i>ADD</button>
                            </div>
                          </div>
                          <div v-show="showArg" style="padding-top:20px;padding-bottom:20px;">
                            <!-- <span class="custom-label">Env Vars</span> -->
                            <ul class="list-group">
                              <li class="list-group-item d-flex justify-content-between"
                                v-for="(env,key) in arg_push"
                                :key="key"
                              >
                              {{key}} : {{env}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeArg(key)"><i class="fa fa-minus"></i></button></span>

                              </li>

                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-right" style="padding-top:1rem;padding-bottom:10px;">
                <button type="button" class="btn-outline btn btn-info" @click="addService()"><i class="fa fa-plus"></i>ADD SERVICE</button>
              </div>

              <div v-show="showServices" style="padding-top:20px;margin-bottom:2rem;padding-left:20px;">
                <span class="custom-label">Configured Services</span>
                <div class="table-responsive">
                  <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <thead>
                          <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Services</th>
                          <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Remove</th>
                          <th style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">Push</th>
                      </thead>
                      <!-- <tbody v-for="(repo, index) in selected_criteria" :key="index"> -->
                      <tbody v-for="(repo, index) in services" :key="index">
                              <tr
                                  style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                                  <td
                                      style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                      <div style="text-align:left;">
                                          {{index}}
                                      </div>
                                  </td>

                                  <td
                                      style="text-align:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                      <button type="button" class="btn-simple btn btn-xs btn-info" @click="removeService(index)"><i style="font-size:15px;color:red;" class="fa fa-trash"></i>
                                      </button>
                                  </td>
                                  <td
                                      style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                      <i style="color:#1BC10B;" v-show="$store.state.docker_compose.services[index] && $store.state.docker_compose.services[index].image.registry.push == true" class="fa fa-check-circle" aria-hidden="true"></i>
                                  </td>

                              </tr>
                      </tbody>
                  </table>
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
        showVolumes:false,
        showEnvCompose:false,
        showArg:false,
        showServices:false,
        showErrorCredID:false,
        disable_done:true,
        id_credential: '',
        checked: true,
        id_cred_service:'',
        showErrorImageName: false,
        showErrorPathDockerfile: false,
        showErrorContName: false,
        url_service:'https://hub.docker.com/',
        service:{
          image:'',
          container_name:'',
          hostname:'',
          volumes:[],
          envs:{}
        },
        envComposeYesNo:{
          yes:false,
          no:true
        },
        push_image:{
          yes:false,
          no:true
        },
        envCompose:{
          key:'',
          value:''
        },
        arg:{
          key:'',
          value:''
        },
        services:{},
        volume:{
          type:'bind',
          source:'',
          target:''
        },
        volumes:{},
        count:0,
        cache:'',
        context:'',
        path_dockerfile:'',
        arg_push:{}



      }
    },
    watch:{
      'service.image'(val){
        if(val != ''){
          this.showErrorImageName = false;
        }
      },
       'path_dockerfile'(val){
        if(val != ''){
          this.showErrorPathDockerfile = false;
        }
      },
      'service.container_name'(val){
        if(val != ''){
          this.showErrorContName = false;
        }
      },
      'id_cred_service'(val){
        if(val != ''){
          this.showErrorCredID = false;
        }
      },
      'url_service'(val){
        if(val != ''){
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
          this.service.envs={};
          this.showEnvCompose = false;
        }else{
          this.envComposeYesNo.yes = true;
        }
      },
      'push_image.yes'(val){
        if(val==true){
          this.push_image.no = false;
        }else{
          this.push_image.no = true;
        }
      },
      'push_image.no'(val){
         if(val==true){
          this.push_image.yes = false;
        }else{
          this.push_image.yes = true;
        }
      },

    },
    methods:{
       next(){
         this.$router.push({name: 'SQACriteria'});
      },
      back(){
         this.$router.push({name: 'general'});
      },
      track(){
        this.$ga.event('button','add','repository',0)
        // console.log(this.$ga)
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

      addEnvCompose(){
        var envVars= {};
        var key= this.envCompose.key.replace(" ", "")
				var value = this.envCompose.value.replace(" ", "")
        envVars[key]=value
        this.service.envs[key]= value
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
      addArg(){
        var key= this.arg.key.replace(" ", "")
				var value = this.arg.value.replace(" ", "")
        console.log(key,value)
        this.arg_push[key]= value
        console.log(this.arg_push)
        this.showArg = true;
        this.cleanArg()

      },
      removeArg(item){
        this.$delete(this.arg_push,item)
        if (this.isEmpty(this.arg_push)) {
          this.showArg = false;
        }
      },
      cleanArg(){
        this.arg.key = '';
        this.arg.value = '';
      },
      addService(){
        if(this.service.image == '' || this.service.container_name == ''){
          if(this.service.container_name == ''){
            this.showErrorContName =  true;
          }
          if(this.service.image == ''){
            this.showErrorImageName =  true;
          }

         }else{
          if(this.oneshot== true){
            this.services[this.service.container_name]={
              image: {
                name: this.service.image,
                registry:{
                  url: '',
                  push: false,
                  credential_id:''

                }
              },
              build:{
                  dockerfile:'',
                  context: '',
                  args: {}
              },
              hostname: this.service.hostname,
              volumes: this.service.volumes,
              command: 'sleep infinity',
              environment: this.service.envs
            }
          }else{
            this.showErrorImageName = false;
            this.showErrorContName = false;
            this.services[this.service.container_name]={
               image: {
                name: this.service.image,
                registry:{
                  url: '',
                  push: false,
                  credential_id:''

                }
              },
              build:{
                  dockerfile:'',
                  context: '',
                  args: {}
              },
              hostname: this.service.hostname,
              volumes: this.service.volumes,
              environment: this.service.envs
            }
          }
          if(this.push_image.yes == true){
             if(this.id_cred_service == ""){
              this.showErrorCredID = true;
            }else if(this.path_dockerfile == ""){
              this.showErrorPathDockerfile = true;
            }else{
              this.showErrorCredID = false;
              this.showErrorPathDockerfile = false;
              this.services[this.service.container_name].image.registry.push = true;
              this.services[this.service.container_name].image.registry.credential_id = this.id_cred_service;
              this.services[this.service.container_name].image.registry.url = this.url_service;
              this.services[this.service.container_name].build.dockerfile = this.path_dockerfile;
              this.services[this.service.container_name].build.context = this.context;
              this.services[this.service.container_name].build.args = this.arg_push;
              this.showServices = true;
              // $("#select_service").append('<option value="'+this.service.container_name+'">'+this.service.container_name+'</option>');
              // $("#select_service").selectpicker("refresh");
              this.disable_done = false;
              this.$store.state.docker_compose.services = this.services;
              if($('#accordionBodyGeneral').hasClass('show')){
                $('#link_accordion').click();
              }
              this.cleanService();
            }
          }else{
              this.showServices = true;
              // $("#select_service").append('<option value="'+this.service.container_name+'">'+this.service.container_name+'</option>');
              // $("#select_service").selectpicker("refresh");
              this.disable_done = false;
              this.$store.state.docker_compose.services = this.services;
              if($('#accordionBodyGeneral').hasClass('show')){
                $('#link_accordion').click();
              }
              this.cleanService();
          }
        }
      },
      removeService(item){
        this.$delete(this.services,item);
        // this.$store.state.docker_compose.push_services.splice(item,1)
        // $("option[value='"+item+"']").remove();
        // $("#select_service").selectpicker("refresh");
        this.$store.state.docker_compose.services = this.services;
        this.$store.state.config_yaml.sqa_criteria={};
        if (this.isEmpty(this.services)) {
          this.showServices = false;
          this.disable_done = true;
          this.push_image.yes = false;
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
        this.id_credential = '';
        this.cleanEnvCompose();
        this.cleanVolume();
        this.envComposeYesNo.no = true;
        this.push_image.no = true;
        if (this.isEmpty(this.service.envs)) {
          this.showEnvCompose = false;
        }

        if (this.isEmpty(this.service.volumes)) {
          this.showVolumes = false;
        }

        this.path_dockerfile = '';
        this.context = '';
        this.cleanArg();
        this.arg_push = {};
        this.showArg = false;
        this.url_service = '';
        this.id_cred_service = '';
        this.showErrorCredID = false;
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
      var _this = this;
       var sizeRepos = this.objectSize(this.$store.state.config_yaml.config.project_repos);
      // if(sizeRepos == 0){
      //   // this.notifyVue("Error you must add at least one repository",'nc-icon nc-simple-remove','danger')
      //   // this.$router.push({name:"general"})
      // }else{
        console.log(this.$store.state.docker_compose.services)
        var sizeServices = this.objectSize(this.$store.state.docker_compose.services)
        if(sizeServices > 0){
          var all_services = Object.keys(this.$store.state.docker_compose.services);
          //  for (let i = 0; i < all_services.length; i++) {
          //    var service_name = all_services[i];
          //   //  this.$store.state.docker_compose.services[service_name].image.registry.push = false;
          //  }
        // }
        for (let i = 0; i < sizeServices; i++) {
          this.services[Object.keys(this.$store.state.docker_compose.services)[i]]=this.$store.state.docker_compose.services[Object.keys(this.$store.state.docker_compose.services)[i]]
        }

        if(this.isEmpty(this.services)){
          this.showServices = false;
          this.disable_done = true;
        }else {
          this.disable_done = false;
          this.showServices = true
        }
      }

      this.checkauthCall(this.checkauthCallBack);


      },
      mounted(){
        var _this = this
         this.$eventHub.$emit('steps', 2);
        this.$nextTick(function(){
          // $('#select_service').selectpicker();

          $("input").on('click',function(){
           var array_name = []
           var string_name = $(this).parent().closest('div').attr('id');
           if(string_name != undefined){
             array_name = string_name.split("_");
             if(array_name[0] == "service"){
               if($(this).prop('checked') == true){
                //  _this.$store.state.docker_compose.push_services.push(array_name[1]);
                 _this.$store.state.docker_compose.services[array_name[1]].image.registry.push=true;
                 _this.$store.state.docker_compose.services[array_name[1]].image.registry.credential_id=this.id_cred_service;
                 _this.$store.state.docker_compose.services[array_name[1]].image.registry.url=this.url_service;
               }else{
                 // _this.$store.state.docker_compose.push_services.splice(index, 1);
                  _this.$store.state.docker_compose.services[array_name[1]].image.registry.push=false;
                 _this.$store.state.docker_compose.services[array_name[1]].image.registry.credential_id='';
                 _this.$store.state.docker_compose.services[array_name[1]].image.registry.url='https://hub.docker.com/';
               }
             }
           }
         })

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
  /* padding-bottom: 0.38rem !important; */
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

.custom-div-append {
  /* padding:27px 0px 0px 0px; */
  margin:0px;
  margin-left: -3px;
}

@media (max-width: 576px) {
  .container-fluid{
    padding-left: 0px!important;
    padding-right: 0px!important;
  }


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
    border: 2px solid black!important;
  }

  .btn-next-back{
    width: 20%!important;
  }

.btn-back{
  padding:1rem 0 1rem 0;
  background-color:#ccc!important;
  margin-right:10%;
  font-weight: bold;
  border: 2px solid black!important;

}

.accordion-head i{
    font-size: 1.5em;
    float: right;
}

.accordion-head > .collapsed > i:before{
    content: "\f105";
}


</style>
