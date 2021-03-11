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
                        v-model="service.hostname">
                      </base-input>
                      <div class="row" style="padding-left:5px;">
                        <div class="col-12 col-md-4" >
                          <label class="control-label">
                            Volume Type
                          </label>
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
                            {{key}}:{{env}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeEnvCompose(key)"><i class="fa fa-minus"></i></button></span>

                            </li>

                          </ul>
                        </div>
                    </div>
                    <div  class="row" style="padding-left:20px;margin-bottom:1rem;margin-top:2rem;">
                      <span class="custom-label">Push Image to Docker Registry?</span>
                      <span class="custom-label">Yes</span><base-checkbox name="env" v-model="push_image.yes"></base-checkbox>
                      <span class="custom-label">No</span><base-checkbox name="env" v-model="push_image.no"></base-checkbox>
                    </div>


                    <div class="row" v-show='push_image.yes' style="padding-left:10px;margin-bottom: 2rem;">
                      <div class="col-12" style="padding-left:30px;padding-right:30px;">
                        <p style="color:red;text-align:justify" >Attention: Before proceeding you will need to provide the ID of the credentials created in Jenkins or <a target="blank" href="https://jenkins.eosc-synergy.eu/"> go now</a> and create them. </p>
                        <!-- <div>
                          <label style="display: block;margin-top: 2rem;">Select service</label>
                          <select class="selectpicker" id="select_service"  multiple title="Please select ..." >
                            <option value="" selected disabled>Please select</option>
                            <option :value="index" v-for="(service, index) in $store.state.docker_compose.services" :key="index">
                              {{index}}
                            </option>

                          </select>
                        </div> -->
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
                                placeholder="userpass"
                                v-model="url_service">
                          </base-input>

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
                  <span class="custom-label">Services</span>
                <ul class="list-group" style="border:1px solid #ced4da;">
                  <li class="list-group-item d-flex justify-content-between" style="border:none;"
                    v-for="(env,key) in services"
                    :key="key"
                  >
                    {{key}}
                  <div class="row">
                    <span><button type="button" title="Remove Service" class="btn-simple btn btn-xs btn-info" @click="removeService(key)"><i class="fa fa-minus"></i></button></span>
                    <!-- <base-checkbox title= "Push images" disabled="true" :checked="($store.state.docker_compose.services[key].image.registry.push == true) ? true : false" style="top: -5px;" :id="'service_'+ key" name="workpace"></base-checkbox> -->
                  </div>

                  </li>

                </ul>
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
        showServices:false,
        showErrorCredID:false,
        disable_done:true,
        id_credential: '',
        checked: true,
        id_cred_service:'',
        showErrorImageName: false,
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
        services:{},
        volume:{
          type:'bind',
          source:'',
          target:''
        },
        volumes:{},
        count:0,



      }
    },
    watch:{
      'service.image'(val){
        if(val != ''){
          this.showErrorImageName = false;
        }
      },
      'service.container_name'(val){
        if(val != ''){
          console.log('active')
          this.showErrorContName = false;
        }
      },
      'id_cred_service'(val){
        if(val != ''){
          this.showErrorCredID = false;
          var all_services = [];
          all_services = Object.keys(this.$store.state.docker_compose.services);
          for (let i = 0; i < all_services.length; i++) {
            var service_name = all_services[i]
            this.$store.state.docker_compose.services[service_name].image.registry.credential_id = this.id_cred_service;
          }
        }else{
          this.showErrorCredID = true;

        }
      },
      'url_service'(val){
        if(val != ''){
          var all_services = [];
          all_services = Object.keys(this.$store.state.docker_compose.services);
          for (let i = 0; i < all_services.length; i++) {
            var service_name = all_services[i]
            this.$store.state.docker_compose.services[service_name].image.registry.url = this.url_service;
          }
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
         if(this.push_image.yes == true){
           if(this.id_cred_service == ''){
            this.showErrorCredID = true;
            }else{
              this.showErrorCredID = false;
              this.$router.push({name: 'SQACriteria'});
            }
         }else{
           this.showErrorCredID = false;
           this.$router.push({name: 'SQACriteria'});
         }

      },
      back(){
         this.$router.push({name: 'general'});
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

      addEnvCompose(){
        var envVars= {};
        var key= this.envCompose.key.replace(" ", "")
				var value = this.envCompose.value.replace(" ", "")
        envVars[key]=value
        this.service.envs[key]= value
        console.log(this.service.envs)
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
              // image: {
              //   name: this.service.image,
              //   registry:{
              //     url: '',
              //     push: false,
              //     credential_id:''

              //   }
              // },
              image:this.service.image,
              container_name: this.service.container_name,
              hostname: this.service.hostname,
              volumes: this.service.volumes,
              command: 'sleep infinity',
              environment: this.service.envs
            }
          }else{
            this.showErrorImageName = false;
            this.showErrorContName = false;
            this.services[this.service.container_name]={
              //  image: {
              //   name: this.service.image,
              //   registry:{
              //     url: '',
              //     push: false,
              //     credential_id:''

              //   }
              // },
              image:this.service.image,
              container_name: this.service.container_name,
              hostname: this.service.hostname,
              volumes: this.service.volumes,
              environment: this.service.envs
            }
          }
          if(this.push_image.yes == true){
            if(this.id_cred_service == ""){
              this.showErrorCredID = true;
            }else{
              this.showErrorCredID = false;
              // this.services[this.service.container_name].image.registry.push = true;
              // this.services[this.service.container_name].image.registry.credential_id = this.id_cred_service;
              // this.services[this.service.container_name].image.registry.url = this.url_service;
              this.showServices = true;
              // $("#select_service").append('<option value="'+this.service.container_name+'">'+this.service.container_name+'</option>');
              // $("#select_service").selectpicker("refresh");
              this.disable_done = false;
              this.$store.state.docker_compose.services = this.services;
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
      console.log(this.$store.state.docker_compose.services)
       var sizeRepos = this.objectSize(this.$store.state.config_yaml.config.project_repos);
      if(sizeRepos == 0){
        this.notifyVue("Error you must add at least one repository",'nc-icon nc-simple-remove','danger')
        this.$router.push({name:"general"})
      }else{
        var sizeServices = this.objectSize(this.$store.state.docker_compose.services)
        // if(sizeServices > 0){
        //   var all_services = Object.keys(this.$store.state.docker_compose.services);
        //    for (let i = 0; i < all_services.length; i++) {
        //      var service_name = all_services[i];
        //      this.$store.state.docker_compose.services[service_name].image.registry.push = false;
        //    }
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
