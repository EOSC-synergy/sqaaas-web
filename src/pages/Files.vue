<template>
  	<div class="content">
      <div class="container-fluid">
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
              </template>
            </card>

            <card v-show="showCard" class="strpied-tabled-with-hover"
                  body-classes=""
            >
              <template slot="header" >
                <h4 class="card-title text-center" style="padding-bottom:4rem;">Actions</h4>
              </template>

              <template >
                <div class="row" style="padding-bottom:20px;padding-left:15px;padding-bottom: 3rem;">
                  <div class="col-md-6 text-center" >
                    <button class="btn  btn-primary btn-fill" @click="runPipeline()">Run pipeline</button>
                    <div style="padding-top:15px;" v-show="showBuildUrl">
                      <span>Build URL:  </span><a style="text-decoration: underline;" :href="build_url" target="_blank">Click here</a>

                    </div>

                  </div>
                  <div class="col-md-6 text-center">
                    <button  class="btn  btn-primary btn-fill" @click="checkStatus()">Check status</button>
                     <div class="" v-show="showStatus" style="padding-top:15px;">
                      <span>Status: </span>
                      <span style="text-transform: uppercase;padding-right:10px;">{{build_status}}</span>
                      <i v-if="build_status == 'success'" style="color:green;" class="fa fa-check" aria-hidden="true"></i>
                      <i v-else style="color:red;" class="fa fa-times" aria-hidden="true"></i>

                    </div>
                  </div>
                </div>

                <div class="row" style="padding-bottom:20px;padding-left:15px;">
                  <div class="col-md-6 text-center">
                    <button class="btn  btn-primary btn-fill" @click="renderTemplate('zip')">Generate Files</button>
                  </div>
                  <div class="col-md-6 text-center" >
                    <button  class="btn  btn-primary btn-fill" @click="checkStatus()">Pull Request</button>
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
  import { saveAs } from 'file-saver';
  import Mustache from 'mustache';
  import YAML from 'json-to-pretty-yaml'
  import JSZip from "jszip";
  import GitHub from "github-api";
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import Services from 'src/services/services.js'
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
		}
    },
    methods:{
      deletePipeline(){
          this.deletePipelineCall(this.pipeline_id,this.deletePipelineCallBack)

      },
      deletePipelineCallBack(response){
        if(response.status == 201){

            this.pipeline_id = '';
            this.$store.state.pipeline_id = this.pipeline_id;
            this.showCard = false;
            this.disabled_button = false;


        }else{
          this.disabled_button = false;
          this.notifyVue("Error:" + response.error)
        }
      },

      createPipeline(){
        var data = [
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
                                  "sqa_criteria": this.$store.state.config_yaml.sqa_criteria
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
                  ]
        console.log(data)
        this.createPipelineCall(data,this.createPipelineCallBack)
      },
      createPipelineCallBack(response){
        if(response.status == 201){
          if (response.data.id && response.data.id != 0){
            this.pipeline_id = response.data.id;
            this.$store.state.pipeline_id = this.pipeline_id;
            this.showCard = true;
            this.disabled_button = true;


          }
        }else{
          this.disabled_button = false;
          this.notifyVue("Error:" + response.error)
        }

      },
      runPipeline(){
        this.runPipelineCall(this.pipeline_id,this.runPipelineCallBack)
      },
      runPipelineCallBack(response){
        if(response.status == 200){
          if (response.data.build_url){
            this.showCard = true;
            this.build_url = response.data.build_url;
            this.showBuildUrl = true;
          }
        }else{
          this.showBuildUrl = false;
          this.notifyVue("Error:" + response.error)
        }
      },
      checkStatus(){
        this.checkStatusCall(this.pipeline_id,this.checkStatusCallBack)
      },
      checkStatusCallBack(response){
        if(response.status == 200){
          if (response.data.build_status){
            this.build_status = response.data.build_status;
            this.showStatus = true;
          }
        }else{
          this.showStatus = false;
          this.notifyVue("Error:" + response.error)
        }
      },


      renderTemplate(value){
        console.log(this.$store.state)
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
        console.log(yamlTextConfig)
        var yamlTextCompose= YAML.stringify(rendered.docker_compose)
        console.log(yamlTextCompose)
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
      notifyVue (message) {
        this.$notify(
          {
            message: message,
            icon: 'nc-icon nc-simple-remove',
            timeout:3000,
            horizontalAlign: 'center',
            verticalAlign: 'top',
            type: 'danger'
          })
      },
  },
  created(){
    var sizeCriteria = this.objectSize(this.$store.state.config_yaml.sqa_criteria);
    console.log(sizeCriteria)
    if(sizeCriteria == 0){
      this.notifyVue("Error you must add at least one sqa criteria")
      this.$router.push({name:"SQACriteria"})
    }
    this.pipeline_id = this.$store.state.pipeline_id;
    if(this.pipeline_id == ''){
      this.showCard = false;
      this.disabled_button = false;
    }else{
      this.disabled_button =true;
      this.showCard = true;
    }
  }
}
</script>
<style>
</style>
