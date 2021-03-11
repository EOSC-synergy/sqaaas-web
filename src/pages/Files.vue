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
                                        {{service.image}}
                                    </td>
                                    <td
                                        style="text-align:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                        {{service.container_name}}
                                    </td>
                                    <td
                                        style="text-align:center;justify-content:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                        <!-- {{service.image.registry.push}} -->
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

        <!-- <div class="row">
          <div class="col-12">
            <card class="strpied-tabled-with-hover"
                    body-classes=""
              >
                <template slot="header">
                  <div class="row" style="justify-content: center;">

                    <h4 class="card-title text-center" style="padding-top:5px;">Files</h4>
                    <button class="btn  btn-primary btn-simple " style="margin-bottom:5px;" @click="downloadAll()">(Download All)</button>


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
                      <div class="col-12" style="padding-top:2rem;padding-left:1rem;">
                        <button class="btn  btn-primary btn-simple" @click="downloadConfig()">Download</button>
                      </div>
                      <div class="col-12" style="height:25vh;overflow-y: auto;">
                        <code>
                          <pre>
                            {{yamlConfig}}
                          </pre>
                        </code>
                      </div>
                    </div>
                    <div class="tab-pane" id="tabs-2" role="tabpanel">
                      <div class="col-12" style="padding-top:2rem;padding-left:1rem;">
                        <button class="btn  btn-primary btn-simple" @click="downloadComposer()">Download</button>
                      </div>
                      <div class="col-12" style="height:25vh;overflow-y: auto;">
                        <pre>
                          <code>
                           {{yamlComposer}}
                          </code>
                        </pre>

                      </div>
                    </div>
                    <div class="tab-pane" id="tabs-3" role="tabpanel">
                      <div class="col-12" style="padding-top:2rem;padding-left:1rem;">
                        <button class="btn  btn-primary btn-simple" @click="downloadJenkinsfile()">Download</button>
                      </div>
                      <div class="col-12" style="height:25vh;overflow-y: auto;">
                        <pre>
                          <code>
                           {{yamlJenkinsfile}}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </template>
            </card>
          </div>
        </div> -->



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
        yamlConfig:'',
        yamlComposer:'',
        yamlJenkinsfile:''
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
            this.getConfigCall(this.pipeline_id,this.getConfigCallBack);
            this.getComposerCall(this.pipeline_id,this.getComposerCallBack);
            this.getJenkCall(this.pipeline_id,this.getJenkCallBack);
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
           this.yamlConfig= YAML.stringify(response.data, undefined, 2)
          //  this.yamlConfig=  JSON.stringify(response.data, undefined, 2);
        }
      },
      getComposerCallBack(response){
        console.log(response)
        if(response.status == 200){
           this.yamlComposer= YAML.stringify(response.data)
          //  this.yamlComposer= response.data
        }
      },
      getJenkCallBack(response){
        console.log(response)
        if(response.status == 200){
           this.yamlJenkinsfile= response.data;
        }
      },
      download(filename, text) {
          var element = document.createElement('a');
          element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
          element.setAttribute('download', filename);

          element.style.display = 'none';
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);
        },
      downloadConfig(){
          this.download("Config.yaml",this.yamlConfig)
      },
      // syntaxHighlight(json) {
      //   json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      //   return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      //       var cls = 'number';
      //       if (/^"/.test(match)) {
      //           if (/:$/.test(match)) {
      //               cls = 'key';
      //           } else {
      //               cls = 'string';
      //           }
      //       } else if (/true|false/.test(match)) {
      //           cls = 'boolean';
      //       } else if (/null/.test(match)) {
      //           cls = 'null';
      //       }
      //       return '<span class="' + cls + '">' + match + '</span>';
      //   });
    //}

  },
  created(){
    this.checkauthCall(this.checkauthCallBack);
    console.log(this.$store.state)
    var sizeCriteria = this.objectSize(this.$store.state.config_yaml.sqa_criteria);
    if(sizeCriteria == 0){
      this.notifyVue("Error", "You must add at least one sqa criteria.",'nc-icon nc-simple-remove','danger')
      this.$router.push({name:"SQACriteria"})
    }

    this.pipeline_id = this.$store.state.pipeline_id;
    // this.pipeline_id = "4e46b117-fe19-4336-9d9b-e62eb715092b"

    this.getConfigCall(this.pipeline_id,this.getConfigCallBack);
    this.getComposerCall(this.pipeline_id,this.getComposerCallBack);
    this.getJenkCall(this.pipeline_id,this.getJenkCallBack);

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
</style>
