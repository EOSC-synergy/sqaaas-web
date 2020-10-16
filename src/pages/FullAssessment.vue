<template>
  	<div class="content">
		<div class="container-fluid">
			<div class="row" style="height:60vh;">
				<div class="col-12" style="margin-top:40px;">
					<card style="height:50vh;" class="strpied-tabled-with-hover"
						body-classes=""
					>
						<template slot="header" >
              <div style="display:inline-flex;">
                <button class="btn btn-default btn-simple" @click="gotoSelect()"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
                <h4 style="font-weight: bold;padding-top:5px;" class="card-title">Full Assessment</h4>
              </div>
						</template>

						<template>
              <div style="justify-content: center;margin-top:60px;">
                <div class="col-md-5">
                  <base-input type="text"
                            label="Repository URL"
                            :disabled="false"
                            placeholder="Repository URL"
                            v-model="params.url">
                  </base-input>
                </div>
                <div style="padding:20px;">
                  <button class="btn btn-primary btn-fill" @click="gotoCustomized()">Generate Files</button>
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
        params:{
          url:''
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
      }

  }
}
</script>
<style scoped>
.pos-buttons{
  display: inline-flex!important;
}
</style>
