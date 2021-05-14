<template>
  	<div class="content">
		<div class="container-fluid">
			<div class="row" >
				<div class="col-12" style="margin-top:40px; ">
					<card  class="strpied-tabled-with-hover"
						body-classes=""
					>
						<template slot="header" >
              <button @click="back()" type="button" class="btn btn-simple" >
                  <i class="fa fa-arrow-left" aria-hidden="true"></i>
                  BACK
              </button>
              <div class="text-center" style="margin-bottom: 40px;margin-top:40px;">
                <span style="font-weight: bold;font-size: 20px;">The Pipeline as Code block will guide you through 3 steps to compose your CI/CD pipeline based on the software quality criteria you select</span>
                <p>Once composed, you can then try out the pipeline in our premises or get it to be readily used in your code repositories</p>
              </div>
						</template>

						<template>
              <div style="margin-top:4rem;height:250px;">
                <div class="wizard">
                    <div class="wizard-inner">
                        <div class="connecting-line"></div>
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" class="active step1 general-step">
                                <a href="#step1" @click="menuChange('1')" data-toggle="tab" aria-controls="step1" role="tab" aria-expanded="true"><span class="round-tab">1 </span> <i style="font-size:16px;">REPOS</i></a>
                                <div v-show="this.current_step==1" style="margin-top:40px;" >
                                  <p>Provide pointers to the repositories where the target code is available, and customize them as needed (add branches, tags, etc.).</p>
                                </div>
                            </li>
                            <li role="presentation"  class="step2 general-step">
                                <a href="#step2" @click="menuChange('2')" data-toggle="tab" aria-controls="step2" role="tab" aria-expanded="false"><span class="round-tab">2</span> <i style="font-size:16px;">SERVICES</i></a>
                                <div v-show="this.current_step==2" style="margin-top:40px;" >
                                  <p>Define the set of services (via Docker containers) that are required for your testing environment.</p>
                                </div>
                            </li>
                            <li role="presentation" class="step3 general-step">
                                <a href="#step3" @click="menuChange('3')" data-toggle="tab" aria-controls="step3" role="tab"><span class="round-tab">3</span> <i style="font-size:16px;">CRITERIAS</i></a>
                                 <div v-show="this.current_step==3" style="margin-top:40px;" >
                                  <p>Arrange the pipeline steps according to the supported quality criteria. Each criterion will prompt you for the relevant details to get it done (e.g. build parameters).</p>
                                </div>
                            </li>
                            <li role="presentation" class="step4 general-step">
                                <a href="#step4" @click="menuChange('4')" data-toggle="tab" aria-controls="step4" role="tab"><span class="round-tab">4</span> <i style="font-size:16px;">SUMMARY</i></a>
                                 <div v-show="this.current_step==4" style="margin-top:40px;" >
                                  <p>The CI/CD pipeline is now ready to use. The SQAaaS provides further support for executing and/or downloaine. You could even push it directly to your own git repository.</p>
                                </div>
                            </li>
                            <!-- <li role="presentation" class="step5 general-step">
                                <a href="#step5" @click="menuChange('5')" data-toggle="tab" aria-controls="step5" role="tab"><span class="round-tab">5</span> <i style="font-size:16px;">PIPELINE</i></a>
                                 <div v-show="this.current_step==5" style="margin-top:40px;" >
                                  <p>The CI/CD pipeline is now ready to use. The SQAaaS provides further support for executing and/or downloaine. You could even push it directly to your own git repository.</p>
                                </div>
                            </li> -->
                        </ul>
                    </div>
                  </div>
              </div>
              <p class="text-center" style="font-size:40px;padding-top:20px;padding-bottom:40px;">Start composing your CI/CD pipeline</p>
              <div style="padding-bottom:40px;margin-top:2rem;">
                <div class="col-12 col-md-6 mx-auto mb-3">
                  <div class="input-group">
                    <input type="text" style="height: 42px;border-right: 1px solid #000;" class="form-control" placeholder="Name of the pipeline. Exmaple: worsica." aria-label="Name of the pipeline. Exmaple: worsica." aria-describedby="basic-addon2" v-model="pipelineName">
                    <div class="input-group-append">
                      <button class="btn btn-next btn-next-back" :disabled='disabled_next' style="border-width:1px; border-color:#000;color:#3472F7;" type="button" @click="next()">Create CI/CD pipeline</button>
                    </div>
                  </div>
                   <label  v-show="showErrorPipeline" style="color:red; font-size:12px;" >Error: Invalid character.</label>
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
       showErrorPipeline:false,
       current_step:1,
       disabled_next: true,
       autoMove: false,
       m:''
      }
    },
    watch:{
      'pipelineName'(val){
        var regex = new RegExp("(^$)|^[a-zA-Z0-9_.-]+$");
        console.log(val)
        if(regex.test(this.pipelineName) ==  false){
            this.showErrorPipeline= true;
          }else{
            this.showErrorPipeline = false;
          }
        if(val == '' || regex.test(this.pipelineName) ==  false){
          this.disabled_next = true;
        }else{
          this.disabled_next = false;
        }
      },
      "autoMove"(val) {
        console.log('here')
        if (val) {
            this.m = setInterval(() => {
              this.current_step = this.current_step + 1;
              this.menuChange(this.current_step)
            }, 10 * 1000)
        } else {
            clearInterval(this.m)
        }
      }
    },
    methods:{
      next(){
        this.autoMove = false;
        this.$store.state.name = this.pipelineName;
        this.$router.push({name: 'general'});
      },
      back(){
        this.autoMove = false;
        this.$router.push({name: 'SelectOption'});
      },
      menuChange(step){
        console.log(step)
        this.current_step = step;
        $('.general-step').removeClass('active')
        $('.step'+step).addClass('active')

      },
      created(){
        console.log(this.pipelineName)

        this.pipelineName = this.$store.state.name;


      },
      mounted(){
        var _this=this

        this.$nextTick(function () {
           _this.autoMove = true;
            // window.setInterval(() => {
            //    console.log('here')
            //   _this.current_step = _this.current_step + 1;
            // },100);

        })

      }
  }
}
</script>
<style scoped>

