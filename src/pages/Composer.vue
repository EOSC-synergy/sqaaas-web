<template>
  <div class="content">
    <div class="container-fluid">
      <div class="col-12 col-sm-12 col-xl-8 col-lg-10 mx-auto" >
        <div class="" style="margin:auto;padding:0px;">
          <!-- <card >

          </card> -->
          <card>
            <template slot="header">
                <div style="display:flex;flex-direction:row;padding-bottom:15px;">
                  <div style="background-color:#e6ede8;padding-left:100px;padding-top:20px;padding-bottom:10px;width:80%">
                    <h3 style="margin-top:0px;font-weight:700;" class="card-title">Services make up the testing and building environment</h3>
                    <p style="padding-top:20px">
                        <!--<i style="color: #0073ff;" class="fa fa-info-circle" aria-hidden="true"></i>-->
                        Compose your environment, i.e. the tools that run the checks to be defined in the next <span style="font-style:italic">'Criteria'</span> step. Here you will be able to define the containers that provide those tools, either by pulling existing images from registries (e.g. from Docker Hub) or building your own (e.g. Dockerfiles)
                    </p>
                    <div>
                        <p>
                          <span style="text-decoration: underline;font-weight: bold;">This is an optional step:</span>
                          some tools are natively supported by the Pipeline as a Service module. If your tool is not listed in the next <span style="font-style:italic">'Criteria'</span> step, come back here a define the service.
                        </p>
                        <div style="padding-top:15px;width:190px; margin:0 auto;">
                            <button class="btn btn-outline btn-info" style="border-style:solid;border-width:thin;padding:5px 5px;font-weight: bold;" @click="next()" >Skip this step for now ></button>
                        </div>
                    </div>
                  </div>
                  <div style="background-color:#e6ede8;padding-left:80px;padding-top:60px;padding-bottom:20px;width:30%">
                    <img src="../../static/service.png" alt="" style="opacity: 0.5">
                  </div>
                </div>
            </template>
            <template>
              <div class="row" style="padding-left:20px;margin-bottom:1rem;margin-top:2rem;">
                <div class="col-12 col-md-6">
                  <base-input style="margin-bottom:0px;" type="text"
                      label="SERVICE NAME"
                      :disabled="false"
                      placeholder="Container name. Example: processing"
                      v-model="service.container_name">
                  </base-input>
                  <div class="text-right">
                      <span v-show="showErrorContName" style="color:red;font-size:12px;">This field is required</span>
                  </div>
                </div>
               <div class="col-12 col-md-6">
                 <label>PULL OR BUILD</label>
                  <select class="custom-select" id="sqacriteria" v-model='pull_build'>
                    <option value="default">Select ...</option>
                    <option value="pull">Pull Image</option>
                    <option value="build">Build Image</option>
                  </select>
                  <div class="text-right">
                      <span v-show="showErrorSelectOption" style="color:red;font-size:12px;">This field is required</span>
                  </div>
                </div>
              </div>


              <div style="padding-left:20px;" v-show="showPull">
                <base-input style="margin-bottom:0px;" type="text"
                  label="IMAGE NAME"
                  :disabled="false"
                  placeholder="Name of the image used by the container. Example: alpine:latest"
                  v-model="service.image">
                </base-input>
                <div class="text-right">
                    <span v-show="showErrorImageName" style="color:red;font-size:12px;">This field is required</span>
                </div>

              </div>

              <div style="padding-left:20px;" class="row" v-show="showBuild">
                <div class="col-12 col-md-12 text-left">

                    <base-input style="padding-top:1rem;" type="text" class="no-margin"
                          label="DOCKERFILE LOCATION"
                          :disabled="false"
                          placeholder="./"
                          v-model="path_dockerfile">
                    </base-input>
                      <div class="col-12 text-right">
                        <span v-show="showErrorPathDockerfile" style="color:red;font-size:12px;">This field is required</span>
                    </div>
                      <base-input style="padding-top:1rem;" type="text" class="no-margin"
                          label="DOCKER REGISTRY URL (OPTIONAL)"
                          :disabled="false"
                          placeholder="https://hub.docker.com/"
                          v-model="url_service">
                    </base-input>
                    <label for="" style="padding-top:20px;">BUILD ARGUMENTS (OPTIONAL)</label>
                    <div class="row" >
                      <base-input class="col-12 col-md-5" type="text"
                            label="key"
                            :disabled="false"
                            placeholder="DEBUG"
                            v-model="arg.key">
                      </base-input>
                      <base-input class="col-12 col-md-5" type="text"
                            label="value"
                            :disabled="false"
                            placeholder="1"
                            v-model="arg.value">
                      </base-input>


                      <div style="margin-bottom:10px;width:95%;padding-top:30px;" class="text-right col-12 col-md-2">
                        <button type="button" class="btn-simple btn btn-xs btn-info" @click="addArg()"><i class="fa fa-plus"></i>ADD Build Arg</button>
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

                    <div class="row" style="padding-bottom:20px;padding-top:20px">
                      <span class="custom-label" style="font-weight:bold;font-size:17px">Would you like to push the Docker image to a registry (e.g. Docker Hub)?</span><base-checkbox name="env" v-model="showBuildImage"></base-checkbox>
                    </div>

                    <div v-show='showBuildImage'>
                      <div style="margin-bottom:10px;">
                        <base-input  type="text" class="no-margin" style="padding-left:20px;"
                            label="IMAGE NAME"
                            :disabled="false"
                            placeholder="Name of the image used by the container. Example: worsica/worsica-backend"
                            v-model="service.image">
                        </base-input>
                        <div class="row" style="padding-left:55px;">
                          <p style="font-style:italic;color: #A7A1A0;margin-bottom:0px;"><i style="color:#A7A1A0;" class="fa fa-bell" aria-hidden="true"></i> You can use the environment variables of the Step 1 and the <a href="https://plugins.jenkins.io/git/#environment-variables" target="blank">Jenkins Git Plugin.</a></p>
                        </div>
                        <div class="col-12 text-right">
                            <span v-show="showErrorImageName" style="color:red;font-size:12px;">This field is required</span>
                        </div>
                        <div class="custom-label" style="padding-top:25px;font-size:13px">CREDENTIALS</div>
                        <div class="row" style="padding-left:50px">
                            <base-checkbox name="env" v-model="showCredID"></base-checkbox><span class="custom-label" style="padding-left:0px;font-size:17px">Use the EOSC-Synergy catch-all credentials</span>
                            <div class="custom-div-append">

                                <!--<button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="The Docker       >  \image will be pushed by the <eoscsynergybot> user to <a target='blank' href='https://hub.docker.com/orgs/eoscsynergyapps/repositories' title='test add link'>Docker  >  \Hub eoscsynergyapps</a> organization">-->

                              <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="The resultant Docker image will be pushed to <a target='blank' href='https://hub.docker.com/orgs/eoscsynergyapps/repositories' title='test add link'>eoscsynergyapps</a> Docker Hub organization">
                                <i class="fa fa-question-circle"></i>
                              </button>
                            </div>
                        </div>
                        <div v-show="showCredID == false" style="margin-bottom:10px;padding-left:50px;padding-top:0px">
                            <base-input type="text"  class="no-margin"
                                label="JENKINS CREDENTIAL ID"
                                :disabled="false"
                                placeholder="userpass"
                                v-model="id_cred_service">
                            </base-input>
                            <div class="row" style="padding-left:55px;">
                              <p style="color:#A7A1A0;text-align:justify;margin-bottom:0px;" ><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Provide the ID of the credentials created in Jenkins or <a target="blank" href="https://jenkins.eosc-synergy.eu/"> go now</a> and create them.</p>
                            </div>
                            <div class="col-12 text-right">
                                <span v-show="showErrorCredID" style="color:red;font-size:12px;">This field is required</span>
                            </div>
                        </div>

                      </div>

                    </div>



                  </div>


              </div>

              <!-- <div  class="row" style="padding-left:20px;margin-bottom:1rem;margin-top:2rem;">
                <span class="custom-label">Push Image to Registry?</span>
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

                </div>
              </div> -->


              <div class="col-12" id="accordion_general" role="tablist" aria-multiselectable="true" style="padding-left:20px;margin-top:2rem;padding-right:0px;">
                <!-- Accordion Item 1 -->
                <div class="card">
                  <div class="card-header" role="tab" id="accordionHeadingGeneral">
                    <div class="mb-0 row">
                      <div class="col-12 accordion-head" style="padding:0px 20px 0px 20px;">
                        <a data-toggle="collapse" id='link_accordion' data-parent="#accordion_general" href="#accordionBodyGeneral" aria-expanded="false" aria-controls="accordionBodyGeneral"
                          class="collapsed ">
                          <i class="fa fa-angle-down" aria-hidden="true"></i>
                          <p>ADVANCED OPTIONS (Volumes)</p>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div id="accordionBodyGeneral" class="collapse" role="tabpanel" aria-labelledby="accordionHeadingGeneral" aria-expanded="false" data-parent="accordion_general">
                    <div class="card-block col-12">
                      <!-- <p>Accordion Item 1 - Body</p> -->
                      <base-input style="padding-left:5px;" type="text"
                        label="HOSTNAME"
                        :disabled="false"
                        placeholder="Container hostname. Example: processing"
                         :help="true"
                          link = 'https://docs.docker.com/compose/compose-file/compose-file-v3/#domainname-hostname-ipc-mac_address-privileged-read_only-shm_size-stdin_open-tty-user-working_dir'
                          message = 'Docker compose oficial documentation'
                        v-model="service.hostname">
                      </base-input>
                      <div class="row" style="padding-left:5px;">
                        <div class="col-12 col-md-4" >
                          <div class="row">
                            <span class="custom-label" style="font-size: 12px;text-transform: uppercase;padding-top:10px;">Volume Type</span>
                            <div class="custom-div-append">
                              <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="Docker compose oficial documentation <a target='blank' href='https://docs.docker.com/compose/compose-file/compose-file-v3/#volumes' title='test add link'>More info</a>">
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
                                label="VOLUME SOURCE"
                                :disabled="false"
                                placeholder="./"
                                :help="true"
                                link = 'https://docs.docker.com/compose/compose-file/compose-file-v3/#volumes'
                                message = 'Docker compose oficial documentation'
                                v-model="volume.source">
                        </base-input>
                        <base-input class="col-12 col-md-4" type="text"
                                label="VOLUME TARGET"
                                :disabled="false"
                                placeholder="/sqaaas-build"
                                :help="true"
                                link = 'https://docs.docker.com/compose/compose-file/compose-file-v3/#volumes'
                                message = 'Docker compose oficial documentation'
                                v-model="volume.target">
                        </base-input>

                      </div>
                      <div class="text-right">
                        <button type="button" class="btn-simple btn btn-xs btn-info" @click="addVolume()"><i class="fa fa-plus"></i>ADD Volume</button>
                      </div>
                      <div v-show="showVolumes" style="padding-top:20px;">
                        <div class="table-responsive">
                          <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                              <thead>
                                  <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Type</th>
                                  <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Source</th>
                                  <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Source</th>
                                  <th style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">Remove</th>
                              </thead>
                              <!-- <tbody v-for="(repo, index) in selected_criteria" :key="index"> -->
                              <tbody v-for="(vol, index) in service.volumes" :key="index">
                                      <tr
                                          style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                                          <td
                                              style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                              <div style="text-align:left;">
                                                  {{vol.type}}
                                              </div>
                                          </td>

                                          <td
                                              style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                              <div style="text-align:center;">
                                                  {{vol.source}}
                                              </div>
                                          </td>

                                          <td
                                              style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                              <div style="text-align:center;">
                                                  {{vol.target}}
                                              </div>
                                          </td>

                                          <td
                                              style="text-align:right;justify-content:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                              <button type="button" class="btn-simple btn btn-xs btn-info" @click="removeVolume(index)"><i style="font-size:15px;color:red;" class="fa fa-trash"></i>
                                              </button>
                                          </td>


                                      </tr>
                              </tbody>
                          </table>
                        </div>
                      </div>
                      <!-- <div class="row" style="padding-left:5px;margin-bottom:1rem;margin-top:2rem;">
                        <span class="custom-label" style="font-size:17px;font-weight:bold">Does the current service need specific environment variables?</span>
                        <span class="custom-label">Yes</span><base-checkbox name="env" v-model="envComposeYesNo.yes"></base-checkbox>
                        <span class="custom-label">No</span><base-checkbox name="env" v-model="envComposeYesNo.no"></base-checkbox>
                      </div> -->

                      <div class="row" v-show='envComposeYesNo.yes' style="padding-left:10x;">

                          <base-input class="col-md-6" type="text"
                                label="key"
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
                            <button type="button" class="btn-simple btn btn-xs btn-info" @click="addEnvCompose()"><i class="fa fa-plus"></i>ADD Env Var</button>
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
                  </div>
                </div>
              </div>

              <div class="text-right" style="padding-top:1rem;padding-bottom:10px;">
                <button type="button" class="btn-outline btn btn-info" @click="addService()"><i class="fa fa-plus"></i>ADD SERVICE</button>
              </div>

              <div v-show="showServices" style="padding-top:20px;margin-bottom:2rem;">
                <div class="text-center" style="padding-bottom:10px;">
                  <span class="custom-table-title">Configured Services</span>
                </div>
                <div class="table-responsive">
                  <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <thead>
                          <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Service</th>
                          <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Image</th>
                          <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Remove</th>
                          <th style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">Push</th>
                      </thead>
                      <!-- <tbody v-for="(repo, index) in selected_criteria" :key="index"> -->
                      <tbody v-for="(serv, index) in services" :key="index">
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
                                      <div style="text-align:left;">
                                          {{serv.image.name}}
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
                  <button @click="next()" type="button"  class="btn btn-next btn-next-back">
                      NEXT
                  </button>
              </div>
            </div>
          </card>

        </div>
      </div>
      <div class="modal" id="myModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header" style="border-bottom:1px solid #ccc;padding-bottom:20px;">
              <h5 class="modal-title">Please Confirm</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style="border-bottom:1px solid #ccc;padding-bottom:0px;">
              <p>The selected service has been associated with any of the defined criteria, do you want to proceed and remove the service?</p>
            </div>
            <div class="modal-footer" style="padding-top:20px;">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger btn-fill" @click="removeConfirmServ()" data-dismiss="modal">Delete</button>
            </div>
          </div>
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
        disable_done:false,
        id_credential: '',
        checked: true,
        id_cred_service:'',
        showErrorImageName: false,
        showErrorPathDockerfile: false,
        showErrorContName: false,
        url_service:'',
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
        path_dockerfile:'',
        arg_push:{},
        idToRemove:'',
        criteriaToRemove:'',
        pull_build:'default',
        showPull:false,
        showBuild:false,
        showBuildImage:false,
        showErrorSelectOption:false,
        showCredID:false



      }
    },
    watch:{
      'showBuildImage'(val){
      },
      'pull_build'(val){
        if(val != 'default'){
          this.showErrorSelectOption =false;
          if(val == 'pull'){
            this.showPull = true;
          }else{
            this.showPull = false;
          }
          if(val == 'build'){
            this.showBuild = true;
          }else{
            this.showBuild = false;
          }
        }else{
          this.showBuild=false;
          this.showPull=false;
        }
      },
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
      openModal(item){
        $('.confirm-delete').addClass('hide');
        // $('#myModal .modal-header, .modal-footer, .modal-body').removeClass('hide');
        $('#myModal').modal('show');
      },
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
        envVars[key]=value;
        this.service.envs[key]= value;
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
        this.volumes={
          type:this.volume.type.trim(),
          source:this.volume.source.trim(),
          target:this.volume.target.trim()
        }
        this.service.volumes.push(this.volumes)
        this.cleanVolume();

      },
      removeVolume(item1){
        this.$delete(this.volumes,item1)
        this.$delete(this.service.volumes,item1)
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
        this.volume.type = 'bind';
        this.volume.source = '';
        this.volume.target = '';
      },
      addArg(){
        var key= this.arg.key.replace(" ", "")
				var value = this.arg.value.replace(" ", "")
        this.arg_push[key]= value
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
        if( (this.pull_build=='push' && this.service.image=='') || (this.pull_build=='build' && this.path_dockerfile=='') || (this.pull_build=='build' && this.showBuildImage==true && this.showCredID==false && this.id_cred_service == '' ) || (this.pull_build=='build' && this.showBuildImage==true && this.service.image=='' ) || this.service.container_name == '' || this.pull_build == 'default'){
          if(this.service.container_name == ''){
            this.showErrorContName =  true;
          }
          if(this.pull_build == 'default'){
            this.showErrorSelectOption = true;

          }
          if(this.pull_build=='push' && this.service.image==''){
            this.showErrorImageName =  true;
          }

          if(this.pull_build=='build' && this.path_dockerfile==''){
            this.showErrorPathDockerfile = true;

          }
          if((this.pull_build=='build' && this.showBuildImage==true && this.service.image=='')){
            if(this.service.image == ''){
              this.showErrorImageName = true
            }
          }
          if(this.pull_build=='build' && this.showBuildImage==true && this.showCredID==false && this.id_cred_service == '' ){
              this.showErrorCredID = true
          }

         }else{

          this.showErrorImageName = false;
          this.showErrorContName = false;
          this.showErrorSelectOption = false;

          this.services[this.service.container_name]={
              image: {
              name: '',
              registry:{
                url: '',
                push: false,
                credential_id:''

              }
            },
            build:{
                dockerfile:'',
                args: {}
            },
            hostname: this.service.hostname,
            volumes: this.service.volumes,
            environment: this.service.envs
          }

          if(this.pull_build == 'pull'){
            this.services[this.service.container_name].image.name=this.service.image;
          }
          if(this.pull_build == 'build'){
            // this.services[this.service.container_name].image.registry.credential_id = this.id_cred_service;
            this.services[this.service.container_name].image.registry.url = this.url_service;
            this.services[this.service.container_name].build.dockerfile = this.path_dockerfile;
            this.services[this.service.container_name].build.args = this.arg_push;

            if(this.showBuildImage == true){
              this.services[this.service.container_name].image.registry.push = true;
              if(this.showCredID==true){
                var add_org_name = this.service.image.split("/");
                console.log(add_org_name)
                if(add_org_name.length > 1){
                  this.services[this.service.container_name].image.name='eoscsynergyapps/'+add_org_name[1];
                }else{
                  this.services[this.service.container_name].image.name='eoscsynergyapps/'+this.service.image;
                }
              }else{
                this.services[this.service.container_name].image.name=this.service.image;
              }
              this.services[this.service.container_name].image.registry.credential_id = this.id_cred_service;
            }

          }
          this.showServices = true;
          this.$store.state.docker_compose.services = this.services;
          if($('#accordionBodyGeneral').hasClass('show')){
            $('#link_accordion').click();
          }
          this.cleanService();
        }
      },
      removeService(item){
        this.idToRemove = item;
        var check_repo = false
        for (var criteria in this.$store.state.config_yaml.sqa_criteria){
          for (let i = 0; i < this.$store.state.config_yaml.sqa_criteria[criteria].repos.length; i++) {
            for (var serv in this.$store.state.docker_compose.services ){
                if(this.$store.state.config_yaml.sqa_criteria[criteria].repos[i].container == serv){
                  this.criteriaToRemove = criteria;
                  check_repo = true;
                }
            }
          }

        }
        if(check_repo == true){
          this.openModal();
        }else{
          this.removeConfirmServ()
        }
      },
      removeConfirmServ(){
        this.$delete(this.services,this.idToRemove);
        this.$store.state.docker_compose.services = this.services;
        if(this.criteriaToRemove != ''){
          this.$delete( this.$store.state.config_yaml.sqa_criteria, this.criteriaToRemove)
        }
        if (this.isEmpty(this.services)) {
          this.showServices = false;
          this.push_image.yes = false;
        }
      },
      // removeService(){
      //   this.$delete(this.services,this.idToRemove);
      //   // this.$store.state.docker_compose.push_services.splice(item,1)
      //   // $("option[value='"+item+"']").remove();
      //   // $("#select_service").selectpicker("refresh");
      //   this.$store.state.docker_compose.services = this.services;
      //   this.$store.state.config_yaml.sqa_criteria={};
      //   if (this.isEmpty(this.services)) {
      //     this.showServices = false;
      //     this.disable_done = true;
      //     this.push_image.yes = false;
      //   }

      // },
      cleanService(){
        this.service.image='';
        this.service.container_name='';
        this.service.hostname='';
        this.service.envs={};
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
        this.cleanArg();
        this.arg_push = {};
        this.showArg = false;
        this.url_service = '';
        this.id_cred_service = '';
        this.showErrorCredID = false;
        this.pull_build = 'default';
        this.showCredID = false;
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
      if(this.$store.state.name == ''){
        this.notifyVue("Please define the name of the pipeline",'nc-icon nc-simple-remove','danger')
        this.$router.push({name:"PipelineName"})
      }
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
      }else {
        this.showServices = true
      }
    }

    // this.checkauthCall(this.checkauthCallBack);


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
  padding-bottom: 5px !important;
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

 @media (min-width: 992px){
    .col-lg-10 {
        -ms-flex: 0 0 83.333333%;
        -webkit-box-flex: 0;
        flex: 0 0 83.333333%;
        max-width: 100%;
  }
 }

 @media (min-width: 1200px) {
    .col-lg-10 {
        -ms-flex: 0 0 83.333333%;
        -webkit-box-flex: 0;
        flex: 0 0 83.333333%;
        max-width: 70%;
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

.custom-table-title{
  padding-top:5px;
  /* padding-left:20px; */
  text-transform: uppercase;
  font-size:16px;
  color:black;
  font-weight:700;

}


</style>
