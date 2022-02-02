<template>
  	<div class="content">
      <div class="container-fluid" style="min-height:70vh;">
        <div class="row" style="overflow-y: auto;">
          	<div class="col-12" style="margin-top:40px;">
            <card class="strpied-tabled-with-hover"
              body-classes=""
            >
              <template slot="header" >
                <div class="row">
                  <div class="col-6" style="display:inline-flex;">
                    <button class="btn btn-default btn-simple" @click="gotoFull()"><i class="fa fa-arrow-left" aria-hidden="true"></i><span style="font-weight: bold;padding-top:5px;font-size:18px;" class="card-title">Back</span></button>
                  </div>
                  <div class="col-6 text-right">
                    <button style="color: #fff;background-color: #6c757d;border-color: #6c757d;" class="btn  " @click="refresh()"><i class="fa fa-refresh" style="padding-right:5px;" aria-hidden="true"></i> New Assessment</button>
                  </div>

                </div>
              </template>

              <template class="card-body">

                <h3 class="text-center" v-if="showBadgeSoftware== true || showBadgeService == true || showBadgeFair==true">Congratulations!!! the following badge/s have been awarded</h3>
                <div class="text-center" v-else>
                  <h3>Sorry, you have not earned any badges</h3>
                  <i style="opacity: 0.5" class="fa fa-frown-o fa-10x" aria-hidden="true"></i>
                </div>

                <div class="row">
                  <div v-show="showBadgeSoftware == true" :class="{'col-md-4':showBadgeService == true && showBadgeFair == true, 'col-md-6':((showBadgeService == true && showBadgeFair == false) || (showBadgeService == false && showBadgeFair == true)), 'col-md-12':showBadgeService == false && showBadgeFair == false}" class="col-12 text-center" id="badge-software" style="padding-top:20px;padding-left:15px;">
                  </div>
                  <div v-show="showBadgeService == true" :class="{'col-md-4':showBadgeSoftware == true && showBadgeFair == true, 'col-md-6':((showBadgeSoftware == true && showBadgeFair == false) || (showBadgeSoftware == false && showBadgeFair == true)), 'col-md-12':showBadgeSoftware == false && showBadgeFair == false}" class="col-12 text-center" id="badge-service" style="padding-top:20px;padding-left:15px;">
                  </div>
                  <div v-show="showBadgeFair == true"  :class="{'col-md-4':showBadgeSoftware == true && showBadgeFair == true, 'col-md-6':((showBadgeSoftware == true && showBadgeFair == false) || (showBadgeSoftware == false && showBadgeFair == true)), 'col-md-12':showBadgeSoftware == false && showBadgeFair == false}" class="col-12 col-md-4 text-center" id="badge-fair" style="padding-top:20px;padding-left:15px;">
                  </div>
                </div>

                <h3 class="text-center" style="margin-top:2rem;">Report</h3>
                  <div class="table-responsive">
                      <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                          <thead>
                              <th style="text-align:left;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Criterion</th>
                              <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Valid</th>
                              <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Required</th>
                              <th style="text-align:center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;">Recommended</th>
                              <th style="text-align:center;justify-content: center;padding-right: 10px; padding-left: 10px;background-color:#eee;font-size:14px;width:100%;">Optional</th>
                          </thead>
                          <tbody v-for="(crit, index) in $store.state.report.report" :key="index">
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
                                          <div v-if="crit['valid'] == true" style="text-align:center;">
                                              <i style="color:#1BC10B;" class="fa fa-check-circle" aria-hidden="true"></i>
                                          </div>
                                          <div v-else style="text-align:center;">
                                              <i style="color:red" class="fa fa-times-circle" aria-hidden="true"></i>
                                          </div>
                                      </td>
                                      <td
                                          style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                          <div  v-if="crit['data']['REQUIRED'] && crit['data']['REQUIRED'].length > 0" style="text-align:center;">
                                              <button v-for="(tool, index1) in crit['data']['REQUIRED']" :key="index1" class="btn btn-primary btn-link" style="border:none" data-toggle="modal" data-target="#exampleModal" @click="modalInfo(index,'REQUIRED',tool['name'])">
                                                {{tool['name']}}
                                              </button>
                                              <!-- <p v-for="(tool, index1) in crit['data']['REQUIRED']" :key="index1">
                                                {{tool['name']}}

                                              </p> -->

                                          </div>
                                          <div v-else style="text-align:center;">
                                              <span>-</span>
                                          </div>
                                      </td>
                                      <td
                                          style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                          <div  v-if="crit['data']['RECOMMENDED'] && crit['data']['RECOMMENDED'].length > 0" style="text-align:center;">
                                            <button v-for="(tool, index1) in crit['data']['RECOMMENDED']" :key="index1" class="btn btn-primary btn-link" style="border:none" data-toggle="modal" data-target="#exampleModal" @click="modalInfo(index,'RECOMMENDED',tool['name'])">
                                                {{tool['name']}}
                                              </button>
                                          </div>
                                          <div v-else style="text-align:center;">
                                              <span>-</span>
                                          </div>
                                      </td>
                                      <td
                                          style="text-align:right;justify-content:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                          <div  v-if="crit['data']['OPTIONAL'] && crit['data']['OPTIONAL'].length > 0" style="text-align:center;">
                                            <button v-for="(tool, index1) in crit['data']['OPTIONAL']" :key="index1" class="btn btn-primary btn-link" style="border:none" data-toggle="modal" data-target="#exampleModal" @click="modalInfo(index,'OPTIONAL',tool['name'])">
                                                {{tool['name']}}
                                              </button>
                                          </div>
                                          <div v-else style="text-align:center;">
                                              <span>-</span>
                                          </div>
                                      </td>
                                      <!-- <td
                                          style="text-align:right;justify-content:center;padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                          <button type="button" class="btn-simple btn btn-xs btn-info" @click="removeEnv(index)"><i style="font-size:15px;color:red;" class="fa fa-trash"></i>
                                          </button>
                                      </td> -->
                                  </tr>
                          </tbody>
                      </table>
                       <!-- Modal -->
                      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl" role="document">
                          <div class="modal-content">
                            <div class="modal-header ">
                              <h5 class="modal-title " id="exampleModalLabel">REPORT</h5>
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">
                              <div class="row">
                                <card class="col-12">
                                  <h3>Tool: {{modalInfoData ? modalInfoData.name: ''}}</h3>
                                  <div v-if="modalInfoData && modalInfoData['ci'] && modalInfoData && modalInfoData['ci']['status'] == 'SUCCESS'" style="text-align:left;">
                                      <a :href="modalInfoData && modalInfoData['ci']?modalInfoData['ci']['url']:'#'" target="_blank" style="font-size:18px;">Status: <i style="color:#1BC10B;" class="fa fa-check-circle" aria-hidden="true"></i></a>
                                  </div>
                                  <div v-else style="text-align:left;">
                                      <a :href="modalInfoData && modalInfoData['ci']?modalInfoData['ci']['url']:'#'" target="_blank" style="font-size:18px;">Status: <i style="color:red" class="fa fa-times-circle" aria-hidden="true"></i></a>
                                  </div>

                                  <div v-show="showEditor" class="col-12" style="padding-top:2rem;height:40vh;overflow-y: auto;">
                                    <editor  editor-id="'editor_modal'" lang="json" :content="modalUnstructured"  key="editor_modal" ></editor>
                                  </div>
                                </card>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                            </div>
                          </div>
                        </div>
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
  import Editor from './AceEditor'
  export default {
    components: {
		LTable,
		Card,
    'editor': Editor,
    },
    mixins: [Services],
    data () {
      return {
        showBadgeSoftware:false,
        showBadgeService:false,
        showBadgeFair:false,
        modalInfoData:{},
         editor: '',
        modalUnstructured:'',
        showEditor:false

      }
    },
     watch:{



    },

    methods:{
      modalInfo(crit,type,tool){
        if(crit != '' && type != '' && tool != ''){
          for(var i in this.$store.state.report['report'][crit]['data'][type]){
            console.log(tool, this.$store.state.report['report'][crit]['data'][type][i]['name'])
            if(tool == this.$store.state.report['report'][crit]['data'][type][i]['name']){
              this.modalInfoData = this.$store.state.report['report'][crit]['data'][type][i]
            }
          }
        }
        if(this.modalInfoData['data_unstructured']){
          this.showEditor = true;
          this.modalUnstructured = JSON.stringify(this.modalInfoData['data_unstructured'], null, '\t')
        }else{
          this.showEditor = false;
          this.modalUnstructured = '';
        }
        console.log(this.modalInfoData)
      },
      gotoFull(){
        this.$router.push({name: 'full_assessment'});
      },
      refresh(){
        this.$router.push({name: 'full_assessment'});
      }


  },
   mounted(){
     this.$eventHub.$emit('steps', 5);
     var _this = this
     this.$nextTick(function () {
       console.log(this.$store.state.report)
        if(this.$store.state.report.badge['software']){
          this.showBadgeSoftware = true;
          if($("#badge-software").has("blockquote").length == 0){
            console.log(this.$store.state.report.badge['software']['share'])
            $( "#badge-software" ).append(this.$store.state.report.badge['software']['share']);
          }
        }
        if(this.$store.state.report.badge['service']){
          this.showBadgeService = true;
          if($("#badge-service").has("blockquote").length == 0){
            $( "#badge-service" ).append(this.$store.state.report.badge['service']['share']);
          }
        }
        if(this.$store.state.report.badge['fair']){
          this.showBadgeFair = true;
          if($("#badge-fair").has("blockquote").length == 0){
            $( "#badge-fair" ).append(this.$store.state.report.badge['fair']['share']);
          }
        }
        $('blockquote p').css('text-align','center');
        $('blockquote p a').css('display','unset');
        $('blockquote img').css('height','300px');
        $('blockquote img').css('width','300px');


      })

  },
  created(){

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

.badgr-badge img{
  height: 300px!important;
  width: 300px!important;
}

</style>

