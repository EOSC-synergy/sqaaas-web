<template>

  <div>

    <h3 id="badge_report_title">Badge Report</h3>

    <card id="badge_report">

      <div class="row">

        <div v-for="(badge, badgeType) in badgeCriteria" class="col-12 col-lg-4">

          <div class="badge_header" :class="badgeSatisfiedClass(badgeType)">
            <div class="row">
              <div class="col-10">
                <svg :fill="colorBadge(badgeType)" viewBox="0 0 24 24" height="40" width="40">
                  <path d="M12 22c3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.86 0-7 3.141-7 7s3.14 7 7 7zm0-12c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5 2.243-5 5-5zm-1-8H7v5.518a8.957 8.957 0 0 1 4-1.459V2zm6 0h-4v4.059a8.957 8.957 0 0 1 4 1.459V2z"></path><path d="m10.019 15.811-.468 2.726L12 17.25l2.449 1.287-.468-2.726 1.982-1.932-2.738-.398L12 11l-1.225 2.481-2.738.398z"></path>
                </svg>
                <span class="badge_header_title"> {{capitalize(badgeType)}} badge</span>
              </div>
              <div class="col-2">
                <div>
                  <i v-if="badgeSatisfied(badgeType)" class="fa fa-2x fa-check-circle"></i>
                  <i v-else class="fa fa-2x fa-times-circle"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="badge_criterias">
            <div class="badge_criteria" v-for="criteriaToken in incrementalCriterias(badgeType)">
              <div class="row">
                <div class="col-1">
                  <i v-if="criteriaSatisfied(criteriaToken, badgeType)" class="fa fa-check"></i>
                  <i v-else class="fa fa-times"></i>
                </div>
                <div class="col-10">
                  <i class="criteriaIcon fa" :class="criteriaIcon(criteriaToken)"></i> {{ criteriaName(criteriaToken) }}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </card>

  </div>

</template>

<script>
export default {
  name: "BadgeResults",
  props: ['badgeCriteria', 'mapping_icon', 'mapping_criteria_name'],
  methods: {
    capitalize(badgeType) {
      return badgeType.charAt(0).toUpperCase() + badgeType.slice(1)
    },
    colorBadge(badgeType) {
      if (badgeType === "bronze") return '#cd7f32'
      if (badgeType === "silver") return '#b7b7b7'
      if (badgeType === "gold")   return '#e5b80b'
      else return "black"
    },
    incrementalCriterias(badgeType) {
      if (badgeType === "bronze") return this.badgeCriteria.bronze.to_fulfill
      if (badgeType === "silver") return this.badgeCriteria.silver.to_fulfill.filter(crit => !this.badgeCriteria.bronze.to_fulfill.includes(crit))
      if (badgeType === "gold")   return this.badgeCriteria.gold.to_fulfill.filter(crit => !this.badgeCriteria.silver.to_fulfill.includes(crit))
      else return []
    },
    criteriaName(criteriaToken) {
      if (criteriaToken === "QC.FAIR") return "FAIRness level"
      else return this.mapping_criteria_name[criteriaToken] || criteriaToken
    },
    criteriaIcon(criteriaToken){
      return this.mapping_icon[criteriaToken] || this.mapping_icon['default']
    },
    criteriaSatisfied(criteriaToken, badgeType){
      return this.badgeCriteria[badgeType].fulfilled.includes(criteriaToken)
    },
    badgeSatisfied(badgeType){
      return this.badgeCriteria[badgeType].missing.length === 0
    },
    badgeSatisfiedClass(badgeType){
      return (this.badgeCriteria[badgeType].missing.length === 0)? "satisfied" : "not_satisfied"
    }
  }

}
</script>

<style scoped>

#badge_report_title{
  max-width: 1200px;
  margin: 0 auto 20px auto;
  font-weight: bold;
}

#badge_report{
  max-width: 1200px;
  margin: 0 auto 50px auto;
}

.badge_header{
  padding: 0.6rem 1rem;
  background-color:#E8E6E5;
  border-bottom:1px solid #dee2e6;
}
.badge_header .col-2{
  padding: 0;
}

.satisfied{
  background: rgba(149,212,147,0.4);
  border-bottom:1px solid rgba(149, 212, 147, 0.6);
}
.not_satisfied{
  background: rgba(212, 147, 147, 0.4);
  border-bottom:1px solid rgba(212, 147, 147, 0.6);
}

.badge_header_title{
  font-weight: 700;
  font-size: 23px;
  margin-left: 6px;
  display: inline-block;
  vertical-align: middle;
}

.badge_header i.fa{
  transform: translateY(3px);
}

.badge_criteria{
  padding: 0.5rem 1rem;
  font-size:18px;
}

.badge_criterias .badge_criteria:first-child{
  margin-top: 0.5rem;
}
.badge_criterias .badge_criteria:last-child{
  margin-bottom: 0.5rem;
}

.criteriaIcon {
  margin-right: 0.25rem;
  color: #4F4A48FF;
}

.fa-check,
.fa-check-circle{
  color: #1BC10B;
}
.fa-times,
.fa-times-circle{
  color: red;
}

</style>
