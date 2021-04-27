<template>
  	<div class="content">
		<div class="container-fluid">
			<div class="row" >
				<div class="col-12" style="margin-top:40px; height:75vh;">
					<card  class="strpied-tabled-with-hover" style="height:70vh;"
						body-classes=""
					>
						<template slot="header" >
              <div class="text-center" style="margin-top: 80px; margin-bottom: 40px;">
                <span style=" text-transform: uppercase;font-weight: bold;font-size: 30px;">Pipeline Name</span>

              </div>
						</template>

						<template>
              <div class="row" style="margin-bottom:80px;    justify-content: center;">
                <div class="col-12 col-md-6">
                    <base-input type="text" class="no-margin"
                              label=""
                              :disabled="$store.state.pipeline_id != ''"
                              placeholder="Name of the pipeline. Exmaple: worsica"
                              v-model="pipelineName">
                      </base-input>
                      <span v-show="showErrorPipeline" style="color:red; font-size:12px;">This field is required.</span>
                  </div>
              </div>
              <div class="row" style="margin-top:2rem; margin-bottom:2rem;">
                <div class="col-12 text-center">
                    <button @click="back()" type="button" class="btn btn-next-back btn-back" >
                        BACK
                    </button>
                    <button @click="next()" type="button" :disabled="pipelineName == ''"  class="btn btn-next btn-next-back">
                        NEXT
                    </button>
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
       pipelineName:'',
       showErrorPipeline:false

      }
    },
    methods:{
      next(){
        this.$store.state.name = this.pipelineName;
        this.$router.push({name: 'general'});
      },
      back(){
        this.$router.push({name: 'SelectOption'});
      },
      created(){
        this.pipelineName = this.$store.state.name
      }
  }
}
</script>
<style scoped>
.no-margin{
  margin:0px!important;
}

.btn-next {
    background-color: #1DC7EA !important;
    color: black !important;
    padding:1rem 0 1rem 0;
    font-weight: bold;
    border: 2px solid black;
  }

  .btn-next-back{
    width: 10%!important;
  }

.btn-back{
  padding:1rem 0 1rem 0;
  background-color:#ccc!important;
  margin-right:10%;
  font-weight: bold;
  border: 2px solid black;

}

.btn-info {
    border-color: #1185EB;
    color: #1185EB;
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
