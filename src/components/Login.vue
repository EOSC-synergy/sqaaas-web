<template>
	<div class="auth-layout">
		<div class="nav d-lg-none"><h2>SQAaaS Web</h2></div>
		<div class="main row">
        <div class="col-lg-6 col-12">
			<div class="col-md-6 mx-auto">
				<div id="first">
					<div class="form ">
						<div class="logo mb-3">
							<div class="col-md-12 text-center">
								<h1>Welcome</h1>
							</div>
						</div>
						<form action="" method="post" name="login">
							<div class="form-group">
								<label for="exampleInputEmail1">Email address</label>
								<input type="email" name="email"  class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
							</div>
							<div class="form-group">
								<label for="exampleInputEmail1">Password</label>
								<input type="password" name="password" id="password"  class="form-control" aria-describedby="emailHelp" placeholder="Enter Password">
							</div>
							<div class="form-group">
								<p class="text-center">By signing up you accept our <a href="#">Terms Of Use</a></p>
							</div>
							<div class="col-md-12 text-center ">
								<button type="button" class=" btn mybtn btn-primary tx-tfm" @click="login()">Login</button>
							</div>
							<div class="col-md-12 ">
								<div class="login-or">
									<hr class="hr-or">
									<span class="span-or text-center">or Login with</span>
								</div>
							</div>
							<div class="col-md-12 mb-3">
								<p class="text-center">
									<img src="../../static/egi.png" alt="" style="height:50px;margin-bottom:5px;">
								</p>
							</div>
							<div class="col-md-12 mb-3 text-center">
									<button type="button" class=" btn btn-primary tx-tfm" @click="login_egi()">EGI Check-in</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<div class="auth-wallpaper col-6 d-none d-lg-flex" style="padding:0;">
			<img src="../../public/img/back-callback.png" style="height: 100%;width: 100%;" alt="">
		</div>
     </div>
	</div>
</template>

<script>

export default {
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
            window.location.replace(url)
		},
		login(){
			this.$router.push({name: 'SelectOption'});
		}
    }
}
</script>
<style lang="scss">

.column {
  float: left;
  width: 50%;
}
.auth-layout {
    height: 100vh;
    margin: 0;
	.nav {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
      background-color: #c9d22a;
    }
	.main {
      margin: 0;
      height: 100%;
	}
}
.auth-wallpaper {
	// background-color: $top-nav-bg;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}

h1,h2,h3{
font-family: 'Kaushan Script', cursive;
}
.myform{
	position: relative;
	display: -ms-flexbox;
	display: flex;
	padding: 1rem;
	-ms-flex-direction: column;
	flex-direction: column;
	width: 100%;
	pointer-events: auto;
	background-color: #fff;
	background-clip: padding-box;
	border: 1px solid rgba(0,0,0,.2);
	border-radius: 1.1rem;
	outline: 0;
	max-width: 500px;
}
.tx-tfm{
	text-transform:uppercase;
}
.mybtn{
	border-radius:50px;
}

.login-or {
	position: relative;
	color: #aaa;
	margin-top: 10px;
	margin-bottom: 10px;
	padding-top: 10px;
	padding-bottom: 10px;
}
.span-or {
	display: block;
	position: absolute;
	left: 50%;
	top: -2px;
	margin-left: -25px;
	background-color: #fff;
	width: 70px;
	text-align: center;
	font-size: 12px;
}
.hr-or {
	height: 1px;
	margin-top: 0px !important;
	margin-bottom: 0px !important;
}

form .error {
	color: #ff0000;
}

@media (max-width: 720px){
	.showimage {
		display: none;
	}

}

</style>
