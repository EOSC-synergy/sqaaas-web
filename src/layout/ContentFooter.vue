<template>
  	<footer>
		<div class="footer-class">
			<div class="container-fluid">
				<div class="row" style="margin:2rem;">
					<div class="footer-widget widget_text widget-count-3 col-md-4">
						<div class="textwidget">
							<p>
								<img src="../../static/ue.jpg" style="height:40%;width:40%;" alt="">
							</p>

							<p>
								EOSC-synergy receives funding from the European Union’s Horizon
								2020 research and innovation programme under grant agreement
								No 857647.
							</p>

						</div>
					</div>

					<div class="footer-widget widget_text widget-count-3 col-md-4">
						<div class="textwidget">
							<p>
								<img src="../../static/by.png" style="height:50%;width:50%;" alt="">
							</p>

							<p>
								Unless otherwise indicated, all materials created by the EOSC-synergy
								consortium are licensed under a Creative Commons Attribution
								4.0 International License.
							</p>

						</div>
					</div>

					<div class="footer-widget widget_nav_menu widget-count-3 col-md-4">
						<div class="menu-footer-container">
							<ul class="menu">
								<li class="" style="border-top: 1px solid #343434;padding:0.5rem 0;">
									<a target="_blank" href="/#/privacy-policy" style="color:#42697a">Privacy Policy</a>
								</li>

								<li class="" style="border-top: 1px solid #343434;padding:0.5rem 0;">
									<a target="_blank" href="/#/terms-use" style="color:#42697a">Terms of Service</a>
								</li>

								<li style="border-top: 1px solid #343434;padding:0.5rem 0;">
									<a href="#" style="color:#42697a">News & Events</a>
								</li>

								<li style="border-top: 1px solid #343434; border-bottom: 1px solid #343434;padding:0.5rem 0;">
									<a href="#" style="color:#42697a" >Follows on Twitter</a>
								</li>
							</ul>

						</div>
					</div>

				</div>
			</div>
		</div>

    <div class="container-fluid">
      <div class="row mt-3 mb-3">
        <div class="col-8 offset-2 text-center">
          <a href="https://www.eosc-synergy.eu" target="_blank"><img src="../../static/eosc-synergy.png" style="width: 200px;" alt=""></a>
        </div>
        <div class="col-2 text-center">
          <button id="button" class="btn btn-primary btn-simple" @click="top()"> <i class="fa fa-arrow-up" aria-hidden="true"></i> Back to top</button>
        </div>
      </div>
    </div>

	</footer>
</template>
<script>
  export default {
	data() {
		return{
			btn:'',

		}
	},
	created() {
	},
	methods: {
		top(){
			// this.btn = $('#button');
			// e.preventDefault();
			$("html, body").animate({scrollTop: 0}, 400);
  			// document.body.scrollTop = 0;
  			// document.documentElement.scrollTop = 0;
		}
	}
  }

</script>
<style>
.footer-class{
  padding: 2rem 0;
  background: #c9d22a;
  font-family: Nunito,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1rem;
}

#button:hover{
	text-decoration: underline;
}
.widget_nav_menu .menu {
    margin-top: 3rem;
    margin-left: 0;
    padding-left: 0;
    list-style-type: none;
}

.link-footer{
	border-top: 1px solid #343434;
}
.copyright{
	padding: 1rem;
	background: #B6BF13;
}


</style>
