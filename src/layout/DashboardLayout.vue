<template>
	<div class="wrapper">
		<side-bar v-show="$route.path != '/auth/select-option' && $route.path != '/auth/full-assessment' ">
			<mobile-menu slot="content"></mobile-menu>
			<sidebar-link to="/auth/dashboard">
				<i class="nc-icon nc-chart-pie-35"></i>
				<p>1. General Options</p>
			</sidebar-link>
			<sidebar-link to="/auth/sqa-criteria">
				<i class="nc-icon nc-tap-01"></i>
				<p>2. SQA Criteria</p>
			</sidebar-link>
			<sidebar-link to="/auth/files">
				<i class="nc-icon nc-notes"></i>
				<p>3. Actions</p>
			</sidebar-link>
		</side-bar>
    <div v-if="$route.path == '/auth/select-option' || $route.path == '/auth/full-assessment' ">
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
      }
    }
  }

</script>
