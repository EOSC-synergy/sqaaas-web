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
                            <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Container Name</th>
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
                                        style="text-align:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                        {{service.container_name}}
                                    </td>
                                    <td
                                        style="text-align:center;justify-content:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                        {{service.image.registry.push}}
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
                            <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">Repository</th>
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
                                        style="text-align:left;padding-right: 10px; padding-left: 10px; padding-top: 5px;display:block;">
                                        <div v-for="(repo_criteria, index) in criteria.repos" :key="index" style="margin-top:1rem;">
                                          <div class="row">
                                            <div class="col-md-6">
                                              <p class="text-left" style="font-size:14px;margin-bottom:0px;">
                                                <strong style="font-weight:bold;">Name:</strong> {{index}}
                                              </p>
                                              <p class="text-left" style="font-size:14px;margin-bottom:0px;">
                                                <strong style="font-weight:bold;">Container:</strong> {{repo_criteria.container}}
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
        <div class="row">
          <div class="col-12">

            <card class="strpied-tabled-with-hover"
                  body-classes=""
            >
              <template slot="header">
                <h4 class="card-title text-center">Pipeline</h4>
              </template>

              <template >
                <div class="row text-center">

                  <div class="col-12 col-md-6" style="padding-bottom:20px;padding-left:15px;">
                    <button class="btn  btn-primary btn-fill" :disabled='disabled_button' @click="createPipeline()">Create Pipeline</button>

                  </div>
                  <div class="col-12 col-md-6" style="padding-bottom:20px;padding-left:15px;">
                    <button class="btn  btn-primary btn-fill" :disabled='!disabled_button' @click="deletePipeline()">Delete Pipeline</button>

                  </div>
                </div>
                <div class="text-center" v-show="pipeline_id != ''">
                  <span>Pipeline ID: {{pipeline_id}}</span>
                </div>
              </template>
            </card>

            <div class="row">
              <div class="col-12 col-md-6">
                <card v-show="showCard" class="strpied-tabled-with-hover"
                      body-classes=""
                >
                  <template slot="header" >
                    <h4 class="card-title text-center" style="padding-bottom:4rem;">Execute Pipeline</h4>
                  </template>

                  <template >
                    <div class="row" style="padding-bottom:20px;padding-left:15px;padding-bottom: 3rem;">
                      <!-- <div class="col-12 text-center" > -->
                        <div class="col-12 col-md-6 text-center">
                          <button class="btn  btn-primary btn-fill" @click="runPipeline()">Run pipeline</button>
                        </div>
                        <div class="col-12 col-md-6 text-center" style="padding-top:15px;" v-show="showBuildUrl">
                          <span>Build URL:  </span><a style="text-decoration: underline;" :href="build_url" target="_blank">Click here</a>
                        </div>
                      <!-- </div> -->
                    </div>
                  </template>
                </card>
              </div>

              <div class="col-12 col-md-6">
                <card v-show="showCard" class="strpied-tabled-with-hover"
                      body-classes=""
                >
                  <template slot="header" >
                    <h4 class="card-title text-center" style="padding-bottom:4rem;">Check Status of Pipeline</h4>
                  </template>

                  <template >
                    <div class="row" style="padding-bottom:20px;padding-left:15px;padding-bottom: 3rem;">
                      <div class="col-12 col-md-6 text-center">
                        <button  class="btn  btn-primary btn-fill" :disabled="disable_status" @click="checkStatus()">Check status</button>
                      </div>
                      <div class="col-12 col-md-6" v-show="showStatus" style="padding-top:15px;">
                        <span>Status: </span>
                        <span style="text-transform: uppercase;padding-right:10px;">{{build_status}}</span>
                        <i v-if="build_status == 'success'" style="color:green;" class="fa fa-check" aria-hidden="true"></i>
                        <i v-else-if ="build_status == 'FAILURE'" style="color:red;" class="fa fa-times" aria-hidden="true"></i>
                        <i v-else style="color:red;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                      </div>
                    </div>
                  </template>
                </card>
              </div>
            </div>


            <div class="row">
              <div class="col-12 col-md-6">
                <card v-show="showCard" class="strpied-tabled-with-hover"
                body-classes=""  style="height:228px;"
                >
                <template slot="header" >
                  <h4 class="card-title text-center" style="padding-bottom:2rem;">Generate Files to JePL</h4>
                </template>

                <template >

                  <div class="row" style="padding-bottom:20px;padding-left:15px;">
                    <div class="col-12 text-center">
                      <button class="btn  btn-primary btn-fill" @click="generateFiles()">Generate Files</button>
                    </div>
                  </div>
                </template>
                </card>
              </div>
              <div class="col-12 col-md-6">
                  <card v-show="showCard" class="strpied-tabled-with-hover"
                  body-classes="" style="height:228px;"
                  >
                    <template slot="header" >
                      <h4 class="card-title text-center" style="padding-bottom:2rem;">Pull Request</h4>
                    </template>

                    <template >
                      <div class="row" style="padding-bottom:20px;padding-left:15px;">
                        <div class="col-12 col-md-6">
                          <base-input type="text" class="no-margin"
                              label="Repository"
                              :disabled="false"
                              placeholder="https://github.com/EOSC-synergy/sqaaas-web.git"
                              v-model="repo_pull_request">
                          </base-input>
                          <span v-show="showErrorPullRequest" style="color:red; font-size:12px;">This field is required.</span>
                        </div>
                        <div class="col-12 col-md-6 text-center" style="margin-top:20px;">
                          <button  class="btn  btn-primary btn-fill" @click="pullrequest()">Pull Request</button>
                        </div>
                      </div>
                      <div>
                        <a :href="pull_request_url" target="_blank">{{pull_request_url}}</a>
                      </div>
                    </template>
                  </card>
              </div>
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
  import FileSaver from 'file-saver'
  export default {
    components: {
		LTable,
		Card
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
        this.createPipelineCall(data,this.createPipelineCallBack)
      },
      createPipelineCallBack(response){
        if(response.status == 201){
          if (response.data.id && response.data.id != 0){
            this.pipeline_id = response.data.id;
            this.$store.state.pipeline_id = this.pipeline_id;
            this.showCard = true;
            this.disabled_button = true;
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

      renderTemplate(value){
          if(value=="zip"){
            this.generateZip(this.$store.state)
          }else if(value == "git"){
            this.commitGithub(rendered)
          }
      },
      generateZip(rendered){
        var jenkinsfile = `
        @Library(['github.com/indigo-dc/jenkins-pipeline-library@release/2.1.0']) _

        def projectConfig

        pipeline {
            agent any

            stages {
                stage('SQA baseline dynamic stages') {
                    when {
                        anyOf {
                            branch 'master'
                        }
                    }
                    steps {
                        script {
                            projectConfig = pipelineConfig()
                            buildStages(projectConfig)
                        }
                    }
                    post {
                        cleanup {
                            cleanWs()
                        }
                    }
                }
            }
        }`
        var zip = new JSZip();

        var files_names=["config.yaml","docker-compose.yaml"]
        var yamlTextConfig= YAML.stringify(rendered.config_yaml)
        var yamlTextCompose= YAML.stringify(rendered.docker_compose)
        // for (let i = 0; i < files_names.length; i++) {

        zip.folder(".sqa").file("config.yml",yamlTextConfig, {binary:true});
        zip.folder(".sqa").file("docker-compose.yml", yamlTextCompose, {binary:true});
        zip.file("Jenkinsfile",jenkinsfile)

        // }
        zip.generateAsync({type:"blob"})
            .then(function(blob) {
                // see FileSaver.js
                saveAs(blob, "sqa_files.zip");
          });
      },
      // commitGithub(rendered){
      //   var _this = this
      //   var auth={
      //     username:'dianamariand92',
      //     password:'',
      //     repository:'test',
      //     branchName:'master'
      //   }
      //   this.filesToCommitNew = [
      //     {content: rendered, path: '.sqa/config.yaml'},
      //     // {content: 'May the Force be with you', path: 'jedi.txt'}

      //   ]
      //   this.GithubAPI(auth)
      // },
      // GithubAPI(auth) {
      //     // let repo;

      //     let gh = new GitHub(auth);

      //     this.repo =  gh.getRepo('dianamariand92', 'test');
      //       var _this = this

      //     this.setBranch('master').then(function(response){
      //       console.log(response)
      //       _this.pushFiles('Making a commit to test',_this.filesToCommitNew)
      //         .then(function() {
      //           console.log('Files committed!');
      //       });

      //     }

      //     )
      // },
      // pushFiles(message,files){
      //   var _this = this
      //   if (!this.repo) {
      //         throw 'Repository is not initialized';
      //     }
      //     if (!this.currentBranch.hasOwnProperty('name')) {
      //         throw 'Branch is not set';
      //     }

      //     return _this.getCurrentCommitSHA()
      //         .then(_this.getCurrentTreeSHA)
      //         .then( () => _this.createFiles(files) )
      //         .then(_this.createTree)
      //         .then( () => _this.createCommit(message) )
      //         .then(_this.updateHead)
      //         .catch((e) => {
      //             console.error(e);
      //         });


      // },
      // setBranch(branchName) {
      //   var _this = this
      //     if (!this.repo) {
      //         throw 'Repository is not initialized';
      //     }

      //     return this.repo.listBranches().then((branches) => {

      //         let branchExists = branches.data.find( branch => branch.name === branchName );
      //         if (!branchExists) {
      //             return _this.repo.createBranch('master', branchName)
      //                 .then(() => {
      //                     return _this.currentBranch.name = branchName;
      //                 });
      //         } else {
      //             return _this.currentBranch.name = branchName;
      //         }
      //     });
      // },

      // getCurrentCommitSHA() {
      //   var _this=this
      //   return this.repo.getRef('heads/' + _this.currentBranch.name)
      //     .then((ref) => {
      //       _this.currentBranch.commitSHA = ref.data.object.sha;
      //     });
      // },
      // getCurrentTreeSHA() {
      //   var _this=this
      //   return this.repo.getCommit(_this.currentBranch.commitSHA)
      //     .then((commit) => {
      //       _this.currentBranch.treeSHA = commit.data.tree.sha;
      //     });
      // },
      // createFiles(filesInfo) {
      //   var _this=this
      //   let promises = [];
      //   let length = filesInfo.length;
      //   for (let i = 0; i < length; i++) {
      //     promises.push(_this.createFile(filesInfo[i]));
      //   }
      //   return Promise.all(promises);
      // },
      // createFile(file) {
      //   var _this=this
      //   return this.repo.createBlob(file.content)
      //   .then((blob) => {
      //     _this.filesToCommit.push({sha: blob.data.sha,path: file.path,mode: '100644',type: 'blob'});
      //     });
      // },
      // createTree() {
      //   var _this=this
      //   console.log(_this.filesToCommit)
      //   console.log(_this.currentBranch.treeSHA)
      //   return this.repo.createTree(_this.filesToCommit, _this.currentBranch.treeSHA)
      //   .then((tree) => {
      //     console.log(tree)
      //       _this.newCommit.treeSHA = tree.data.sha;
      //     });
      // },
      // createCommit(message) {
      //   var _this=this
      //   return this.repo.commit(_this.currentBranch.commitSHA, _this.newCommit.treeSHA, message)
      //       .then((commit) => {
      //           _this.newCommit.sha = commit.data.sha;
      //     });
      // },
      // updateHead() {
      //   var _this=this
      //   return this.repo.updateHead('heads/' + _this.currentBranch.name,_this.newCommit.sha);
      // },
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
  },
  created(){
    console.log(this.$store.state)
    var sizeCriteria = this.objectSize(this.$store.state.config_yaml.sqa_criteria);
    if(sizeCriteria == 0){
      this.notifyVue("Error", "You must add at least one sqa criteria.",'nc-icon nc-simple-remove','danger')
      this.$router.push({name:"SQACriteria"})
    }

    this.pipeline_id = this.$store.state.pipeline_id;
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
}
</script>
<style>

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
</style>
