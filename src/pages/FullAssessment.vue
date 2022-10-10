<template>
  	<div class="content">
		<div class="container-fluid" style="min-height:70vh;">
      <div id="test"  v-show="loading" class="loading-overlay is-active" >
          <div style="padding: 20px;background-color: #ccc;border-radius: 5px;">
            <div style="vertical-align: middle;display: flex;">
              <span class="fas fa-cog fa-3x fa-spin"></span>
              <p style="padding-left: 10px;text-transform: uppercase;font-weight: 700;margin-bottom: 0px;margin-top: 15px;">{{modal_message}}</p>
            </div>
            <div>
              <p>Please, wait for this process to finish.</p>
            </div>
            <div v-show="build_status!=''" class="text-center">
              <p style="font-size:18px;font-weight:700;">Current State: {{build_status}}</p>
            </div>
            <div class="text-center">
                <a v-show="showBuildUrl" style="color:white;margin-right:10px;" class="btn btn-primary btn-fill btn-sm" :href="build_url" target="_blank">Check Logs</a>
                <button style="margin-left:10px;" class="btn btn-sm btn-danger btn-fill" :disabled="disable_cancel" @click="cancelExecution()">Cancel</button>
            </div>
          </div>
      </div>
			<div class="row">
				<div class="col-12" style="margin-top:40px;">
					<card class="strpied-tabled-with-hover"
						body-classes=""
					>
						<template slot="header" >
              <div style="display:inline-flex;">
                <button class="btn btn-default btn-simple" @click="gotoSelect()"><i class="fa fa-arrow-left" aria-hidden="true"></i><span style="font-weight: bold;padding-top:5px;font-size:18px;" class="card-title">Back</span></button>
              </div>
						</template>

						<template class="card-body">
              <div class="text-center col-12 col-sm-12 col-xl-8 col-lg-10 mx-auto" style="justify-content: center;margin-top:20px;">
                <h2 style="color: #76BAC6; font-weight: bold;">Take credit for the quality achievements of your code</h2>
                <h4>Fill in the form below to trigger the assessment process</h4>
                <div class="text-left row">
                  <div class="col-12 col-md-8">
                    <base-input type="text"
                              label="Repository URL"
                              :disabled="false"
                              placeholder="Repository URL"
                              style="margin-bottom:0px"
                              v-model="params.url">
                    </base-input>
                    <p v-show="showErrorURL" style="color:red; font-size:12px;padding-left:20px; padding-top:0px;">This field is required</p>
                  </div>
                  <div class="col-12 col-md-4">
                    <base-input type="text"
                              label="Branch"
                              :disabled="false"
                              placeholder="master"
                              style="margin-bottom:0px"
                              v-model="params.branch">
                    </base-input>
                  </div>
                </div>

                <hr/>



                <div class="row" style="padding-left:20px;margin-top:1rem;margin-bottom:1rem">
                  <span class="custom-label">External repo for documentation?</span>
                  <div class="custom-div-append">
                    <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="Credentials can only be used once they are defined in <a target='blank' href='https://jenkins.eosc-synergy.eu/credentials/' title='test add link'>EOSC-Synergy Jenkins</a> instance <a target='blank' href='https://docs.sqaaas.eosc-synergy.eu/pipeline_as_a_service/step_1_repositories#credentials'>more info</a>">
                      <i class="fa fa-question-circle"></i>
                    </button>
                  </div>
                  <span class="custom-label" style="padding-left:75px;">Yes</span><base-checkbox name="credentials" v-model="doc.yes"></base-checkbox>
                  <span class="custom-label">No</span><base-checkbox name="credentials" v-model="doc.no"></base-checkbox>
                </div>

                <div v-show='doc.yes' class="text-left row" style="padding-left:40px;">
                    <div class="col-12 col-md-8">
                      <base-input type="text" class="no-margin"
                            label="Repo URL"
                            :disabled="false"
                            placeholder=""
                            v-model="doc.url">
                      </base-input>
                      <!-- <span v-show="showErrorCredId" style="color:red;font-size:12px;">This field is required</span> -->

                    </div>
                    <div class="col-12 col-md-4">
                      <base-input type="text" class="no-margin"
                            label="Branch"
                            :disabled="false"
                            placeholder=""
                            v-model="doc.branch">
                      </base-input>
                    </div>


                </div>

                <hr/>

                <div class="row" style="padding-left:20px;margin-top:1rem;margin-bottom:1rem">
                  <span class="custom-label">Deployment settings?</span>
                  <div class="custom-div-append">
                    <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="Credentials can only be used once they are defined in <a target='blank' href='https://jenkins.eosc-synergy.eu/credentials/' title='test add link'>EOSC-Synergy Jenkins</a> instance <a target='blank' href='https://docs.sqaaas.eosc-synergy.eu/pipeline_as_a_service/step_1_repositories#credentials'>more info</a>">
                      <i class="fa fa-question-circle"></i>
                    </button>
                  </div>
                  <span class="custom-label" style="padding-left:75px;">Yes</span><base-checkbox name="credentials" v-model="deploy.yes"></base-checkbox>
                  <span class="custom-label">No</span><base-checkbox name="credentials" v-model="deploy.no"></base-checkbox>
                </div>

                <div v-show='deploy.yes' class="text-left" style="padding-left:20px;">

                    <div class="row mb-2" style="padding-left:15px;">
                       <div class="col-12 col-md-8">
                        <base-input type="text" class="no-margin"
                              label="Repository URL (optional)"
                              :disabled="false"
                              placeholder=""
                              v-model="deploy.url">
                        </base-input>

                      </div>
                      <div class="col-12 col-md-4">
                        <base-input type="text" class="no-margin"
                              label="Repository Branch (optional)"
                              :disabled="false"
                              placeholder=""
                              v-model="deploy.branch">
                        </base-input>
                      </div>

                    </div>

                    <div v-show="criteria != 'default'" class="row" style="padding-bottom:0px;margin-bottom:0px;padding-left:15px;padding-right:15px;">
                      <div class="col-12 col-md-6">
                        <label> CHOOSE A TOOL (required)</label>
                        <select class="custom-select" id="sqacriteria" v-model='builder_tool' >
                          <option value="default">Select ...</option>
                          <option style="text-transform:capitalize;" v-for="(tool,key) in array_tools" :key="key" :value="tool['name']">{{tool['name'].toUpperCase()}}</option>
                        </select>
                      </div>
                      <div v-show="showBuilderTool" class="text-left col-12 col-md-6" style="padding-top:25px;">
                        <button style="max-height:40px;" type="button" class="btn  btn-info" @click="addTool()"><i class="fa fa-plus"></i>ADD TOOL</button>
                      </div>
                    </div>
                    <div>
                      <span v-show="showErrorBuilderTool" style="color:red; font-size:12px;padding-left:20px;">You must select a tool to define some pipeline work.</span>
                    </div>
                    <div class="col-12" style="margin-top:20px;" id='tools' v-show="showBuilderTool">
                      <div id="ref-arg"></div>
                    </div>


                    <div v-show="builder_tool != 'default'" class="col-12 mt-2">
                      <span v-show="docker_image !=''" class="badge badge-secondary">image:<span style="font-weight:bold"> {{docker_image}}</span></span>
                      <span v-show="docker_lang !=''" style="margin:0px 5px;" class="badge badge-primary">lang:<span style="font-weight:bold"> {{docker_lang}}</span></span>
                      <span v-show="docker_version !=''" style="margin:0px 5px;" class="badge badge-danger">version:<span style="font-weight:bold"> {{docker_version}}</span></span>

                      <div class="row" style="padding-top:20px">
                        <div style="display:contents" class="col-12 col-md-6">
                          <span class="custom-label" style="font-weight:bold;font-size:16px;">Use custom service?</span>
                          <div class="custom-div-append">
                            <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="Define your own container service <a target='blank' href='https://docs.sqaaas.eosc-synergy.eu/pipeline_as_a_service/step_2_criteria#running-the-tools-with-your-own-services'>more info</a>">
                              <i class="fa fa-question-circle"></i>
                            </button>
                          </div>
                        </div>
                        <div style="display:contents" class="col-12 col-md-6">
                          <span class="custom-label">Yes</span><base-checkbox name="workpace" v-model="change_image_yes"></base-checkbox>
                          <span class="custom-label">No</span><base-checkbox name="workspace" v-model="change_image_no"></base-checkbox>
                        </div>
                      </div>
                    </div>

                    <div v-show="change_image_yes"  class="col-12 col-md-6" style="display:grid;">
                        <select class="custom-select" id="service" v-model='service' >
                          <option value="default">Choose a service...</option>
                          <option v-for="(service,key) in $store.state.docker_compose.services" :key="key" :value="key">{{key}}</option>
                        </select>
                        <button type="button" class="btn-simple btn btn-xs btn-info text-left" @click="openModal();set_fair_service == false"><i class="fa fa-plus"></i>ADD SERVICE</button>
                        <span v-show="showErrorService" style="color:red; font-size:12px;">For the selected tool you must select a service.</span>
                    </div>

                    <div v-show="array_selected_tools.length > 0" style="padding-top:40px;margin-bottom:2rem;">
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
                </div>

                <hr/>

                <div class="row" style="padding-left:20px;margin-top:1rem;margin-bottom:1rem">
                  <span class="custom-label">FAIR?</span>
                  <div class="custom-div-append">
                    <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="Credentials can only be used once they are defined in <a target='blank' href='https://jenkins.eosc-synergy.eu/credentials/' title='test add link'>EOSC-Synergy Jenkins</a> instance <a target='blank' href='https://docs.sqaaas.eosc-synergy.eu/pipeline_as_a_service/step_1_repositories#credentials'>more info</a>">
                      <i class="fa fa-question-circle"></i>
                    </button>
                  </div>
                  <span class="custom-label" style="padding-left:75px;">Yes</span><base-checkbox name="credentials" v-model="fair.yes"></base-checkbox>
                  <span class="custom-label">No</span><base-checkbox name="credentials" v-model="fair.no"></base-checkbox>
                </div>

                <div v-show='fair.yes' class="text-left" style="padding-left:20px;">
                    <div v-show="criteria_fair != 'default'" class="row" style="padding-bottom:0px;margin-bottom:0px;padding-left:15px;padding-right:15px;">
                      <div class="col-12 col-md-6">
                        <label> CHOOSE A TOOL (required)</label>
                        <select class="custom-select" id="sqacriteria" v-model='builder_tool_fair' >
                          <option value="default">Select ...</option>
                          <option style="text-transform:capitalize;" v-for="(tool,key) in array_tools_fair" :key="key" :value="tool['name']">{{tool['name'].toUpperCase()}}</option>
                        </select>
                      </div>
                      <div v-show="showBuilderToolFair" class="text-left col-12 col-md-6" style="padding-top:25px;">
                        <button style="max-height:40px;" type="button" class="btn  btn-info" @click="addToolFair()"><i class="fa fa-plus"></i>ADD TOOL</button>
                      </div>
                    </div>
                    <div>
                      <span v-show="showErrorBuilderTool" style="color:red; font-size:12px;padding-left:20px;">You must select a tool to define some pipeline work.</span>
                    </div>
                    <div class="col-12" style="margin-top:20px;" id='tools' v-show="showBuilderToolFair">
                      <div id="ref-arg-fair"></div>
                    </div>


                    <div v-show="builder_tool_fair != 'default'" class="col-12 mt-2">
                      <span v-show="docker_image !=''" class="badge badge-secondary">image:<span style="font-weight:bold"> {{docker_image_fair}}</span></span>
                      <span v-show="docker_lang !=''" style="margin:0px 5px;" class="badge badge-primary">lang:<span style="font-weight:bold"> {{docker_lang_fair}}</span></span>
                      <span v-show="docker_version !=''" style="margin:0px 5px;" class="badge badge-danger">version:<span style="font-weight:bold"> {{docker_version_fair}}</span></span>

                      <div class="row" style="padding-top:20px">
                        <div style="display:contents" class="col-12 col-md-6">
                          <span class="custom-label" style="font-weight:bold;font-size:16px;">Use custom service?</span>
                          <div class="custom-div-append">
                            <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="Define your own container service <a target='blank' href='https://docs.sqaaas.eosc-synergy.eu/pipeline_as_a_service/step_2_criteria#running-the-tools-with-your-own-services'>more info</a>">
                              <i class="fa fa-question-circle"></i>
                            </button>
                          </div>
                        </div>
                        <div style="display:contents" class="col-12 col-md-6">
                          <span class="custom-label">Yes</span><base-checkbox name="workpace" v-model="change_image_yes_fair"></base-checkbox>
                          <span class="custom-label">No</span><base-checkbox name="workspace" v-model="change_image_no_fair"></base-checkbox>
                        </div>
                      </div>
                    </div>

                     <div v-show="change_image_yes_fair"  class="col-12 col-md-6" style="display:grid;">
                        <select class="custom-select" id="service" v-model='service_fair' >
                          <option value="default">Choose a service...</option>
                          <option v-for="(service,key) in $store.state.docker_compose.services" :key="key" :value="key">{{key}}</option>
                        </select>
                        <button type="button" class="btn-simple btn btn-xs btn-info text-left" @click="openModal();set_fair_service == true"><i class="fa fa-plus"></i>ADD SERVICE</button>
                    </div>

                    <div v-show="array_selected_tools_fair.length > 0" style="padding-top:40px;margin-bottom:2rem;">
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
                            <tbody v-for="(tool, index) in array_selected_tools_fair" :key="index">
                              <tr
                                  style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                                  <td
                                      style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                      <div style="text-align:left;text-transform: uppercase;">
                                          {{array_selected_tools_fair[index].name}}
                                      </div>
                                  </td>
                                  <td
                                      style="text-align:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                      <div :id="'list-arg'+index" style="text-align:center;">
                                          {{startListArgFair(tool['args'], index)}}
                                      </div>

                                  </td>
                                  <td
                                      style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                      <button type="button" class="btn-simple btn btn-xs btn-info" @click="removeToolFair(index)"><i style="font-size:15px;color:red;" class="fa fa-trash"></i>
                                      </button>
                                  </td>

                              </tr>
                            </tbody>
                        </table>
                      </div>
                  </div>
                </div>

                <div style="padding:20px;">
                  <button class="btn btn-primary btn-fill" @click="getResults()">Start Assessment</button>
                  <!-- <button v-show="showReportBtn" class="btn btn-primary btn-fill" data-toggle="modal" data-target="#errorModal">See Report</button> -->
                   <!-- <button v-show="showReportBtn" style="margin-right:20px;" class="btn btn-primary btn-fill" @click="goToReport()">See Report</button> -->
                  <!-- <button v-show="showReportBtn" style="color: #fff;background-color: #6c757d;border-color: #6c757d;" class="btn  " @click="refresh()"><i class="fa fa-refresh" style="padding-right:5px;" aria-hidden="true"></i> New Assessment</button> -->
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
                <composer @service_name="getServiceName"></composer>
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
  	</div>
