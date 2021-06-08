<template>
  	<div class="content">
      <div class="container-fluid">
        <div id="test"  v-show="loading" class="loading-overlay is-active" >
          <div style="padding: 20px;background-color: #ccc;border-radius: 5px;">
            <div style="vertical-align: middle;display: flex;">
              <span class="fas fa-cog fa-3x fa-spin"></span>
              <p style="padding-left: 10px;text-transform: uppercase;font-weight: 700;margin-bottom: 0px;margin-top: 15px;">{{modal_message}}</p>
            </div>
            <div>
              <p>Please, wait for this process to finish.</p>
            </div>
            <div v-show="build_status!=''" class="text-center">
              <p style="font-size:18px;font-weight:700;">Current State: {{build_status}}</p>
            </div>
            <div class="text-center">
                <button class="btn  btn-danger btn-fill" :disabled="disable_cancel" @click="cancelExecution()">Cancel</button>
              </div>
            </div>
        </div>
        <div  v-show="loading_create" class="loading-overlay is-active">
          <span class="fas fa-spinner fa-3x fa-spin"></span>
        </div>
        <div class="col-12 col-sm-12 col-lg-10 mx-auto" style="margin:auto;padding:0px;">
          <card body-classes="">
              <template slot="header">
                <div style="display:flex;flex-direction:row;padding-bottom:20px">
                  <div style="background-color:#c2edd6;padding-left:80px;padding-top:80px;padding-bottom:60px;width:60%">
                    <h2 style="margin-top:0px;font-weight:700;" class="card-title">Your pipeline has been successfully created!</h2>
                    <div style="padding-top:20px">
                      <button class="btn btn-primary btn-fill" @click="generateFiles()">Download</button>
                    </div>
                  </div>
                  <div style="background-color:#c2edd6;padding-left:80px;padding-top:20px;width:40%">
                    <img src="../../static/pipeline.png" alt="" style="opacity: 0.5;">
                  </div>
                </div>
              </template>
          </card>

          <card body-classes="">
              <template>
              <div style="background-color:#dcf3f7">
                <div style="padding: 40px 40px 40px 40px;">
                  <h3 class="text-center">Discover the additional features we provide</h3>
                </div>
                <div style="display:flex;flex-direction:row;justify-content:center">
                  <div>
                    <a href="#" style="color:inherit">
                      <p class="text-center"><img src="../../static/summary.png" alt="" style="padding-bottom:10px"></p>
                      <p class="text-center" style="font-size:20px;font-weight:bold">Config summary</p>
                      <p class="text-center" style="font-size:15px;opacity:0.8;width:220px">Provides a table-like view with the selections made when the pipeline was composed</p>
                    </a>
                  </div>
                  <div style="padding-left:140px">
                    <a href="#" style="color:inherit">
                      <p class="text-center"><img src="../../static/jepl_files.png" alt="" style="padding-left:5px;padding-bottom:10px"></p>
                      <p class="text-center" style="font-size:20px;font-weight:bold">JePL files</p>
                      <p class="text-center" style="font-size:15px;opacity:0.8;width:220px">Check out the files that drive the execution of the pipeline</p>
                    </a>
                  </div>
                  <div style="padding-left:140px">
                    <a href="#" style="color:inherit">
                      <p class="text-center"><img src="../../static/pull-request.png" alt="" style="padding-left:20px;padding-bottom:10px"></p>
                      <p class="text-center" style="font-size:20px;font-weight:bold">Pull request</p>
                      <p class="text-center" style="font-size:15px;opacity:0.8;width:220px">Create a pull request to add the pipeline to your preferred repository</p>
                      <p class="text-center"><label style="border:solid;border-width:1px;border-color:blue;color:blue;padding:2px 2px 2px 2px">Github only</label></p>
                    </a>
                  </div>
                  <div style="padding-left:140px">
                    <a href="#" style="color:inherit">
                      <p class="text-center"><img src="../../static/play.png" alt="" style="padding-bottom:10px"></p>
                      <p class="text-center" style="font-size:20px;font-weight:bold;">Try out</p>
                      <p class="text-center" style="font-size:15px;opacity:0.8;width:220px">Execute the composed pipeline and check the results</p>
                    </a>
                  </div>
                </div>
              </div>
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
                            <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">URL</th>
                        </thead>
                        <tbody v-for="(repo, index) in $store.state.config_yaml.config.project_repos" :key="index">
                                <tr
                                    style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
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
                      <strong style="font-weight:bold;">SQA Criteria:</strong> {{''}}
                    </p>
                  </div>

                  <div v-if="Object.keys($store.state.config_yaml.sqa_criteria).length > 0" class="col-12 col-md-12">
                    <div class="table-responsive">
                    <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <thead>
                            <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Criteria</th>
                            <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">External Repository and Service</th>
                            <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">When</th>
                        </thead>
                        <tbody v-for="(criteria, index) in $store.state.config_yaml.sqa_criteria" :key="index">
                                <tr
                                    style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px;">
                                    <td
                                        style="padding-right: 10px; padding-left: 10px; padding-top: 5px;vertical-align: top;">
                                        <div style="text-align:left;">
                                            {{index}}
                                        </div>
                                    </td>
                                    <td
                                        style="text-align:left;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                        <div v-for="(repo_criteria, index) in criteria.repos" :key="index" >
                                          <div class="row">
                                            <div class="col-md-6">
                                              <p class="text-left" style="font-size:14px;margin-bottom:0px;">
                                                <strong style="font-weight:bold;">Name:</strong> {{(repo_criteria.repo_url != 'default')?repo_criteria.repo_url:''}}
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
                                                <span style="font-size:14px;" v-for="(command, index) in repo_criteria.commands" :key="index">
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
          <div v-show="showFiles" class="row">
            <div class="col-12">
              <card class="strpied-tabled-with-hover"
                      body-classes=""
                >
                  <template slot="header">
                    <div class="row" style="justify-content: center;">
                        <h4 class="card-title text-center" style="padding-top:5px;font-weight:700;">Pipeline files (JePL format)</h4>
                      <!--  -->
                      <!-- <button class="btn  btn-primary btn-simple " style="margin-bottom:5px;" @click="downloadAll()">(Download All)</button> -->


                    </div>
                  </template>

                  <template >

                    <div class="row">
                      <div class="col-12 text-center">

                        <button type="button" class="btn btn-simple btn-primary" @click="generateFiles()">
                            <i class="fa fa-file-text" aria-hidden="true"></i>Get as ZIP
                              <i class="fa fa-download "></i>
                            </button>
                      </div>
                    </div>


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
                              <span style="padding-left:15px;padding-top:40px;"><b> File name:</b> {{yaml.file_name}}</span>
                              <!-- <div class="col-12" style="padding-top:10px;padding-left: 15px;">
                                <button class="btn  btn-primary btn-simple" @click="downloadConfig(yaml)" :key="'button'+index+uuid" >Download <i class="fa fa-download" aria-hidden="true"></i></button>
                              </div> -->
                              <div class="col-12" style="height:40vh;overflow-y: auto;">
                                <editor :editor-id="'editor'+index" lang="yaml" :content="yaml.content" v-on:change-content="changeContentA"  :key="'editor'+index+uuid" ></editor>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                      <div class="tab-pane" id="tabs-2" role="tabpanel">
                        <!-- <div class="col-12" style="padding-top:2rem;padding-left:0px;">
                          <button class="btn  btn-primary btn-simple" @click="downloadComposer()">Download <i class="fa fa-download" aria-hidden="true"></i> </button>
                        </div> -->
                        <div class="col-12" style="padding-top:2rem;height:40vh;overflow-y: auto;">
                            <editor editor-id="editorB" lang="yaml" :content="yamlComposer" ></editor>
                        </div>
                      </div>
                      <div class="tab-pane" id="tabs-3" role="tabpanel">
                        <!-- <div class="col-12" style="padding-top:2rem;padding-left:0px;">
                          <button class="btn  btn-primary btn-simple" @click="downloadJenkinsfile()">Download <i class="fa fa-download" aria-hidden="true"></i></button>
                        </div> -->
                        <div class="col-12" style="padding-top:2rem;height:40vh;overflow-y: auto;">
                            <editor editor-id="editorC" lang='json' :content="yamlJenkinsfile" ></editor>
                        </div>
                      </div>
                    </div>

                    <div style="padding-bottom:20px;margin-top:2rem;">
                      <p class="text-center" style="font-weight:700;">Pull Request</p>
                      <div class="col-12 col-md-6 mx-auto mb-3">

                        <label >Repository</label>
                        <div class="input-group">
                          <input type="text" style="height: 42px;border-right: 1px solid #AAAAAA;" class="form-control" placeholder="https://github.com/EOSC-synergy/sqaaas-web.git" aria-label="https://github.com/EOSC-synergy/sqaaas-web.git" aria-describedby="basic-addon2" v-model="repo_pull_request">
                          <div class="input-group-append">
                            <button class="btn btn-outline-secondary" :disabled='showErrorPullRequest' style="border-width:1px; border-color:#3472F7;color:#3472F7;" type="button" @click="pullrequest()">Pull  <i class="fa fa-upload" aria-hidden="true"></i></button>
                          </div>
                        </div>
                        <label >Branch (Optional)</label>
                        <div class="">
                          <input type="text"  class="form-control" placeholder="master" aria-label="master" aria-describedby="basic-addon2" v-model="repo_pull_request_branch">
                        </div>
                      </div>
                      <!-- <span v-show="showErrorPullRequest==false" style="padding-left:30px;color:red; font-size:12px;">This field is required.</span> -->
                      <div v-show="showURL" class="text-center" style="text-decoration: underline;">
                        <a class="btn btn-primary btn-fill" :href="pull_request_url" target="_blank">Go to PR!</a>
                      </div>
                    </div>
                  </template>
              </card>
            </div>
          </div>
          <div v-show="showRunPipeline" class="row">
            <div class="col-12">
              <card  class="strpied-tabled-with-hover"
                        body-classes=""
                  >
              <template slot="header" >
                <h4 class="card-title text-center" style="padding-bottom:1rem;font-weight:700;">Pipeline Execution</h4>
              </template>

              <template >
                <div style="padding-bottom:20px;padding-bottom: 3rem;padding-left:20px;padding-right:20px;">


                    <!-- <div v-show="showStatusBar">
                      <div class="requestProgress">
                        <div class="bar">
                        </div>
                      </div>
                      <div class="text-center">
                        <button type="button" class="btn btn-simple" disabled>
                              <span style="padding-right:5px;" class="btn-label"><i style="color:#00a77e;" class="fa fa-refresh fa-spin fa-1x fa-fw"></i></span>Loading the pipeline status</button>
                      </div>
                    </div> -->


                    <div class="row" v-show="showFieldsPipeline">
                      <base-input class="col-12 col-md-6 no-margin" type="text"
                        label="URL of the pipeline's target repository"
                        :disabled="false"
                        placeholder="https://github.com/EOSC-synergy/sqaaas-web.git"
                        v-model="repo_url_mimic">
                      </base-input>
                      <base-input class="col-12 col-md-6 no-margin"
                          label="Branch of the pipeline's target repository (Optional)"
                          :disabled="false"
                          placeholder="master"
                          v-model="repo_branch_mimic">
                      </base-input>
                    </div>
                    <div class="text-center" v-show="showFieldsPipeline">
                      <p style="font-style:italic;color: #A7A1A0;margin-bottom:0px;"><i style="color:#A7A1A0;" class="fa fa-bell" aria-hidden="true"></i> Repositories MUST be public for the checkout to work.</a></p>
                    </div>

                    <div class="text-center" style="padding-top:25px;" v-show="showBuildUrl">
                      <a class="btn btn-primary btn-fill" :href="build_url" target="_blank">Go to Build URL!</a>
                    </div>
                    <div style="padding-bottom:15px;" class="text-center" v-show="showStatus">
                      <span style="font-weight:700;">{{possible_status[build_status]}}</span>
                      <i v-if="build_status == 'SUCCESS'" style="color:green;" class="fa fa-check" aria-hidden="true"></i>
                      <i v-else-if ="build_status == 'FAILURE'" style="color:red;" class="fa fa-times" aria-hidden="true"></i>
                      <i v-else style="color:red;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    </div>
                    <div v-show="showBadge == true" class="" id="badge" style="padding-top:20px;padding-left:15px;">
                    </div>
                    <!-- <div class="text-center">
                      <button class="btn  btn-primary btn-fill" @click="runPipeline()">Run pipeline</button>
                    </div> -->
                    <!-- <div v-show="loading_run" class="text-center" >
                      <button type="button" class="btn btn-simple" disabled>
                          <span style="padding-right:5px;" class="btn-label"><i style="color:black;" class="fa fa-cog fa-spin fa-1x fa-fw"></i></span>Executing Pipeline...</button>
                    </div> -->
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
                  <button @click="runPipeline()" type="button" class="btn btn-next btn-next-back">
                      Run/Try Pipeline
                  </button>
              </div>
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
        loading_create: false,
        repo_pull_request:'',
        repo_pull_request_branch:'',
        showErrorPullRequest:true,
        pull_request_url: '',
        disable_status: true,
        yamlConfig:[],
        // yamlScript:'',
        yamlComposer:'',
        yamlJenkinsfile:'',
        editor: '',
        showFiles:false,
        disable_done: true,
        show_accordion: false,
        config_data: {},
        uuid: this.guidGenerator(),
        showURL:false,
        showFieldsPipeline: false,
        showRunPipeline : false,
        showBadge: false,
        repo_url_mimic: '',
        repo_branch_mimic:'',
        t:'',
        disable_cancel : true,
        autoRefresh:false,
        modal_message : '',
        possible_status:{
          'WAITING_FOR_SCAN':'SCANING ORGANIZATION',
          'NOT_EXECUTED':'NOT EXECUTED',
          'NOT_EXECUTED':'NOT EXECUTED',
          'QUEUED':'QUEUED',
          'RUNNING':'RUNNING',
          'SUCCESS':'SUCCESS',
          'FAILURE':'FAILURE',
        }
		}
    },
    watch:{
      "repo_pull_request"(val){
        if(val != ''){
          this.showErrorPullRequest = false;
        }else{
          this.showErrorPullRequest = true;
        }
      },
      "autoRefresh"(val) {
        console.log(val)
        if (val) {
            this.t = setInterval(() => {
                this.checkStatus()
            }, 3 * 1000)
        } else {
            clearInterval(this.t)
        }
      }
    },
    methods:{
      cancelExecution(){
        console.log('here')
        this.autoRefresh = false;
        this.loading = false;
      },
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

        this.loading_create = true;

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
            this.getBuilderScriptCall(this.pipeline_id,this.getBuilderScriptCallBack);
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
        this.loading_create = false;

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
            this.getBuilderScriptCall(this.pipeline_id,this.getBuilderScriptCallBack);
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
        this.loading_create = false;

      },
      runPipeline(){
        this.showRunPipeline = true;
        console.log(this.$store.state.config_yaml)
        for (var criteria in this.$store.state.config_yaml.sqa_criteria){
          for (let i = 0; i < this.$store.state.config_yaml.sqa_criteria[criteria].repos.length; i++) {
            if(this.$store.state.config_yaml.sqa_criteria[criteria].repos[i].repo_url == ''){
              this.showFieldsPipeline = true
            }

          }

        }

        var data = {
          id:this.pipeline_id,
          url:this.repo_url_mimic,
          branch:this.repo_branch_mimic
        }
        if(this.showFieldsPipeline == false){
          this.loading = true;
          this.modal_message = 'Submitting Pipeline ...';
          this.runPipelineCall(data,this.runPipelineCallBack)
        }else if(this.showFieldsPipeline == true && this.repo_url_mimic == ''){
          this.notifyVue("Warning", "Please add the info of the target repository",'nc-icon nc-simple-remove','warning')
        }else{
          this.loading = true;
          this.modal_message = 'Submitting Pipeline ...';
          this.runPipelineCall(data,this.runPipelineCallBack)
        }
        // console.log()
      },
      runPipelineCallBack(response){
        console.log(response)
        if(response.status == 200){
          if (response.data.build_url){
            this.disable_status = false;
            this.showCard = true;
            // this.build_url = response.data.build_url;
            // this.$store.state.build_url = this.build_url;
            // this.showBuildUrl = true;
            this.autoRefresh = true;
            this.showFieldsPipeline = false;

            // this.notifyVue("Success","Pipeline executed successfully.",'nc-icon nc-check-2','info');
          }
        }else if(response.status == 204){
          this.disable_status = false;
          this.autoRefresh = true;
          // this.notifyVue("Info","Waiting for scan organization.",'nc-icon nc-simple-remove','warning')

        }else if(response.status == 403){
          this.$router.replace(this.$route.query.redirect || "/logout");
          this.loading = false;
        }else{
          this.showBuildUrl = false;
          this.showBuildUrl = false;
          this.notifyVue("Error ", response.status +":" + (response.data.upstream_reason) ? response.data.upstream_reason : response.data.reason,'nc-icon nc-simple-remove','danger')
          this.loading = false;
        }
      },
      checkStatus(){
        // this.showStatusBar = true;
        this.modal_message = 'Executing Pipeline ...'
        this.checkStatusCall(this.pipeline_id,this.checkStatusCallBack)
      },
       checkStatusCallBack(response){
        if(response.status == 200){
          this.disable_cancel = false;
          if (response.data.build_status != 'NOT_EXECUTED'){
            this.build_status = response.data.build_status;
            this.$store.state.status = this.build_status;
            this.showStatus = true;
          }

          if (response.data.build_url != ''){
            this.showCard = true;
            this.build_url = response.data.build_url;
            this.$store.state.build_url = this.build_url;
            this.showBuildUrl = true;
          }

          console.log(response.data.build_status)
          if(response.data.build_status == 'SUCCESS'){
            this.showStatusBar = false;
            if(response.data.openbadge_id != null){
              this.getBadgeCallGET(this.pipeline_id,this.getBadgeCallBackGET)
            }
            this.loading = false;
            this.autoRefresh = false;
          }

          if(this.build_status == "FAILURE"){
            this.loading = false;
            this.autoRefresh = false;
          }

        }else if(response.status == 403){
          this.autoRefresh = false;
          this.showStatus = false;
          this.loading = false;
          this.$router.replace(this.$route.query.redirect || "/logout");
        }else if (response.status == 422){
          this.autoRefresh = false;
          this.showStatus = false;
          this.showBuildUrl = false;
          this.$store.state.status = '';
          this.$store.state.build_url = '';
          this.loading = false;
          this.notifyVue("Error ", response.status +": Pipeline has not been execute",'nc-icon nc-simple-remove','danger')

        }else{
          this.autoRefresh = false;
          this.showStatus = false;
          this.notifyVue("Error ", response.status +":" + (response.data.upstream_reason) ? response.data.upstream_reason : response.data.reason,'nc-icon nc-simple-remove','danger')
          this.loading = false;
        }
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
          this.loading_create = true;
          var data = {
            "repo": this.repo_pull_request,
            "branch": this.repo_pull_request_branch
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
            this.showURL = true;
          }
        }else if(response.status == 403){
          this.$router.replace(this.$route.query.redirect || "/logout");
        }else{
          this.notifyVue("Error ", response.status +":" + (response.data.upstream_reason) ? response.data.upstream_reason : response.data.reason,'nc-icon nc-simple-remove','danger')
        }
        this.loading_create = false;

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
          this.yamlConfig=[];
          //  this.yamlConfig= response.data;
           for (var i in response.data){
             var parts = response.data[i].file_name.split("/");
             var file = {
               file_name:parts[parts.length - 1],
               content: YAML.stringify(response.data[i].content, undefined, 2)
             }
             this.yamlConfig.push(file)
           }
           console.log(this.yamlConfig)
          // this.getBuilderScriptCall(this.pipeline_id,this.getBuilderScriptCallBack);
        }
      },
      getBuilderScriptCallBack(response){
        console.log(response)
        if(response.status == 200){
          for (var i in response.data){
             var parts = response.data[i].file_name.split("/");
             var file = {
               file_name:parts[parts.length - 1],
               content: YAML.stringify(response.data[i].content, undefined, 2)
             }
             this.yamlConfig.push(file)
           }
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
      getBadgeCallBackGET(response){
        if(response.status == 200){
          this.showBadge = true;

          if($("#badge").has("blockquote").length == 0){
            $( "#badge" ).append(response.data);
          }
        }
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
          this.showRunPipeline = true;
          this.showBuildUrl = true;
        }
        if(this.build_status == ''){
          this.showStatus = false;
          // this.disabled_status = true;
        }else{
          this.showRunPipeline = true;
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

/* .custom-link {
  text-decoration: none;
  background-color: #EEEEEE;
  color: #333333;
  padding: 2px 6px 2px 6px;
  border-top: 1px solid #CCCCCC;
  border-right: 1px solid #333333;
  border-bottom: 1px solid #333333;
  border-left: 1px solid #CCCCCC;
} */

@media (min-width: 992px){
    .col-lg-10 {
        -ms-flex: 0 0 83.333333%;
        -webkit-box-flex: 0;
        flex: 0 0 83.333333%;
        max-width: 100%;
  }
 }

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
    width: 20%!important;
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
