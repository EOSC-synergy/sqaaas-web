<template>
  	<div class="content">
      <div class="container-fluid">
        <div  v-show="loading" class="loading-overlay is-active">
          <span class="fas fa-spinner fa-3x fa-spin"></span>
        </div>
        <div class="row">
          <div class="col-12">

          <card
                  body-classes=""
            >
              <template slot="header">
                <h4 class="card-title text-center">Information Summary</h4>
              </template>

              <template >
                <div class="row text-center" style="padding: 0px 40px 0px 40px;">
                  <div class="col-12 col-md-8">
                     <p class="text-left" style="font-size:14px;margin-bottom:1rem;">
                      <strong style="font-weight:bold;">Pipeline name:</strong> {{($store.state.name) ? $store.state.name : ''}}
                    </p>
                     <p class="text-left" style="font-size:14px;">
                      <strong style="font-weight:bold;">Repositories:</strong> {{ ''}}
                    </p>
                  </div>
                  <div v-if="Object.keys($store.state.config_yaml.config.project_repos).length > 0" class="col-12 col-md-12">
                    <div class="table-responsive">
                    <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <thead>
                            <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Name</th>
                            <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">URL</th>
                        </thead>
                        <tbody v-for="(repo, index) in $store.state.config_yaml.config.project_repos" :key="index">
                                <tr
                                    style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                                    <td
                                        style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                        <div style="text-align:left;">
                                            {{index}}
                                        </div>
                                    </td>
                                    <td
                                        style="text-align:left;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                        {{repo.repo}}
                                    </td>

                                </tr>

                        </tbody>
                    </table>
                    </div>
                  </div>
                  <div class="col-12 col-md-8">
                    <p class="text-left" style="font-size:14px;">
                      <strong style="font-weight:bold;">Services:</strong> {{''}}
                    </p>
                  </div>

                  <div v-if="Object.keys($store.state.docker_compose.services).length > 0" class="col-12 col-md-12">
                    <div class="table-responsive">
                    <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <thead>
                            <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Name</th>
                            <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Image</th>
                            <th style="text-align:center;justify-content:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">Push Images</th>
                        </thead>
                        <tbody v-for="(service, index) in $store.state.docker_compose.services" :key="index">
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
                                        {{service.image.name}}
                                    </td>
                                    <td
                                        style="text-align:center;justify-content:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                        <i style="color:#1BC10B;" v-show="service.image.registry.push == true" class="fa fa-check-circle" aria-hidden="true"></i>
                                    </td>

                                </tr>

                        </tbody>
                    </table>
                    </div>
                  </div>

                  <div class="col-12 col-md-8">
                    <p class="text-left" style="font-size:14px;">
                      <strong style="font-weight:bold;">SQA Criterias:</strong> {{''}}
                    </p>
                  </div>

                  <div v-if="Object.keys($store.state.config_yaml.sqa_criteria).length > 0" class="col-12 col-md-12">
                    <div class="table-responsive">
                    <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <thead>
                            <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Criteria</th>
                            <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Repository and Service</th>
                            <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">When</th>
                        </thead>
                        <tbody v-for="(criteria, index) in $store.state.config_yaml.sqa_criteria" :key="index">
                                <tr
                                    style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                                    <td
                                        style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                        <div style="text-align:left;">
                                            {{index}}
                                        </div>
                                    </td>
                                    <td
                                        style="text-align:left;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                        <div v-for="(repo_criteria, index) in criteria.repos" :key="index" style="margin-top:1rem;">
                                          <div class="row">
                                            <div class="col-md-6">
                                              <p class="text-left" style="font-size:14px;margin-bottom:0px;">
                                                <strong style="font-weight:bold;">Name:</strong> {{repo_criteria.repo_url}}
                                              </p>
                                              <p class="text-left" style="font-size:14px;margin-bottom:0px;">
                                                <strong style="font-weight:bold;">Service:</strong> {{repo_criteria.container}}
                                              </p>
                                            </div>
                                            <div class="col-md-6">
                                              <p class="text-left" style="font-size:14px;margin-bottom:0;">
                                                <strong style="font-weight:bold;">Commands: </strong>
                                              </p>
                                              <p style="margin-bottom:0;">
                                                <span v-for="(command, index) in repo_criteria.commands" :key="index">
                                                  {{(index==repo_criteria.commands.length-1) ? command : command+','}}
                                                </span>
                                              </p>

                                            </div>
                                          </div>
                                        </div>

                                    </td>
                                    <td style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                      <div v-if="criteria.when && criteria.when.building_tag && criteria.when.building_tag == true">
                                        <p>On Tag Creation</p>
                                      </div>
                                      <div v-else-if="criteria.when && criteria.when.branch">
                                        <p>Branch: {{(criteria.when) ? ((criteria.when.branch) ? criteria.when.branch.pattern : '') : ''}}</p>
                                      </div>

                                    </td>
                                </tr>

                        </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              </template>
            </card>
          </div>
        </div>
        <!-- <div>
               <div class="row">
                <div class="col-3">
                  <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                    <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
                    <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
                    <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                  </div>
                </div>
                <div class="col-9">
                  <div class="tab-content" id="v-pills-tabContent">
                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">


                    </div>
                    <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
                    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                    <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
                  </div>
                </div>
              </div>
        </div> -->


        <div v-show="showFiles" class="row">
          <div class="col-12">
            <card class="strpied-tabled-with-hover"
                    body-classes=""
              >
                <template slot="header">
                  <div class="row" style="justify-content: center;">

                    <h4 class="card-title text-center" style="padding-top:5px;">Files</h4>
                    <!-- <button class="btn  btn-primary btn-simple " style="margin-bottom:5px;" @click="downloadAll()">(Download All)</button> -->


                  </div>
                </template>

                <template >
                  <ul class="nav nav-tabs nav-fill" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Main Configuration</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Composer</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Jenkinsfile</a>
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane active" id="tabs-1" role="tabpanel">

                      <div class="nav-vertical" style="padding-top:20px;">
                        <ul class="nav nav-tabs nav-left nav-border-left" role="tablist">
                          <li  v-for="(yaml,index) in yamlConfig"
                            :key="index" class="nav-item">
                            <a class="nav-link file-config" :class="{'active':index==0}" :id="'file-config-'+index" data-toggle="tab" aria-controls="tabVerticalLeft11" :href="'#tabs-config-'+index" role="tab" aria-selected="true" @click="get_data_config(index)">{{(yaml.file_name.length > 10) ? yaml.file_name.substring(0, 10)+'...' : yaml.file_name}}</a>
                          </li>

                        </ul>
                        <div class="tab-content px-1" >
                          <div v-for="(yaml,index) in yamlConfig" style="border-left: 1px solid #cccc;"
                            :key="index" class="tab-pane tab-config" :class="{'active':index==0}" :id="'tabs-config-'+index" role="tabpanel" aria-labelledby="baseVerticalLeft1-tab1">
                            <span><b> File name:</b> {{yaml.file_name}}</span>
                            <div class="col-12" style="padding-top:10px;padding-left:1rem;">
                              <button class="btn  btn-primary btn-simple" @click="downloadConfig(yaml)" :key="'button'+index+uuid" >Download</button>
                            </div>
                            <div class="col-12" style="height:40vh;overflow-y: auto;">
                              <editor :editor-id="'editor'+index" lang="yaml" :content="yaml.content" v-on:change-content="changeContentA"  :key="'editor'+index+uuid" ></editor>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div class="tab-pane" id="tabs-2" role="tabpanel">
                      <div class="col-12" style="padding-top:2rem;padding-left:1rem;">
                        <button class="btn  btn-primary btn-simple" @click="downloadComposer()">Download</button>
                      </div>
                      <div class="col-12" style="height:40vh;overflow-y: auto;">
                          <editor editor-id="editorB" lang="yaml" :content="yamlComposer" ></editor>
                      </div>
                    </div>
                    <div class="tab-pane" id="tabs-3" role="tabpanel">
                      <div class="col-12" style="padding-top:2rem;padding-left:1rem;">
                        <button class="btn  btn-primary btn-simple" @click="downloadJenkinsfile()">Download</button>
                      </div>
                      <div class="col-12" style="height:40vh;overflow-y: auto;">
                          <editor editor-id="editorC" lang='json' :content="yamlJenkinsfile" ></editor>
                      </div>
                    </div>
                  </div>
                </template>
            </card>
          </div>
        </div>
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
      </div>
  	</div>
