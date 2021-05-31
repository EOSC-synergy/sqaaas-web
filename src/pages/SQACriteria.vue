<template>
  <div class="content" style="background-color:#f8f9fa;">
    <div class="container-fluid">
      <div class="col-12 col-sm-12 col-lg-8 mx-auto" style="margin:auto;padding:0px;">
        <h4 style="margin-top:0px;font-weight:700;" class="card-title text-center">The quality criteria allows you to define the work expected of the CI/CD pipeline. It is then the underpinning part where the pipeline’s purpose takes shape.</h4>
        <card >
          <template slot="header">
            <div class="text-center" style="padding-left:20px;padding-top:20px;">
              <!-- <p style="font-weight:700;">The quality criteria allows you to define the work expected of the CI/CD pipeline. It is then the underpinning part where the pipeline’s purpose takes shape.</p> -->
              <p><i style="color: #0073ff;" class="fa fa-info-circle" aria-hidden="true"></i> Use the dropdown list to select the specific criterion you would like to fulfill. Then fill in the requested data.</p>
            </div>
          </template>
          <template class="card-body">
            <div style="margin:0px 0px 2rem 0px;">
              <div class="row" style="padding-bottom:0px;margin-bottom:0px;padding-left:15px;padding-right: 15px;">
                <div class="col-6">
                  <label> Choose a criteria</label>
                  <select class="custom-select" id="sqacriteria" v-model='criteria'>
                    <option value="default">Select ...</option>
                    <option value="QC.Sty">QC.Sty</option>
                    <option value="QC.Uni">QC.Uni</option>
                    <option value="QC.Fun">QC.Fun</option>
                    <option value="QC.Sec">QC.Sec</option>
                    <option value="QC.Doc">QC.Doc</option>
                  </select>
                </div>
                <div v-show="criteria != 'default'" class="col-12" style="margin-top:20px;;background-color:#E1DFDE;border-radius:5px;">
                  <p style="margin-bottom:0px;">
                    <span style="font-weight:700; font-family: consola;"> {{criteria}}: </span>
                    <span style="font-style:italic;">{{(info[criteria]) ? info[criteria].p1 : ''}}</span>
                    (<a style="text-decoration: underline" :href="(info[criteria]) ? info[criteria]['link'] : ''" target="_blank">See More</a>)
                  </p>
                  <p style="margin-bottom:0px"><i><u>Improves:</u></i> {{(info[criteria]) ? info[criteria].p2 : ''}}</p>
                </div>
              </div>
              <div class="text-center">
                <span v-show="showErrorCriteria" style="color:red; font-size:12px;padding-left:20px;">You must select a valid criteria</span>
              </div>
            </div>
            <div class="row" style="margin:0px 0px 2rem 0px;">



              <div v-show="showSelect" class="col-12 col-md-6" style="display:grid;">
                <label>Select the service</label>
                <select class="custom-select" id="service" v-model='service' >
                  <option value="default">Choose a service...</option>
                  <option v-for="(service,key) in $store.state.docker_compose.services" :key="key" :value="key">{{key}}</option>
                </select>
                <span v-show="showErrorService" style="color:red; font-size:12px;">You must select a service</span>
              </div>

              <div v-show="showSelect && objectSize($store.state.config_yaml.config.project_repos) > 0" class="col-12 col-md-6" style="display:grid;">
                <label>Select an External Repository</label>
                <select class="custom-select" id="respository" v-model='repository'  >
                  <option value="default">Choose a repository...</option>
                  <option v-for="(repo,key) in $store.state.config_yaml.config.project_repos" :key="key" :value="repo.repo">{{repo.repo}}</option>
                </select>
                <span v-show="showErrorRepo" style="color:red; font-size:12px;">You must select a respository</span>
              </div>
            </div>

            <div v-show="showCredInfo" style="padding-top:20px;margin-bottom:2rem;">
              <span class="custom-label">Credentials</span>
              <div class="table-responsive">
                <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <thead>
                        <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">ID</th>
                        <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">USER</th>
                        <th style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">PASS</th>
                    </thead>
                    <!-- <tbody v-for="(repo, index) in selected_criteria" :key="index"> -->
                    <tbody v-for="(cred, index) in $store.state.config_yaml.config.credentials" :key="index">
                            <tr
                                style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                                <td
                                    style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                    <div style="text-align:left;">
                                        {{cred.id}}
                                    </div>
                                </td>
                                <td
                                    style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                    <div style="text-align:center;">
                                        {{cred.username_var}}
                                    </div>
                                </td>
                                <td
                                    style="padding-right: 10px; justify-content:center; padding-left: 10px; padding-top: 5px;">
                                    <div style="text-align:center;">
                                        {{cred.password_var}}
                                    </div>
                                </td>
                            </tr>
                    </tbody>
                </table>
              </div>
            </div>
            <div v-show="criteria != 'default'" class="row" style="padding-bottom:0px;margin-bottom:0px;padding-left:15px;padding-right:15px;">
              <h5 style="font-weight:700;padding-left:15px;">Builder settings</h5>
              <p style="padding-left:15px;font-size:14px;">According to the programming language in use, you can choose between builders. As a catch-all builder you might prefer to use the list of commands that you commonly use for carrying out the work aligned with the given criterion.</p>
              <div class="col-12 col-md-6">
                <label> Choose a builder tool</label>
                <select class="custom-select" id="sqacriteria" v-model='builder_tool' >
                  <option value="default">Select ...</option>
                  <option value="tox">TOX</option>
                  <option value="command">COMMANDS</option>
                </select>
              </div>
            </div>
            <div>
                <span v-show="showErrorBuilderTool" style="color:red; font-size:12px;padding-left:20px;">You must select a builder tool.</span>
              </div>
            <div class="row" style="padding-top:20px;" v-show="showToxBuilder">
                <div class="col-12 col-md-6">

                  <base-input type="text" class="col-12 no-margin"
                          label="Tox file"
                          :disabled="false"
                          placeholder="/myrepo-testing/tox.ini"
                          v-model="tox.file">
                  </base-input>
                  <span v-show="showErrorFile" style="padding-left:40px;color:red; font-size:12px;">This field is required</span>
                </div>
                <div class="col-12 col-md-6" style="display:grid;">
                  <div style="display:flex;">
                    <base-input type="text" class="col-10 no-margin"
                            label="Test env"
                            :disabled="false"
                            placeholder="stylecheck"
                            v-model="tox.env">
                    </base-input>
                    <div class="col-2"  style="padding-top:30px;padding-left:0px;">
                      <button type="button" class="btn-simple btn btn-xs btn-info" @click="addTestEnv()"><i style="padding-top:3px;" class="fa fa-plus"></i>ADD Tox Env</button>
                    </div>
                  </div>
                  <span v-show="showErrorEnv" style="padding-left:40px;color:red; font-size:12px;">This field is required</span>

                </div>

            </div>
            <div v-show="show_tool_tox" style="padding-top:20px;padding-right:15px;margin-bottom:2rem;">
              <span class="custom-label">Test Env</span>

              <ul class="list-group">
                <li style="padding-left:40px;" class="list-group-item d-flex justify-content-between"
                  v-for="(env,key) in testenv"
                  :key="key"
                >
                {{env}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removetestEnv(key)"><i class="fa fa-minus"></i></button></span>

                </li>

              </ul>
            </div>
            <div class="row" style="padding-top:20px;" v-show="showCommandBuilder">
              <div class="col-12 row">
                <div class="col-10">
                  <base-input style="padding-left:15px;" type="text" class="no-margin"
                          label="Command"
                          :disabled="false"
                          placeholder="npm install"
                          v-model="command">
                  </base-input>
                  <span v-show="showErrorCommand" style="padding-left:20px;color:red; font-size:12px;">This field is required</span>

                </div>
                <div class="col-2" style="padding-top:30px;">
                  <button type="button" class="btn-simple btn btn-xs btn-info" @click="addCommand()"><i class="fa fa-plus"></i>ADD Command</button>
                </div>
              </div>
            </div>
            <div v-show="showCommands" style="padding-top:20px;padding-right:15px;margin-bottom:2rem;">
              <span class="custom-label">Commands</span>
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between"
                  v-for="(command,key) in commands"
                  :key="key"
                >
                {{command}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeCommand(key)"><i class="fa fa-minus"></i></button></span>

                </li>

              </ul>
            </div>
            <div class="text-right" style="padding-top:4rem;padding-bottom:10px;">
              <button type="button" class="btn-outline btn btn-info" @click="addCriteria()"><i class="fa fa-plus"></i>ADD CRITERIA</button>
            </div>

            <div v-show="showCriteria" style="padding-top:40px;margin-bottom:2rem;">
                <span class="custom-table-title" style="te">Configured Criteria</span>
                <div class="table-responsive">
                  <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <thead>
                          <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Criteria</th>
                          <th v-show='$store.state.config_yaml.config.project_repos.length>0' style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">External Repos</th>
                          <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Services</th>
                          <!-- <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Builder</th> -->
                          <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Customize Workspace</th>
                          <th style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">Remove</th>
                      </thead>
                      <!-- <tbody v-for="(repo, index) in selected_criteria" :key="index"> -->
                      <tbody v-for="(repo, index) in selected_criteria" :key="index">
                              <tr
                                  style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                                  <td
                                      style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                      <div style="text-align:left;">
                                          {{index}}
                                      </div>
                                  </td>
                                  <td v-show='$store.state.config_yaml.config.project_repos.length>0'
                                      style="text-align:left;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                      <!-- {{Object.keys(repo.repos)}} -->
                                      {{get_string_repos(repo)}}
                                  </td>
                                  <td
                                      style="text-align:left;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                      {{get_string_services(repo)}}
                                  </td>
                                  <!-- <td
                                      style="text-align:left;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                      {{get_string_builder(repo)}}
                                  </td> -->
                                  <td
                                      style="text-align:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                      <base-checkbox name="workpace" @input="customize_criteria(index)"></base-checkbox>
                                  </td>
                                  <td
                                      style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                      <button type="button" class="btn-simple btn btn-xs btn-info" @click="removeCriteria(index)"><i style="font-size:15px;color:red;" class="fa fa-trash"></i>
                                      </button>
                                  </td>

                              </tr>
                              <tr>

                                <td colspan="5">
                                  <div :id="'criteria_'+index" class="row col-12" style="padding-top:20px;display:none;">
                                    <div class="col-12 col-md-4" style="padding-top:28px;">
                                      <select class="custom-select" :id="'select_when_'+index" @change="selectWhen(index)">
                                        <!-- <option value="default"></option> -->
                                        <option value="branch">branch</option>
                                        <!-- <option value="tag">tag</option> -->
                                        <option value="building_tag">building tag</option>
                                      </select>


                                    </div>
                                    <!-- <div class="col-12 col-md-4" style="padding-top:28px;">
                                      <select class="custom-select" :id="'select_comp_'+key" >
                                        <option value="default"></option>
                                        <option value="anyOf">anyOf</option>
                                        <option value="allOf">allOf</option>
                                        <option value="not">not</option>
                                      </select>
                                    </div> -->
                                    <div class="col-12 col-md-4">
                                      <div class="row">
                                        <div class="display:grid;">
                                          <base-input type="text"  class="no-margin"
                                                  :label="'Branch'"
                                                  placeholder="master"
                                                  :id="'select_branch_'+index"
                                                  @input="getBranch(index)"
                                                  v-model="branches[index]"
                                                  >
                                          </base-input>
                                          <span v-show="showErrorCommand" style="color:red; font-size:12px;">This field is required</span>

                                        </div>
                                        <!-- <div style="padding-top:30px;">
                                          <button type="button" :id="'button_branch_'+key" class="btn-simple btn btn-xs btn-info" @click="addExecute(key)"><i class="fa fa-plus"></i>ADD</button>
                                        </div> -->


                                      </div>
                                    </div>


                                  </div>

                                </td>
                                <td style="display: none;"></td>
                                <td style="display: none;"></td>
                                <td style="display: none;"></td>
                                <td style="display: none;"></td>

                              </tr>

                      </tbody>
                  </table>
                </div>
            </div>
            <div class="row" style="margin-top:2rem; margin-bottom:2rem;">
              <div class="col-12 col-md-12 text-center">
                  <button @click="back()" type="button" class="btn btn-next-back btn-back" >
                      BACK
                  </button>
                  <button @click="next()" type="button" :disabled="disable_done"  class="btn btn-next btn-next-back">
                      NEXT
                  </button>
              </div>
            </div>
          </template>
        </card>
      <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import jwtDecode from "jwt-decode"
  import YAML from 'json-to-pretty-yaml'
  import Mustache from 'mustache';
  import Services from '../services/services'
  export default {
    components: {
      Card
    },
    mixins: [Services],
    data () {
      return {
        pipelineName:'',
        criteria:'default',
        repository:'default',
        service:'default',
        repos:{"repos":{}},
        command:'',
        commands:[],
        tox:{
          file:'',
          env:''
        },
        showCommands:false,
        testenv:[],
        show_tool_tox:false,
        error_message:'',
        show_link:false,
        criteria_link:'',
        showCriteria:false,
        selected_criteria:{},
        showSelect:false,
        showErrorRepo:false,
        showErrorService:false,
        showErrorCriteria:false,
        showErrorCommand: false,
        showErrorFile: false,
        showErrorEnv:false,
        showErrorPipeline:false,
        disable_done: true,
        when_types:false,
        cust_exec:false,
        branches:[],
        store_criteria:{},
        criterias_store:{},
        showCredInfo:false,
        builder_tool: 'default',
        showToxBuilder:false,
        showCommandBuilder:false,
        showErrorBuilderTool:false,
        info:{
          'QC.Sty':{
            'p1':'Use code style standards to guide your code writing so you let others  understand it.',
            'p2':'readability, reusability',
            'link':'https://indigo-dc.github.io/sqa-baseline/#code-style-qc.sty'
          },
          'QC.Uni':{
            'p1':'Test the behaviour of segments or units within your code (e.g. conditionals, loops, functions).',
            'p2':'design, bug detection',
            'link':'https://indigo-dc.github.io/sqa-baseline/#unit-testing-qc.uni'
          },
          'QC.Fun':{
            'p1':'Ensure compliance with the functional requirements to meet your users’ expectations.',
            'p2':'end-user satisfaction',
            'link':'https://indigo-dc.github.io/sqa-baseline/#functional-testing-qc.fun'
          },
          'QC.Sec':{
            'p1':'Secure your software by finding (statically) common issues associated to the programming language in use and look for disclosed security vulnerabilities.',
            'p2':'security issues detection',
            'link':'https://indigo-dc.github.io/sqa-baseline/#security-qc.sec'
          },
          'QC.Doc':{
            'p1':'Treat documentation as code by using markup languages to automatically build and place it in online repositories.',
            'p2':'outreach capacity, documentation maintenance',
            'link':'https://indigo-dc.github.io/sqa-baseline/#documentation-qc.doc'
          }
        }

      }
    },
    watch:{
      'builder_tool'(val){
        console.log(val)
        if(val=='tox'){
          this.showToxBuilder = true;
        }else{
          this.showToxBuilder = false;
        }
        if(val=='command'){
          this.showCommandBuilder = true;
        }else{
          this.showCommandBuilder = false;
        }
        if(val=='default'){
          this.showToxBuilder = false;
          this.showCommandBuilder = false;
          this.showErrorBuilderTool = true;
        }else{
          this.showErrorBuilderTool = false;
        }
      },
      'criteria'(val){
        if(val != "default"){
          this.show_link = true;
          this.showSelect = true;
          this.showErrorCriteria = false;
          if(val == "qc_style"){
            this.criteria_link = ""
          }else if(val == "qc_coverage"){
            this.criteria_link=""
          }else if(val == "qc_functional"){
            this.criteria_link = ""
          }else if(val == "qc_security"){
            this.criteria_link = ""
          }else if(val == "qc_doc"){
            this.criteria_link == ""
          }
        }else{
          this.show_link = false;
          this.showSelect = false;
          // this.showErrorCriteria = true;
        }
      },
      'repository'(val){
        if(val != "default"){
          this.showErrorRepo = false;
        }
      },

      'repository'(val){
        if(val != "default"){
          this.showErrorRepo = false;
        }

      },
      'service'(val){
        if(val != "default"){
          this.showErrorService = false;
        }

      },
      'tox.file'(val){
        if(val != ''){
          this.showErrorFile = false;
        }else{
          this.showErrorFile = true;
        }
      }
    },
    methods:{
      // get_string_builder(repos){

      // },
      get_string_repos(repos){
        var all_repos = ''
        for (let i = 0; i < repos.repos.length; i++) {
          if(repos.repos[i].repo_url){
            all_repos = all_repos.concat(repos.repos[i].repo_url)
            if(i != repos.repos.length -1){
              all_repos = all_repos.concat(', ');
            }
          }

        }
        return(all_repos)
      },
      get_string_services(repos){
        var all_repos = ''
        for (let i = 0; i < repos.repos.length; i++) {
          if(repos.repos[i].container){
            all_repos = all_repos.concat(repos.repos[i].container)
            if(i != repos.repos.length -1){
              all_repos = all_repos.concat(', ');
            }
          }

        }
        return(all_repos)
      },

      getBranch(item){
        this.criterias_store[item]={
          building_tag: false,
          pattern:$('#select_branch_'+item.replace(/\./g,"\\.")).val()
        }
        // this.$store.state.config_yaml.sqa_criteria[item]['when']={

        //     'branch':{
        //       "pattern": $('#select_branch_'+item).val()
        //     },
        //     'building_tag':false,

        // };
        // console.log(this.$store.state.config_yaml.sqa_criteria)
        console.log(this.criterias_store)
      },
      // addExecute(item){
      //    if($('#select_when_'+item).val() == 'branch'){
      //     var branch = {
      //       comparator: $('#select_comp_'+item).val(),
      //       type: 'branch'
      //     }
      //     var branch_name =  $('#select_branch_'+item).val();
      //     this.$store.state.config_yaml.sqa_criteria[item]['when']['branch'][branch_name] = branch;
      //    }
      //   console.log( this.$store.state.config_yaml.sqa_criteria[item])
      // },
      selectWhen(item){
        if($('#select_when_'+item.replace(/\./g,"\\.")).val() == 'building_tag'){
          $('#select_comp_'+item.replace(/\./g,"\\.")).prop('disabled', true);
          $('#select_branch_'+item.replace(/\./g,"\\.")).prop('disabled', true);
          $('#button_branch_'+item.replace(/\./g,"\\.")).prop('disabled', true);
          // this.criterias.when.building_tag = true;
          // for(var i in _this.store_criteria ){
          //   console.log(_this.store_criteria[i])
          //   if(i == item){
          //     console.log('here')
          //     // this.store_criteria[i].when.building_tag = true
          //     // this.store_criteria[i]={}
          //     _this.store_criteria[item]['when']={
          //       'building_tag':true
          //     }
          //   }
          // }
          this.criterias_store[item]={
            'building_tag': true,
            'pattern': ''
          }
          // if(this.$store.state.config_yaml.sqa_criteria[item]){
          //   // this.$store.state.config_yaml.sqa_criteria[item]['when']['building_tag']=true
          //   this.$store.state.config_yaml.sqa_criteria[item]['when']={
          //       'branch':{
          //         "pattern": ""
          //       },
          //       'building_tag':true,
          //   };
          // }
          console.log(this.criterias_store)

        }else{
            $('#select_comp_'+item).prop('disabled', false);
            $('#select_branch_'+item).prop('disabled', false);
            $('#button_branch_'+item).prop('disabled', false);
              this.criterias_store[item]={
              'building_tag': false,
              'pattern': ''
            }
            // if(this.$store.state.config_yaml.sqa_criteria[item]){
            //   this.$store.state.config_yaml.sqa_criteria[item]['when']={
            //       'branch':{
            //         "pattern": ""
            //       },
            //       'building_tag':false,
            //   };
            // }
        }
      },
      customize_criteria(key){
        console.log(key.replace(/\./g,"\\."))
        $('#criteria_'+key.replace(/\./g,"\\.")).toggleClass('open-criteria',500);
      },
       next(){
         for(const index in this.criterias_store ){
           if(Object.hasOwnProperty.call(this.$store.state.config_yaml.sqa_criteria, index)){
             if(this.criterias_store[index].pattern != ''){
               this.$store.state.config_yaml.sqa_criteria[index]['when'] = Object.assign({},this.$store.state.config_yaml.sqa_criteria[index]['when'], {
                 building_tag: this.criterias_store[index].building_tag,
                 branch:{
                   pattern:this.criterias_store[index].pattern
                 } })
             }else{
               this.$store.state.config_yaml.sqa_criteria[index]['when'] = Object.assign({},this.$store.state.config_yaml.sqa_criteria[index]['when'], {
                 building_tag: this.criterias_store[index].building_tag,
                //  branch:{
                //    pattern:this.criterias_store[index].pattern
                //  }
                 })
             }
           }


          }
          console.log(this.$store.state.config_yaml.sqa_criteria)
         this.$router.push({name: 'Files'});
      },
      back(){
         this.$router.push({name: 'composer'});
      },
      notifyVue (message) {

        this.$notify(
          {
            title: "Error",
            message: message,
            icon: 'nc-icon nc-app',
            timeout:3000,
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'danger'
          })
      },
      addCriteria(){
        console.log(this.commands)
        console.log(this.testenv)

        // || (this.repository == 'default' && this.objectSize(this.$store.state.config_yaml.config.project_repos) > 0)
        if(this.criteria == 'default' || this.service == "default" || (this.commands.length == 0 && this.testenv.length == 0) ){
          if(this.criteria == 'default'){
            this.showErrorCriteria = true;
          }
          if(this.service == "default"){
            this.showErrorService = true;
          }
          // if(this.repository == 'default' && this.objectSize(this.$store.state.config_yaml.config.project_repos) > 0 ){
          //   console.log('here here here')
          //   this.showErrorRepo = true;
          // }
          if(this.commands.length == 0 && this.testenv.length == 0){
            if(this.builder_tool != 'default'){
              if(this.builder_tool == 'command'){
                if(this.command == ''){
                  this.showErrorCommand = true;
                }
              }else if(this.builder_tool == 'tox'){
                if(this.tox.env == '' || this.tox.file == ''){
                  if(this.tox.env == '' ){
                    this.showErrorEnv = true
                  }
                  if(this.tox.file == '' ){
                    this.showErrorFile = true
                  }
                }
              }
            }else{
              this.showErrorBuilderTool = true;
            }
          }

        }else{
          var commands = {
            commands : this.commands
          }
          var tox = {}
          // commands=this.commands
          tox={
            tox_file:this.tox.file,
            testenv: this.testenv
          }
          this.showCriteria = true;
          this.disable_done = false;
          this.clearCommand();
          this.showCommands = false;
          this.showErrorRepo = false;
          this.showErrorService = false;
          this.showErrorCriteria = false;
          this.show_tool_tox = false;

          this.repos["repos"]=[];
          var sizeCriteria = this.objectSize(this.$store.state.config_yaml.sqa_criteria)
          if(sizeCriteria > 0){
            var sizeSelectCriteria = this.objectSize(this.$store.state.config_yaml.sqa_criteria[this.criteria])
             if(sizeSelectCriteria > 0){
               this.repos["repos"] = this.$store.state.config_yaml.sqa_criteria[this.criteria]["repos"]
             }
          }
          var repo = {}
          repo={
                  repo_url: (this.repository!='default')?this.repository:'',
                  container: this.service,
            }
          if (this.commands.length > 0){
            repo=Object.assign(repo, commands)
          }
           if (this.testenv.length > 0){
            repo=Object.assign(repo, tox)
          }
          this.repos["repos"].push(repo)
          this.selected_criteria[this.criteria]=Object.assign({}, this.selected_criteria[this.criteria], this.repos)
          this.$store.state.config_yaml.sqa_criteria[this.criteria] = Object.assign({}, this.$store.state.config_yaml.sqa_criteria[this.criteria], this.repos)
          this.clearTox();
          this.commands=[];
          this.tox.file='';
          this.testenv=[];
          this.showErrorFile = false;
          console.log( this.$store.state.config_yaml.sqa_criteria)
        }
      },
      removeCriteria(key){
        this.$delete(this.selected_criteria,key)
        this.$store.state.config_yaml.sqa_criteria = this.selected_criteria;
        if (this.isEmpty(this.selected_criteria)) {
          this.showCriteria = false;
          this.disable_done = true;
        }

      },
      addCommand(){
        if(this.command == ''){
          this.showErrorCommand = true;
        }else{
          this.showErrorCommand = false;
          this.commands.push(this.command);
          this.showCommands = true;
          this.command = '';
        }
      },
      removeCommand(key){
        this.$delete(this.commands,key)
        if (this.isEmpty(this.commands)) {
          this.showCommands = false;
        }

      },
      clearCommand(){
        this.command = '';
      },
      clearTox(){
        this.tox.file = '';
        this.testenv = [];
      },
      addTestEnv(){
        if(this.tox.env == '' || this.tox.file == ''){
          if(this.tox.env == '' ){
            this.showErrorEnv = true
          }
          if(this.tox.file == '' ){
            this.showErrorFile = true
          }
        }else{
          this.showErrorEnv = false
          this.showErrorTest = false
          this.testenv.push(this.tox.env);
          this.show_tool_tox = true;
          this.tox.env = ''
        }

      },
      removetestEnv(key){
        this.$delete(this.testenv,key)
        if (this.isEmpty(this.testenv) || this.tox.file == '') {
          this.show_tool_tox = false;
        }

      },
      isEmpty(obj) {
        for(var key in obj) {
          if(obj.hasOwnProperty(key))
            return false;
        }
        return true;
      },
      objectSize(obj){
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
      },
      checkauthCallBack(response){
        if(response.status == 401){
           this.$router.push({name:"logout"})
        }else{
          this.username = response;
        }
      }


    },
    mounted(){
       this.$eventHub.$emit('steps', 3);
    },
    created(){
      console.log(this.info)
      this.checkauthCall(this.checkauthCallBack);
      if(this.$store.state.config_yaml.config.credentials.length > 0){
        this.showCredInfo = true;
      }
      // this.pipelineName = this.$store.state.name
      var sizeRepos = this.objectSize(this.$store.state.config_yaml.config.project_repos);
      var sizeServices = this.objectSize(this.$store.state.docker_compose.services)
      console.log(this.$store.state.docker_compose.services)
      // if(sizeRepos == 0 || sizeServices == 0){
      if(sizeServices == 0){
        this.notifyVue("Error you must add at least one service")
        this.$router.push({name:"composer"})

      // }else if(this.$store.state.docker_compose.id_cred_service == ""){
      //   this.notifyVue("Error you must enter the ID of the credential in Jenkins.")
      //   this.$router.push({name:"composer"})

      }else{
        var sizeCriteria = this.objectSize(this.$store.state.config_yaml.sqa_criteria);
        var getCriteria = this.$store.state.config_yaml.sqa_criteria
        for (var i in getCriteria){
          this.selected_criteria[i] = getCriteria[i];
        }
        if(sizeCriteria != 0){
          this.showCriteria = true;
          this.disable_done = false;
        }else{
          this.showCriteria = false;
          this.disable_done = true;
        }
      }

    }
  }
</script>
<style scoped>
.custom-table-title{
  padding-top:5px;
  /* padding-left:20px; */
  text-transform: uppercase;
  font-size:16px;
  color:black;
  font-weight:700,

}
.custom-label{
  padding-top:5px;
  padding-left:20px;
  color: #9A9A9A;

}
input[type=number]::-webkit-inner-spin-button {
  opacity: 1;
}

.no-margin{
  margin:0px!important;
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

.open-criteria{
  display: flex!important;
}
@media (min-width: 992px){
    .col-lg-8 {
        -ms-flex: 0 0 83.333333%;
        -webkit-box-flex: 0;
        flex: 0 0 83.333333%;
        max-width: 100%;
  }
 }

 @media (min-width: 1200px) {
    .col-lg-8 {
        -ms-flex: 0 0 83.333333%;
        -webkit-box-flex: 0;
        flex: 0 0 83.333333%;
        max-width: 70%;
    }
  }

</style>
