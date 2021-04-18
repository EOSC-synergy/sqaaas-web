<template>
  <div class="content" style="background-color:#f8f9fa;">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12" style="margin-top:30px;">
            <card >
              <template slot="header">
                <h4 class="card-title text-center" style="padding-top:2rem;">SQA CRITERIA</h4>
              </template>
              <template class="card-body">
                <div class="row" style="margin:0px 1rem 2rem 1rem;">

                  <div class="col-12 col-md-6" >
                    <base-input type="text" class="no-margin"
                              label="Pipeline Name"
                              :disabled="$store.state.pipeline_id != ''"
                              placeholder="Name of the pipeline. Exmaple: worsica"
                              v-model="pipelineName">
                      </base-input>
                      <span v-show="showErrorPipeline" style="color:red; font-size:12px;">This field is required.</span>
                  </div>
                  <div class="col-12 col-md-6" style="display:grid;">
                    <div>
                      <label> Choose a criteria</label>
                      <select class="custom-select" id="sqacriteria" v-model='criteria' >
                        <option value="default">Select ...</option>
                        <option value="qc_style">qc_style</option>
                        <option value="qc_coverage">qc_coverage</option>
                        <option value="qc_functional">qc_functional</option>
                        <option value="qc_security">qc_security</option>
                        <option value="qc_doc">qc_doc</option>
                      </select>
                      <div class="text-right">
                        <a style="text-decoration: underline;" v-show="show_link" :href="criteria_link" target="_blank">Criteria Information</a>

                      </div>
                    </div>
                    <span v-show="showErrorCriteria" style="color:red; font-size:12px;">You must select a valid criteria</span>
                  </div>
                </div>
                <div class="row" style="margin:0px 1rem 2rem 1rem;">

                  <div v-show="showSelect" class="col-12 col-md-6" style="display:grid;">
                    <span>Select a repository</span>
                    <select class="custom-select" id="respository" v-model='repository' >
                      <option value="default">Choose a repository...</option>
                      <option v-for="(repo,key) in $store.state.config_yaml.config.project_repos" :key="key" :value="key">{{key}}</option>
                    </select>
                    <span v-show="showErrorRepo" style="color:red; font-size:12px;">You must select a respository</span>
                  </div>

                  <div v-show="showSelect" class="col-12 col-md-6" style="display:grid;">
                    <span>Select a service</span>
                    <select class="custom-select" id="service" v-model='service' >
                      <option value="default">Choose a service...</option>
                      <option v-for="(service,key) in $store.state.docker_compose.services" :key="key" :value="key">{{key}}</option>
                    </select>
                    <span v-show="showErrorService" style="color:red; font-size:12px;">You must select a service</span>
                  </div>
                </div>
                <h4 class="card-title text-center">Tox Tool</h4>
                <div class="row">
                    <div class="col-12 col-md-6">

                      <base-input type="text" class="col-10 no-margin"
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
                          <button type="button" class="btn-simple btn btn-xs btn-info" @click="addTestEnv()"><i style="padding-top:3px;" class="fa fa-plus"></i>ADD</button>
                        </div>
                      </div>
                      <span v-show="showErrorEnv" style="padding-left:40px;color:red; font-size:12px;">This field is required</span>

                    </div>

                </div>
                <div v-show="show_tool_tox" style="padding-top:20px;margin-bottom:2rem;">
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
                <h4 class="card-title text-center">Add Comands</h4>
                <div class="row">
                    <div class="display:grid;">
                      <base-input style="padding-left:40px;" type="text" class="no-margin"
                              label="Command"
                              :disabled="false"
                              placeholder="npm install"
                              v-model="command">
                      </base-input>
                      <span v-show="showErrorCommand" style="padding-left:40px;color:red; font-size:12px;">This field is required</span>

                    </div>
                    <div style="padding-top:30px;">
                      <button type="button" class="btn-simple btn btn-xs btn-info" @click="addCommand()"><i class="fa fa-plus"></i>ADD</button>
                    </div>

                  </div>
                  <div v-show="showCommands" style="padding-top:20px;margin-bottom:2rem;">
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
                  <div class="text-right" style="padding-top:1rem;padding-bottom:10px;">
                  <button type="button" class="btn-outline btn btn-info" @click="addCriteria()"><i class="fa fa-plus"></i>ADD CRITERIA</button>
                </div>
              </template>
            </card>


            <card>
              <template slot="header">
                <!-- <h4 class="card-title text-center">ADD Criteria</h4> -->
              </template>
                <!-- <div class="text-right" style="padding-top:1rem;padding-bottom:10px;">
                  <button type="button" class="btn-outline btn btn-info" @click="addCriteria()"><i class="fa fa-plus"></i>ADD CRITERIA</button>
                </div> -->
              <template>
                <div v-show="showCriteria" style="padding-top:20px;margin-bottom:2rem;">
                    <span class="custom-label">Configured Criterias</span>

                    <div class="table-responsive">
                    <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <thead>
                            <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Criteria</th>
                            <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Repos</th>
                            <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Customize Workspace</th>
                            <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">Remove</th>
                        </thead>
                        <tbody v-for="(repo, index) in selected_criteria" :key="index">
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
                                        {{Object.keys(repo.repos)}}
                                    </td>
                                    <td
                                        style="text-align:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                        <base-checkbox name="workpace" @input="customize_criteria(index)"></base-checkbox>
                                    </td>
                                    <td
                                        style="text-align:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                        <button type="button" class="btn-simple btn btn-xs btn-info" @click="removeCriteria(key)"><i style="font-size:15px;color:red;" class="fa fa-trash"></i>
                                        </button>
                                    </td>

                                </tr>
                                <tr>
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
                                                  :id="'select_branch_'+key"
                                                  @input="getBranch(key)"
                                                  v-model="branches[key]"
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

                                </tr>

                        </tbody>
                    </table>
                    </div>



                    <ul class="list-group">
                      <li class=" row list-group-item d-flex justify-content-between" style="margin-left:20px;margin-right:20px;"
                        v-for="(val,key) in selected_criteria"
                        :key="key"
                      >
                        <div class="row col-12" style="width:100%;">
                          <div class="col-12 col-md-6 row">
                            <div class="col-12 col-md-6">
                              <span style="width:50%;">{{key}}</span>
                              <span style="width:50%;">{{key['repos']}}</span>

                            </div>
                            <div class="col-12 col-md-6 text-right">
                              <span style="width:50%;">
                                <button type="button" class="btn-simple btn btn-xs btn-info" @click="removeCriteria(key)"><i class="fa fa-minus"></i>
                                </button>
                              </span>
                            </div>
                          </div>
                          <div class="col-12 col-md-6" style="display: flex;justify-content: flex-end;">
                            <span class="custom-label">Customize when execute?</span><base-checkbox name="workpace" @input="customize_criteria(key)"></base-checkbox>

                          </div>

                        </div>

                        <div :id="'criteria_'+key" class="row col-12" style="padding-top:20px;display:none;">
                          <div class="col-12 col-md-4" style="padding-top:28px;">
                            <select class="custom-select" :id="'select_when_'+key" @change="selectWhen(key)">
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
                                        :id="'select_branch_'+key"
                                        @input="getBranch(key)"
                                        v-model="branches[key]"
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

                      </li>

                    </ul>

                  </div>
              </template>
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
            </card>
        </div>
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
        criterias_store:{}

      }
    },
    watch:{
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
            this.showErrorCriteria = true;
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

        }
    },
    methods:{
      getBranch(item){
        console.log($('#select_branch_'+item).val())
        this.criterias_store[item]={
          building_tag: false,
          pattern:$('#select_branch_'+item).val()
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
        console.log(item)
        if($('#select_when_'+item).val() == 'building_tag'){
          $('#select_comp_'+item).prop('disabled', true);
          $('#select_branch_'+item).prop('disabled', true);
          $('#button_branch_'+item).prop('disabled', true);
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
        console.log(this.$store.state.config_yaml.sqa_criteria)
        $('#criteria_'+key).toggleClass('open-criteria',500);

        // if($('#criteria_'+key).hasClass('open-criteria') == false){
        //     this.$store.state.config_yaml.sqa_criteria[key]['when']={
        //           'branch':{
        //             "pattern": ""
        //           },
        //           'building_tag':false,
        //       };
        // }

      },
       next(){
         console.log(this.criterias_store)
        //  console.log(this.$store.state.config_yaml.sqa_criteria)

         for(const index in this.criterias_store ){
           console.log(index)
           if(Object.hasOwnProperty.call(this.$store.state.config_yaml.sqa_criteria, index)){
             this.$store.state.config_yaml.sqa_criteria[index]['when'] = Object.assign({},this.$store.state.config_yaml.sqa_criteria[index]['when'], {
               building_tag: this.criterias_store[index].building_tag,
               branch:{
                 pattern:this.criterias_store[index].pattern
               } })
            //  this.$store.state.config_yaml.sqa_criteria[i]['when']['building_tag']= this.criterias_store[i].building_tag
            //  this.$store.state.config_yaml.sqa_criteria[i]['when']['branch']['pattern']= this.criterias_store[i].pattern
            console.log(this.criterias_store[index].building_tag,this.criterias_store[index].pattern)
            console.log(this.$store.state.config_yaml.sqa_criteria[index])
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
        if(this.criteria == 'default' || this.repository == 'default' || this.service == "default" || this.pipelineName==''){
          // this.error_message = "Error: you must select a valid criteria";
          if(this.criteria == 'default'){
            this.showErrorCriteria = true;
          }else if(this.repository == 'default' || this.service == "default"){
            this.showErrorRepo = true;
            this.showErrorService = true;
          }
          if(this.pipelineName == ''){
             this.showErrorPipeline = true;
          }else{
            this.showErrorPipeline = false;
          }
          // this.notifyVue(this.error_message)
        }else{
          var commands = {}
          var tox = {}
          commands=this.commands
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
          this.clearTox();
          var sizeCriteria = this.objectSize(this.$store.state.config_yaml.sqa_criteria)
          if(sizeCriteria > 0){
            var sizeSelectCriteria = this.objectSize(this.$store.state.config_yaml.sqa_criteria[this.criteria])
             if(sizeSelectCriteria > 0){
               this.repos["repos"] = this.$store.state.config_yaml.sqa_criteria[this.criteria]["repos"]
             }

          }else{
            this.repos["repos"]={};
          }
          // this.repos.repos[this.repository] = this.$store.state.config_yaml.sqa_criteria[this.criteria];

          var repoName = this.repository
          var service = this.service
          var repo = {}
          repo={
                container:service,
                commands,
                tox
          }

          this.repos.repos[this.repository]=Object.assign({},repo)
          this.selected_criteria[this.criteria]=this.repos
          // console.log(this.selected_criteria)
          // this.store_criteria = this.selected_criteria;
          // var _this = this
          // setTimeout(function(){
          //   _this.selectWhen(_this.criteria);

          // },200)
          this.$store.state.config_yaml.sqa_criteria[this.criteria] = Object.assign({}, this.$store.state.config_yaml.sqa_criteria[this.criteria], this.repos)
          // // if(this.$store.state.config_yaml.sqa_criteria[this.criteria]['when'] == undefined){
            this.$store.state.config_yaml.sqa_criteria[this.criteria]['when']={
              branch:{
                pattern:''
              },
              building_tag:false
            }

          // }
          this.$store.state.name = this.pipelineName;
          this.commands=[];
          this.tox.file='';
          this.testenv=[];
          // console.log(this.$store.state.config_yaml.sqa_criteria)
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
    created(){

      this.checkauthCall(this.checkauthCallBack);
      console.log(this.$store.state.pipeline_id)
      this.pipelineName = this.$store.state.name
      var sizeRepos = this.objectSize(this.$store.state.config_yaml.config.project_repos);
      var sizeServices = this.objectSize(this.$store.state.docker_compose.services)
      if(sizeRepos == 0 || sizeServices == 0){
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

</style>