</template>
<script>
  import { saveAs } from 'file-saver';
  import Mustache from 'mustache';
  import YAML from 'json-to-pretty-yaml'
  import JSZip from "jszip";
  import GitHub from "github-api";
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import Services from 'src/services/services.js'
  import FileSaver from 'file-saver';
  import Editor from './AceEditor'
  export default {
    components: {
		LTable,
		Card,
    'editor': Editor,
    },
    mixins: [Services],
    data () {
		return {
        name:'',
        gh:'',
        repo:'',
        currentBranch:{
          name:''
        },
        filesToCommit:[],
        filesToCommitNew:[],
        newCommit:{
          treeSHA:'',
          sha:''
        },
        showCard:false,
        showBuildUrl:false,
        showStatus:false,
        build_url:'',
        build_status:'',
        pipeline_id:'',
        disabled_button: false,
        loading: false,
        repo_pull_request:'',
        showErrorPullRequest:false,
        pull_request_url: '',
        disable_status: true,
        yamlConfig:'',
        yamlComposer:'',
        yamlJenkinsfile:'',
        editor: '',
        showFiles:false,
        disable_done: true,
        show_accordion: false,
        config_data: {},
        uuid: this.guidGenerator()
		}
    },
    watch:{
      "repo_pull_request"(val){
        if(val != ''){
          this.showErrorPullRequest = false;
        }
      }
    },
    methods:{
      guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + S4() + S4() + S4() + Date.now());
      },
      get_data_config(index){
        $('.tab-config').removeClass('active');
        $('.file-config').removeClass('active');
        $('#tabs-config-'+index).addClass('active');
        $('#file-config-'+index).addClass('active');



        this.uuid=this.guidGenerator();
      },
      next(){
         this.$router.push({name: 'Pipeline'});
      },
      back(){
         this.$router.push({name: 'SQACriteria'});
      },
      changeContentA (val) {
    	console.log(val)
    },
      deletePipeline(){
        this.loading = true;
          this.deletePipelineCall(this.pipeline_id,this.deletePipelineCallBack)
      },
      deletePipelineCallBack(response){
        if(response.status == 204){

            this.$store.state.pipeline_id='';
            this.$store.state.build_url='';
            this.$store.state.status='';
            this.$store.state.pull_request_url='';
            this.pipeline_id = '';
            this.showCard = false;
            this.disabled_button = false;
            this.disabled_status = true;

            this.notifyVue("Success","Pipeline deleted successfully.",'nc-icon nc-check-2','info');


        }else{
          if(response.status == 403){
            this.disabled_button = false;
            this.$router.replace(this.$route.query.redirect || "/logout");
          }else{
            this.notifyVue("Error ", response.status +":" + (response.data.upstream_reason) ? response.data.upstream_reason : response.data.reason,'nc-icon nc-simple-remove','danger')
          }
        }
        this.loading = false;
      },

      createPipeline(){
        var data =
                      {
                          "name": this.$store.state.name,
                          "composer_data": {
                              "services": this.$store.state.docker_compose.services,
                              "version": "3.7"
                          },
                          "config_data": [
                              {
                                  "config":{
                                    "project_repos": this.$store.state.config_yaml.config.project_repos,
                                    "credentials" : this.$store.state.config_yaml.config.credentials,
                                  },
                                  "environment" : this.$store.state.config_yaml.environment,
                                  "sqa_criteria": this.$store.state.config_yaml.sqa_criteria,
                                  "timeout": this.$store.state.config_yaml.timeout

                              }
                          ],
                          "jenkinsfile_data": {
                              "stages": [
                                  {
                                      "pipeline_config": {
                                          "base_branch": "https://github.com/jenkins-docs/simple-java-maven-app",
                                          "base_repository": "master",
                                          "config_file": "./.sqa/config.yml",
                                          "credentials_id": "userpass_dockerhub",
                                          "jepl_validator_docker_image": "eoscsynergy/jpl-validator:1.1.0"
                                      },
                                      "when": {
                                          "branches": [
                                              "master"
                                          ]
                                      }
                                  }
                              ]
                          }
                      }

        this.loading = true;

        console.log(this.$store.state)

        if(this.pipeline_id != ''){
          this.updatePipelineCall(this.pipeline_id,data,this.updatePipelineCallBack)
        }else{
          this.createPipelineCall(data,this.createPipelineCallBack)
        }
      },
      updatePipelineCallBack(response){
        if(response.status == 204){
            this.showCard = true;
            this.disabled_button = true;
            this.showFiles = true;
            this.getConfigCall(this.pipeline_id,this.getConfigCallBack);
            this.getComposerCall(this.pipeline_id,this.getComposerCallBack);
            this.getJenkCall(this.pipeline_id,this.getJenkCallBack);
            this.notifyVue("Success","Pipeline updated successfully.",'nc-icon nc-check-2','info');
            this.disable_done = false;
        }else{
           if(response.status == 403){
            this.disabled_button = false;
            this.$router.replace(this.$route.query.redirect || "/logout");
          }else{
            this.notifyVue("Error", response.status +":" + response.data.detail,'nc-icon nc-simple-remove','danger')
          }
        }
        this.loading = false;

      },
      createPipelineCallBack(response){
        if(response.status == 201){
          if (response.data.id && response.data.id != 0){
            this.pipeline_id = response.data.id;
            this.$store.state.pipeline_id = this.pipeline_id;
            this.showCard = true;
            this.disabled_button = true;
            this.showFiles = true;
            this.getConfigCall(this.pipeline_id,this.getConfigCallBack);
            this.getComposerCall(this.pipeline_id,this.getComposerCallBack);
            this.getJenkCall(this.pipeline_id,this.getJenkCallBack);
            this.disable_done = false;
            this.notifyVue("Success","Pipeline created successfully.",'nc-icon nc-check-2','info');
          }
        }else{
           if(response.status == 403){
            this.disabled_button = false;
            this.$router.replace(this.$route.query.redirect || "/logout");
          }else{
            this.notifyVue("Error", response.status +":" + response.data.detail,'nc-icon nc-simple-remove','danger')
          }
        }
        this.loading = false;

      },
      runPipeline(){
        this.loading = true;
        this.runPipelineCall(this.pipeline_id,this.runPipelineCallBack)
      },
      runPipelineCallBack(response){
        if(response.status == 200){
          if (response.data.build_url){
            this.disable_status = false;
            this.showCard = true;
            this.build_url = response.data.build_url;
            this.$store.state.build_url = this.build_url;
            this.showBuildUrl = true;
            this.notifyVue("Success","Pipeline executed successfully.",'nc-icon nc-check-2','info');
          }
        }else if(response.status == 204){
          this.disable_status = false;
          this.notifyVue("Info","Waiting for scan organization.",'nc-icon nc-simple-remove','warning')

        }else if(response.status == 403){
          this.$router.replace(this.$route.query.redirect || "/logout");
        }else{
          this.showBuildUrl = false;
          this.showBuildUrl = false;
          this.notifyVue("Error ", response.status +":" + (response.data.upstream_reason) ? response.data.upstream_reason : response.data.reason,'nc-icon nc-simple-remove','danger')
        }
        this.loading = false;
      },
      checkStatus(){
        this.loading = true;
        this.checkStatusCall(this.pipeline_id,this.checkStatusCallBack)
      },
      checkStatusCallBack(response){
        if(response.status == 200){
          if (response.data.build_status){
            this.build_status = response.data.build_status;
            this.$store.state.status = this.build_status;
            this.showStatus = true;
          }
          if (response.data.build_url){
            this.showCard = true;
            this.build_url = response.data.build_url;
            this.$store.state.build_url = this.build_url;
            this.showBuildUrl = true;
          }

        }else if(response.status == 403){
          this.showStatus = false;
          this.$router.replace(this.$route.query.redirect || "/logout");
        }else{
          this.showStatus = false;
          this.notifyVue("Error ", response.status +":" + (response.data.upstream_reason) ? response.data.upstream_reason : response.data.reason,'nc-icon nc-simple-remove','danger')
        }
        this.loading = false;
      },
      generateFiles(){
        this.downloadFileCall(this.pipeline_id,this.downloadFileCallBack);
      },
      downloadFileCallBack(response){
        if(response.status == 200){
          FileSaver(response.data,"sqaaas.zip")
        }else if(response.status == 403){
          this.$router.replace(this.$route.query.redirect || "/logout");
          this.showStatus = false;
        }else{
          this.showStatus = false;
          this.notifyVue("Error ", response.status +":" +  response.data.reason,'nc-icon nc-simple-remove','danger')
        }
      },
      pullrequest(){
        if(this.repo_pull_request == ''){
          this.showErrorPullRequest = true;
        }else{
          this.showErrorPullRequest = false;
          this.loading = true;
          var data = {
            "repo": this.repo_pull_request
          }
          this.pullRequestCall(this.pipeline_id,data,this.pullRequestCallBack);

        }
      },
      pullRequestCallBack(response){
         if(response.status == 200){
          if (response.data.pull_request_url){
            this.notifyVue("Success","Pull Request done successfully.",'nc-icon nc-simple-remove','info')
            this.repo_pull_request = ''
            this.pull_request_url = response.data.pull_request_url;
            this.$store.state.pull_request_url = this.pull_request_url;
          }
        }else if(response.status == 403){
          this.$router.replace(this.$route.query.redirect || "/logout");
        }else{
          this.notifyVue("Error ", response.status +":" + (response.data.upstream_reason) ? response.data.upstream_reason : response.data.reason,'nc-icon nc-simple-remove','danger')
        }
        this.loading = false;

      },


      downloadAll(){

        var zip = new JSZip();
        zip.folder(".sqa").file("config.yml",this.yamlConfig, {binary:true});
        zip.folder(".sqa").file("docker-compose.yml", this.yamlComposer, {binary:true});
        zip.file("Jenkinsfile",this.yamlJenkinsfile)

        zip.generateAsync({type:"blob"})
            .then(function(blob) {
                // see FileSaver.js
                saveAs(blob, "sqaaas_files.zip");
          });
      },
      objectSize(obj){
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      },
      notifyVue (title,message,icon,color) {
        this.$notify(
          {
            title: title,
            message: message,
            icon: 'nc-icon nc-app',
            timeout:4000,
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: color,
          })
      },
      checkauthCallBack(response){
        if(response.status == 401){
           this.$router.push({name:"logout"})
        }else{
          this.username = response;
        }
      },
      getConfigCallBack(response){
        console.log(response)
        if(response.status == 200){
          //  this.yamlConfig= YAML.stringify(response.data, undefined, 2)
           this.yamlConfig= response.data;
           for (var i in this.yamlConfig){
             var parts = this.yamlConfig[i].file_name.split("/");
             this.yamlConfig[i].file_name = parts[parts.length - 1];
             this.yamlConfig[i].content = YAML.stringify(this.yamlConfig[i].content, undefined, 2)
           }
           console.log(this.yamlConfig)
          //  this.config_data[this.yamlConfig[0].file_name] = this.yamlConfig[0].content
           this.config_data[this.yamlConfig[0].file_name] = YAML.stringify(this.yamlConfig[0].content, undefined, 2)
          //  this.yamlConfig=  JSON.stringify(response.data, undefined, 2);
        }
      },
      getComposerCallBack(response){
        console.log(response)
        if(response.status == 200){
           this.yamlComposer= YAML.stringify(response.data.content)
          //  this.yamlComposer= response.data
        }
      },
      getJenkCallBack(response){
        if(response.status == 200){
          this.yamlJenkinsfile= response.data.content;
          }
      },
      download(filename, text) {
        console.log(filename)
          var element = document.createElement('a');
          element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
          element.setAttribute('download', filename);

          element.style.display = 'none';
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);
        },
      downloadConfig(yaml){
          console.log(yaml)
          this.download(yaml.file_name,yaml.content)
      },
      downloadComposer(){
          this.download("docker-compose.yaml",this.yamlComposer)
      },
      downloadJenkinsfile(){
          this.download("Jenkinsfile",this.yamlJenkinsfile)
      },
  },
  created(){
    this.checkauthCall(this.checkauthCallBack);
    this.$store.state.status = '';
    this.$store.state.build_url = '';
    var sizeCriteria = this.objectSize(this.$store.state.config_yaml.sqa_criteria);
    if(sizeCriteria == 0){
      this.notifyVue("Error", "You must add at least one sqa criteria.",'nc-icon nc-simple-remove','danger')
      this.$router.push({name:"SQACriteria"})
    }else{

      // this.$store.state.pipeline_id = "bd93a679-3c91-4692-a346-176e062b2607";
      this.pipeline_id = this.$store.state.pipeline_id;
      this.createPipeline();

      this.pull_request_url = this.$store.state.pull_request_url;
      this.build_url = this.$store.state.build_url;
      this.build_status = this.$store.state.status;

        if(this.pipeline_id == ''){
          this.showCard = false;
          this.disabled_button = false;
        }else{
          this.disabled_button =true;
          this.showCard = true;
        }
        if(this.build_url == ''){
          this.showBuildUrl = false;
        }else{
          this.showBuildUrl = true;
        }
        if(this.build_status == ''){
          this.showStatus = false;
          this.disabled_status = true;
        }else{
          this.showStatus = true;
          this.disable_status = false;
        }
    }
  },
  mounted(){
    this.$eventHub.$emit('steps', 4);


  }
}
</script>
<style scoped>

