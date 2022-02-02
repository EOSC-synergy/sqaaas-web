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
                <h2>Title</h2>
                <p>Some text</p>
                <div class="text-left row">
                  <div class="col-12 col-md-8">
                    <base-input type="text"
                              label="Repository URL"
                              :disabled="false"
                              placeholder="Repository URL"
                              v-model="params.url">
                    </base-input>
                  </div>
                  <div class="col-12 col-md-4">
                    <base-input type="text"
                              label="Branch"
                              :disabled="false"
                              placeholder="master"
                              v-model="params.branch">
                    </base-input>
                  </div>
                </div>

                 <div class="row" style="padding-left:20px;margin-top:1rem;margin-bottom:1rem">
                    <span class="custom-label">External repo for documentation?</span>
                    <div class="custom-div-append">
                      <button type="button" class="btn custom-append-button" data-toggle="tooltip" data-html="true" data-placement="top" title="Credentials can only be used once they are defined in <a target='blank' href='https://jenkins.eosc-synergy.eu/credentials/' title='test add link'>EOSC-Synergy Jenkins</a> instance">
                        <i class="fa fa-question-circle"></i>
                      </button>
                  </div>
                    <span class="custom-label" style="padding-left:75px;">Yes</span><base-checkbox name="credentials" v-model="doc.yes"></base-checkbox>
                    <span class="custom-label">No</span><base-checkbox name="credentials" v-model="doc.no"></base-checkbox>
                  </div>

                  <div v-show='doc.yes' class="text-left row">
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

                <!-- Criteria Section  -->
                <!-- <div class="text-left col-12">
                  <div class="row" style="padding-bottom:0px;margin-bottom:0px;padding-left: 15px;">
                      <div class="" style="padding-bottom:10px">
                        <label style="color:black;"> CHOOSE A CRITERIA</label>
                        <select style="font-family: console;font-weight: 700;" class="custom-select" id="sqacriteria" v-model='criteria'>
                          <option value="default">Select ...</option>
                          <option v-for="(crit,key) in array_criterias" :key="key" :value="crit['id']">{{crit['id']}}</option>
                        </select>
                      </div>
                      <div v-show="criteria != 'default'" style="margin:auto;border-radius:5px;">
                        <div class="quote-custom">
                          <p style="font-weight:700;font-size:18px;font-style:italic;width:90%;padding-left:40px">{{(info[criteria]) ? info[criteria].p1 : ''}}
                          (<a style="text-decoration: underline" :href="(info[criteria]) ? info[criteria]['link'] : ''" target="_blank">See More</a>)</p>
                        </div>
                      </div>
                  </div>
                  <div class="text-center">
                    <span v-show="showErrorCriteria" style="color:red; font-size:12px;padding-left:20px;">You must select a valid criteria</span>
                  </div>

                </div> -->

                <!-- Services Section -->

                <!-- <div class="text-left col-12">
                  <h4>Add external services (Optional)</h4>
                  <div class="row" style="padding-left:30px">

                        <base-input class="col-md-6" type="text"
                              label="Name"
                              :disabled="false"
                              placeholder=""
                              v-model="service.name">
                        </base-input>
                        <base-input class="col-md-6" type="text"
                              label="Docker Image"
                              :disabled="false"
                              placeholder=""
                              v-model="service.url">
                        </base-input>
                        <div style="margin-bottom:10px;width:95%;" class="text-right">
                          <button type="button" class="btn-simple btn btn-xs btn-info" @click="addService()"><i class="fa fa-plus"></i>ADD Service</button>
                        </div>
                      </div>
                      <div v-show="showService" style="padding-top:5px;margin-bottom:1rem;">
                        <span class="custom-label">Env Vars</span>
                        <div class="table-responsive">
                          <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                              <thead>
                                  <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">key</th>
                                  <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">value</th>
                                  <th style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">REMOVE</th>
                              </thead>
                              <tbody v-for="(env, index) in all_services" :key="index">
                                      <tr
                                          style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                                          <td
                                              style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                              <div style="text-align:left;">
                                                  {{index}}
                                              </div>
                                          </td>
                                          <td
                                              style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                              <div style="text-align:center;">
                                                  {{env}}
                                              </div>
                                          </td>
                                          <td
                                              style="text-align:right;justify-content:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                              <button type="button" class="btn-simple btn btn-xs btn-info" @click="removeEnv(index)"><i style="font-size:15px;color:red;" class="fa fa-trash"></i>
                                              </button>
                                          </td>
                                      </tr>
                              </tbody>
                          </table>
                        </div>
                      </div>

                </div> -->

                <div style="padding:20px;">
                  <button class="btn btn-primary btn-fill" @click="getResults()">Start Assessment</button>
                  <!-- <button v-show="showReportBtn" class="btn btn-primary btn-fill" data-toggle="modal" data-target="#exampleModal">See Report</button> -->
                   <!-- <button v-show="showReportBtn" style="margin-right:20px;" class="btn btn-primary btn-fill" @click="goToReport()">See Report</button> -->
                  <!-- <button v-show="showReportBtn" style="color: #fff;background-color: #6c757d;border-color: #6c757d;" class="btn  " @click="refresh()"><i class="fa fa-refresh" style="padding-right:5px;" aria-hidden="true"></i> New Assessment</button> -->
                </div>
              </div>
						</template>
					</card>
				</div>
			</div>
		</div>
  	</div>
