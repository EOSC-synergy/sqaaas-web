<template>
  	<div class="content">
		<div class="container-fluid">
			<div class="row" style="height:60vh;">
				<div class="col-12" style="margin-top:40px;">
					<card style="height:50vh;" class="strpied-tabled-with-hover"
						body-classes=""
					>
						<template slot="header">
							<h4 style="font-weight: bold;" class="card-title text-center">SELECT AN OPTION</h4>
						</template>

						<template>
              <div class="row" style="justify-content: center;margin-top:60px;">
                <div style="padding:20px 80px;display:grid;">
                  <img style="height:150px;" src="../../public/img/full-assessment.jpg" alt="">
                  <button class="btn btn-primary btn-simple" @click="gotoFull()">Full Assessment</button>
                </div>
                <div style="padding:20px 80px;display:grid;">
                  <img style="height:150px;" src="../../public/img/customized-assessment.png" alt="">
                  <button class="btn btn-primary btn-simple" @click="gotoCustomized()">Customized Assessment</button>
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
</style>