.loading-overlay {
  display: none;
  background: rgba(255, 255, 255, 0.7);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9998;
  align-items: center;
  justify-content: center;
}

.loading-overlay.is-active {
  display: flex;
}

.no-margin{
  margin:0px!important;
}

.table thead th {
    border-bottom: 0px!important;
}

.table td {
    border-top: 0px!important;
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

.accordion-head i{
    font-size: 1.5em;
    float: right;
}

.accordion-head > .collapsed > i:before{
    content: "\f105";
}

.nav-vertical .nav-left.nav-tabs {
    float: left;
    border-bottom: 0;
    border-radius: 0;
    display: table;
}

.nav-vertical .nav-left.nav-tabs li.nav-item {
    float: none;
    margin: 0 -1px 0 0;
}

.nav-vertical .nav-left~.tab-content {
    margin-left: 45px;
}

.nav-vertical .nav-left~.tab-content .tab-pane.active {
    display: block;
}

.nav-vertical .nav-left~.tab-content .tab-pane {
    display: none;
    background-color: #FFF;
    padding: 0 0 .6rem 1rem;
    overflow-y: auto;
}


.nav-vertical .nav-left.nav-tabs li.nav-item a.nav-link.active {
    border: 1px solid #DDD;
    border-right: 0;
    border-radius: .25rem 0 0 .25rem;
}

.nav-vertical .nav-left.nav-tabs li.nav-item a.nav-link {
    min-width: 6.5rem;
    border-right: 1px solid #DDD;
}

.nav.nav-tabs .nav-item .nav-link.active {
    background-color: #FFF;
    border-radius: .25rem .25rem 0 0;
}
.nav-vertical .nav-left.nav-tabs.nav-border-left li.nav-item a.nav-link.active {
    border-left: 3px solid #FF7588;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    color: #555;
}
</style>
