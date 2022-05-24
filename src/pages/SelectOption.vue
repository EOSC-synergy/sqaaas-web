<template>
  	<div class="content">
		<div class="container-fluid">
			<div class="row" >
				<div class="col-12" style="margin-top:40px;">
					<card  class="strpied-tabled-with-hover"
						body-classes=""
					>
						<template slot="header">
						</template>

						<template>
              <div class="row text-center">
                <div class="col-12 col-md-4">
                    <h1 style="font-size:50px;font-weight:bold;color:#76BAC6;padding-top:100px">SQAaaS module selection</h1>
                </div>
                <div class="col-12 col-md-8 text-center">
                 <div class="row">
                   <div class="col-12 col-md-6 select-options text-center" @click="gotoCustomized()">
                       <div class="float-right"  style="border: 2px solid #F1A190;max-width: 500px;height: 500px;padding: 40px;">
                         <img src="../../static/paas.png" alt="" class="responsive" style="opacity: 0.9;">
                         <h2 class="custom-title">Pipeline as a Service</h2>
                         <span style="color:black;">Compose customized CI/CD pipelines for your code repositories.</span>
                       </div>
                   </div>
                  <div class="col-12 col-md-6 select-options text-center"  @click="gotoFull()">
                    <div class="text-center" style="border: 2px solid #90C7F1;max-width: 500px;height: 500px;padding: 40px;">
                      <img src="../../static/qaa.png" alt="" class="responsive" style="opacity: 0.9;">
                      <h2 class="custom-title">Quality Assessment & Awarding</h2>
                      <span style="color:black;">Take credit of the achievements in terms of software and service quality.</span>
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
  export default {
    components: {
		LTable,
		Card
    },
    data () {
      return {

      }
    },
    methods:{
      gotoCustomized(){
        this.$router.push({name: 'PipelineName'});
      },
      gotoFull(){
        this.$router.push({name: 'full_assessment'});
      }

  }
}
</script>
<style scoped>

.responsive {
  max-width:250px;
  width: 100%;
  height: auto;
  max-height: 250px;
}
.pos-buttons{
  display: inline-flex!important;
}

.disabled{
  cursor: default!important;
  background-color: rgb(13, 136, 183,0.3)!important;

}

.select-options{
  padding: 20px;
  cursor: pointer;
}

.icons-select{
  color:white;
  padding-top:20px;
  font-size: 80px;
}

.custom-title{
  color:black;
  font-size: 20px;
  font-weight: 700;
}

@media (max-width: 576px) {
  /* .select-options{
    margin:0px 0px 10px 0px;
    padding: 0px;
    width: 100%;

  } */

  .icons-select{
    color:white;
    padding-top:20px;
    font-size: 40px;
  }

  .custom-title{
    font-size: 18px;
    color:black;
  font-weight: 700;
  }
}
/* // Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  /* .select-options{
    margin:1rem;
    padding: 10px;
    width: 90%;


  } */
}

/* // Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  /* .select-options{
  border: 1px solid gray;
  padding: 20px;
  margin: 4rem 2rem;
  cursor: pointer;
  width: 80%;
} */

.icons-select{
  color:white;
  padding-top:20px;
  font-size: 50px;
}

.custom-title{
  color:black;
  font-size: 20px;
  font-weight: 700;

}

 }

/* // Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .icons-select{
    color:white;
    padding-top:20px;
    font-size: 80px;
  }

  }

/* // Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {  }
</style>
