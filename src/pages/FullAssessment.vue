<template>
  	<div class="content">
		<div class="container-fluid">
			<div class="row">
				<div class="col-12" style="margin-top:40px;">
					<card class="strpied-tabled-with-hover"
						body-classes=""
					>
						<template slot="header" >
              <div style="display:inline-flex;">
                <button class="btn btn-default btn-simple" @click="gotoSelect()"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                <h4 style="font-weight: bold;padding-top:5px;" class="card-title">Back</h4>
              </div>
						</template>

						<template class="card-body">
              <div class="text-center" style="justify-content: center;margin-top:60px;">
                <h2>Title</h2>
                <div class="text-left col-12">
                  <base-input type="text"
                            label="Repository URL"
                            :disabled="false"
                            placeholder="Repository URL"
                            v-model="params.url">
                  </base-input>
                </div>

                <!-- Criteria Section  -->
                <div class="text-left col-12">
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

                </div>

                <!-- Services Section -->

                <div class="text-left col-12">
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

                </div>

                <div style="padding:20px;">
                  <button class="btn btn-primary btn-fill" data-toggle="modal" data-target="#exampleModal" @click="getResults()">Execute</button>
                </div>
              </div>
						</template>
					</card>
				</div>

       <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
			</div>
		</div>
  	</div>
</template>
<script>

  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  export default {
    components: {
		LTable,
		Card
    },
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
          url:''
        }

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
      }
    },
    methods:{
      gotoCustomized(){
        this.$router.push({name: 'dashboard'});
      },
      gotoFull(){
        this.$router.push({name: 'full_assessment'});
      },
      gotoSelect(){
        this.$router.push({name: 'SelectOption'});
      },
      getResults(){
        console.log('here')

      },
      addService(){
        var key= this.service.name.replace(" ", "")
				var value = this.service.url.replace(" ", "")
        this.all_services[key]=value
        // this.$store.state.config_yaml.environment = this.config.all_envs;
        this.showService = true;
        this.cleanService()

      },
      removeService(item){
        this.$delete(this.all_services,item)
        // this.$store.state.config_yaml.environment = this.config.all_envs;
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

  }
}
</script>
<style scoped>
.pos-buttons{
  display: inline-flex!important;
}
</style>
