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
              <div class="row">
                <div class="col-md-6 text-center d-none d-sm-none d-md-block" style="padding-top:100px;">
                  <img style="height:250px;" src="../../public/img/select.png" alt="">

                </div>
                <div class="col-12 col-md-6">
                  <div class="row select-options" style="background-color:#FF5733;" @click="gotoCustomized()">
                    <div class="col-2 col-md-2">
                      <i class="fa fa-chevron-right icons-select" aria-hidden="true"></i>
                    </div>
                    <div class="col-10 col-md-10">
                      <h2 class="custom-title">Pipeline as a Service</h2>
                      <span style="color:white;">Custom CI/CD pipelines based according to the quality criteria from the Software as a Service.</span>
                    </div>
                  </div>
                  <div class="row select-options disabled" style="background-color:#0D88B7;" @click="gotoFull()">
                    <div class="col-2 col-md-2">
                      <i class="fa fa-chevron-right icons-select" aria-hidden="true"></i>

                    </div>
                    <div class="col-10 col-md-10">
                      <h2 class="custom-title">Quality Assessment & Awarding</h2>
                      <span style="color:white;">Evaluates the level of compliance of a source code repository or running service according to the quality criteria from the Software & Service baseline.</span>
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
.pos-buttons{
  display: inline-flex!important;
}

.disabled{
  cursor: default!important;
  background-color: rgb(13, 136, 183,0.3)!important;

}

.select-options{
  border: 1px solid gray;
  padding: 20px;
  margin: 4rem 2rem;
  cursor: pointer;
  width: 80%;
}

.icons-select{
  color:white;
  padding-top:20px;
  font-size: 80px;
}

.custom-title{
  color:white;
  font-size: 20px;
}

@media (max-width: 576px) {
  .select-options{
    margin:0px 0px 10px 0px;
    padding: 0px;
    width: 100%;

  }

  .icons-select{
    color:white;
    padding-top:20px;
    font-size: 40px;
  }

  .custom-title{
    color:white;
    font-size: 18px;
  }
}
/* // Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .select-options{
    margin:1rem;
    padding: 10px;
    width: 90%;


  }
}

/* // Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .select-options{
  border: 1px solid gray;
  padding: 20px;
  margin: 4rem 2rem;
  cursor: pointer;
  width: 80%;
}

.icons-select{
  color:white;
  padding-top:20px;
  font-size: 50px;
}

.custom-title{
  color:white;
  font-size: 20px;
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