@import url('https://fonts.googleapis.com/css?family=Roboto');


/*------------------------*/
input:focus,
button:focus,
.form-control:focus{
	outline: none;
	box-shadow: none;
}
.form-control:disabled, .form-control[readonly]{
	background-color: #fff;
}
/*----------step-wizard------------*/
.d-flex{
	display: flex;
}
.justify-content-center{
	justify-content: center;
}
.align-items-center{
	align-items: center;
}

/*---------signup-step-------------*/
.bg-color{
	background-color: #333;
}
.signup-step-container{
	padding: 150px 0px;
	padding-bottom: 60px;
}




    .wizard .nav-tabs {
        position: relative;
        margin-bottom: 0;
        border-bottom-color: transparent;
    }

    .wizard > div.wizard-inner {
            position: relative;
    margin-bottom: 50px;
    text-align: center;
    }

.connecting-line {
    height: 2px;
    background: #e0e0e0;
    position: absolute;
    width: 75%;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 15px;
    z-index: 1;
}

.wizard .nav-tabs > li.active > a, .wizard .nav-tabs > li.active > a:hover, .wizard .nav-tabs > li.active > a:focus {
    color: #555555;
    cursor: default;
    border: 0;
    border-bottom-color: transparent;
}

span.round-tab {
    width: 30px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    border-radius: 50%;
    background: #fff;
    z-index: 2;
    position: absolute;
    left: 0;
    text-align: center;
    font-size: 16px;
    color: #0e214b;
    font-weight: 500;
    border: 1px solid #ddd;
}
span.round-tab i{
    color:#555555;
}
.wizard li.active span.round-tab {
        background: #0db02b;
    color: #fff;
    border-color: #0db02b;
}
.wizard li.active span.round-tab i{
    color: #5bc0de;
}
.wizard .nav-tabs > li.active > a i{
	color: #0db02b;
}

.wizard .nav-tabs > li {
    width: 25%;
}

.wizard li:after {
    content: " ";
    position: absolute;
    left: 46%;
    opacity: 0;
    margin: 0 auto;
    bottom: 0px;
    border: 5px solid transparent;
    border-bottom-color: red;
    transition: 0.1s ease-in-out;
}



