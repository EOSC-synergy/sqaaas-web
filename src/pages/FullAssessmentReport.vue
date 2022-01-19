<template>
  	<div class="content">
      <div class="container-fluid" style="min-height:70vh;">
        <div class="row">
          	<div class="col-12" style="margin-top:40px;">
            <card class="strpied-tabled-with-hover"
              body-classes=""
            >
              <template slot="header" >
                <div style="display:inline-flex;">
                  <button class="btn btn-default btn-simple" @click="gotoFull()"><i class="fa fa-arrow-left" aria-hidden="true"></i><span style="font-weight: bold;padding-top:5px;font-size:18px;" class="card-title">Back</span></button>
                </div>
              </template>

              <template class="card-body">
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

      }
    },
     watch:{



    },

    methods:{
      gotoFull(){
        this.$router.push({name: 'full_assessment'});
      },


  },
  created(){
    console.log(this.$store.state.report)
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

