<template>

  <div style="width: 75rem;" class="text-center">
    <div v-if="showBadge()">

      <h3 class="mb-5">Congratulations! The following badge has been awarded</h3>

      <div class="row">
        <div class="col">

          <!-- <img :src="badge.data.image" class="mb-1"/> -->
          <img :src="getImageBadge()" width="400px" class="mb-5"/>

          <div class="row" style="justify-content: center;">
            <a :href="getVerificationURL()" target="_blank" class="badge_button">Verify</a>
            <a :href="getOpenBadgeID()" target="_blank" class="badge_button">Go to Badgr's award page</a>
          </div>
        </div>

      </div>

    </div>

    <div v-else>

      <h3 class="mb-4"> Sorry, you have not earned any badge</h3>
      <img src="../../../static/badges/no_badge_blur.png" width="300px"/>

    </div>

    <h4><a href="https://docs.sqaaas.eosc-synergy.eu/quality_assessment_and_awarding/synergy_badging_approach" target="_blank">Learn more about the EOSC-Synergy badging approach</a></h4>

  </div>

</template>

<script>
export default {
  name: "BadgeAchieved",
  props: ['badge'],
  methods:{
    showBadge(){
      return this.badge.software && this.badge.software.verification_url || this.badge.services && this.badge.services.verification_url || this.badge.fair && this.badge.fair.verification_url
    },
    getAssessmentType(){
      if (this.badge.software) return "software"
      if (this.badge.services) return "services"
      if (this.badge.fair)     return "fair"
    },
    getBadgeLevel(){
      let assessmentType = this.getAssessmentType()

      if (this.badge[assessmentType].criteria.bronze.missing.length > 0) return "no_badge"
      if (this.badge[assessmentType].criteria.silver.missing.length > 0) return "bronze"
      if (this.badge[assessmentType].criteria.gold.missing.length > 0)   return "silver"
      return "gold"
    },
    getImageBadge(){
      return require('../../../static/badges/badge_'+this.getAssessmentType()+'_'+this.getBadgeLevel()+'.png')
    },
    getVerificationURL(){
      return this.badge[this.getAssessmentType()].verification_url
    },
    getOpenBadgeID(){
      return this.badge[this.getAssessmentType()].data.openBadgeId
    }
  }
}
</script>

<style scoped>

h3{
  color: #6c757d;
  font-weight: bold;
}

.badge_button{
  font-size:18px;
  border:1px solid;
  margin-right: 0.25rem;
  padding: 0 20px;
}

</style>
