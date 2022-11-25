<template>
  	<div class="content">
      <div class="container-fluid" style="min-height:70vh;">
        <div class="row" style="overflow-y: auto;">
          	<div class="col-12" style="margin-top:40px;">
              <card class="strpied-tabled-with-hover" body-classes="">
                <template slot="header" >
                  <div class="row" style="padding: 0px 10px;">
                    <div class="col-6" style="display:inline-flex;">
                      <button class="btn btn-default btn-simple" @click="gotoFull()"><i class="fa fa-arrow-left" aria-hidden="true"></i><span style="font-weight: bold;padding-top:5px;font-size:18px;" class="card-title">Back</span></button>
                    </div>
                    <div class="col-6 text-right mt-2 ">
                      <button style="color: #fff;background-color: #6c757d;border: none;" class="btn" @click="refresh()"><i class="fa fa-refresh" style="padding-right:10px;" aria-hidden="true"></i> New Assessment</button>
                      <div class="btn-group">
                        <button id="downloadDropdown" style="color: #fff;background-color: #6c757d;border: none;margin-left: 15px;" class="btn dropdown-toggle" data-toggle="dropdown"><i class="fa fa-download" style="padding-right:10px;" aria-hidden="true" ></i> Download </button>
                        <ul id="downloadDropdownMenu" class="dropdown-menu">
                          <li><a role="button" @click="downloadJSON()"><i class="fa fa-file-alt" style="color: #455098; margin-right: 5px;"></i> JSON</a></li>
                          <li><a role="button" @click="downloadPNG()"><i class="fa fa-file-image-o" style="color: #459849; margin-right: 5px;"></i> PNG</a></li>
                          <li><a role="button" @click="downloadPDF()"><i class="fa fa-file-pdf-o" style="color: #984545; margin-right: 5px;"></i> PDF</a></li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </template>

                <template class="card-body">

                  <div class="container-fluid mb-5">

                    <div class="row mt-3">
                      <div class="col d-flex justify-content-center">

                        <RepoData :repo="this.$store.state.report.repository[0]" />

                      </div>
                    </div>

                    <div class="row mt-5">
                      <div class="col">

                        <h2 style="font-weight:bold; max-width: 1200px; margin: 0 auto 0 auto;">Badge Report</h2>

                      </div>
                    </div>

                    <div class="row mt-3">

                      <div class="col d-flex justify-content-center">

                        <BadgeAchieved :badge="this.$store.state.report.badge" />

                      </div>
                    </div>

                    <div class="row mt-5">
                      <div class="col">

                        <BadgeResults :badgeCriteria="getBadgeCriteria()" :mapping_icon="mapping_icon" :mapping_criteria_name="mapping_criteria_name" />

                      </div>
                    </div>


                    <div class="row mt-5">
                      <div class="col">

                        <h2 style="font-weight:bold; max-width: 1200px; margin: 0 auto 0 auto;">Criteria Report</h2>

                      </div>
                    </div>

                    <div class="row mt-5">
                      <div class="col d-flex justify-content-center">

                        <CriteriaSummary :report="this.$store.state.report.report" :mapping_icon="mapping_icon" :mapping_criteria_name="mapping_criteria_name"/>

                      </div>
                    </div>

                  </div>


                  <div class="col-12 col-sm-12 col-md-12 col-lg-6 mx-auto">

                    <card v-for="(crit, index) in $store.state.report.report" :id="index" :key="index" style="padding:0px!important;max-width:1000px;">
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
                                    <tbody v-for="(subcrit, index1) in crit['subcriteria']" :key="index1" class="subcriteria">

                                            <tr
                                                style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                                                <td style="padding-right: 10px; padding-left: 10px;padding-bottom:0px;">
                                                  <div class="row" style="padding:0px 20px;">

                                                    <div v-if="subcrit['valid'] == true" style="text-align:center;">
                                                      <p style="font-size:18px;margin-bottom:0px;"><span style="font-weight:700!important; padding-right:30px;">
                                                        <i style="color:#1BC10B;padding-right: 40px;" class="fa fa-check-circle" aria-hidden="true"></i>{{index1}}</span>{{subcrit['id']}} {{subcrit['description']}}
                                                      </p>
                                                    </div>
                                                    <div v-else style="text-align:center;">
                                                      <p style="font-size:18px;margin-bottom:0px;"><span style="font-weight:700!important; padding-right:30px;">
                                                        <i style="color:red;padding-right: 40px;" class="fa fa-times-circle" aria-hidden="true"></i>{{index1}}</span>{{subcrit['id']}} {{subcrit['description']}}
                                                        <svg v-if="subcrit.required_for_next_level_badge" fill="#de960f" viewBox="0 0 24 24" height="24" width="24" style="margin-left: 8px; margin-top: -5px" data-toggle="tooltip" data-placement="top" title="Required for achieving next level of badge">
                                                          <path d="M12 22c3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.86 0-7 3.141-7 7s3.14 7 7 7zm0-12c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5 2.243-5 5-5zm-1-8H7v5.518a8.957 8.957 0 0 1 4-1.459V2zm6 0h-4v4.059a8.957 8.957 0 0 1 4 1.459V2z"></path><path d="m10.019 15.811-.468 2.726L12 17.25l2.449 1.287-.468-2.726 1.982-1.932-2.738-.398L12 11l-1.225 2.481-2.738.398z"></path>
                                                        </svg>
                                                      </p>
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
                                                          <button v-if="!subcrit['valid'] === true" class="btn btn-primary btn-link hint-button" style="border:none; font-size:18px; padding-top: 0; padding-bottom: 0;" data-toggle="modal" data-target="#hintModal" @click="modalHint(subcrit.hint)">
                                                            Hint
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



              <!-- Info Modal -->
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
                            <span v-show="modalInfoData['tool']['docker'] &&  modalInfoData['tool']['docker']['image']" class="badge badge-secondary">image:<span style="font-weight:bold">
                              {{modalInfoData['tool']['docker'] && modalInfoData['tool']['docker']['image']?modalInfoData['tool']['docker']['image'] : modalInfoData['tool']['docker'] && modalInfoData['tool']['docker']['dockerfile']?'Dockerfile':''}}
                              </span>
                            </span>

                            <span v-show="modalInfoData['tool']['lang'] && modalInfoData['tool']['lang']!= ''" style="margin:0px 5px;" class="badge badge-primary">lang:<span style="font-weight:bold"> {{modalInfoData['tool']['lang']}}</span></span>
                            <span v-show="modalInfoData['tool']['version']" style="margin:0px 5px;" class="badge badge-danger">version:<span style="font-weight:bold"> {{modalInfoData['tool']['version']}}</span></span>

                          </div>
                          <div class="row" style="margin-top: 10px; padding:0px 20px">
                              <p><span style="font-weight:700!important;">Plugin:</span> {{modalInfoData && modalInfoData['plugin'] && modalInfoData['plugin']['name'] ? modalInfoData['plugin']['name']:''}} {{modalInfoData && modalInfoData['plugin'] && modalInfoData['plugin']['version'] ? modalInfoData['plugin']['version']:''}}</p>
                          </div>

                          <div class="row" v-if="modalInfoData && modalInfoData['tool'] && modalInfoData['tool']['build_repo']" style="padding:0px 20px">

                            <p><span style="font-weight:700!important;">Build repo:</span> <a :href="modalInfoData && modalInfoData['tool'] && modalInfoData['tool']['build_repo']? modalInfoData['tool']['build_repo']:'#'" target="_blank" style="font-size:18px;"> {{modalInfoData && modalInfoData['tool'] && modalInfoData['tool']['build_repo'] ? modalInfoData['tool']['build_repo']:''}} </a></p>
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



              <!-- Hint Modal -->
              <div class="modal fade bd-example-modal-lg" id="hintModal" tabindex="-1" role="dialog" aria-labelledby="hintModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" style="font-weight:700; font-size:18px;" id="hintModalLabel">HINT</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body" style="">
                      <div class="row">
                        <card class="col-12">
                          <div id="hintData"></div>
                        </card>
                      </div>
                    </div>
                    <div class="modal-footer" style="justify-content: end;">
                      <button type="button" class="btn btn-secondary" style="color: #fff!important;background-color: #6c757d!important;border-color: #6c757d!important;" data-dismiss="modal">Close</button>
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
  import RepoData from 'src/components/AssessmentReport/RepoData';
  import CriteriaSummary from 'src/components/AssessmentReport/CriteriaSummary';
  import BadgeResults from 'src/components/AssessmentReport/BadgeResults';
  import BadgeAchieved from "@/components/AssessmentReport/BadgeAchieved";
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';

  export default {
    components: {
    RepoData,
    CriteriaSummary,
    BadgeResults,
    BadgeAchieved,
		LTable,
		Card,
    'editor': Editor,
    },
    mixins: [Services],
    data () {
      return {
        modalInfoData:{},
        modalInfoSubcriteriaData:{},
        editor: '',
        modalUnstructured:'',
        showEditor:false,
        mapping_icon:{
          'default': 'fa-certificate',
          'QC.Acc':'fa-certificate',
          'QC.Lic':'fa-id-card',
          'QC.Sty':'fa-bullseye',
          'QC.Met':'fa-database',
          'QC.Uni':'fa-cogs',
          'QC.Doc':'fa-book',
          'QC.Sec':'fa-lock',
          'QC.Ver':'fa-code-fork',
          'QC.FAIR':'fa-certificate',
          'QC.Fun':'fa-filter',
          'SvcQC.Dep':'fa-rocket',
          'SvcQC.Fun':'fa-filter',
          'SvcQC.Sec':'fa-lock',
          'SvcQC.Doc':'fa-book',
          'SvcQC.Api':'fa-desktop',
          'SvcQC.Per':'fa-calendar-check',
          'SvcQC.Int':'fa-arrows-alt'
        },
        mapping_criteria_name:{
          'QC.Acc':'Code Accessibility',
          'QC.Lic':'Licensing',
          'QC.Sty':'Code Style',
          'QC.Met':'Code metadata',
          'QC.Uni':'Unit Testing',
          'QC.Har':'Test Harness',
          'QC.Tdd':'Test-Driven Development',
          'QC.Doc':'Documentation',
          'QC.Sec':'Security',
          'QC.Wor':'Code Workflow',
          'QC.Ver':'Versioning',
          'QC.Man':'Code Management',
          'QC.Rev':'Code Review',
          'QC.Del':'Automated Delivery',
          'QC.Dep':'Automated Deployment',
          'QC.FAIR':'FAIRness level of Digital Objects',
          'QC.Fun':'Functional',
          'SvcQC.Dep':'Service Deployment',
          'SvcQC.Fun':'Service Functional Testing',
          'SvcQC.Sec':'Security Testing (DAST)',
          'SvcQC.Doc':'Service Documentation',
          'SvcQC.Api':'API Testing',
          'SvcQC.Per':'Performance Testing',
          'SvcQC.Int':'Integration Testing',
          'rda_f1_01m':'Metadata is identified by a persistent identifier',
          'rda_f1_01d':'Data is identified by a persistent identifier',
          'rda_f1_02m':'Metadata is identified by a globally unique identifier',
          'rda_f1_02d':'Data is identified by a globally unique identifier',
          'rda_f2_01m':'Rich metadata is provided to allow discovery',
          'rda_f3_01m':'Metadata includes the identifier for the data',
          'rda_f4_01m':'Metadata is offered in such a way that it can be harvested and indexed',
          'rda_a1_01m':'Metadata contains information to enable the user to get access to the data',
          'rda_a1_02m':'Metadata can be accessed manually (i.e. with human intervention)',
          'rda_a1_02d':'Data can be accessed manually (i.e. with human intervention)',
          'rda_a1_03m':'Metadata identifier resolves to a metadata record',
          'rda_a1_03d':'Data identifier resolves to a digital object',
          'rda_a1_04m':'Metadata is accessed through standardised protocol',
          'rda_a1_04d':'Data is accessible through standardised protocol',
          'rda_a1_05d':'Data can be accessed automatically (i.e. by a computer program)',
          'rda_a1_1_01m':'Metadata is accessible through a free access protocol',
          'rda_a1_1_01d':'Data is accessible through a free access protocol',
          'rda_a1_2_01d':'Data is accessible through an access protocol that supports authentication and authorisation',
          'rda_a2_01m':'Metadata is guaranteed to remain available after data is no longer available',
          'rda_i1_01m':'Metadata uses knowledge representation expressed in standardised format',
          'rda_i1_01d':'Data uses knowledge representation expressed in standardised format',
          'rda_i1_02m':'Metadata uses machine-understandable knowledge representation',
          'rda_i1_02d':'Data uses machine-understandable knowledge representation',
          'rda_i2_01m':'Metadata uses FAIR-compliant vocabularies',
          'rda_i2_01d':'Data uses FAIR-compliant vocabularies',
          'rda_i3_01m':'Metadata includes references to other metadata',
          'rda_i3_01d':'Data includes references to other data',
          'rda_i3_02m':'Metadata includes references to other data',
          'rda_i3_02d':'Data includes qualified references to other data',
          'rda_i3_03m':'Metadata includes qualified references to other metadata',
          'rda_i3_04m':'Metadata include qualified references to other data',
          'rda_r1_01m':'Plurality of accurate and relevant attributes are provided to allow reuse',
          'rda_r1_1_01m':'Metadata includes information about the licence under which the data can be reused',
          'rda_r1_1_02m':'Metadata refers to a standard reuse licence',
          'rda_r1_1_03m':'Metadata refers to a machine-understandable reuse licence',
          'rda_r1_2_01m':'Metadata includes provenance information according to community-specific standards',
          'rda_r1_2_02m':'Metadata includes provenance information according to a crosscommunity language',
          'rda_r1_3_01m':'Metadata complies with a community standard',
          'rda_r1_3_01d':'Data complies with a community standard',
          'rda_r1_3_02m':'Metadata is expressed in compliance with a machineunderstandable community standard',
          'rda_r1_3_02d':'Data is expressed in compliance with a machine-understandable'
        }
      }
    },
    watch:{},
    methods:{
      modalInfo(info){
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
      modalHint(hint){
        $('#hintData').html(hint)
      },
      gotoFull(){
        this.$router.push({name: 'full_assessment'});
      },
      refresh(){
        this.$router.push({name: 'full_assessment'});
      },
      downloadJSON(){

        let a = document.createElement("a");
        a.style.display = "none"
        let json = JSON.stringify(this.$store.state.report,null, "\t");
        let blob = new Blob([json], {type: "octet/stream"});
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = "SQAaaS Report - " + this.$store.state.report.repository[0].name + ".json"
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

      },
      downloadPNG(){

        $('#downloadDropdown').dropdown('hide')

        html2canvas(document.body, {useCORS: true}).then(canvas => {
          let a = document.createElement("a");
          a.style.display = "none"
          canvas.toBlob(blob => {
            a.href = window.URL.createObjectURL(blob);
            a.download = "SQAaaS Report - " + this.$store.state.report.repository[0].name +".png"
            a.click();
            window.URL.revokeObjectURL(a.href);
            a.remove();
          })
        });

      },
      downloadPDF(){

        $('#downloadDropdown').dropdown('hide')

        html2canvas(document.body, {useCORS: true}).then(canvas => {
          let pdf = new jsPDF({unit: 'px', format: [canvas.width, canvas.height], compress: true});
          pdf.addImage({imageData: canvas, format: 'jpg', width: canvas.width, height: canvas.height});
          pdf.save("SQAaaS Report - " + this.$store.state.report.repository[0].name +".pdf");
        });

      },
      getBadgeCriteria(){
        return this.$store.state.report.badge.software && this.$store.state.report.badge.software.criteria ||
               this.$store.state.report.badge.services && this.$store.state.report.badge.services.criteria ||
               this.$store.state.report.badge.fair && this.$store.state.report.badge.fair.criteria
      }

    },

   mounted(){
     console.log("---> store.state.report <---")
     console.log(this.$store.state.report)
     this.$eventHub.$emit('steps', 5);

     $('[data-toggle="tooltip"]').tooltip()

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

#downloadDropdownMenu{
  position: absolute;
  top: 100%!important;
  left: 10px!important;
  z-index: 1000;
  min-width: 160px;
  padding: 4px 0;
  margin-top: 2px;
  font-size: 14px;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
}
#downloadDropdownMenu > li:hover {
  background-color: #eeeeee;
}
#downloadDropdownMenu > li > a {
  display: block;
  padding: 4px 20px;
  color: #333;
}


.subcriteria:not(:last-child) .hint-button{
  margin-bottom: 10px;
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

