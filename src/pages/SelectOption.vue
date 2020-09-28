<template>
  	<div class="content">
		<div class="container-fluid">
			<div class="row" style="height:80vh;">
				<div class="col-12" style="margin-top:40px;">
					<card style="height:70vh;" class="strpied-tabled-with-hover"
						body-classes=""
					>
						<template slot="header">
						</template>

						<template>
              <div class="row">
                <div class="col-md-6 text-center" style="padding-top:100px;">
                  <img style="height:250px;" src="../../public/img/select.png" alt="">

                </div>
                <div class="col-md-6">
                  <div class="row select-options" style="background-color:#FF5733;" @click="gotoCustomized()">
                    <i class="fa fa-chevron-right fa-5x col-md-2" style="color:white;padding-top:20px;" aria-hidden="true"></i>
                    <div class="col-md-10">
                      <h2 style="color:white;font-family:initial;">Pipeline as a Service</h2>
                      <span style="color:white;">Custom CI/CD pipelines based according to the quality criteria from the Software as a Service.</span>
                    </div>
                  </div>
                  <div class="row select-options" style="background-color:#0D88B7;" @click="gotoFull()">
                    <i class="fa fa-chevron-right fa-5x col-md-2" style="color:white;padding-top:20px;" aria-hidden="true"></i>
                    <div class="col-md-10">
                      <h2 style="color:white;font-family:initial;">Online Quality Assessment</h2>
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
        this.$router.push({name: 'dashboard'});
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

.select-options{
  border: 1px solid gray;
  padding: 20px;
  margin: 4rem 2rem;
  cursor: pointer;
}
</style>
