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
                <div style="padding-bottom:20px;">
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
                <div style="padding-bottom:20px;">
                  <button class="btn  btn-primary btn-fill" @click="generateFiles()">Create Pipeline</button>

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
  export default {
    components: {
		LTable,
		Card
    },
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
        }
		}
    },
    methods:{
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
