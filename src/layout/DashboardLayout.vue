<template>
	<div class="wrapper">
		<side-bar v-show="$route.path != '/auth/select-option' && $route.path != '/auth/full-assessment' ">

			<sidebar-link to="/auth/general-options">
				<i class="nc-icon nc-chart-pie-35"></i>
				<p>1. General Options</p>
			</sidebar-link>
      <sidebar-link to="/auth/composer-options">
				<i class="nc-icon nc-tag-content"></i>
				<p>2. Composer Options</p>
			</sidebar-link>
			<sidebar-link to="/auth/sqa-criteria">
				<i class="nc-icon nc-tap-01"></i>
				<p>3. SQA Criteria</p>
			</sidebar-link>
			<sidebar-link to="/auth/files">
				<i class="nc-icon nc-notes"></i>
				<p>4. Actions</p>
			</sidebar-link>
			<sidebar-link to="/auth/pipeline-execution">
				<i class="nc-icon nc-preferences-circle-rotate"></i>
				<p>5. Pipeline Execution</p>
			</sidebar-link>
      <hr style="background-color:rgba(255,255,255,0.6);">
      <sidebar-link to="/auth/select-option">
				<i class="nc-icon nc-stre-left"></i>
				<p>Back</p>
			</sidebar-link>
      <mobile-menu></mobile-menu>
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
