<template>
  <div class="content" style="background-color:#f8f9fa;">
    <div class="container-fluid">
      <div  v-show="loading" class="loading-overlay is-active">
         <span class="fas fa-spinner fa-3x fa-spin"></span>
      </div>
      <div  v-show="loadingError" class="loading-overlay is-active">
         <div class="text-center" style="padding: 20px;background-color: #ccc;border-radius: 5px;">
            <div>
              <p style="font-size:20px;">We are having problems making the request.</p>
            </div>
            <div class="text-center">
              <i class="fa fa-times-circle fa-10x" style="color:red;width:auto" aria-hidden="true"></i>
            </div>
            <div style="padding-top:20px;">
              <a style="font-size:18px;color:red; text-decoration:underline;"  href="https://github.com/EOSC-synergy/SQAaaS/issues/new/choose" target="_blank">Report the issue</a>
            </div>
            <div style="padding-top:20px;">
                <button style="margin-left:10px;" class="btn btn-sm btn-danger btn-fill" @click="cancelExecution()">Cancel</button>
            </div>
          </div>
      </div>
      <div class="col-12 col-sm-12 col-xl-6 col-lg-10 mx-auto" style="margin:auto;padding:0px;">

        <card >
          <template slot="header">
            <div style="display:flex;flex-direction:row;padding-bottom:15px;">
              <div style="background-color:#e6ede8;padding-left:100px;padding-top:20px;padding-bottom:10px;width:80%">
                <h3 style="margin-top:0px;font-weight:700;" class="card-title">Quality criteria define the CI/CD pipeline work</h3>
                <p style="padding-top:20px">
                    <!--<i style="color: #0073ff;" class="fa fa-info-circle" aria-hidden="true"></i>-->
                    It is then the underpinning part where the pipeline’s purpose takes shape. The associated properties for each criterion will be displayed once selected in the dropdown list below
                </p>
                <div>
                  <div class="row" style="padding-bottom:0px;margin-bottom:0px;padding-left: 15px;">
                      <div class="" style="padding-bottom:10px">
                        <label style="color:black;"> CHOOSE A CRITERION</label>
                        <select style="font-family: console;font-weight: 700;" class="custom-select" id="sqacriteria" v-model='criteria'>
                          <option value="default">Select ...</option>
                          <option v-for="(crit,key) in array_criterias" :key="key" :value="crit['id']">{{crit['id']}}</option>


                        </select>
                      </div>
                      <div v-show="criteria != 'default'" style="margin:auto;border-radius:5px;">
                        <div class="quote-custom">
                        <!--<p style="margin-bottom:0px;padding-left:100px;padding-top:20px">
                          <span style="padding-left:150px;font-weight:700;font-size:40px;font-family: consola;"> {{criteria}}: </span>-->
                          <p style="font-weight:700;font-size:16px;font-style:italic;padding-left:40px">{{(info[criteria]) ? info[criteria].p1 : ''}}
                          (<a style="text-decoration: underline" :href="(info[criteria]) ? info[criteria]['link'] : ''" target="_blank">See More</a>)</p>
                        <!--</p>-->
                        </div>
    <!--
                        <p style="margin-bottom:0px"><i><u>Improves:</u></i> {{(info[criteria]) ? info[criteria].p2 : ''}}</p>
    -->
                      </div>
                  </div>
                  <div class="text-center">
                    <span v-show="showErrorCriteria" style="color:red; font-size:12px;padding-left:20px;">You must select a valid criteria</span>
                  </div>
                </div>
              </div>
              <div style="background-color:#e6ede8;padding-left:80px;padding-top:35px;padding-bottom:10px;width:30%">
                <img src="../../static/criteria.png" class="responsive" alt="" style="opacity: 0.4;padding-top:40px;">
              </div>
            </div>
          </template>
          <template class="card-body">


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
                    <tbody >
                            <tr v-for="(cred, index) in $store.state.config_yaml.config.credentials" :key="index"
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
             <div class="row" style="margin:2rem 0px 2rem 0px;">
               <!-- v-show="showSelect && objectSize( $store.state.docker_compose.services) > 0" -->


              <div v-show="showSelect && objectSize($store.state.config_yaml.config.project_repos) > 0" class="col-12 col-md-6" style="display:grid;">
                <div class="row">
                  <span class="custom-label" style="text-transform:uppercase;font-size: 12px;">Does the criterion apply to an outside repo?</span><base-checkbox style="font-size:12px;" name="env" v-model="disable_menu"></base-checkbox>
                </div>
                <div>
                  <select :disabled="!disable_menu" class="custom-select" id="respository" v-model='repository'  >
                    <option value="default">CHOOSE A REPOSITORY...</option>
                    <option v-for="(repo,key) in $store.state.config_yaml.config.project_repos" :key="key" :value="repo.repo">{{repo.repo}}</option>
                  </select>
                  <p v-show="showErrorRepoCrit" style="color:red; font-size:12px;padding-left:20px; padding-top:10px;">Error: You can only select one repo per criteria.</p>
                  <span v-show="showErrorRepo" style="color:red; font-size:12px;">You must select a respository</span>
                </div>
              </div>
            </div>
            <div v-show="criteria != 'default'" class="row" style="padding-bottom:0px;margin-bottom:0px;padding-left:15px;padding-right:15px;">
              <h5 style="font-weight:700;padding-left:15px;">Builder settings</h5>
              <p style="padding-left:15px;font-size:14px;">According to the programming language in use, you can choose between builders. As a catch-all builder you might prefer to use the list of commands that you commonly use for carrying out the work aligned with the given criterion.</p>
              <div class="col-12 col-md-6">
                <label> CHOOSE A BUILDER TOOL</label>
                <select class="custom-select" id="sqacriteria" v-model='builder_tool' >
                  <option value="default">Select ...</option>
                  <option style="text-transform:capitalize;" v-for="(tool,key) in array_tools" :key="key" :value="tool['name']">{{tool['name'].toUpperCase()}}</option>
                  <!-- <option value="tox">TOX</option>
                  <option value="command">COMMANDS</option> -->
                </select>
              </div>
              <div v-show="showBuilderTool" class="text-left col-12 col-md-6" style="padding-top:25px;">
                <button style="max-height:40px;" type="button" class="btn  btn-info" @click="addTool()"><i class="fa fa-plus"></i>ADD TOOL</button>
              </div>
            </div>
            <div>
              <span v-show="showErrorBuilderTool" style="color:red; font-size:12px;padding-left:20px;">You must select a builder tool.</span>
            </div>

            <div class="col-12" style="margin-top:20px;" id='tools' v-show="showBuilderTool">
              <div id="ref-arg"></div>
            </div>

            <div class="text-right">
              <span v-show="showErrorArgs" style="color:red; font-size:12px;padding-left:20px;">Invalid value for the selected tool.</span>
            </div>

            <div class="col-12">
              <span>Image: {{builder_tool}}</span>
            </div>

             <div v-show="showSelect"  class="col-12 col-md-6" style="display:grid;">
                <label>SELECT THE SERVICE</label>
                <select class="custom-select" id="service" v-model='service' >
                  <option value="default">Choose a service...</option>
                  <option v-for="(service,key) in $store.state.docker_compose.services" :key="key" :value="key">{{key}}</option>
                </select>
                <button type="button" class="btn-simple btn btn-xs btn-info text-left" @click="openModal()"><i class="fa fa-plus"></i>Service</button>
                <span v-show="showErrorService" style="color:red; font-size:12px;">For the selected tool you must select a service.</span>
              </div>



             <div v-show="array_selected_tools.length > 0" style="padding-top:40px;margin-bottom:2rem;">
                <div class="text-center" style="padding-bottom:10px;">
                  <span class="custom-table-title" style="te">Selected Tools</span>
                </div>
                <div class="table-responsive">
                  <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <thead>
                          <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Tool</th>
                          <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Arguments</th>
                          <th style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">Remove</th>
                      </thead>
                      <tbody v-for="(tool, index) in array_selected_tools" :key="index">
                        <tr
                            style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                            <td
                                style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                <div style="text-align:left;text-transform: uppercase;">
                                    {{array_selected_tools[index].name}}
                                </div>
                            </td>
                            <td
                                style="text-align:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                <div :id="'list-arg'+index" style="text-align:center;">
                                    {{startListArg(tool['args'], index)}}
                                </div>

                            </td>
                            <td
                                style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                <button type="button" class="btn-simple btn btn-xs btn-info" @click="removeTool(index)"><i style="font-size:15px;color:red;" class="fa fa-trash"></i>
                                </button>
                            </td>

                        </tr>
                      </tbody>
                  </table>
                </div>
            </div>



            <div class="text-right" style="padding-top:4rem;padding-bottom:10px;">
              <button type="button" class="btn-outline btn btn-info"  @click="addCriteria()" :disabled="array_selected_tools.length == 0 || disabled_add_crit == true"><i class="fa fa-plus"></i>ADD CRITERION</button>
            </div>

            <div v-show="Object.keys(selected_criteria).length > 0" style="padding-top:40px;margin-bottom:2rem;">
                <div class="text-center" style="padding-bottom:10px;">
                  <span class="custom-table-title" style="te">Configured Criteria</span>
                </div>
                <div class="table-responsive">
                  <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <thead>
                          <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Criteria</th>
                          <th v-show='$store.state.config_yaml.config.project_repos.length>0' style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">External Repos</th>
                          <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Services</th>
                          <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Customize Workspace</th>
                          <th style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">Remove</th>
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
                                  <td v-show='$store.state.config_yaml.config.project_repos.length>0'
                                      style="text-align:left;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                      {{get_string_repos(repo)}}
                                  </td>
                                  <td
                                      style="text-align:left;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                      {{get_string_services(repo)}}
                                  </td>
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

                                <td colspan="4" style="">
                                  <div :id="'criteria_'+index" class="" style="display:none;justify-content: flex-end;">
                                    <div class="row">
                                      <div class="col-12 col-md-3" style="padding-top:28px;">
                                        <select class="custom-select" :id="'select_when_'+index" @change="selectWhen(index)">
                                          <option value="branch">branch</option>
                                          <option value="building_tag">building tag</option>
                                        </select>


                                      </div>
                                      <div class="col-12 col-md-3" style="padding-top:28px;">
                                        <select class="custom-select" :id="'select_comp_'+index" >
                                          <option value="equals">equals</option>
                                          <option value="not">not</option>
                                        </select>
                                      </div>
                                      <div class="col-12 col-md-3">
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

                                          </div>
                                        </div>
                                      </div>
                                      <div class="col-12 col-md-2">
                                          <button style="position:absolute;bottom:0;" type="button" class="btn-simple btn btn-xs btn-info" @click="addWhenProp(index)"><i class="fa fa-plus"></i>ADD</button>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="row col-12" style="justify-content: center;" >
                                    <ul class="list-group" style="border:none;">
                                      <li class="list-group-item d-flex justify-content-between" style="border:none;"
                                        v-for="(env,key) in criterias_store_branch"
                                        :key="key"
                                      >
                                      <span v-if="criterias_store_branch[key][index]">
                                        branch : {{(criterias_store_branch[key][index])?criterias_store_branch[key][index]['comp']:''}} : {{(criterias_store_branch[key][index])?criterias_store_branch[key][index]['branch']:''}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeOperator(key)"><i class="fa fa-minus"></i></button></span>

                                      </span>

                                      </li>

                                    </ul>
                                  </div>
                                   <div class="row col-12" v-show="showOperation[index]" style="justify-content: center;" >
                                      <span style="margin-top:3px;margin-right:10px;">Operation</span>

                                        <div class="form-check form-check-inline">
                                          <input class="form-check-input" type="radio" :name="'operator_'+index" :id="'operator_anyOf_'+index" value="anyof">
                                          <label class="custom-label" style="padding-left:0px;" for="exampleRadios1" >
                                           anyOf
                                          </label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                          <input class="form-check-input" type="radio" :name="'operator_'+index" :id="'operator_allOf_'+index" value="allof">
                                          <label class="custom-label" style="padding-left:0px;" for="exampleRadios2">
                                           allOf
                                          </label>
                                        </div>
                                    </div>

                                </td>
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
      </div>
      <div class="modal" id="myModal" tabindex="-1" role="dialog" >
        <div class="modal-dialog modal-xl" role="document" style="max-height:650px;">
          <div class="modal-content">
            <div class="modal-header" style="border-bottom:1px solid #ccc;padding-bottom:20px;">
              <h5 style='font-weight:700' class="modal-title">Add New Services</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style="border-bottom:1px solid #ccc;padding-bottom:0px;max-height:70vh;overflow-y:auto">
              <composer></composer>
            </div>
            <div class="modal-footer" style="padding-top:20px;">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary btn-fill" @click="checkServices()" data-dismiss="modal">Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import Composer from './Composer.vue'
  import jwtDecode from "jwt-decode"
  import YAML from 'json-to-pretty-yaml'
  import Mustache from 'mustache';
  import Services from '../services/services'
  export default {
    components: {
      Card,
      Composer
    },
    mixins: [Services],
    data () {
      return {
        loading:false,
        loadingError:false,
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
        disabled_add_crit:false,
        showErrorRepoCrit:false,
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
        showErrorArgs:false,
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
        showBuilderTool:false,
        showCommandBuilder:false,
        showErrorBuilderTool:false,
        disable_menu: false,
        array_criterias:[],
        array_tools:[],
        selected_tool:{},
        array_input_value:[],
        simple_input:{
          label:'',
          placeholder:'',
          value:[]
        },
        array_selected_tools:[],
        criterias_store_branch:[],
        showOperation:{},
        info:{
          'QC.Sty':{
            'p1':'"Use code style standards to guide your code writing so you let others  understand it."',
            'p2':'readability, reusability',
            'link':'https://indigo-dc.github.io/sqa-baseline/#code-style-qc.sty'
          },
          'QC.Uni':{
            'p1':'"Test the behaviour of segments or units within your code (e.g. conditionals, loops, functions)."',
            'p2':'design, bug detection',
            'link':'https://indigo-dc.github.io/sqa-baseline/#unit-testing-qc.uni'
          },
          'QC.Fun':{
            'p1':'"Ensure compliance with the functional requirements to meet your users’ expectations."',
            'p2':'end-user satisfaction',
            'link':'https://indigo-dc.github.io/sqa-baseline/#functional-testing-qc.fun'
          },
          'QC.Sec':{
            'p1':'"Secure your software by finding (statically) common issues associated to the programming language in use and look for disclosed security vulnerabilities."',
            'p2':'security issues detection',
            'link':'https://indigo-dc.github.io/sqa-baseline/#security-qc.sec'
          },
          'QC.Doc':{
            'p1':'"Treat documentation as code by using markup languages to automatically build and place it in online repositories."',
            'p2':'outreach capacity, documentation maintenance',
            'link':'https://indigo-dc.github.io/sqa-baseline/#documentation-qc.doc'
          }
        }

      }
    },
    watch:{
      'disable_menu'(val){
        if(val == false){
          this.repository = 'default';
          this.disabled_add_crit = false;
        }
      },
      'criteria'(val){
        this.showBuilderTool=false;
        if(val != "default"){
          this.builder_tool = 'default';
          this.showBuilderTool = false;
          this.showErrorArgs = false;
          this.show_link = true;
          this.showSelect = true;
          for (var i in this.array_criterias){
            if (this.array_criterias[i].id == val){
              this.array_tools = [...this.array_criterias[i]['tools']]
            }
          }
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
          this.array_tools = [];
        }
      },
      'repository'(val){
        if(val != "default"){
          this.showErrorRepo = false;
          if(this.selected_criteria[this.criteria] && this.selected_criteria[this.criteria]['repos']){
            for (var i in this.selected_criteria[this.criteria]['repos']){
              if(this.selected_criteria[this.criteria]['repos'][i]['repo_url'] != ''){
                this.showErrorRepoCrit = true;
                this.disabled_add_crit = true;
              }
            }
          }
        }else{
          this.showErrorRepoCrit = false;
          this.disabled_add_crit = false;
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
        }
      },
      'builder_tool'(val){
        if(val != 'default'){
          this.selected_tool = {};
          for (var i in this.array_tools){
            if(this.array_tools[i].name == val){
              this.selected_tool = JSON.parse(JSON.stringify(this.array_tools[i]));
            }
          }
          var _this = this;
          var no_error = 0;
          var select_false = 0;
          for(var i in this.selected_tool.args){
            if(typeof this.selected_tool.args[i].selectable !== 'undefined' && this.selected_tool.args[i].selectable == true  && typeof this.selected_tool.args[i].format !== 'undefined' && typeof this.selected_tool.args[i].type !== 'undefined' && typeof this.selected_tool.args[i].value !== 'undefined'){
             no_error = no_error + 1;
            }else if(typeof this.selected_tool.args[i].selectable !== 'undefined' && this.selected_tool.args[i].selectable == false){
              select_false = select_false + 1;
            }
          }

            this.showBuilderTool = true;
          //Painting Arg
          this.paintingArg(this.selected_tool.args, 0);

          setTimeout(function(){
            var count = 0;
            for (var i in _this.selected_tool.args){
              if(_this.selected_tool.args[i].repeatable && _this.selected_tool.args[i].repeatable == true){
                $("#inputTag_"+count+'_'+i).tagsinput({
                trimValue: true
                });
                count=count*1+1;
              }
            }
            },100)
        }else{
          this.showBuilderTool = false;
        }
      }
    },
    methods:{
      checkServices(){
        console.log(this.$store.state.docker_compose.services);
      },
       openModal(item){
        $('#myModal').modal('show');
      },
      cancelExecution(){
        this.$router.push({name: 'SelectOption'});
      },
      async paintingArg(args, count){
        var text = '', body = '';
        for(var i in args){
          text = '';
          if(args[i].selectable ==true &&( typeof args[i].repeatable == 'undefined' || args[i].repeatable == false) && args[i].format == 'string'){
          // if(args[i].selectable ==false &&( typeof args[i].repeatable == 'undefined' || args[i].repeatable == false)){
            text += `<div class="form-group" style="margin-bottom:0px;">
                    <label for="${'simple_input_'+count+'_'+i}">${args[i].description}</label>
                    <input id="${'simple_input_'+count+'_'+i}" type="text" class="form-control" style="height:32px;"
                      placeholder='${args[i].value.replace(/[']+/g, '')}' value='${args[i].value.replace(/[']+/g, '')}'
                    >
                  </div>`

          }else if(args[i].selectable ==true && args[i].repeatable == true && args[i].format == 'string'){
            text += `<div class="form-group">
                  <label id="${'array_input_label'+count+'_'+i}" for="">${args[i].description}</label>
                  <div class="bs-example">
                    <input type="text" id="${'inputTag_'+count+'_'+i}" value='${args[i].value.replace(/[']+/g, '')}' data-role="tagsinput">
                  </div>
                  <div class="text-right">
                    <label id="array_input_label2" for="">Note: Type something and press Enter.</label>

                  </div>
                </div>`
          }else if(args[i].selectable ==true &&( typeof args[i].repeatable == 'undefined' || args[i].repeatable == false) && args[i].format == 'array'){
            text += `<div class="form-group">
                  <label id="${'array_input_label'+count+'_'+i}" for="">${args[i].description}</label>
                  <div class="bs-example">
                     <select class="custom-select select-options" id="${'select_'+count+'_'+i}" data-index='select-val'>
                     ${this.paintSelectOpt(args[i].value)}
                    </select>
                  </div>
                </div>`
          }

          if(args[i].args && args[i].args.length > 0){
            text += await this.paintingArg(args[i].args, (count*1+1))
          }

          body += text
        }
        $('#ref-arg').html(body)
        $('.select-options').on('change', function(){
          console.log($(this).attr('data-index'))
          console.log($(this).val())
        })
        return body;
      },
      paintSelectOpt(opts){
        console.log(opts)
        let message = "<option selected disabled value=''>Selected option ...</option>"
        for(var i in opts){
          message += `<option value="${opts[i]}">${opts[i]}</option>`
        }
        return message;
      },
      async adding(args, count){
        for(var i in args){
          if (this.selected_tool.args[i].selectable ==true && this.selected_tool.args[i].format == 'string'){
            if(args[i].repeatable == true){
              args[i].value = $("#inputTag_"+count+'_'+i).val();
              setTimeout(function(){
                $("#inputTag_"+count+'_'+i).tagsinput('removeAll');
              },100)
            }else {
              args[i].value = $("#simple_input_"+count+'_'+i).val();
              $("#simple_input_"+count+'_'+i).val('');
            }
          }else if(this.selected_tool.args[i].selectable ==true && this.selected_tool.args[i].format == 'array'){
              console.log($('#select_'+count+'_'+i).val())
              args[i].value = $('#select_'+count+'_'+i).val();
          }
          if(args[i].args && args[i].args.length > 0){
            await this.adding(args[i].args, (count*1+1))
          }
        }

        return args;
      },
      async startListArg(args,index){
        let myPromise = new Promise((resolve, reject) => {
          this.listArg(args, index).then(body => {
            resolve(body);
          }).catch(err => {
              reject(err.message);
          });
        });
        return myPromise.then(body => {
            $('#list-arg'+index).html(body)
            return body;
        }).catch(err => {
            console.log(err);
        })
      },
      async listArg(args, index){
        var text = '', body = '';

        for(var i in args){
          text = '';
          if(args[i].type && args[i].value){
            text += `<p style='margin-bottom:0px;'>
                      ${args[i].type} : ${args[i].value}
                    </p>`
          }
          if(args[i].args && args[i].args.length > 0){
            text += await this.listArg(args[i].args, index);
          }
          body += text;

        }
        return body;
      },
      async addTool(){
        let args = await this.adding(this.selected_tool.args, 0)
        var error_args = false;
        for (var i in args){
          if(args[i].type == 'positional' && args[i].value == ''){
            error_args = true;
          }
        }
        if(error_args == true){
          this.showErrorArgs = true;
        }else{
          this.showErrorArgs = false;
          this.selected_tool['args'] =  args;
          this.builder_tool = 'default';
          this.showBuilderTool = false;
          this.array_selected_tools.push(this.selected_tool);
        }
      },
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
      },
      selectWhen(item){
        if($('#select_when_'+item.replace(/\./g,"\\.")).val() == 'building_tag'){
          $('#select_comp_'+item.replace(/\./g,"\\.")).prop('disabled', true);
          $('#select_branch_'+item.replace(/\./g,"\\.")).prop('disabled', true);
          $('#button_branch_'+item.replace(/\./g,"\\.")).prop('disabled', true);
          this.criterias_store[item]={
            'building_tag': true,
            'pattern': ''
          }

        }else{
            $('#select_comp_'+item).prop('disabled', false);
            $('#select_branch_'+item).prop('disabled', false);
            $('#button_branch_'+item).prop('disabled', false);
              this.criterias_store[item]={
              'building_tag': false,
              'pattern': ''
            }
        }
      },
      customize_criteria(key){
        $('#criteria_'+key.replace(/\./g,"\\.")).toggleClass('open-criteria',500);
      },
      addWhenProp(item){

        var array_object = {}
        array_object[item] = {
          'comp': $('#select_comp_'+item.replace(/\./g,"\\.")).val(),
          'branch': $('#select_branch_'+item.replace(/\./g,"\\.")).val()
        };
        this.criterias_store_branch.push(array_object)
        if(this.criterias_store_branch.length > 1){
          this.showOperation[item] = true;
          $("#operator_anyOf_"+item.replace(/\./g,"\\.")).prop("checked", true);
        }else{
          this.showOperation[item] = false;
        }
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
                 })
             }
           }


          }
         this.$router.push({name: 'Files'});
      },
      back(){
         this.$router.push({name: 'general'});
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
        if(this.criteria == 'default' || (this.builder_tool == 'commands' && this.service == 'default')) {
          if(this.criteria == 'default'){
            this.showErrorCriteria = true;
          }
          if(this.builder_tool == 'commands' && this.service == 'default'){
            this.showErrorService = true;
          }

        }else{
          this.showErrorRepoCrit = false;
          this.showCriteria = true;
          this.disable_done = false;
          this.showErrorRepo = false;
          this.showErrorService = false;
          this.showErrorCriteria = false;

          this.repos["repos"]=[];
          var sizeCriteria = this.objectSize(this.$store.state.config_yaml.sqa_criteria)
          if(sizeCriteria > 0){
            var sizeSelectCriteria = this.objectSize(this.$store.state.config_yaml.sqa_criteria[this.criteria])
             if(sizeSelectCriteria > 0){
               this.repos["repos"] = this.$store.state.config_yaml.sqa_criteria[this.criteria]["repos"]
             }
          }
          var serv = ''
          var repo = {}
          if(this.service =='default'){
            serv = ''
          }else{
            serv = this.service
          }
          for(var i in this.array_selected_tools){
            repo={
                    repo_url: (this.repository!='default')?this.repository:'',
                    container: serv,
                    tool:this.array_selected_tools[i]
              }

            this.repos["repos"].push(repo)
          }
          this.selected_criteria[this.criteria]=Object.assign({}, this.selected_criteria[this.criteria], this.repos)
          this.$store.state.config_yaml.sqa_criteria[this.criteria] = Object.assign({}, this.$store.state.config_yaml.sqa_criteria[this.criteria], this.repos)
          this.showErrorFile = false;
          this.service = 'default'
          this.builder_tool = 'default';
          this.array_selected_tools = [];
          this.repository = 'default';
          this.disable_menu = false;
          this.showBuilderTool = false;
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
      removeTool(key){
        this.$delete(this.array_selected_tools,key)
        if (this.isEmpty(this.array_selected_tools)) {
          this.showBuilderTool = false;
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
        if(this.tox.env == ''){
          if(this.tox.env == '' ){
            this.showErrorEnv = true
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
        if (this.isEmpty(this.testenv)) {
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
      },
      getCriteriaCallBack(response){
        this.loading = false;
        this.array_criterias = [];
        if(response.status == 200){
          for(var i in response.data){
            this.array_criterias.push(response.data[i])
          }
        }else{
          this.loadingError = true;
          this.notifyVue("We are having problems making the request.")
        }
      }


    },
    mounted(){
       this.$eventHub.$emit('steps', 2);

    },
    created(){
      this.loading = true;
      this.getCriteriaCall(this.getCriteriaCallBack)
      this.checkauthCall(this.checkauthCallBack);
      if(this.$store.state.config_yaml.config.credentials.length > 0){
        this.showCredInfo = true;
      }
      var sizeRepos = this.objectSize(this.$store.state.config_yaml.config.project_repos);
      var sizeServices = this.objectSize(this.$store.state.docker_compose.services)
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
</script>
<style scoped>
.form-check-label{
  padding-bottom:5px!important;
}
.custom-table-title{
  padding-top:5px;
  text-transform: uppercase;
  font-size:16px;
  color:black;
  font-weight: 700;

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
    .col-lg-10 {
        -ms-flex: 0 0 83.333333%;
        -webkit-box-flex: 0;
        flex: 0 0 83.333333%;
        max-width: 100%;
  }
 }

 @media (min-width: 1200px) {
    .col-lg-10 {
        -ms-flex: 0 0 83.333333%;
        -webkit-box-flex: 0;
        flex: 0 0 83.333333%;
        max-width: 70%;
    }
  }

.quote-custom {
    /* background-image: url("../../static/quote.png"); */
    background-repeat: no-repeat;
    opacity:0.5;
}


</style>
<style>
.bootstrap-tagsinput{
      width: 100%;
  }
  .label-info{
      background-color: #17a2b8;

  }
  .label {
      display: inline-block;
      padding: .25em .4em;
      font-size: 75%;
      font-weight: 700;
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: .25rem;
      transition: color .15s ease-in-out,background-color .15s ease-in-out,
      border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
  .bootstrap-tagsinput {
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  display: inline-block;
  padding: 4px 6px;
  color: #555;
  vertical-align: middle;
  border-radius: 4px;
  max-width: 100%;
  line-height: 22px;
  cursor: text;
}
.bootstrap-tagsinput input {
  border: none;
  box-shadow: none;
  outline: none;
  background-color: transparent;
  padding: 0 6px;
  margin: 0;
  width: auto;
  max-width: inherit;
}
.bootstrap-tagsinput.form-control input::-moz-placeholder {
  color: #777;
  opacity: 1;
}
.bootstrap-tagsinput.form-control input:-ms-input-placeholder {
  color: #777;
}
.bootstrap-tagsinput.form-control input::-webkit-input-placeholder {
  color: #777;
}
.bootstrap-tagsinput input:focus {
  border: none;
  box-shadow: none;
}
.bootstrap-tagsinput .tag {
  margin-right: 2px;
  color: white;
}
.bootstrap-tagsinput .tag [data-role="remove"] {
  margin-left: 8px;
  cursor: pointer;
}
.bootstrap-tagsinput .tag [data-role="remove"]:after {
  content: "x";
  padding: 0px 2px;
}
.bootstrap-tagsinput .tag [data-role="remove"]:hover {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
}
.bootstrap-tagsinput .tag [data-role="remove"]:hover:active {
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}

.responsive {
  width: 100%;
  height: auto;
}

.modal-dialog{
  transform:none!important;
}
</style>