</template>
<script>

  import LTable from 'src/components/Table.vue';
  import Card from 'src/components/Cards/Card.vue';
  import Services from '../services/services';
   import Composer from './Composer.vue';
  export default {
    components: {
		LTable,
		Card,
    Composer
    },
    mixins: [Services],
    data () {
      return {
        criteria:'default',
        criteria_fair:'default',
        array_criterias:[],
        service:{
          name:'',
          url:''
        },
        all_services:{},
        showService:false,
        params:{
          url:'',
          branch:''
        },
        doc:{
          yes:false,
          no:true,
           url:'',
          branch:''
        },
        deploy:{
          yes:false,
          no:true,
          url:'',
          branch:''
        },
        fair:{
          yes:false,
          no:true,
        },
        autoRefresh:false,
        pipeline_id:'',
        loading: false,
        modal_message : '',
        disable_cancel : true,
        build_url:'',
        showBuildUrl:false,
        build_status:'',
        showReportBtn: false,
        showErrorURL:false,
        repo_info:{},
        showErrorAPI:false,
        showErrorFailure:false,
        message_error: '',
        array_criterias:[],
        change_image_yes: false,
        change_image_no: true,
        change_image_yes_fair: false,
        change_image_no_fair: true,
        docker_image: '',
        docker_lang: '',
        docker_version: '',
        docker_image_fair: '',
        docker_lang_fair: '',
        docker_version_fair: '',
        builder_tool: 'default',
        builder_tool_fair: 'default',
        showBuilderTool:false,
        showBuilderToolFair:false,
        array_tools:[],
        array_tools_fair:[],
        selected_tool:{},
        selected_tool_fair:{},
        showErrorBuilderTool:false,
        array_selected_tools:[],
        array_selected_tools_fair:[],
        service_name: '',
        service:'default',
        service_name_fair: '',
        service_fair:'default',
        showErrorService:false,
        set_fair_service:false


      }
    },
     watch:{
        'change_image_yes'(val){
        if(val==true){
          this.change_image_no = false;
        }else{
          this.change_image_no = true;
        }
      },
      'change_image_no'(val){
         if(val==true){
          this.change_image_yes = false;
          this.docker_image = (Object.keys(this.selected_tool).length > 0 && this.selected_tool.docker && this.selected_tool.docker.image) ? this.selected_tool.docker.image : (Object.keys(this.selected_tool).length > 0 && this.selected_tool.docker && this.selected_tool.docker.dockerfile)?'Dockerfile':''
          this.docker_lang = (Object.keys(this.selected_tool).length > 0 && this.selected_tool.lang) ? this.selected_tool.lang : ''
          this.docker_version = (Object.keys(this.selected_tool).length > 0 && this.selected_tool.version) ? this.selected_tool.version : ''
        }else{
           this.change_image_yes = true;
        }
      },
      'change_image_yes_fair'(val){
        if(val==true){
          this.change_image_no_fair = false;
        }else{
          this.change_image_no_fair = true;
        }
      },
      'change_image_no_fair'(val){
         if(val==true){
            this.change_image_yes_fair = false;
            this.docker_image_fair = (Object.keys(this.selected_tool_fair).length > 0 && this.selected_tool_fair.docker && this.selected_tool_fair.docker.image) ? this.selected_tool_fair.docker.image : (Object.keys(this.selected_tool_fair).length > 0 && this.selected_tool_fair.docker && this.selected_tool_fair.docker.dockerfile)?'Dockerfile':''
            this.docker_lang_fair = (Object.keys(this.selected_tool_fair).length > 0 && this.selected_tool_fair.lang) ? this.selected_tool_fair.lang : ''
            this.docker_version_fair = (Object.keys(this.selected_tool_fair).length > 0 && this.selected_tool_fair.version) ? this.selected_tool_fair.version : ''

        }else{
           this.change_image_yes_fair = true;
        }
      },
      'criteria'(val){
        this.showBuilderTool=false;
        if(val != "default"){
          for (var i in this.array_criterias){
            if (this.array_criterias[i].id == val){
              this.array_tools = this.array_criterias[i]['tools']
            }
          }
          this.showErrorCriteria = false;
        }
      },
      'criteria_fair'(val){
        this.showBuilderToolFair=false;
        if(val != "default"){
          for (var i in this.array_criterias){
            if (this.array_criterias[i].id == val){
              this.array_tools_fair = this.array_criterias[i]['tools']
            }
          }
        }
      },
      'builder_tool_fair'(val){
        console.log(val)
        if(val != 'default'){
          this.selected_tool_fair = {};
          for (var i in this.array_tools_fair){
            if(this.array_tools_fair[i].name == val){
              this.selected_tool_fair = JSON.parse(JSON.stringify(this.array_tools_fair[i]));
            }
          }
          var _this = this;
          setTimeout(function(){
            for (var i in _this.selected_tool_fair.args){
              $("#inputTag_"+i).tagsinput({
                trimValue: true
              })
            }
          },100)

          var no_error = 0;
          var select_false = 0;
          for(var i in this.selected_tool_fair.args){
            if(typeof this.selected_tool_fair.args[i].selectable !== 'undefined' && this.selected_tool_fair.args[i].selectable == true  && typeof this.selected_tool_fair.args[i].format !== 'undefined' && typeof this.selected_tool_fair.args[i].type !== 'undefined' && typeof this.selected_tool_fair.args[i].value !== 'undefined'){
             no_error = no_error + 1;
            }else if(typeof this.selected_tool_fair.args[i].selectable !== 'undefined' && this.selected_tool_fair.args[i].selectable == false){
              select_false = select_false + 1;
            }
          }
          this.showBuilderToolFair = true;
         //Painting Arg
          console.log(this.selected_tool_fair.args)
          this.paintingArgFair(this.selected_tool_fair.args, 0);

          setTimeout(function(){
            var count = 0;
            for (var i in _this.selected_tool_fair.args){
              if(_this.selected_tool_fair.args[i].repeatable && _this.selected_tool_fair.args[i].repeatable == true){
                $("#inputTag_"+count+'_'+i).tagsinput({
                  trimValue: true
                });
                count=count*1+1;
              }
            }
            },100)
            this.change_image_yes_fair = false;
            this.change_image_no_fair = true;
            console.log(this.selected_tool_fair)
            this.docker_image_fair = (Object.keys(this.selected_tool_fair).length > 0 && this.selected_tool_fair.docker && this.selected_tool_fair.docker.image) ? this.selected_tool_fair.docker.image : (Object.keys(this.selected_tool_fair).length > 0 && this.selected_tool_fair.docker && this.selected_tool_fair.docker.dockerfile)?'Dockerfile':''
            this.docker_lang_fair = (Object.keys(this.selected_tool_fair).length > 0 && this.selected_tool_fair.lang) ? this.selected_tool_fair.lang : ''
            this.docker_version_fair = (Object.keys(this.selected_tool_fair).length > 0 && this.selected_tool_fair.version) ? this.selected_tool_fair.version : ''

        }else{
          this.showBuilderToolFair = false;
          this.docker_image_fair = '';
          this.docker_lang_fair = '';
          this.docker_version_fair = '';
        }
      },
      "doc.yes"(val){
         if(val==true){
          this.doc.no = false;
        }else{
          this.doc.no = true;
        }

      },
      "doc.no"(val){
        if(val==true){
          this.doc.yes = false;
          this.doc.url = "";
          this.doc.branch = "";
        }else{
          this.doc.yes = true;
        }
      },
       "deploy.yes"(val){
         if(val==true){
          this.deploy.no = false;
        }else{
          this.deploy.no = true;
        }

      },
      "deploy.no"(val){
        if(val==true){
          this.deploy.yes = false;
        }else{
          this.deploy.yes = true;
        }
      },
      "fair.yes"(val){
         if(val==true){
          this.fair.no = false;
        }else{
          this.fair.no = true;
        }

      },
      "fair.no"(val){
        if(val==true){
          this.fair.yes = false;
        }else{
          this.fair.yes = true;
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
      },
      'builder_tool'(val){
        if(val != 'default'){
          this.selected_tool = {};
          console.log(this.array_tools, val)

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
            this.change_image_yes = false;
            this.change_image_no = true;
            console.log(this.selected_tool)
            this.docker_image = (Object.keys(this.selected_tool).length > 0 && this.selected_tool.docker && this.selected_tool.docker.image) ? this.selected_tool.docker.image : (Object.keys(this.selected_tool).length > 0 && this.selected_tool.docker && this.selected_tool.docker.dockerfile)?'Dockerfile':''
            this.docker_lang = (Object.keys(this.selected_tool).length > 0 && this.selected_tool.lang) ? this.selected_tool.lang : ''
            this.docker_version = (Object.keys(this.selected_tool).length > 0 && this.selected_tool.version) ? this.selected_tool.version : ''


        }else{
          this.showBuilderTool = false;
          this.docker_image = '';
          this.docker_lang = '';
          this.docker_version = '';
        }
      }


    },

    methods:{
      getServiceName(event){
        if(set_fair_service){
          this.service_name_fair = event;
          this.service_fair = event;
          this.docker_image_fair = event;
          this.docker_lang_fair = '';
          this.docker_version_fair = '';
        }else{
          this.service_name = event;
          this.service = event;
          this.docker_image = event;
          this.docker_lang = '';
          this.docker_version = '';
        }
        $('#myModal').modal('hide');
      },
      openModal(item){
        $('#myModal').modal('show');
      },
      goToReport(){
        this.$router.push({name: 'full-assessment-report'});
      },
      gotoCustomized(){
        this.$router.push({name: 'dashboard'});
      },
      gotoSelect(){
        this.$router.push({name: 'SelectOption'});
      },
      getResults(){
        // var data = {}
        // if(this.params.url != ''){
        //   data['repo_code'] = {
        //     repo:this.params.url.trim(),
        //     branch:this.params.branch.trim()
        //   }
        // }
        // if(this.doc.url != ''){
        //   data['repo_docs'] = {
        //     repo:this.doc.url.trim(),
        //     branch:this.doc.branch.trim()
        //   }
        // }
        this.showErrorAPI = false;
        console.log(this.array_selected_tools)
        if(this.params.url != ''){
          var data = {
            repo_code:{
              repo:this.params.url.trim(),
              branch:this.params.branch.trim()
            },
            repo_docs:{
              repo:this.doc.url.trim(),
              branch:this.doc.branch.trim()
            }
          }
          if(this.deploy.yes){
            data['deployment'] = {
              'repo_deploy':{
                repo:this.deploy.url.trim(),
                branch:this.deploy.branch.trim()
              },
              'deploy_tool':this.array_selected_tools[0]
            }

          }
          if(this.fair.yes){
            data['fair'] = {
              'fair_tool':this.array_selected_tools_fair[0]
            }

          }
          this.showErrorURL = false;
          this.loading = true;
          this.modal_message = 'Submitting Pipeline ...';
          this.getPipelineAssessmentCall(data,this.getPipelineAssessmentCallBack)
        }else{
          this.showErrorURL = true;
        }


      },
      getPipelineAssessmentCallBack(response){
        console.log("---> getPipelineAssessmentCallBack <---")
        console.log(response)
        if(response.status == 201 && response.data.id){
          this.pipeline_id = response.data.id;
          this.runAssessmentPipelineCall(this.pipeline_id,this.runAssessmentPipelineCallBack)
        }else if(response.status == 500){
          this.$swal.fire({
            title: 'An unexpected error occurred while running the assessment!',
            text: response.detail?response.detail:response.reason?response.reason:response.data?response.data:'Error',
            icon: 'error',
            confirmButtonText: 'Close',
            footer: `<p style="color: red; font-weight: bold;">Please contact sqaaas@ibergrid.eu</p>`,
            confirmButtonColor: '#E14726',
          })
          this.loading =false;
        }else{
           this.$swal.fire({
            title: 'The quality assessment has failed to complete!',
            text: response.detail?response.detail:response.reason?response.reason:response.data?response.data:'Error',
            icon: 'error',
            confirmButtonText: 'Close',
            confirmButtonColor: '#E14726',
          })
          this.loading =false;
        }
      },
      runAssessmentPipelineCallBack(response){
        if(response.status == 204){
          this.autoRefresh = true;
        }else if(response.status == 403){
          this.$router.replace(this.$route.query.redirect || "/logout");
          this.loading = false;
        }else if(response.status == 500){
           this.$swal.fire({
            title: 'An unexpected error occurred while running the assessment!',
            text: response.detail?response.detail:response.reason?response.reason:response.data?response.data:'Error',
            icon: 'error',
            confirmButtonText: 'Close',
            footer: `<p style="color: red; font-weight: bold;">Please contact sqaaas@ibergrid.eu</p>`,
            confirmButtonColor: '#E14726',
          })
          this.loading = false;
        }else{
          this.$swal.fire({
             title: 'The quality assessment has failed to complete!',
            text: response.detail?response.detail:response.reason?response.reason:response.data?response.data:'Error',
            icon: 'error',
            confirmButtonText: 'Close',
            confirmButtonColor: '#E14726',
          })
          this.loading = false;
        }

      },
      addService(){
        var key= this.service.name.replace(" ", "")
				var value = this.service.url.replace(" ", "")
        this.all_services[key]=value
        this.showService = true;
        this.cleanService()

      },
      removeService(item){
        this.$delete(this.all_services,item)
        if (this.isEmpty(this.all_services)) {
          this.showService = false;
        }
      },
      cleanService(){
        this.service.name = '';
        this.service.url = '';
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
       checkStatus(){
        // this.showStatusBar = true;
        this.modal_message = 'Executing Pipeline ...'
        this.checkStatusCall(this.pipeline_id,this.checkStatusCallBack)
      },
       checkStatusCallBack(response){
        if(response.status == 200){
          this.disable_cancel = false;
          if (response.data.build_status.toUpperCase() != 'NOT_EXECUTED'){
            this.build_status = response.data.build_status;
            this.$store.state.status = this.build_status;
            this.showStatus = true;
          }
          if (response.data.build_url != '' && response.data.build_url != null){
            this.showCard = true;
            this.build_url = response.data.build_url;
            this.$store.state.build_url = this.build_url;
            this.showBuildUrl = true;
          }

          if(response.data.build_status.toUpperCase() == 'SUCCESS'){
            this.showStatusBar = false;
            this.autoRefresh = false;
            this.getOutputCall(this.pipeline_id,this.getOutputCallBack);

          }

          if(response.data.build_status.toUpperCase() == "FAILURE"){
            this.loading = false;
            this.autoRefresh = false;
            this.$swal.fire({
              title: 'The execution of the pipeline has failed!',
              icon: 'error',
              confirmButtonText: 'Close',
              confirmButtonColor: '#E14726',
              footer: `<a style='color:red' href="${this.build_url}" target="_blank">Why do I have this issue?</a>`
            })
          }

          if(response.data.build_status.toUpperCase() == "ABORTED"){
            this.loading = false;
            this.autoRefresh = false;
            this.$swal.fire({
              title: 'The execution of the pipeline has failed!',
              icon: 'error',
              confirmButtonText: 'Close',
              confirmButtonColor: '#E14726',
              footer: `<a style='color:red' href="${this.build_url}" target="_blank">Why do I have this issue?</a>`
            })
          }



        }else if(response.status == 403){
          this.autoRefresh = false;
          this.showStatus = false;
          this.loading = false;
          this.$router.replace(this.$route.query.redirect || "/logout");
        }else if (response.status == 422){
          this.autoRefresh = false;
          this.showStatus = false;
          this.showBuildUrl = false;
          this.$store.state.status = '';
          this.$store.state.build_url = '';
          this.loading = false;
          this.$swal.fire({
             title: 'Pipeline has not been execute!',
            text: response.detail?response.detail:response.reason?response.reason:response.data?response.data:'Error',
            icon: 'error',
            confirmButtonText: 'Close',
            confirmButtonColor: '#E14726',
          })

        }else if(response.status == 500){
           this.$swal.fire({
             title: 'The quality assessment has failed to complete!',
            text: response.detail?response.detail:response.reason?response.reason:response.data?response.data:'Error',
            icon: 'error',
            confirmButtonText: 'Close',
            confirmButtonColor: '#E14726',
            footer: `<p style="color: red; font-weight: bold;">Please contact sqaaas@ibergrid.eu</p>`,
          })
          this.autoRefresh = false;
          this.showStatus = false;
          this.loading = false;

        }else{
           this.$swal.fire({
            title: 'Error!',
            text: response.detail?response.detail:response.reason?response.reason:response.data?response.data:'Error',
            icon: 'error',
            confirmButtonText: 'Close',
            footer: `<a href="${this.build_url}" target="_blank">Why do I have this issue?</a>`
          })
          this.autoRefresh = false;
          this.showStatus = false;
          this.loading = false;
          this.showErrorFailure;
        }
      },
      cancelExecution(){
        this.autoRefresh = false;
        this.loading = false;
        this.showReportBtn = false;
      },
      getOutputCallBack(response){
        if(response.status == 200){
          this.$store.state.report = response.data;
           this.showReportBtn = true;
           this.goToReport();
          // this.getBadgeCall(this.pipeline_id,this.getBadgeCallCallBack)
        }else if(response.status == 403){
          this.autoRefresh = false;
          this.showStatus = false;
          this.loading = false;
          this.$router.replace(this.$route.query.redirect || "/logout");
        }else if(response.status == 500){
           this.$swal.fire({
             title: 'An unexpected error occurred while running the assessment!',
            text: response.detail?response.detail:response.reason?response.reason:response.data?response.data:'Error',
            icon: 'error',
            confirmButtonText: 'Close',
            footer: `<p style="color: red; font-weight: bold;">Please contact sqaaas@ibergrid.eu</p>`,
            confirmButtonColor: '#E14726',
          })
          this.$store.state.report = {};
          this.build_status = '';

        }else{
          this.$swal.fire({
            title: 'The quality assessment has failed to complete!',
            text: response.detail?response.detail:response.reason?response.reason:response.data?response.data:'Error',
            icon: 'error',
            confirmButtonText: 'Close',
            confirmButtonColor: '#E14726',
          })
          this.$store.state.report = {};
          this.build_status = '';
        }
        this.loading = false;
      },
      getBadgeCallCallBack(response){
        if(response.status == 200){
          this.repo_info = response.data;
          this.goToReport();
        }else if(response.status == 403){
          this.autoRefresh = false;
          this.showStatus = false;
          this.loading = false;
          this.$router.replace(this.$route.query.redirect || "/logout");
         }else if(response.status == 500){
           this.$swal.fire({
             title: 'An unexpected error occurred while running the assessment!',
            text: response.detail?response.detail:response.reason?response.reason:response.data?response.data:'Error',
            icon: 'error',
            confirmButtonText: 'Close',
            footer: `<p style="color: red; font-weight: bold;">Please contact sqaaas@ibergrid.eu</p>`,
            confirmButtonColor: '#E14726',
          })
          this.autoRefresh = false;
          this.showStatus = false;
          this.loading = false;
        }else{
           this.$swal.fire({
            title: 'The quality assessment has failed to complete!',
            text: response.detail?response.detail:response.reason?response.reason:response.data?response.data:'Error',
            icon: 'error',
            confirmButtonText: 'Close',
            confirmButtonColor: '#E14726',
          })
          this.autoRefresh = false;
          this.showStatus = false;
          this.loading = false;
        }
      },

      getCriteriaCallBack(response){
        this.array_criterias = [];
        if(response.status == 200){
          for(var i in response.data){
            this.array_criterias.push(response.data[i]);
            this.criteria = 'SvcQC.Dep';
            this.criteria_fair = 'QC.FAIR'
          }
        }else if(response.status == 403){
           this.loadingError = true;
           this.$swal.fire({
            title: 'We are having problems making the request.',
            icon: 'error',
            confirmButtonText: 'Close',
            confirmButtonColor: '#E14726',
            footer: `<a style="font-size:18px;color:red; text-decoration:underline;"  href="https://github.com/EOSC-synergy/SQAaaS/issues/new/choose" target="_blank">Report the issue</a>`,

          })

        }else{
          this.loadingError = true;
          this.$swal.fire({
            title: 'We are having problems making the request.',
            text: response.detail?response.detail:response.reason?response.reason:response.data?response.data:'Error',
            icon: 'error',
            confirmButtonText: 'Close',
            confirmButtonColor: '#E14726',
            footer: `<a style="font-size:18px;color:red; text-decoration:underline;"  href="https://github.com/EOSC-synergy/SQAaaS/issues/new/choose" target="_blank">Report the issue</a>`,
          })
        }
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
          this.change_image_yes = false;
          this.change_image_no = true;
          this.showBuilderTool = false;
          this.array_selected_tools.push(this.selected_tool);
        }
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
              },500)
            }else {
              args[i].value = $("#simple_input_"+count+'_'+i).val();
              $("#simple_input_"+count+'_'+i).val('');
            }
          }else if(this.selected_tool.args[i].selectable ==true && this.selected_tool.args[i].format == 'array'){
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
      removeTool(key){
        this.$delete(this.array_selected_tools,key)
        if (this.isEmpty(this.array_selected_tools)) {
          this.showBuilderTool = false;
        }

      },



      async addToolFair(){
        let args = await this.addingFair(this.selected_tool_fair.args, 0)
        var error_args = false;
        for (var i in args){
          if(args[i].type == 'positional' && args[i].value == ''){
            error_args = true;
          }
        }
        if(error_args == true){
          this.showErrorArgsFair = true;
        }else{
          this.showErrorArgsFair = false;
          this.selected_tool_fair['args'] =  args;
          this.builder_tool_fair = 'default';
          this.change_image_yes_fair = false;
          this.change_image_no_fair = true;
          this.showBuilderToolFair = false;
          this.array_selected_tools_fair.push(this.selected_tool_fair);
        }
      },

      async paintingArgFair(args, count){
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
                     ${this.paintSelectOptFair(args[i].value)}
                    </select>
                  </div>

                </div>`
          }

          if(args[i].args && args[i].args.length > 0){
            text += await this.paintingArgFair(args[i].args, (count*1+1))
          }

          body += text
        }

        $('#ref-arg-fair').html(body)
        $('.select-options').on('change', function(){
          console.log($(this).attr('data-index'))
          console.log($(this).val())
        })
        return body;
      },
      paintSelectOptFair(opts){
        let message = "<option selected disabled value=''>Selected option ...</option>"
        for(var i in opts){
          message += `<option value="${opts[i]}">${opts[i]}</option>`
        }

        return message;
      },
      async addingFair(args, count){
        for(var i in args){
          if (this.selected_tool_fair.args[i].selectable ==true && this.selected_tool_fair.args[i].format == 'string'){
            if(args[i].repeatable == true){
              args[i].value = $("#inputTag_"+count+'_'+i).val();
              setTimeout(function(){
                $("#inputTag_"+count+'_'+i).tagsinput('removeAll');
              },500)
            }else {
              args[i].value = $("#simple_input_"+count+'_'+i).val();
              $("#simple_input_"+count+'_'+i).val('');
            }
          }else if(this.selected_tool_fair.args[i].selectable ==true && this.selected_tool_fair.args[i].format == 'array'){
              args[i].value = $('#select_'+count+'_'+i).val();
          }
          if(args[i].args && args[i].args.length > 0){
            await this.addingFair(args[i].args, (count*1+1))
          }
        }

        return args;
      },
      async startListArgFair(args,index){
        let myPromise = new Promise((resolve, reject) => {
          this.listArgFair(args, index).then(body => {
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
      async listArgFair(args, index){
        var text = '', body = '';

        for(var i in args){
          text = '';
          if(args[i].type && args[i].value){
            text += `<p style='margin-bottom:0px;'>
                      ${args[i].type} : ${args[i].value}
                    </p>`
          }
          if(args[i].args && args[i].args.length > 0){
            text += await this.listArgFair(args[i].args, index);
          }
          body += text;

        }
        return body;
      },
      removeToolFair(key){
        this.$delete(this.array_selected_tools_fair,key)
        if (this.isEmpty(this.array_selected_tools_fair)) {
          this.showBuilderToolFair = false;
        }

      },

  },
  created(){
      this.getCriteriaCall(this.getCriteriaCallBack);
      this.pipeline_id = '';
      this.params.url = '';
      this.params.brach = '';
      this.doc.yes = false;
      this.showReportBtn = false;
      this.build_status = '';
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

.custom-append-button {
  padding-top: 0px !important;
  padding-bottom: 0.38rem !important;
  padding-left:0.75rem !important;
  padding-right:0.75rem !important;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    /* line-height: 1.5; */
    color: #495057;
    /* text-align: center; */
    /* white-space: nowrap; */

    border: none;

    height: 40px;
}

.btn-info {
    border-color: #1185EB;
    color: #1185EB;
}

.btn-next {
    background-color: #1DC7EA !important;
    color: black !important;
    padding:1rem 0 1rem 0;
    font-weight: bold;
    border: 2px solid black;
  }

  .btn-next-back{
    width: 20%!important;
  }

.btn-back{
  padding:1rem 0 1rem 0;
  background-color:#ccc!important;
  margin-right:10%;
  font-weight: bold;
  border: 2px solid black;

}
.custom-div-append {
  padding:0px 0px 0px 0px;
  margin:0px;
  margin-left: -3px;
}




@media (max-width: 576px) {
  .container-fluid{
    padding-left: 0px!important;
    padding-right: 0px!important;
  }


 }

 .accordion-head i{
    font-size: 1.5em;
    float: right;
}

.accordion-head > .collapsed > i:before{
    content: "\f105";
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

  .custom-table-title{
  padding-top:5px;
  /* padding-left:20px; */
  text-transform: uppercase;
  font-size:16px;
  color:black;
  font-weight:700;

}

.modal-dialog{
  transform:none!important;
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

</style>