</template>
<script>

  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import Services from '../services/services'
  export default {
    components: {
		LTable,
		Card
    },
    mixins: [Services],
    data () {
      return {
        criteria:'default',
        array_criterias:[],
        service:{
          name:'',
          url:''
        },
        all_services:{},
        showService:false,
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
        },
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
        autoRefresh:false,
        pipeline_id:'',
        loading: false,
        modal_message : '',
        disable_cancel : true,
        build_url:'',
        showBuildUrl:false,
        build_status:'',
        showReportBtn: false

      }
    },
     watch:{
      'criteria'(val){
        this.showBuilderTool=false;
        if(val != "default"){
          this.show_link = true;
          this.showSelect = true;
          for (var i in this.array_criterias){
            if (this.array_criterias[i].id == val){
              this.array_tools = this.array_criterias[i]['tools']
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
        }
      },
      'builder_tool'(val){
        if(val != 'default'){
          for (var i in this.array_tools){
            if(this.array_tools[i].name == val){
              this.selected_tool = this.array_tools[i]
            }
          }
          console.log(this.selected_tool)
          var _this = this;

          setTimeout(function(){
            for (var i in _this.selected_tool.args){
              $("#inputTag_"+i).tagsinput({
                trimValue: true
              })
            }
          },100)

          var no_error = 0;
          var select_false = 0;
          for(var i in this.selected_tool.args){
            if(typeof this.selected_tool.args[i].selectable !== 'undefined' && this.selected_tool.args[i].selectable == true  && typeof this.selected_tool.args[i].format !== 'undefined' && typeof this.selected_tool.args[i].type !== 'undefined' && typeof this.selected_tool.args[i].value !== 'undefined'){
             no_error = no_error + 1;
            }else if(typeof this.selected_tool.args[i].selectable !== 'undefined' && this.selected_tool.args[i].selectable == false){
              select_false = select_false + 1;
            }
          }
          if(no_error+select_false == this.selected_tool.args.length){
            this.showBuilderTool = true;
          }else{
            this.showBuilderTool = false;
            this.notifyVue("There was an error bulding the arguments of the tool.")
          }
        }else{
          this.showBuilderTool = false;
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
      "autoRefresh"(val) {
        console.log(val)
        if (val) {
            this.t = setInterval(() => {
                this.checkStatus()
            }, 3 * 1000)
        } else {
            clearInterval(this.t)
        }
      }


    },

    methods:{
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
          this.showErrorURL = false;
          this.loading = true;
          this.modal_message = 'Submitting Pipeline ...';
          this.getPipelineAssessmentCall(data,this.getPipelineAssessmentCallBack)
        }else{
          this.showErrorURL = true;
        }


      },
      getPipelineAssessmentCallBack(response){
        console.log(response)
        if(response.status == 201 && response.data.id){
          this.pipeline_id = response.data.id;
          // this.loading = true;
          // this.modal_message = 'Submitting Pipeline ...';

          this.runAssessmentPipelineCall(this.pipeline_id,this.runAssessmentPipelineCallBack)
        }else{
          this.notifyVue("There is some error")
        }
      },
      runAssessmentPipelineCallBack(response){
        if(response.status == 204){
          this.autoRefresh = true;
        }else if(response.status == 403){
          this.$router.replace(this.$route.query.redirect || "/logout");
          this.loading = false;
        }else{
          this.notifyVue("There is some error")
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
          if (response.data.build_status != 'NOT_EXECUTED'){
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

          console.log(response.data.build_status)
          if(response.data.build_status == 'SUCCESS'){
            this.showStatusBar = false;
            this.autoRefresh = false;
            this.getOutputCall(this.pipeline_id,this.getOutputCallBack);

          }

          if(response.data.build_status == "FAILURE"){
            this.loading = false;
            this.autoRefresh = false;
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
          this.notifyVue("Pipeline has not been execute");

        }else{
          this.autoRefresh = false;
          this.showStatus = false;
          this.notifyVue("Error "+response.status +":", (response.data) ? response.data : '')
          this.loading = false;
        }
      },
      cancelExecution(){
        console.log('here')
        this.autoRefresh = false;
        this.loading = false;
        this.showReportBtn = false;
      },
      getOutputCallBack(response){
        if(response.status == 200){
          this.$store.state.report = response.data;
           this.showReportBtn = true;
          // this.getBadgeCall(this.pipeline_id,this.getBadgeCallCallBack)
        }else if(response.status == 403){
          this.autoRefresh = false;
          this.showStatus = false;
          this.loading = false;
          this.$router.replace(this.$route.query.redirect || "/logout");
          }else{
          this.notifyVue("There is some error.");
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
        }else{
          this.autoRefresh = false;
          this.showStatus = false;
          this.notifyVue("Error "+response.status +":", (response.data) ? response.data : '')
          this.loading = false;
        }
      },

  },
  created(){
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

</style>

