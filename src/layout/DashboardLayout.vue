<template>
	<div class="wrapper">
		<side-bar v-show="$route.path != '/auth/pipeline-name' && $route.path != '/auth/select-option' && $route.path != '/auth/full-assessment' ">

      <div class="widget-body ">
                <p style="padding-left:20px;font-size: 30px;">Pipeline as a Service</p>
                <p style="padding-left:20px;font-size: 15px;">Compose and test your own customized quality pipelines</p>
                <div class="row">
                        <div class="col-sm-12">
                            <div class="col-sm-12">
                                <div class="vrtwiz">
                                    <ul class="verticalwiz">
                                        <li @click="menuChange('1')" class="active step1 general-step" data-target="#step1">
                                          <sidebar-link class="" to="/auth/general-options">
                                            <!-- <i class="nc-icon nc-chart-pie-35"></i> -->
                                            <span class="step">1</span> <span class="title">Repos</span>
                                          </sidebar-link>
                                            <!-- <a href="#tab1" data-toggle="tab" class="active"> <span class="step">1</span> <span class="title">Basic information</span> </a> -->
                                        </li>
                                        <li @click="menuChange('2')" data-target="#step2" class="step2 general-step">
                                          <sidebar-link  to="/auth/composer-options">
                                            <!-- <i class="nc-icon nc-tag-content"></i> -->
                                            <span class="step">2</span> <span class="title">Services</span>
                                          </sidebar-link>
                                            <!-- <a href="#tab2" data-toggle="tab"> <span class="step">2</span> <span class="title">Billing information</span> </a> -->
                                        </li>
                                        <li @click="menuChange('3')" data-target="#step3" class="step3 general-step">
                                          <sidebar-link to="/auth/sqa-criteria">
                                            <!-- <i class="nc-icon nc-tap-01"></i> -->
                                            <span class="step">3</span> <span class="title">criterias</span>
                                          </sidebar-link>
                                            <!-- <a href="#tab3" data-toggle="tab"> <span class="step">3</span> <span class="title">Domain Setup</span> </a> -->
                                        </li>
                                        <li data-target="#step4" class="" >
                                          <sidebar-link to="/auth/files">
                                            <!-- <i class="nc-icon nc-notes"></i> -->
                                            <span class="step">4</span> <span class="title">Summary</span>
                                          </sidebar-link>
                                            <!-- <a href="#tab4" data-toggle="tab"> <span class="step">4</span> <span class="title">Save Form</span> </a> -->
                                        </li>
                                        <li data-target="#step5" class="">
                                          <sidebar-link to="/auth/pipeline-execution">
                                            <!-- <i class="nc-icon nc-preferences-circle-rotate"></i> -->
                                            <span class="step">5</span> <span class="title">Pipeline</span>
                                          </sidebar-link>
                                            <!-- <a href="#tab4" data-toggle="tab"> <span class="step">4</span> <span class="title">Save Form</span> </a> -->
                                        </li>
                                    </ul>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

      <hr style="background-color:rgba(255,255,255,0.6);">
      <sidebar-link to="/auth/pipeline-name">
				<i class="nc-icon nc-stre-left"></i>
				<p>Back</p>
			</sidebar-link>
      <mobile-menu></mobile-menu>
		</side-bar>
    <div v-if="$route.path == '/auth/pipeline-name' || $route.path == '/auth/select-option' || $route.path == '/auth/full-assessment' ">
			<top-navbar></top-navbar>

			<dashboard-content @click="toggleSidebar">

			</dashboard-content>

			<content-footer></content-footer>
		</div>
		<div v-else class="main-panel">
			<top-navbar></top-navbar>

			<dashboard-content @click="toggleSidebar">

			</dashboard-content>

			<content-footer></content-footer>
		</div>
	</div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      },
      menuChange(step){
        console.log(step)
        $('.general-step').removeClass('active')


      }
    },
    created(){
      this.$eventHub.$on('steps', function(value){
            this.menuChange(value);
        }.bind(this));
    },
    beforeDestroy() {
        this.$eventHub.$off('steps');
    },
  }

</script>
<style scoped>
.bg-blue {
    background-color: #73bbdc;
}
/*Start vertical Wizard*/
.sidebar .nav li .nav-link, body > .navbar-collapse .nav li .nav-link{
  opacity: 1!important;
}
.verticalwiz {
    display: block;
    list-style: none;
    position: relative;
    width: 100%;
    padding-left:0px;
}

.verticalwiz a:hover,.verticalwiz a:active,.verticalwiz a:focus {
    text-decoration: none
}

.verticalwiz li {
    display: block;
    height: 100%;
    min-height: 70px;
    max-width: 215px;
    width: 100%;


}

.verticalwiz li:before {
    border-top: 1px solid #DCDCDA;
    content: "";
    display: block;
    font-size: 0;
    overflow-y: auto;
    position: relative;
    top: 10px;
    right: 0;
    width: 100%;
    z-index: 1;
    transform: rotate(90deg) translateY(87px);
    left: 0;
    max-width: 50%;
    margin: 0 auto 0 85px;
    text-align: center;
}

.verticalwiz li:nth-child(3):after {
    border:none!important
}

.verticalwiz li:last-child:before {
  /* border: none!important; */
  top: -15px;

}

.verticalwiz li:first-child:before {
   border:none!important
}


.verticalwiz li.complete .step, .verticalwiz li.active.complete .step {
    background: #a1860b;
    color: #000;
    font-weight: 700;
    padding: 7px 13px;
    font-size: 15px;
    border-radius: 50%;
    border: 3px solid #a1860b;
}

.verticalwiz li .step i {
    font-size: 10px;
    font-weight: 400;
    position: relative;
    top: -1.5px
}

.verticalwiz li .step {
    /* background: #B2B5B9;
    color: #fff; */
    background: #c9d22a;
    color: black;
    display: inline;
    font-size: 15px;
    font-weight: 700;
    line-height: 12px;
    padding: 7px 13px;
    border: 3px solid transparent;
    border-radius: 50%;
    line-height: normal;
    position: relative;
    text-align: center;
    z-index: 2;
    transition: all .1s linear 0s;

}

.verticalwiz li.active .step {
    background: #DC204D;
    color: #fff;
    font-weight: 700;
    padding: 7px 13px;
    font-size: 15px;
    border-radius: 50%;
    border: 3px solid #A20B2F
}

.verticalwiz li.complete .title,.verticalwiz li.active .title {
    color: #fff;
}

.verticalwiz li .title {
    display: inline;
    font-size: 13px;
    position: relative;
    top: 0;
    padding-left:10px;
}

.rightab {
    border: 1px solid #dedede;
    border-radius: 3px;
    padding: 30px;
    box-shadow: 1px 1px 11px #ccc;
    min-height: 320px;
}

@media  (min-width: 992px) and (max-width: 1199px){
    .verticalwiz li:before{
        transform: rotate(90deg) translateY(65px);
        max-width: 60%;
         margin: 0 auto 0 50px;
    }
}
@media (max-width: 991px){
    /* .verticalwiz li{
        float: left;
        width: 25%;
        height: auto;
        min-height: inherit;
        margin-bottom: 20px;
        max-width: inherit;
        text-align: center;
    } */
    .verticalwiz li:before{
      /* transform: rotate(90deg) translateY(65px);
            transform: none;
            max-width: inherit;
            position: absolute; */
            margin-left: 85px;
    }
    /* .verticalwiz li .title{
        margin-top: 10px;
        text-align: center;
        display: block;
    } */
}
/*End vertical Wizard*/
</style>
