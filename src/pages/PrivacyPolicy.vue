<template>
  <div class="auth-layout" style="scroll-behavior: smooth;">
  	<header class="bg-blue text-white" id="myheader">
      <!-- <div class="bg-primary" id="navbar-sticky"> -->
        <div class="topbar" id="top">
          <div class="container">
            <div class="row">
              <div class="col-sm-6">
                <div id="text-7" class="widget widget_text">
                  <div class="textwidget"></div>
                </div><!-- .static-hero-widget -->
              </div>
              <div class="col-sm-6 text-sm-right">
                <div id="text-6" class="widget widget_text">
                  <div class="textwidget">
                    <p><a class="textwidget" href="https://twitter.com/EOSC_synergy" target="_blank" rel="noopener noreferrer">Follow us on twitter</a>
                    </p>
                  </div>
                </div><!-- .static-hero-widget -->
              </div>
            </div>

          </div><!-- .container -->
        </div>

        <!-- ******************* The Navbar Area ******************* -->
        <div id="wrapper-navbar" class="bg-blue" itemscope="" itemtype="http://schema.org/WebSite">

          <a class="skip-link sr-only sr-only-focusable" href="#content">Skip to content</a>

          <nav class="navbar navbar-expand-md navbar-dark">

            <div class="container">

                <!-- Your site title as branding in the menu -->
              <a href="https://www.eosc-synergy.eu/" class="navbar-brand" rel="home"><img src="../../public/img/logo-eosc-synergy-png.png" class="img-fluid" style="height: 50px;" alt="EOSC synergy"></a><!-- end custom logo -->
              <p style="font-size:40px; margin-bottom: 0px;"><strong>SQAaaS</strong></p>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <!-- The WordPress Menu goes here -->
              <div id="navbarNavDropdown" class="collapse navbar-collapse"><ul id="main-menu" class="navbar-nav ml-auto">
                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-790" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-790 nav-item"><a title="Help" target='_blank' href="https://docs.sqaaas.eosc-synergy.eu/" class="nav-link text-white"><span style="font-weight:bold">Documentation</span><i style='padding-left:30px; border-right: solid 1px;' class="fa" aria-hidden="true"></i></a></li>
                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-668" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-668 nav-item"><a title="About" target='_blank' href="https://www.eosc-synergy.eu/about/" class="nav-link text-white">About</a></li>
                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-47" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-47 nav-item"><a title="Partners" target='_blank' href="https://www.eosc-synergy.eu/partners/" class="nav-link text-white">Partners</a></li>
                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-790" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-790 nav-item"><a title="Contact us" target='_blank' href="https://www.eosc-synergy.eu/contact-us/" class="nav-link text-white">Contact us</a></li>
                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-668" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-668 nav-item" style="padding-left:20px"> <button type="button" class=" btn btn-outline btn-login" @click="login_egi()">Sign In</button></li>
                </ul></div>										</div><!-- .container -->

                        </nav><!-- .site-navigation -->

              </div><!-- #wrapper-navbar end -->
      <!-- </div> -->
		</header>
    <div class="row" style="margin-top:150px; padding:10px 80px">
      <h2>Privacy policy</h2>
        <div class="table-responsive">
          <table class="table" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tbody>

                      <tr
                          style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                          <td style="padding-right: 10px; padding-left: 10px;padding-bottom:0px; min-width:250px;">
                            <div class="row" style="padding:0px 20px;">
                              <span class="text-left" style="font-weight: 700;" >Name of the Service</span>
                            </div>
                          </td>
                          <td style="padding-right: 10px; padding-left: 10px;padding-bottom:0px;">
                            <div class="row" style="padding:0px 20px;">
                              <span class="text-left">SQAaaS Web</span>
                            </div>
                          </td>
                      </tr>  
                      <tr
                        style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                        <td style="padding-right: 10px; padding-left: 10px;padding-bottom:0px;min-width:250px;">
                          <div class="row" style="padding:0px 20px;">
                            <span style="font-weight: 700;" >Description of the service</span>
                          </div>
                        </td>
                        <td style="padding-right: 10px; padding-left: 10px;padding-bottom:0px;">
                          <div class="row" style="padding:0px 20px;">
                            <p class="text-left mb-0">Client for the authentication process of users who access the <a target="_blank" href="https://sqaaas.eosc-synergy.eu">SQAaaS website.</a></p>
                          </div>
                        </td>
                    </tr>  
                    <tr
                          style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                          <td style="padding-right: 10px; padding-left: 10px;padding-bottom:0px;min-width:250px;">
                            <div class="row" style="padding:0px 20px;">
                              <span class="text-left" style="font-weight: 700;" >Data controller and a contact person</span>
                            </div>
                          </td>
                          <td style="padding-right: 10px; padding-left: 10px;padding-bottom:0px;">
                            <div class="row" style="padding:0px 20px;">
                              <span class="text-left">EOSC-Synergy - sqaaas@ibergrid.eu</span>
                            </div>
                          </td>
                      </tr>  
                        <tr
                          style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                          <td style="padding-right: 10px; padding-left: 10px;padding-bottom:0px;min-width:250px;">
                            <div class="row" style="padding:0px 20px;">
                              <span class="text-left" style="font-weight: 700;" >Purpose of the processing of personal data</span>
                            </div>
                          </td>
                          <td style="padding-right: 10px; padding-left: 10px;padding-bottom:0px;">
                            <div class="row" style="padding:0px 20px;">
                              <span class="text-left">The EGI Check-in service provides a Token for authorised users. In order to authenticate the users in the website the token is exchanged with the API to validate the access to the service.</span>
                            </div>
                          </td>
                      </tr>  
                      <tr
                          style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                          <td style="padding-right: 10px; padding-left: 10px;padding-bottom:0px;min-width:250px;">
                            <div class="row" style="padding:0px 20px;">
                              <span class="text-left" style="font-weight: 700;" >Third parties to whom personal data is disclosed</span>
                            </div>
                          </td>
                          <td style="padding-right: 10px; padding-left: 10px;padding-bottom:0px;">
                            <div class="row" style="padding:0px 20px;">
                              <span class="text-left">Personal data shall not be transferred to any third party outside the EU.</span>
                            </div>
                          </td>
                      </tr>  
                      <tr
                          style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                          <td style="padding-right: 10px; padding-left: 10px;padding-bottom:0px;min-width:250px;">
                            <div class="row" style="padding:0px 20px;">
                              <span class="text-left" style="font-weight: 700;" >Data retention</span>
                            </div>
                          </td>
                          <td style="padding-right: 10px; padding-left: 10px;padding-bottom:0px;">
                            <div class="row" style="padding:0px 20px;">
                              <span class="text-left">In general, personal data is not stored.</span>
                            </div>
                          </td>
                      </tr> 
                        <tr
                          style="border-width: 0px; border-bottom-width: 1px; border-color: gray; height: 1px">
                          <td style="padding-right: 10px; padding-left: 10px;padding-bottom:0px;min-width:250px;">
                            <div class="row" style="padding:0px 20px;">
                              <span class="text-left" style="font-weight: 700;" >Data Protection Code of Conduct</span>
                            </div>
                          </td>
                          <td class="text-left" style="padding-right: 10px; padding-left: 10px;padding-bottom:0px;">
                            <div class="row" style="padding:0px 20px;">
                              <p class="mb-0">Personal data will be protected according to the <a target="_blank" href="https://geant3plus.archive.geant.net/Pages/uri/V1.html"> Code of Conduct for Service Providers</a>, a common standard for the research and higher education sector to protect the user's privacy.</p>
                            </div>
                          </td>
                      </tr> 


                                              
              </tbody>
          </table>
      </div>
  	</div>
    <content-footer></content-footer>
  </div>
