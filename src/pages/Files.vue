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
                  <button class="btn  btn-primary btn-fill" @click="renderTemplate()">Render as Zip</button>
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
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  export default {
    components: {
		LTable,
		Card
    },
    data () {
		return {
        name:''
		}
    },
    methods:{
		generateFiles(rendered){
			var content = "What's up , hello world";
			// any kind of extension (.txt,.cpp,.cs,.bat)
			var filename = "config.yaml";

			var blob = new Blob([rendered], {
			type: "text/plain;charset=utf-8"
			});

			saveAs(blob, filename);
		},
		renderTemplate(){
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
        // this.generateFiles(rendered)
        this.generateZip(rendered)
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
    }
  }
}
</script>
<style>
</style>
