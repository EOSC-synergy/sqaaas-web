<template>
  	<div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <card class="strpied-tabled-with-hover"
                  body-classes=""
            >
              <template slot="header">
                <h4 class="card-title">Generate Files</h4>
                <p class="card-category">Jenkinsfile, config.yml and docker-compose.yml</p>
              </template>

              <template >
                <!-- <div style="padding-bottom:20px;">
                  <button class="btn  btn-primary btn-fill" @click="generateFiles()">Generate Files</button>

                </div> -->
                <div style="padding-bottom:20px;padding-left:15px;">
                  <button class="btn  btn-primary btn-fill" @click="renderTemplate('zip')">Generate Files</button>

                </div>
                <!-- <div style="padding-bottom:20px;">
                  <button class="btn  btn-primary btn-fill" @click="renderTemplate('git')">Push Files</button>

                </div> -->
              </template>
            </card>
            <card class="strpied-tabled-with-hover"
                  body-classes=""
            >
              <template slot="header">
                <h4 class="card-title">Create Pipeline</h4>
              </template>

              <template >
                <div style="padding-bottom:20px;padding-left:15px;">
                  <button class="btn  btn-primary btn-fill" @click="createPipeline()">Create Pipeline</button>

                </div>
              </template>
            </card>

            <card v-show="showCard" class="strpied-tabled-with-hover"
                  body-classes=""
            >
              <template slot="header">
                <h4 class="card-title">Check Status</h4>
              </template>

              <template >
                <div style="padding-bottom:20px;padding-left:15px;">
                  <span>Build URL:</span><a style="margin-left: 2rem;text-decoration: underline;" :href="build_url" target="_blank">Status Information</a>
                </div>
                <div style="padding-bottom:20px;padding-left:15px;">
                  <button class="btn  btn-primary btn-fill" @click="checkStatus()">Status</button>


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
        build_url:'',
        pipeline_id:'',
		}
    },
    methods:{

      createPipeline(){
        console.log(this.$store.state.docker_compose.services)
        var services = [];
        var all_services = this.$store.state.docker_compose.services
        for (var serv in all_services){
          var volumes = []
          for (let i = 0; i < all_services[serv].volumes.length; i++) {
            var volume = {
                 "volume_source": all_services[serv].volumes[i].source,
                  "volume_target": all_services[serv].volumes[i].target,
                  "volume_type": all_services[serv].volumes[i].type
            }
            volumes.push(volume)

          }
          if(serv.command){
            var service = {
                        "command": all_services[serv].command,
                        "hostname": all_services[serv].hostname,
                        "image": all_services[serv].image,
                        "service_id": serv,
                        "volumes": volumes
                    }

          }else{
            var service = {
                          "hostname": all_services[serv].hostname,
                          "image": all_services[serv].image,
                          "service_id": serv,
                          "volumes": volumes
                      }
          }

          services.push(service);

        }

        var repos = []
        var all_repos = this.$store.state.config_yaml.config.project_repos;
        for (var repo in all_repos){
          var repo_save = {
            "branch": all_repos[repo].branch,
              "repo_id": repo,
              "repo_url":  all_repos[repo].repo
          }

          repos.push(repo_save)
        }


        var criterias=[];
        var all_criterias = this.$store.state.config_yaml.sqa_criteria;

        for(var criteria in all_criterias){
          var repos_criteria = []
          for (var i in all_criterias[criteria].repos){
            var save_repo = {
                          "build_tool": {
                              "commands": all_criterias[criteria].repos[i].commands,
                              "tox":{
                                "tox_file":all_criterias[criteria].repos[i].tox.tox_file,
                                "testenv":all_criterias[criteria].repos[i].tox.test_env
                              }
                          },
                          "container": all_criterias[criteria].repos[i].container,
                          "repo_id": i
                      }

            repos_criteria.push(save_repo)
          }

          var criteria_save = {
                                "criterion": criteria,
                                "repos": repos_criteria
                            }

           criterias.push(criteria_save);
        }

        var data = [
                      {
                          "composer_data": {
                              "services": services,
                              "version": "3.7"
                          },
                          "config_data": [
                              {
                                  "project_repos": repos,
                                  "sqa_criteria": criterias
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
            this.runPipelineCall(response.data.id,this.runPipelineCallBack)

          }
        }else{
          this.notifyVue("Error:" + response.error)
        }

      },
      runPipelineCallBack(response){
        if(response.status == 200){
          if (response.data.build_url){
            this.showCard = true;
            this.build_url = response.data.build_url
          }
        }else{
          this.notifyVue("Error:" + response.error)
        }
      },
      checkStatus(){
        this.checkStatusCall(this.pipeline_id,this.checkStatusCallBack)
      },
      checkStatusCallBack(response){
        if(response.status == 200){
          if (response.data.build_url){
            this.showCard = true;
            this.build_url = response.data.build_url
          }
        }else{
          this.notifyVue("Error:" + response.error)
        }
      },

      generateFiles(){
        var content = "What's up , hello world";
        // any kind of extension (.txt,.cpp,.cs,.bat)
        var filename = "config.yaml";

        var blob = new Blob([content], {
        type: "text/plain;charset=utf-8"
        });

        saveAs(blob, filename);
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
      commitGithub(rendered){
        var _this = this
        var auth={
          username:'dianamariand92',
          password:'',
          repository:'test',
          branchName:'master'
        }
        this.filesToCommitNew = [
          {content: rendered, path: '.sqa/config.yaml'},
          // {content: 'May the Force be with you', path: 'jedi.txt'}

        ]
        this.GithubAPI(auth)
      },
      GithubAPI(auth) {
          // let repo;

          let gh = new GitHub(auth);

          this.repo =  gh.getRepo('dianamariand92', 'test');
            var _this = this

          this.setBranch('master').then(function(response){
            console.log(response)
            _this.pushFiles('Making a commit to test',_this.filesToCommitNew)
              .then(function() {
                console.log('Files committed!');
            });

          }

          )
      },
      pushFiles(message,files){
        var _this = this
        if (!this.repo) {
              throw 'Repository is not initialized';
          }
          if (!this.currentBranch.hasOwnProperty('name')) {
              throw 'Branch is not set';
          }

          return _this.getCurrentCommitSHA()
              .then(_this.getCurrentTreeSHA)
              .then( () => _this.createFiles(files) )
              .then(_this.createTree)
              .then( () => _this.createCommit(message) )
              .then(_this.updateHead)
              .catch((e) => {
                  console.error(e);
              });


      },
      setBranch(branchName) {
        var _this = this
          if (!this.repo) {
              throw 'Repository is not initialized';
          }

          return this.repo.listBranches().then((branches) => {

              let branchExists = branches.data.find( branch => branch.name === branchName );
              if (!branchExists) {
                  return _this.repo.createBranch('master', branchName)
                      .then(() => {
                          return _this.currentBranch.name = branchName;
                      });
              } else {
                  return _this.currentBranch.name = branchName;
              }
          });
      },

      getCurrentCommitSHA() {
        var _this=this
        return this.repo.getRef('heads/' + _this.currentBranch.name)
          .then((ref) => {
            _this.currentBranch.commitSHA = ref.data.object.sha;
          });
      },
      getCurrentTreeSHA() {
        var _this=this
        return this.repo.getCommit(_this.currentBranch.commitSHA)
          .then((commit) => {
            _this.currentBranch.treeSHA = commit.data.tree.sha;
          });
      },
      createFiles(filesInfo) {
        var _this=this
        let promises = [];
        let length = filesInfo.length;
        for (let i = 0; i < length; i++) {
          promises.push(_this.createFile(filesInfo[i]));
        }
        return Promise.all(promises);
      },
      createFile(file) {
        var _this=this
        return this.repo.createBlob(file.content)
        .then((blob) => {
          _this.filesToCommit.push({sha: blob.data.sha,path: file.path,mode: '100644',type: 'blob'});
          });
      },
      createTree() {
        var _this=this
        console.log(_this.filesToCommit)
        console.log(_this.currentBranch.treeSHA)
        return this.repo.createTree(_this.filesToCommit, _this.currentBranch.treeSHA)
        .then((tree) => {
          console.log(tree)
            _this.newCommit.treeSHA = tree.data.sha;
          });
      },
      createCommit(message) {
        var _this=this
        return this.repo.commit(_this.currentBranch.commitSHA, _this.newCommit.treeSHA, message)
            .then((commit) => {
                _this.newCommit.sha = commit.data.sha;
          });
      },
      updateHead() {
        var _this=this
        return this.repo.updateHead('heads/' + _this.currentBranch.name,_this.newCommit.sha);
      },
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
  }
}
</script>
<style>
</style>