</template>
<script>

  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  import ContentFooter from '../layout/ContentFooter'
  export default {
    components: {
		  ContentFooter,
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

.section_docs{
  text-decoration: none;
  background-color: transparent;
  color: #fed136 !important;
}

.section-style{
   /* margin-bottom:4rem;
   padding-top:2rem; */
   /* padding-bottom:2rem; */
   min-height: 400px;
   padding-top: 3rem;
   padding-bottom: 1rem;
}

.text-primary {
    color: #fed136 !important;
}

.fa{
  font-family: 'FontAwesome';
}

.fa-stack-1x, .fa-stack-2x {
    left: 0;
    position: absolute;
    text-align: center;
    width: 100%;
}

.bg-blue {
    background-color: #73bbdc;
}
.back-login {
  min-height:80vh;
  margin-top:200px;
  background: url('./../../public/img/opacity.png') no-repeat right center;
  background-size: 80%;
  /* margin-bottom:4rem; */
  /* background-repeat: no-repeat, repeat; */

}

.topbar {
    border-bottom: 1px solid rgba(255,255,255,.3);
    padding: 6px 0;
    font-size: .8rem;
    max-height: 33px;
}

.navbar {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: .5rem 1rem;
    background-color:#73bbdc;
}

.navbar-brand {
    display: inline-block;
    padding-top: .3rem;
    padding-bottom: .3rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
}

.navbar-brand img {
    max-width: 160px;
    -webkit-filter: brightness(0) invert(1);
    filter: brightness(0) invert(1);
}

.navbar>.container, .navbar>.container-fluid {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}

.btn-login {
  color: #fff;
  /* border:none; */
  font-weight: 700;
  border: 1px solid #fff;
  padding: .375rem 2rem;
  font-size: 1.25rem;
  line-height: 1.6;
  border-radius: 5px;


}

.btn-login:hover {
   color: #AB0720;
    /* background-color: #aab224; */
    border-color: #AB0720;
    border-radius: 5px;
}

.btn-white {
  color: #73bbdc;
  /* border:none; */
  font-weight: 700;
  border: 1px solid #73bbdc;
  padding: .375rem 2rem;
  font-size: 1.25rem;
  line-height: 1.6;
  border-radius: 5px;


}

.btn-white:hover {
   color: #AB0720;
    /* background-color: #aab224; */
    border-color: #AB0720;
    border-radius: 5px;
}

/* // .column {
//   float: left;
//   width: 50%;
// } */
.entry-content{
  padding: 2rem 0rem;
}
.bg-blue {
    background-color: #73bbdc;
}
.textwidget{
  color: #fff!important;
  font-size:12px;

}
.text-white {
    color: #fff!important;
}


/* // .auth-layout {
//     height: 100vh;
//     margin: 0;

// 	nav {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       height: 100px;
//       background-color: #73bbdc;
//     }
// 	.main {
//       margin: 0;
//       height: 100%;
// 	}
// }
// .navbar-brand{
//   max-width: 160px;
//   filter: brightness(0) invert(1);
// }
// .nav-item{
//   padding-right: 1.5rem;
// }

// .item{
//   color: white;
//   font-family: Nunito,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
// }
// .auth-wallpaper {
// 	// background-color: $top-nav-bg;
// 	overflow: hidden;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// } */

h1,h2,h3{
  margin-bottom: .5rem;
  font-family: Nunito,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-weight: 700;
  line-height: 1.1;
  color: #343434;
}


@media (min-width: 1200px){
  .container {
      max-width: 1240px;
  }

}

@media (min-width: 992px){


}

@media (min-width: 768px){


}

#myheader {
  position:fixed; /* fixing the position takes it out of html flow - knows
                   nothing about where to locate itself except by browser
                   coordinates */
  left:0;           /* top left corner should start at leftmost spot */
  top:0;            /* top left corner should start at topmost spot */
  width:100vw;      /* take up the full browser width */
  z-index:200;  /* high z index so other content scrolls underneath */
  height:100px;     /* define height for content */
}

</style>
