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
                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-668" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-668 nav-item"><a title="About" target='_blank' href="https://www.eosc-synergy.eu/about/" class="nav-link text-white">About</a></li>
                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-47" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-47 nav-item"><a title="Partners" target='_blank' href="https://www.eosc-synergy.eu/partners/" class="nav-link text-white">Partners</a></li>
                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-790" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-790 nav-item"><a title="Contact us" target='_blank' href="https://www.eosc-synergy.eu/contact-us/" class="nav-link text-white">Contact us</a></li>
                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-790" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-790 nav-item"><a title="Help" target='_blank' href="https://docs.sqaaas.eosc-synergy.eu/" class="nav-link text-white"><span style='padding-top:10px;'>Doc</span><i style='padding-left:5px' class="fa fa-book" aria-hidden="true"></i></a></li>
                <li itemscope="itemscope" itemtype="https://www.schema.org/SiteNavigationElement" id="menu-item-668" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-668 nav-item"> <button type="button" class=" btn btn-outline btn-login" @click="login_egi()">Sign In</button></li>
                </ul></div>										</div><!-- .container -->

                        </nav><!-- .site-navigation -->

              </div><!-- #wrapper-navbar end -->
      <!-- </div> -->
		</header>


    <div class="container back-login" >
      <p style="text-transform: uppercase;margin-bottom:0px;font-weight: 700;font-size:16px;">Committed to Software Quality in Research</p>
      <div style="max-width: 792px;">
        <h2 style="text-transform: uppercase;font-size: 44px;font-weight: 700;line-height: 1.25;margin-bottom:2rem;" >Streamline the Adoption of Novel Software Engineering Practices in Research and Receive Credit for It</h2>
        <p style="font-size:18px;">The adoption of quality-based practices is one common struggle when it comes to developing software in research environments. The SQAaaS platform <b>provides researchers with ready-to-use <em>CI/CD pipelines</em></b> that cross-check the relevant quality criteria any software project ought to fulfill in order to meet the Open Science values, and thus be sustainable, reliable, usable, reusable and discoverable in the long term. Additionally, the SQAaaS
        features an assessment tool that acknowledges the quality attributes of the software, <b>enabling proper recognition through shareable and verifiable <em>digital badges</em></b></p>
        <!-- <p><a href="#" @click="goTo()">What are CI/CD pipelines?</a></p> -->
        <p>
          <button style="color: #1DC7EA;padding-left:0px;bargin-bottom:40px;" type="button" class=" btn btn-simple" @click="goTo('cicd')">What is CI/CD?</button>

        </p>
        <p>
          <button style="color: #1DC7EA;padding-left:0px;bargin-bottom:40px;" type="button" class=" btn btn-simple" @click="goTo('badges')">What are SQAaaS <em>digital badges</em> all about?</button>

        </p>

      </div>
      <div style="padding-top:4rem;">
        <a style type="button" class="btn-outline btn" href="https://www.youtube.com/watch?v=krHm0eP9yiI" target="blank"><i style="color:black; margin-right:10px;" class="fa fa-play-circle" aria-hidden="true"></i>See SQAaaS in Action</a>
      </div>
    </div>

    <section class="section-style">
        <div class="container" style="" id="cicd" ref="cicd">
          <h2 style="font-weight: 700;color:#73bbdc;margin-top: 0px;">What are <em>CI/CD pipelines</em>?</h2>
          <p>CI/CD stands for Continuous Integration and Continuous Delivery, respectively. They are common practices in software engineering that aim at improving the overall quality of the software during the development life cycle. CI/CD encompass both the verification and validation (V&V) processes, and thus they not only act at the code level, but also assess the operational part of the software. Consequently, CI/CD helps developers to meet both the functional (behavior-driven) and non-functional (usability-oriented) requirements that the software is intended to provide to their users.</p>
          <h4 style="font-weight: 700;color:#73bbdc;margin-top: 0px;">What about the <em>Pipelines</em>?</h4>
          <p>The CI/CD work is commonly arranged into pipelines, which define the sequential steps that the software V&V needs to go through, commonly as often as new source code changes are added to the codebase. As a result, automation is key to enable the CI/CD scenarios and a key feature of the pipelines.</p>
          <h2 style="font-weight: 700;color:#73bbdc;margin-top: 0px;">What are SQAaaS <em>digital badges</em> all about?</h2>
          <p>Badges are commonly used by earners for proving the attainment of certain achievements. Digital badges complement traditional badging by providing virtual certification with built-in features for online sharing, verification, portability and trustworthiness. The SQAaaS platform harnesses the potential of the Open Badges specification to issue digital badges for particular versions of the software. Each badge issued by SQAaaS has associated metadata that includes the software quality criteria being fulfilled and the applicable evidence in the form of build logs, reports and/or binary artefacts.</p>
          <h4 style="font-weight: 700;color:#73bbdc;margin-top: 0px;">How can software in research benefit from badges?</h4>
          <p>The resultant badge can then be shared and verified by external bodies, thus significantly impacting the visibility and adoption of the software. In research ecosystems, such a quality badge definitely contributes to usability, reputation-building and crediting, as well as improving the reusability and reproducibility of the awarded software version.</p>
        </div>
    </section>

    <section class="bg-blue section-style">
        <div class="container" style="padding-top:0px;" id="badges" ref="badges">
          <h2 style="font-weight: 700;color:#ffff;margin-top: 0px;">Benefit from the good practices when developing software and services</h2>
          <h4 style="font-weight: 700;padding-bottom:0.2rem;">Meet the quality criteria we use to foster the implementation of reproducible and sustainable research software.</h4>
          <p>The workflow of the CI/CD pipelines created by the SQAaaS platform is criteria-driven, which means that each stage executed by the pipeline fulfills a criterion from the two sets of Software and Service Quality Assurance documents. The criteria compiled are the result of an open and continuous collaborative effort and can be reached at:</p>
              <p>- A set of Common Software Quality Assurance Baseline Criteria for <a style="color:white;text-decoration: underline;" href="https://github.com/indigo-dc/sqa-baseline" target="blank">Research Projects</a>.</p>
              <p>- A set of Common Service Quality Assurance Baseline Criteria for <a style="color:white;text-decoration: underline;" href="https://github.com/EOSC-synergy/service-qa-baseline" target="blank">Research Projects</a>.</p>
        </div>
    </section>

    <section class="section-style">
      <div class="container" style="">
        <h2 style="font-weight: 700;color:#73bbdc;padding-bottom:2rem;margin-top: 0px;text-align: center;">Tailor quality checks to your software needs</h2>
        <h4 style="font-weight: 700;padding-bottom:0.2rem;">No expertise required on CI/CD, just graphically compose the pipeline, add it to your code repository, and start validating your software for every change</h4>
        <p>Researchers and computational scientists use SQAaaS to harness the benefits of applying good software engineering practices to their own software projects. The <strong> <i> Pipeline as a Service </i></strong> building block allows you to compose and test customized CI/CD pipelines in accordance with reference criteria used throughout the software development life cycle of research EU projects. And all of this without the burden of being at the forefront of the latest trendy CI languages or configuration formats.</p>
        <div class="text-center" style="padding-top:20px;padding-bottom:20px;">
          <button type="button" class=" btn btn-outline btn-white" @click="login_egi()" >Try it out!</button>

        </div>

      </div>
    </section>

    <section class="bg-blue section-style">
      <div class="container">
        <h2 style="font-weight: 700;color:#ffff;padding-bottom:2rem;margin-top: 0px;text-align: center;">Obtain the quality achievements of your software</h2>
        <h4 style="font-weight: 700;padding-bottom:0.2rem;">Estimate how well your software is doing in terms of QA and get recognition for it!</h4>
        <p>The <strong><i> Quality Assessment & Awarding</i> </strong> building block analyses, building upon your input, the level of completeness with the [reference criteria](link) for any given release of your software. Once the assessment is completed, you will get a digital badge that acknowledges the criteria fulfilled and the associated assets such as the code versioning and building related data.</p>
        <div class="text-center" style="padding-top:20px;padding-bottom:20px;">
          <button type="button" class=" btn btn-outline btn-login" @click="login_egi()" >Try it out!</button>

        </div>

      </div>
    </section>

    <section class="section-style">
      <div class="container">
        <h2 style="font-weight: 700;color:#73bbdc;padding-bottom:2rem;margin-top: 0px;text-align: center;">Deploy your own SQAaaS platform</h2>
        <h4 style="font-weight: 700;padding-bottom:0.2rem;">Get the SQAaaS on your premises at the drop of a hat!</h4>
        <p>The SQAaaS platform relies on a set of services to provide its functionality. We deliver an Infrastructure as Code solution that makes the on-premise deployment straightforward for any individual researcher or scientific community. This approach is useful for use cases with privative source code where unrestricted access to the repositories is not granted.</p>
        <div class="text-center" style="padding-top:20px;padding-bottom:20px;">
          <button type="button" class=" btn btn-outline btn-white" >Try it out!</button>
        </div>
      </div>
    </section>

    <section class="bg-blue section-style">
      <div class="container">
        <h2 style="font-weight: 700;color:#ffff;padding-bottom:2rem;margin-top: 0px;text-align: center;">Use code rather than a graphical interface</h2>
        <h4 style="font-weight: 700;padding-bottom:0.2rem;">Harness the full potential of the underlying CI/CD technology by means of the JePL library</h4>
        <p>Tech-savvy users tend to favor code over a graphical interface for the task of managing their CI/CD pipelines. Especially suitable for complex setups, you can use the same library the SQAaaS platform relies on, the <strong><i>JePL library</i></strong>, and benefit from the full set of features it provides.</p>
        <div class="text-center" style="padding-top:20px;padding-bottom:20px;">
          <button type="button" class=" btn btn-outline btn-login" >Try it out!</button>
        </div>
      </div>
    </section>


    <section class="section-style">
      <div class="container">
            <h2 style="text-align:center;padding-bottom:40px;">Learn more about SQAaaS</h2>
        <div class="row">
          <div class="col-12 col-md-4 text-center">
            <span class="fa-stack fa-3x">
                <a class='section_docs' target='_blank' href="https://docs.sqaaas.eosc-synergy.eu/">
                    <i class="fa fa-circle fa-stack-2x text-primary"></i>
                    <i class="fa fa-book fa-stack-1x fa-inverse"></i>
                </a>
            </span>
            <h4  style="font-weight: 700;">SQAaaS Documentation</h4>
            <p>Checks the docs to understand all the capabilities of SQAaaS</p>

          </div>
          <div class="col-12 col-md-4 text-center">
            <span class="fa-stack fa-3x">
                <a class='section_docs' href="#">
                    <i class="fa fa-circle fa-stack-2x text-primary"></i>
                    <i class="fa fa-github fa-stack-1x fa-inverse"></i>
                </a>
            </span>
            <h4 style="font-weight: 700;">GitHub</h4>
            <p>Open Source (GPLv3 License)</p>

          </div>
          <div class="col-12 col-md-4 text-center">
            <span class="fa-stack fa-3x">
                <a class='section_docs' href="https://www.youtube.com/watch?v=krHm0eP9yiI" target="blank">
                    <i class="fa fa-circle fa-stack-2x text-primary"></i>
                    <i class="fa fa-youtube-play fa-stack-1x fa-inverse"></i>
                </a>
            </span>
            <h4  style="font-weight: 700;">YouTube</h4>
            <p>Find tutorials about SQAaaS.</p>

          </div>

        </div>
      </div>
    </section>

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
      goTo(refName){
        var element = this.$refs[refName];
        var top = element.offsetTop;

        window.scrollTo(0, top);
      },
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