.wizard .nav-tabs > li a {
    width: 30px;
    height: 30px;
    margin: 20px auto;
    border-radius: 100%;
    padding: 0;
    background-color: transparent;
    position: relative;
    top: 0;
}
.wizard .nav-tabs > li a i{
	position: absolute;
    top: -15px;
    font-style: normal;
    font-weight: 400;
    white-space: nowrap;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    font-weight: 700;
    color: #000;
}

    .wizard .nav-tabs > li a:hover {
        background: transparent;
    }

.wizard .tab-pane {
    position: relative;
    padding-top: 20px;
}


.wizard h3 {
    margin-top: 0;
}
.prev-step,
.next-step{
    font-size: 13px;
    padding: 8px 24px;
    border: none;
    border-radius: 4px;
    margin-top: 30px;
}
.next-step{
	background-color: #0db02b;
}
.skip-btn{
	background-color: #cec12d;
}
.step-head{
    font-size: 20px;
    text-align: center;
    font-weight: 500;
    margin-bottom: 20px;
}
.term-check{
	font-size: 14px;
	font-weight: 400;
}
.custom-file {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 40px;
    margin-bottom: 0;
}
.custom-file-input {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 40px;
    margin: 0;
    opacity: 0;
}
.custom-file-label {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    height: 40px;
    padding: .375rem .75rem;
    font-weight: 400;
    line-height: 2;
    color: #495057;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: .25rem;
}
.custom-file-label::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    display: block;
    height: 38px;
    padding: .375rem .75rem;
    line-height: 2;
    color: #495057;
    content: "Browse";
    background-color: #e9ecef;
    border-left: inherit;
    border-radius: 0 .25rem .25rem 0;
}
.footer-link{
	margin-top: 30px;
}

.list-content{
	margin-bottom: 10px;
}
.list-content a{
	padding: 10px 15px;
    width: 100%;
    display: inline-block;
    background-color: #f5f5f5;
    position: relative;
    color: #565656;
    font-weight: 400;
    border-radius: 4px;
}
.list-content a[aria-expanded="true"] i{
	transform: rotate(180deg);
}
.list-content a i{
	text-align: right;
    position: absolute;
    top: 15px;
    right: 10px;
    transition: 0.5s;
}
.form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {
    background-color: #fdfdfd;
}
.list-box{
	padding: 10px;
}
.signup-logo-header .logo_area{
	width: 200px;
}
.signup-logo-header .nav > li{
	padding: 0;
}
.signup-logo-header .header-flex{
	display: flex;
	justify-content: center;
	align-items: center;
}
.list-inline li{
    display: inline-block;
}
.pull-right{
    float: right;
}
/*-----------custom-checkbox-----------*/
/*----------Custom-Checkbox---------*/
input[type="checkbox"]{
    position: relative;
    display: inline-block;
    margin-right: 5px;
}
input[type="checkbox"]::before,
input[type="checkbox"]::after {
    position: absolute;
    content: "";
    display: inline-block;
}
input[type="checkbox"]::before{
    height: 16px;
    width: 16px;
    border: 1px solid #999;
    left: 0px;
    top: 0px;
    background-color: #fff;
    border-radius: 2px;
}
input[type="checkbox"]::after{
    height: 5px;
    width: 9px;
    left: 4px;
    top: 4px;
}
input[type="checkbox"]:checked::after{
    content: "";
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transform: rotate(-45deg);
}
input[type="checkbox"]:checked::before{
    background-color: #18ba60;
    border-color: #18ba60;
}






@media (max-width: 767px){
	.sign-content h3{
		font-size: 40px;
	}
	.wizard .nav-tabs > li a i{
		display: none;
	}
	.signup-logo-header .navbar-toggle{
		margin: 0;
		margin-top: 8px;
	}
	.signup-logo-header .logo_area{
		margin-top: 0;
	}
	.signup-logo-header .header-flex{
		display: block;
	}
}





.no-margin{
  margin:0px!important;
}

.btn-next {
    background-color: #1DC7EA !important;
    color: black !important;
    /* padding:1rem 0 1rem 0; */
    font-weight: bold;
    border: 2px solid black;
  }

  .btn-next-back{
    width: 200px!important;
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
