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
                  <div class="col-6 text-right mt-2 ">
                    <button style="color: #fff;background-color: #6c757d;border-color: #6c757d;" class="btn  " @click="refresh()"><i class="fa fa-refresh" style="padding-right:5px;" aria-hidden="true"></i> New Assessment</button>
                  </div>

                </div>
              </template>

              <template class="card-body">

                <h3 class="text-center" v-if="showBadgeSoftware== true || showBadgeService == true || showBadgeFair==true">Congratulations!!! the following badge/s have been awarded</h3>
                <div class="text-center" v-else>
                  <h3>Sorry, you have not earned any badges</h3>
                  <div style="padding-right: 150px;">
                    <i style="opacity: 0.5" class="fa fa-frown-o fa-10x" aria-hidden="true"></i>

                  </div>
                </div>

                <div class="row" style="margin-bottom:4rem;">
                  <div v-show="showBadgeSoftware == true" :class="{'col-md-4':showBadgeService == true && showBadgeFair == true, 'col-md-6':((showBadgeService == true && showBadgeFair == false) || (showBadgeService == false && showBadgeFair == true)), 'col-md-12':showBadgeService == false && showBadgeFair == false}" class="col-12 text-center" id="badge-software" style="padding-top:20px;padding-left:15px;">
                  </div>
                  <div v-show="showBadgeService == true" :class="{'col-md-4':showBadgeSoftware == true && showBadgeFair == true, 'col-md-6':((showBadgeSoftware == true && showBadgeFair == false) || (showBadgeSoftware == false && showBadgeFair == true)), 'col-md-12':showBadgeSoftware == false && showBadgeFair == false}" class="col-12 text-center" id="badge-service" style="padding-top:20px;padding-left:15px;">
                  </div>
                  <div v-show="showBadgeFair == true"  :class="{'col-md-4':showBadgeSoftware == true && showBadgeFair == true, 'col-md-6':((showBadgeSoftware == true && showBadgeFair == false) || (showBadgeSoftware == false && showBadgeFair == true)), 'col-md-12':showBadgeSoftware == false && showBadgeFair == false}" class="col-12 col-md-4 text-center" id="badge-fair" style="padding-top:20px;padding-left:15px;">
                  </div>
                </div>

                <div class="col-12 col-sm-12 col-xl-8 col-lg-10 mx-auto">
                  <h4 class="text-center">Criterion Report</h4>
                  <card v-for="(crit, index) in $store.state.report.report" :key="index" style="padding:0px!important;max-width:1000px;">
                      <template slot='header' style="background-color:#E8E6E5!important;">
                        <div  style="padding:1.5rem!important;background-color:#E8E6E5!important;border-bottom:1px solid #dee2e6">
                          <!-- <div class="col-2">
                            <div style="text-align:right;margin-top:30px;">
                              <i style="color:#7C7572" class="fa fa-2x" :class="mapping_icon[index]?mapping_icon[index]:mapping_icon['default']" aria-hidden="true"></i>
                            </div>
                          </div> -->
                          <div class="row" style="margin-right:0px; margin-left:0px;">
                            <div class="col-10">
                              <div class="row">
                                <div style="margin-top: 30px;margin-right: 30px;">
                                  <i style="color:#7C7572" class="fa fa-2x" :class="mapping_icon[index]?mapping_icon[index]:mapping_icon['default']" aria-hidden="true"></i>
                                </div>
                                <h4 style="font-weight: 700;">{{index}}</h4>
                              </div>

                            </div>

                            <div class="col-2">
                              <div v-if="crit['valid'] == true" style="text-align:center;margin-top:30px;">
                                  <i style="color:#1BC10B;" class="fa fa-2x fa-check-circle" aria-hidden="true"></i>
                              </div>
                              <div v-else style="text-align:center;margin-top:30px;">
                                  <i style="color:red" class="fa fa-2x fa-times-circle" aria-hidden="true"></i>
                              </div>

                            </div>

                          </div>
                          <div class="row" v-if="crit['filtered_reason']">
                            <p v-for="(fr, z) in crit['filtered_reason']" :key="z" style="margin-bottom:0px; font-size:12px; color:rgb(108, 117, 125)">
                              {{crit['filtered_reason'][z]}}

                            </p>

                          </div>
                        </div>

                      </template>

                      <template class="card-body">
                        <div>
                            <div class="table-responsive">
                              <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tbody v-for="(subcrit, index1) in crit['subcriteria']" :key="index1">
                                          <tr
                                              style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                                              <td style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                                <div v-if="crit['valid'] == true" style="text-align:center;">
                                                    <i style="color:#1BC10B;" class="fa fa-check-circle" aria-hidden="true"></i>
                                                </div>
                                                <div v-else style="text-align:center;">
                                                    <i style="color:red" class="fa fa-times-circle" aria-hidden="true"></i>
                                                </div>

                                              </td>

                                              <td
                                                  style="padding-right: 10px; padding-left: 10px; padding-top: 20px;">
                                                  <div>
                                                    <p style="margin-bottom:0px;">{{subcrit['id']}} {{subcrit['description']}}</p>
                                                    <p v-for="(e,a) in subcrit['evidence']" :key="a" style="margin-top:0px;color: #6c757d!important;">{{subcrit['evidence'][0]['message']}}</p>
                                                  </div>
                                              </td>
                                              <td
                                                  style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                                      <div style="margin-top:10px;text-align:right; width: 100%;">
                                                        <button class="btn btn-primary btn-link" style="border:none" data-toggle="modal" data-target="#subCritModal" @click="modalInfo(index,'REQUIRED',tool['name'])">
                                                          More Info
                                                        </button>
                                                      </div>

                                              </td>
                                          </tr>
                                  </tbody>
                              </table>
                            </div>

                        </div>

                      </template>

                    </card>

                </div>


                <!-- <h3 class="text-center" style="margin-top:5rem;">Report</h3>
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
                                          <div  v-if="crit['validator_data']['subcriteria'] && crit['validator_data']['subcriteria'].length > 0" style="text-align:center;">
                                              <button v-for="(subcrit, index1) in crit['validator_data']['subcriteria']" :key="index1" class="btn btn-primary btn-link" style="border:none" data-toggle="modal" data-target="#subCritModal" @click="modalInfoSubCrit(index,subcrit['id'])">
                                                {{subcrit['id']}}
                                              </button>


                                          </div>
                                          <div v-else style="text-align:center;">
                                              <span>-</span>
                                          </div>
                                      </td>
                                      <td
                                          style="padding-right: 10px; padding-left: 10px; padding-top: 5px;">
                                          <div  v-if="crit['validator_data']['tool']['REQUIRED'] && crit['validator_data']['tool']['REQUIRED'].length > 0" style="text-align:center;">
                                              <button v-for="(tool, index1) in crit['validator_data']['tool']['REQUIRED']" :key="index1" class="btn btn-primary btn-link" style="border:none" data-toggle="modal" data-target="#exampleModal" @click="modalInfo(index,'REQUIRED',tool['name'])">
                                                {{tool['name']}}
                                              </button>


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

                                  </tr>
                          </tbody>
                      </table>
                    </div> -->
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
                                <p v-if="modalInfoData && modalInfoData['reason']">Reason: {{modalInfoData['reason']}} </p>

                                <div v-show="showEditor" class="col-12" style="padding-top:2rem;height:40vh;overflow-y: auto;">
                                  <editor  editor-id="'editor_modal'" lang="json" :content="modalUnstructured"  key="editor_modal" ></editor>
                                </div>
                              </card>
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
                                  <p v-if="modalInfoData && modalInfoData['reason']">Reason: {{modalInfoData['reason']}} </p>

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
        }

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
        if(this.$store.state.report.badge['software']){
          this.showBadgeSoftware = true;
          if($("#badge-software").has("blockquote").length == 0){
            $( "#badge-software" ).append(this.$store.state.report.badge['software']['share']);
            var btn1 = `<a style="font-size:18px; border:1px solid" target="blank" href="${this.$store.state.report.badge["software"]["verification_url"]}"><span style="margin:20px;">Verify & Share</span></a>`;
            $("#badge-software").append(btn1)
          }
        }
        if(this.$store.state.report.badge['service']){
          this.showBadgeService = true;
          if($("#badge-service").has("blockquote").length == 0){
            $( "#badge-service" ).append(this.$store.state.report.badge['service']['share']);
            var btn2 = `<a style="font-size:18px; border:1px solid" target="blank" href="${this.$store.state.report.badge["service"]["verification_url"]}"><span style="margin:20px;">Verify & Share</span></a>`;
            $("#badge-software").append(btn2)
          }
        }
        if(this.$store.state.report.badge['fair']){
          this.showBadgeFair = true;
          if($("#badge-fair").has("blockquote").length == 0){
            $( "#badge-fair" ).append(this.$store.state.report.badge['fair']['share']);
            var btn3 = `<a style="font-size:18px; border:1px solid" target="blank" href="${this.$store.state.report.badge["fair"]["verification_url"]}"><span style="margin:20px;">Verify & Share</span></a>`;
            $("#badge-software").append(btn3)
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
</style>

