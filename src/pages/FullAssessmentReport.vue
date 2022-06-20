<template>
  	<div class="content">
      <div class="container-fluid" style="min-height:70vh;">
        <div class="row" style="overflow-y: auto;">
          	<div class="col-12" style="margin-top:40px;">
              <card class="strpied-tabled-with-hover"
                body-classes=""
              >
                <template slot="header" >
                  <div class="row" style="padding: 0px 10px;">
                    <div class="col-6" style="display:inline-flex;">
                      <button class="btn btn-default btn-simple" @click="gotoFull()"><i class="fa fa-arrow-left" aria-hidden="true"></i><span style="font-weight: bold;padding-top:5px;font-size:18px;" class="card-title">Back</span></button>
                    </div>
                    <div class="col-6 text-right mt-2 ">
                      <button style="color: #fff;background-color: #6c757d;border-color: #6c757d;" class="btn  " @click="refresh()"><i class="fa fa-refresh" style="padding-right:10px;" aria-hidden="true"></i> New Assessment</button>
                    </div>

                  </div>
                </template>

                <template class="card-body">

                  <h2 class="text-center" v-if="showBadgeSoftware== true || showBadgeService == true || showBadgeFair==true" style="color: #6c757d; font-weight: bold;">Congratulations!!! the following badge/s have been awarded</h2>
                  <div class="text-center" v-else>
                    <h3>Sorry, you have not earned any badges</h3>
                    <div style="padding-right: 150px;">
                      <i style="opacity: 0.5" class="fa fa-frown-o fa-10x" aria-hidden="true"></i>

                    </div>
                  </div>

                  <div class="text-center">
                    <h4><a href="https://docs.sqaaas.eosc-synergy.eu/quality_assessment_and_awarding/synergy_badging_approach" target="blank">Learn more about the EOSC-Synergy badging approach</a></h4>
                  </div>

                  <div class="row" style="margin-bottom:4rem;">
                    <div v-show="showBadgeSoftware == true" :class="{'col-md-4':showBadgeService == true && showBadgeFair == true, 'col-md-6':((showBadgeService == true && showBadgeFair == false) || (showBadgeService == false && showBadgeFair == true)), 'col-md-12':showBadgeService == false && showBadgeFair == false}" class="col-12 text-center" id="badge-software" style="padding-top:20px;padding-left:15px;">
                    </div>
                    <div v-show="showBadgeService == true" :class="{'col-md-4':showBadgeSoftware == true && showBadgeFair == true, 'col-md-6':((showBadgeSoftware == true && showBadgeFair == false) || (showBadgeSoftware == false && showBadgeFair == true)), 'col-md-12':showBadgeSoftware == false && showBadgeFair == false}" class="col-12 text-center" id="badge-service" style="padding-top:20px;padding-left:15px;">
                    </div>
                    <div v-show="showBadgeFair == true"  :class="{'col-md-4':showBadgeSoftware == true && showBadgeFair == true, 'col-md-6':((showBadgeSoftware == true && showBadgeFair == false) || (showBadgeSoftware == false && showBadgeFair == true)), 'col-md-12':showBadgeSoftware == false && showBadgeFair == false}" class="col-12 col-md-4 text-center" id="badge-fair" style="padding-top:20px;padding-left:15px;">
                    </div>
                  </div>

                  <div class="col-12 col-sm-12 col-md-12 col-lg-6 mx-auto">
                    <h3 style="padding-bottom:10px; font-weight:bold;">Criteria Report</h3>
                    <card v-for="(crit, index) in $store.state.report.report" :key="index" style="padding:0px!important;max-width:1000px;">
                        <template slot='header' style="background-color:#E8E6E5!important;">
                          <div  style="padding-left:1.5rem;background-color:#E8E6E5!important;border-bottom:1px solid #dee2e6">
                            <!-- <div class="col-2">
                              <div style="text-align:right;margin-top:30px;">
                                <i style="color:#7C7572" class="fa fa-2x" :class="mapping_icon[index]?mapping_icon[index]:mapping_icon['default']" aria-hidden="true"></i>
                              </div>
                            </div> -->
                            <div class="row" style="margin-right:0px; margin-left:0px;">
                              <div class="col-10" style="padding-top:20px;">
                                  <p style="font-weight: 700; font-size:24px;"> <i style="margin-right: 50px;color:#7C7572; font-size:28px;" class="fa fa-2x" :class="mapping_icon[index]?mapping_icon[index]:mapping_icon['default']" aria-hidden="true"></i>{{mapping_criteria_name[index]?mapping_criteria_name[index]:index}}</p>
                              </div>
                              <div class="col-2" style="padding-top:20px;">
                                <div v-if="crit['valid'] == true" style="text-align:center;">
                                    <i style="color:#1BC10B;" class="fa fa-2x fa-check-circle" aria-hidden="true"></i>
                                </div>
                                <div v-else style="text-align:center;">
                                    <i style="color:red" class="fa fa-2x fa-times-circle" aria-hidden="true"></i>
                                </div>

                              </div>
                            </div>
                          </div>

                        </template>

                        <template class="card-body">
                          <div class="row" style="padding:0px 20px;">
                              <div v-if="crit['filtered_reason']">
                                <p v-for="(fr, z) in crit['filtered_reason']" :key="z" style="margin-bottom:0px; font-size:12px; color:rgb(108, 117, 125)">
                                  {{crit['filtered_reason'][z]}}
                                </p>
                              </div>
                            </div>
                          <div>
                              <div class="table-responsive">
                                <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tbody v-for="(subcrit, index1) in crit['subcriteria']" :key="index1">

                                            <tr
                                                style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                                                <td style="padding-right: 10px; padding-left: 10px;padding-bottom:0px;">
                                                  <div class="row" style="padding:0px 20px;">

                                                    <div v-if="subcrit['valid'] == true" style="text-align:center;">
                                                      <p style="font-size:18px;margin-bottom:0px;"><span style="font-weight:700!important; padding-right:30px;"><i style="color:#1BC10B;padding-right: 40px;" class="fa fa-check-circle" aria-hidden="true"></i>{{index1}}</span>{{subcrit['id']}} {{subcrit['description']}}</p>
                                                    </div>
                                                    <div v-else style="text-align:center;">
                                                      <p style="font-size:18px;margin-bottom:0px;"><span style="font-weight:700!important; padding-right:30px;"><i style="color:red;padding-right: 40px;" class="fa fa-times-circle" aria-hidden="true"></i>{{index1}}</span>{{subcrit['id']}} {{subcrit['description']}}</p>
                                                    </div>
                                                  </div>
                                                </td>
                                            </tr>
                                            <tr>
                                              <td
                                                    style="padding-right: 10px; padding-left: 60px;padding-bottom:0px; ">

                                                  <div style="padding:0px 10px;" class="row" v-for="(e,a) in subcrit['evidence']" :key="a">
                                                      <div class="col-9">
                                                        <div class="row">
                                                          <div v-if="subcrit['evidence'][a]['valid'] == true" style="text-align:left;">
                                                            <p  style="font-size:18px;margin-top:0px;color: #6c757d!important;"><i style="color:#1BC10B;padding-right:30px;" class="fa fa-check" aria-hidden="true"></i>{{subcrit['evidence'][a]['message']}}</p>
                                                          </div>
                                                          <div v-else style="text-align:left;">
                                                              <p  style="font-size:18px;margin-top:0px;color: #6c757d!important;"><i style="color:red; padding-right:30px;" class="fa fa-times" aria-hidden="true"></i>{{subcrit['evidence'][a]['message']}}</p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div class="col-3">
                                                        <div style="text-align:right; width: 100%;">
                                                          <button class="btn btn-primary btn-link" style="border:none; font-size:18px;" data-toggle="modal" data-target="#exampleModal" @click="modalInfo(subcrit['evidence'][a])">
                                                            More Info
                                                          </button>
                                                        </div>
                                                      </div>
                                                  </div>

                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                              </div>

                          </div>

                        </template>

                      </card>

                  </div>


                </template>
              </card>
                <!-- Modal -->
                <div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header ">
                        <h5 class="modal-title " style="font-weight:700; font-size:18px;" id="exampleModalLabel">REPORT</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body" style="">
                        <div class="row">
                          <card class="col-12">
                            <div class="row" style="padding:0px 20px">
                              <div v-if="modalInfoData && modalInfoData['tool'] && modalInfoData['tool']['ci'] && modalInfoData && modalInfoData['tool']['ci']['status'] == 'SUCCESS'" >
                                  <a :href="modalInfoData && modalInfoData['tool'] && modalInfoData['tool']['ci']?modalInfoData['tool']['ci']['url']:'#'" target="_blank" style="font-size:18px;">
                                    <span>Tool: {{modalInfoData && modalInfoData['tool'] && modalInfoData['tool'].name  ? modalInfoData['tool'].name: ''}}</span> <i style="color:#1BC10B;padding-left:10px;" class="fa fa-check-circle" aria-hidden="true"></i></a>
                              </div>
                              <div v-else style="text-align:left;">
                                  <a :href="modalInfoData && modalInfoData['tool'] && modalInfoData['tool']['ci']?modalInfoData['tool']['ci']['url']:'#'" target="_blank" style="font-size:18px;">
                                    <span>Tool: {{modalInfoData && modalInfoData['tool'] && modalInfoData['tool'].name  ? modalInfoData['tool'].name: ''}}</span> <i style="color:#1BC10B;" class="fa fa-times-circle" aria-hidden="true"></i></a>
                              </div>

                            </div>
                            <div style="padding:0px 20px" v-if="modalInfoData['tool']" class="row">
                              <span v-show="modalInfoData['tool']['docker']" class="badge badge-secondary">image:<span style="font-weight:bold"> {{modalInfoData['tool']['docker']['image']?modalInfoData['tool']['docker']['image'] : modalInfoData['tool']['docker']['dockerfile']?'Dockerfile':''}}</span></span>
                              <span v-show="modalInfoData['tool']['lang'] != ''" style="margin:0px 5px;" class="badge badge-primary">lang:<span style="font-weight:bold"> {{modalInfoData['tool']['lang']}}</span></span>
                              <span v-show="modalInfoData['tool']['version']" style="margin:0px 5px;" class="badge badge-danger">version:<span style="font-weight:bold"> {{modalInfoData['tool']['version']}}</span></span>

                            </div>
                            <div class="row" style="padding:0px 20px">
                                <p><span style="font-weight:700!important;">Plugin:</span> {{modalInfoData && modalInfoData['plugin'] && modalInfoData['plugin']['name'] ? modalInfoData['plugin']['name']:''}} {{modalInfoData && modalInfoData['plugin'] && modalInfoData['plugin']['version'] ? modalInfoData['plugin']['version']:''}}</p>
                            </div>

                            <div class="row" style="padding:0px 20px">

                                <a :href="modalInfoData && modalInfoData['standard'] && modalInfoData['standard']['url']?modalInfoData['standard']['url']:'#'" target="_blank" style="font-size:18px;"><p>{{modalInfoData && modalInfoData['standard'] && modalInfoData['standard']['title'] ? modalInfoData['standard']['title']:''}} {{modalInfoData && modalInfoData['standard'] && modalInfoData['standard']['version'] ? modalInfoData['standard']['version']:''}}  </p></a>
                            </div>

                            <div v-show="showEditor" class="col-12" style="padding-top:2rem;height:40vh;overflow-y: auto;">
                              <editor  editor-id="'editor_modal'" lang="json" :content="modalUnstructured"  key="editor_modal" ></editor>
                            </div>
                          </card>
                        </div>
                      </div>
                      <div class="modal-footer" style="justify-content: end;">
                        <button type="button" class="btn btn-secondary" style="color: #fff!important;background-color: #6c757d!important;border-color: #6c757d!important;" data-dismiss="modal">Close</button>
                        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                      </div>
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
        modalInfoSubcriteriaData:{},
         editor: '',
        modalUnstructured:'',
        showEditor:false,
        mapping_icon:{
          'default': 'fa-certificate',
          'QC.Acc':'fa-certificate',
          'QC.Doc':'fa-book',
          'QC.FAIR':'fa-certificate',
          'QC.Fun':'fa-filter',
          'QC.Lic':'fa-id-card',
          'QC.Met':'fa-database',
          'QC.Sec':'fa-lock',
          'QC.Sty':'fa-bullseye',
          'QC.Uni':'fa-cogs',
          'QC.Ver':'fa-code-fork'
        },
        mapping_criteria_name:{
          'QC.Acc':'Code Accessibility',
          'QC.Doc':'Documentation',
          'QC.FAIR':'FAIRness level of Digital Objects',
          'QC.Fun':'Functional',
          'QC.Lic':'Licensing',
          'QC.Met':'Code metadata',
          'QC.Sec':'Security',
          'QC.Sty':'Code Style',
          'QC.Uni':'Unit Testing',
          'QC.Ver':'Versioning'
        }

      }
    },
     watch:{



    },

    methods:{
      modalInfo(info){
        console.log(info)
        this.modalInfoData = info;

        // if(crit != '' && type != '' && tool != ''){
        //   for(var i in this.$store.state.report['report'][crit]['validator_data']['tool'][type]){
        //     if(tool == this.$store.state.report['report'][crit]['validator_data'][type]['tool'][i]['name']){
        //       this.modalInfoData = this.$store.state.report['report'][crit]['validator_data']['tool'][type][i]
        //     }
        //   }
        // }
        if(this.modalInfoData['data_unstructured'] && Object.keys(this.modalInfoData['data_unstructured']).length > 0){
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
        if(this.$store.state.report.badge['software'] && this.$store.state.report.badge['software']['data']){
          this.showBadgeSoftware = true;
          if($("#badge-software").has("blockquote").length == 0){
            var _div = `
                <div class="text-center">
                  <img style="width:400px;height:400px" src="${this.$store.state.report.badge["software"]["data"]['image']}"></img>
                  <div class="row" style="justify-content: center;">
                      <a style="font-size:18px; border:1px solid; margin-right: 0.25rem;" target="blank" href="${this.$store.state.report.badge["software"]["verification_url"]}"><span style="margin:20px;">Verify</span></a>
                      <a style="font-size:18px; border:1px solid; margin-left: 0.25rem;" target="blank" href="${this.$store.state.report.badge["software"]["data"]["openBadgeId"]}"><span style="margin:20px;">Go to Badgr's award page</span></a>
                  </div>
                </div>`
            $("#badge-software").append(_div)
          }
        }
        if(this.$store.state.report.badge['service'] && this.$store.state.report.badge['service']['data']){
          this.showBadgeService = true;
          if($("#badge-service").has("blockquote").length == 0){
            var _div = `
                <div class="text-center">
                  <img style="width:400px;height:400px" src="${this.$store.state.report.badge["service"]["data"]['image']}"></img>
                  <div class="row" style="justify-content: center;">
                      <a style="font-size:18px; border:1px solid; margin-right: 0.25rem;" target="blank" href="${this.$store.state.report.badge["service"]["verification_url"]}"><span style="margin:20px;">Verify</span></a>
                      <a style="font-size:18px; border:1px solid; margin-left: 0.25rem;" target="blank" href="${this.$store.state.report.badge["service"]["data"]["openBadgeId"]}"><span style="margin:20px;">Go to Badgr's award page</span></a>
                  </div>
                </div>`
            $("#badge-service").append(_div)
          }
        }
        if(this.$store.state.report.badge['fair'] && this.$store.state.report.badge['fair']['data'] ){
          this.showBadgeFair = true;
          if($("#badge-fair").has("blockquote").length == 0){
            var _div = `
                <div class="text-center">
                  <img style="width:400px;height:400px" src="${this.$store.state.report.badge["fair"]["data"]['image']}"></img>
                  <div class="row" style="justify-content: center;">
                      <a style="font-size:18px; border:1px solid; margin-right: 0.25rem;" target="blank" href="${this.$store.state.report.badge["fair"]["verification_url"]}"><span style="margin:20px;">Verify</span></a>
                      <a style="font-size:18px; border:1px solid; margin-left: 0.25rem;" target="blank" href="${this.$store.state.report.badge["fair"]["data"]["openBadgeId"]}"><span style="margin:20px;">Go to Badgr's award page</span></a>
                  </div>
                </div>`
            $("#badge-fair").append(_div)
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

.card .card-header{
 padding: 0px!important
}

.no-margin-card{
  padding-top: 0px!important;
}

.modal-dialog{
  transform:none!important;
}
</style>

