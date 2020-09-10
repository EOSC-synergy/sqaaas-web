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
                <p class="card-category">Here is a subtitle for this table</p>
              </template>

              <template >
                <div style="padding-bottom:20px;">
                  <button class="btn  btn-primary btn-fill" @click="generateFiles()">Generate Files</button>

                </div>
                <div style="padding-bottom:20px;">
                  <button class="btn  btn-primary btn-fill" @click="renderTemplate('zip')">Render as Zip</button>

                </div>
                <div style="padding-bottom:20px;">
                  <button class="btn  btn-primary btn-fill" @click="renderTemplate('git')">Push Files</button>

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
        // var template = `
        // config:
        //   credentials:
        //       - id: {{name}}
        //         username_var: GIT_USER
        //         password_var: GIT_PASSWORD

        // sqa_criteria:
        //   qc_doc:
        //     repos:
        //       sqaaas-web:
        //         container: node
        //         commands:
        //           - >
        //             env GIT_ASKPASS=/sqaaas-web/.git_credential_helper.sh
        //             npm --prefix /sqaaas-web run deploy --
        //             --user="Diana M. Naranjo <dnaranjo@i3m.upv.es>"
        //             --repo=https://@github.com/eosc-synergy/sqaaas-web`

        var template = {
          config: {
              credentials: [
                {
                  id:"{{id}}",
                  username_var:"{{GIT_USER}}",
                  username_var:"{{GIT_PASSWORD}}",
              }
              ]
            },
          sqa_criteria:
            {
              qc_doc:{
                repos:{
                  web:{
                    container:"name",
                    commands: [
                        "npm install",
                        "npm run dev"
                    ]
                  }
                }

              }

            }


        }
        var yamlText= YAML.stringify(template)
        console.log(yamlText)

        var data = {
          name: "Scott"
        }
        var rendered = Mustache.render(yamlText, data);
        console.log(rendered)
        if(value=="zip"){
          this.generateZip(rendered)
        }else if(value == "git"){
          this.commitGithub(rendered)
        }
    },
    generateZip(rendered){
      var zip = new JSZip();
      var files_names=["config.yaml","docker-compose.yaml"]
      for (let i = 0; i < files_names.length; i++) {
        zip.folder(".sqa").file(files_names[i],rendered, {binary:true});
        zip.file("Jenkinsfile",rendered)

      }
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
  }
}
</script>
<style>
</style>
