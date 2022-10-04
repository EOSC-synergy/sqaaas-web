<template>

  <div style="width: 75rem;" class="text-center">
    <div v-if="showBadge()">

      <h3 v-if="showBadge() === 1" class="mb-0">Congratulations! The following badge has been awarded</h3>
      <h3 v-else class="mb-0">Congratulations! The following badges have been awarded</h3>

      <div class="row">
        <div class="col" v-for="badge in activeBadgeTypes()">
          <img :src="badge.data.image" class="mb-1"/>
          <div class="row" style="justify-content: center;">
            <a :href="badge.verification_url" target="_blank" class="badge_button">Verify</a>
            <a :href="badge.data.openBadgeId" target="_blank" class="badge_button">Go to Badgr's award page</a>
          </div>
        </div>
      </div>

    </div>

    <div v-else>

      <h3 class="mb-5"> Sorry, you have not earned any badges</h3>
      <img src="../../../static/no_badge.png" id="no_badge_img" class="mb-3"/>

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
      return [this.badge.software.data, this.badge.services.data, this.badge.fair.data].filter(Boolean).length;
    },
    activeBadgeTypes(){
      let activeBadgeTypes = []
      for (let badgeType in this.badge){
        if (this.badge[badgeType].data) activeBadgeTypes.push(this.badge[badgeType])
      }
      return activeBadgeTypes
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

#no_badge_img{
  width: 300px;
  animation: blur 5s forwards;
}
@keyframes blur {
  from {filter: blur(0);}
  to   {filter: blur(8px);}
}

</style>
