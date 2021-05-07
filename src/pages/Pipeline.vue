<template>
  	<div class="content">
      <div class="container-fluid">
        <!-- <div  v-show="loading" class="loading-overlay is-active">
          <span class="fas fa-spinner fa-3x fa-spin"></span>
        </div> -->
        <div class="col-12 col-sm-12 col-lg-10 mx-auto" style="margin:auto;padding:0px;">
          <h4 style="margin-top:0px;" class="card-title text-center">Pipeline</h4>
          <!-- <div class="row">
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
          </div>
        </div> -->
          <div class="row">
            <div class="col-12 col-md-6">
              <card  class="strpied-tabled-with-hover" style="height:75vh;"
                        body-classes=""
                  >
              <template slot="header" >
                <h4 class="card-title text-center" style="padding-bottom:1rem;">EXECUTE</h4>
              </template>

              <template >
                <div style="padding-bottom:20px;padding-bottom: 3rem;padding-left:20px;padding-right:20px;">
                    <div v-show="showBadge == false" class="text-center">
                      <img src="../../public/img/rocket.jpg" class="rounded img-fluid mx-auto" style="max-width: 20%" alt="...">
                      <p style="padding-top:20px;">Some text</p>
                      <p>Some other text</p>
                    </div>
                     <div v-show="showBadge == true" class="" id="badge" style="padding-bottom:20px;padding-left:15px;">


                    </div>


                    <div v-show="showFieldsPipeline">
                      <base-input type="text" class="no-margin"
                        label="URL"
                        :disabled="false"
                        placeholder="https://github.com/EOSC-synergy/sqaaas-web.git"
                        v-model="repo_url_mimic">
                      </base-input>
                      <base-input type="text" class="no-margin"
                          label="Branch (Optional)"
                          :disabled="false"
                          placeholder="master"
                          v-model="repo_branch_mimic">
                      </base-input>
                    </div>

                    <div style="position: absolute; bottom:40px;left: 0; right: 0; margin-left: auto; margin-right: auto; width: 100%;">
                      <div class="text-center" style="padding-top:15px;" v-show="showBuildUrl">
                        <span>Build URL:  </span><a style="text-decoration: underline;" :href="build_url" target="_blank">Click here!</a>
                      </div>
                      <div style="padding-bottom:15px;" class="text-center" v-show="showStatus">
                        {{build_status}}
                        <i v-if="build_status == 'SUCCESS'" style="color:green;" class="fa fa-check" aria-hidden="true"></i>
                        <i v-else-if ="build_status == 'FAILURE'" style="color:red;" class="fa fa-times" aria-hidden="true"></i>
                        <i v-else style="color:red;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                      </div>
                      <div v-show="!loading" class="text-center">
                        <button class="btn  btn-primary btn-fill" @click="runPipeline()">Run pipeline</button>
                      </div>
                      <div v-show="loading" class="text-center" >
                        <button type="button" class="btn btn-simple" disabled>
                            <span style="padding-right:5px;" class="btn-label"><i style="color:black;" class="fa fa-cog fa-spin fa-1x fa-fw"></i></span>Executing Pipeline...</button>
                    </div>
                    </div>
                </div>

              </template>
            </card>


            </div>
            <div class="col-12 col-md-6">
              <card  class="strpied-tabled-with-hover"
              body-classes=""  style="height:75vh;"
              >
              <template slot="header" >
                <h4 class="card-title text-center" style="padding-bottom:1rem;">GET</h4>
              </template>

              <template >
                <div style="padding-bottom:20px;padding-bottom: 3rem;padding-left:20px;padding-right:20px;">
                  <div v-show="showBadge == false" class="text-center">
                        <img src="../../public/img/get_file.png" class="rounded img-fluid mx-auto" style="max-width: 20%" alt="...">
                        <p style="padding-top:20px;">Some text</p>
                        <p>Some other text</p>
                      </div>
                  <div class="row" style="padding-top:40px;padding-bottom:20px;padding-left:15px;">
                    <div class="col-12 text-center">

                      <button type="button" class="btn btn-simple btn-primary" @click="generateFiles()">
                          <span class="btn-label"><i class="fa fa-file-text" aria-hidden="true"></i></span>sqaaas.zip
                          <span style="margin-left:10px;" class="fa-stack fa-sm">
                            <i class="fa fa-square fa-stack-2x"></i>
                            <i style="width: 85%;" class="fa fa-download fa-stack-1x fa-inverse"></i>
                          </span>
                          </button>
                    </div>
                  </div>

                  <div style="padding-bottom:20px;">
                    <div style=" position: absolute; bottom:40px;left: 0; right: 0; margin-left: auto; margin-right: auto; width: 100%;">
                      <div style="margin-left:25px;margin-right:25px;">
                        <base-input type="text" class="no-margin"
                            label="Repository"
                            :disabled="false"
                            placeholder="https://github.com/EOSC-synergy/sqaaas-web.git"
                            v-model="repo_pull_request">
                        </base-input>
                      </div>
                      <span v-show="showErrorPullRequest" style="padding-left:30px;color:red; font-size:12px;">This field is required.</span>
                      <div v-show="showURL" class="text-center" style="text-decoration: underline;">
                        <a :href="pull_request_url" target="_blank">URL</a>
                      </div>
                      <div class="text-center" style="margin-top:20px;">
                        <button  class="btn  btn-primary btn-fill" @click="pullrequest()">Pull Request</button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              </card>
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
        showBadge: false,
        stop_interval:false,
        repo_url_mimic: '',
        repo_branch_mimic:'',
        showFieldsPipeline: false,
        execute_pipeline: true,
        intervalID: '',
        autoRefresh:false,
        t:'',
        showURL:false,

		}
    },
    watch:{
      "repo_pull_request"(val){
        if(val != ''){
          this.showErrorPullRequest = false;
        }

      },
      "autoRefresh"(val) {
        if (val) {
            this.t = setInterval(() => {
                this.checkStatus()
            }, 10 * 1000)
        } else {
            clearInterval(this.t)
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


      runPipeline(){
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

          this.runPipelineCall(data,this.runPipelineCallBack)
        }else if(this.showFieldsPipeline == true && this.repo_url_mimic == ''){
          this.notifyVue("Error", "Please add the URL of the repository",'nc-icon nc-simple-remove','danger')
        }else{
          this.loading = true;
          this.runPipelineCall(data,this.runPipelineCallBack)
        }
        // console.log()
      },
      runPipelineCallBack(response){
        if(response.status == 200){
          if (response.data.build_url){
            this.disable_status = false;
            this.showCard = true;
            this.build_url = response.data.build_url;
            this.$store.state.build_url = this.build_url;
            this.showBuildUrl = true;
            this.autoRefresh = true;
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
        // this.loading = true;
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
          if(this.build_status == "SUCCESS"){
            this.getBadgeCallGET(this.pipeline_id,this.getBadgeCallBackGET)
          }



        }else if(response.status == 403){
          this.showStatus = false;
          this.$router.replace(this.$route.query.redirect || "/logout");
        }else if (response.status == 422){
          this.showStatus = false;
          this.showBuildUrl = false;
          this.$store.state.status = '';
          this.$store.state.build_url = '';
          this.notifyVue("Error ", response.status +": Pipeline has not been execute",'nc-icon nc-simple-remove','danger')

        }else{
          this.showStatus = false;
          this.notifyVue("Error ", response.status +":" + (response.data.upstream_reason) ? response.data.upstream_reason : response.data.reason,'nc-icon nc-simple-remove','danger')
        }
        // this.loading = false;
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
            this.showURL = true;
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
      getBadgeCallBackGET(response){
        if(response.status == 200){
          this.showBadge = true;
          this.autoRefresh = false;

          if($("#badge").has("blockquote").length == 0){
            $( "#badge" ).append(response.data);
          }
        }
      },
  },
  mounted(){
     this.$eventHub.$emit('steps', 5);
     var _this = this
     this.$nextTick(function () {


            // window.setInterval(() => {
            //     this.checkStatus();
            // },5000);
        })

  },
  created(){

    this.checkauthCall(this.checkauthCallBack);
    console.log(this.$store.state)
    var sizeCriteria = this.objectSize(this.$store.state.config_yaml.sqa_criteria);
    if(this.$store.state.pipeline_id == ''){
      this.notifyVue("Error", "You must create the pipeline",'nc-icon nc-simple-remove','danger')
      // this.$router.push({name:"Files"})
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
</style>
