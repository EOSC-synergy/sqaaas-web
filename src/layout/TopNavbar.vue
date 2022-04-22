<template>
  <nav class="bg-blue navbar navbar-expand-lg" style="padding-bottom:2px;padding-top:3px">
    <div class="container-fluid">
      <a class="navbar-brand res-size" style="color:white;" href="#">Software Quality Assurance as a Service</a>
      <button style="color:white;" type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>

      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <!-- <ul class="nav navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="dropdown">
              <i class="nc-icon nc-palette"></i>
            </a>
          </li>
          <base-dropdown tag="li">
            <template slot="title">
              <i class="nc-icon nc-planet"></i>
              <b class="caret"></b>
              <span class="notification">5</span>
            </template>
            <a class="dropdown-item" href="#">Notification 1</a>
            <a class="dropdown-item" href="#">Notification 2</a>
            <a class="dropdown-item" href="#">Notification 3</a>
            <a class="dropdown-item" href="#">Notification 4</a>
            <a class="dropdown-item" href="#">Another notification</a>
          </base-dropdown>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nc-icon nc-zoom-split"></i>
              <span class="d-lg-block">&nbsp;Search</span>
            </a>
          </li>
        </ul> -->
        <ul class="navbar-nav ml-auto">
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">
              Account
            </a>
          </li> -->
          <!-- <base-dropdown title="Dropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something</a>
            <div class="divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </base-dropdown> -->
          <li class="nav-item" >
            <a title="Help" target='_blank' href="https://docs.sqaaas.eosc-synergy.eu/" class="nav-link text-white"><i style='padding-right:5px' class="fa fa-question-circle" aria-hidden="true"></i></a>
            </li>
          <li class="nav-item">
            <button style="font-size:18px; color:white;" class="btn btn-primary btn-simple nav-link" @click="logOut()">Log Out<i style="padding-left:10px" class="nc-icon nc-button-power"></i></button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        activeNotifications: false
      }
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      logOut(){
		this.$router.replace(this.$route.query.redirect || "/logout");
      }
    }
  }

</script>
<style scoped>
.navbar{
	color:black;
}
.bg-blue {
    background-color: #73bbdc;
}

@media (max-width: 576px) {
  .res-size{
    font-size:15px!important;
  }

}
/* // Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {

}

/* // Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {


 }

/* // Large devices (desktops, 992px and up) */
@media (min-width: 992px) {

  }

/* // Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {  }

</style>
