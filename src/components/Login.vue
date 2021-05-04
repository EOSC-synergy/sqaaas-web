<template>
	<div class="auth-layout">
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
              <p style="font-size:40px; margin-bottom: 0px;">SQAaaS</p>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <!-- The WordPress Menu goes here -->
              <div id="navbarNavDropdown" class="collapse navbar-collapse"><ul id="main-menu" class="navbar-nav ml-auto">
                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-668" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-668 nav-item"><a title="About" href="https://www.eosc-synergy.eu/about/" class="nav-link text-white">About</a></li>
                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-47" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-47 nav-item"><a title="Partners" href="https://www.eosc-synergy.eu/partners/" class="nav-link text-white">Partners</a></li>
                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-790" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-790 nav-item"><a title="Contact us" href="https://www.eosc-synergy.eu/contact-us/" class="nav-link text-white">Contact us</a></li>
                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-668" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-668 nav-item"> <button type="button" class=" btn btn-outline btn-login" @click="login_egi()">Sign In</button></li>
                </ul></div>										</div><!-- .container -->

                        </nav><!-- .site-navigation -->

              </div><!-- #wrapper-navbar end -->
      <!-- </div> -->
		</header>


    <div class="container back-login"  >
      <p style="text-transform: uppercase;margin-bottom:0px;font-weight: 700;font-size:16px;">Committed to Software Quality in Research</p>
      <div style="max-width: 792px;">
        <h2 style="text-transform: uppercase;font-size: 44px;font-weight: 700;line-height: 1.25;margin-bottom:2rem;" >The Researcher’s Toolkit to Streamline the Adoption of Novel Software Engineering Practicesand Receive Credit for It</h2>
        <p style="font-size:18px;">The adoption of quality-based practices is one common struggle when it comes to developing software in research environments. The SQAaaS platform provides researchers with ready-to-use CI/CD pipelines that cross-check the relevant quality criteria any software project ought to fulfill in order to meet the Open Science values, and thus be sustainable, reliable, usable, reusable and discoverable in the long term. Additionally, the SQAaaS features an assessment tool that acknowledges the quality attributes of the software, which ultimately verifiable and shareable</p>
        <p><a href="">What is CI/CD?</a></p>

      </div>
      <div style="padding-top:4rem; padding-bottom:4rem;">
        <button style type="button" class="btn-outline btn" ><i style="color:black; margin-right:10px;" class="fa fa-play-circle" aria-hidden="true"></i>See SQAaaS in Action</button>
      </div>
      <!-- <div class="entry-content">
        <p>
          Quality is a&nbsp;fundamental aspect for&nbsp; a successful uptake of EOSC services
          and data repositories by the European research communities. EOSC Synergy is developing
          a quality based approach to foster the adoption of EOSC services and data repositories,
          which will improve, promote and reward quality. This approach exploits an automated
          validation process to assess the quality of the services and data repositories
          featuring continuous integration (CI) and continuous delivery (CD) pipelines.
          The pipelines are programmatically composed leveraging the Pipeline as Code implementation in Jenkins.



        </p>
        <div class="row text-center" style="padding:2rem 0rem;">
          <div class="col-12 col-md-6">
            <img loading="lazy" width="481" height="500" src="../../public/img/SQA.png" alt="" class="wp-image-492"  sizes="(max-width: 781px) 100vw, 781px">

          </div>
          <div class="col-12 col-md-6">
            <img loading="lazy" width="401" height="500" src="../../public/img/OBS.png" alt="" class="wp-image-492"  sizes="(max-width: 781px) 100vw, 781px">
          </div>
        </div>

        <p>
          The EOSC Synergy project will contribute to the improvement and recognition of the quality attributes of both data
          and services in the EOSC, paving the path towards their long-term sustainability.
        </p>
        <p>
          To access the service, authentication is done through EGI Check-in.
        </p>
        <div class="col-12">
          <p class="text-center">
            <img src="../../static/egi.png" alt="" style="height:50px;margin-bottom:5px;">
          </p>
        </div>

      </div> -->

      <div>

      </div>

    </div>

     <content-footer></content-footer>
	</div>
</template>

<script>
import ContentFooter from '../layout/ContentFooter'

export default {
   components: {
      // TopNavbar,
      ContentFooter,
    },
	data() {
		return {
		username: "",
		pass: "",
		error: false,
		error_message_text: "",
		processing: false,
		passwordFieldType: 'password',
		mistake: {
				username: false,
				password: false
			}
		};
    },
    methods: {
        login_egi(){
            var url =
            this.env.url_authorize
            + '?response_type=code token token_id'
            + '&scope=openid profile'
            + '&nonce=abc'
            + '&client_id=' + this.env.client_id
            + '&redirect_uri=' + this.env.redirect_uri;
            // + '&redirect_uri=' + "http://localhost:8080/callback.html";
            window.location.replace(url)
    },
    created(){
        this.$store.state={
          name:'',
          pipeline_id:'',
          build_url:'',
          status:'',
          pull_request_url:'',
          config_yaml:{
            config:{
              project_repos:{},
              credentials:[]
            },
            sqa_criteria:{},
            environment:{},
            timeout:"600"
          },
          docker_compose:{
            version:"3.7",
            services:{

            }

          },
      }
    }

    }
}
</script>
<style scoped>

.back-login {
  min-height:80vh;
  margin-top:200px;
  /* background-image: url('./../../public/img/back-login.png') !important; */
  /* background-repeat: no-repeat, repeat; */
  /* width: 100%; */
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
