<template>

  <div class="criteria_summary">
    <div class="row gx-4 gx-md-5" v-for="(criteria, criteriaToken) in validCriterias()">

      <div class="col-12">
        <div class="criteria">
          <div class="criteriaTitle" @click="scrollToCriteria(criteriaToken)">
            <i class="criteriaIcon fa" :class="criteriaIcon(criteriaToken)"></i>
            <span class="criteriaName"> {{ criteriaName(criteriaToken) }} </span>
          </div>
          <div class="criteriaPercentage" :style="stylePercentage(criteria)">
            {{ criteriaPercentage(criteria) }}
          </div>
          <div class="criteriaProgress">
            <div class="criteriaProgressBar" :style="styleBar(criteria)" />
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>

export default {
  name: "CriteriaSummary",
  props: ['report','mapping_icon', 'mapping_criteria_name'],
  methods:{
    validCriterias(){
      let reportArray = Object.entries(this.report);
      let reportArrayFiltered = reportArray.filter(criteria => 'coverage' in criteria[1])
      return Object.fromEntries(reportArrayFiltered)
    },
    criteriaName(token) {
      if (token === "QC.FAIR") return "FAIRness level"
      else return this.mapping_criteria_name[token] || token
    },
    criteriaIcon(token){
      return this.mapping_icon[token] || this.mapping_icon['default']
    },
    criteriaPercentage(criteria){
      return criteria.coverage.percentage
    },
    scrollToCriteria(criteriaToken){
      document.getElementById(criteriaToken).scrollIntoView({behavior: 'smooth'});
    },
    styleBar(criteria){
      if(criteria.coverage.percentage === "") return "";
      let widthBar = Math.max(1,criteria.coverage.percentage)+"%"
      let colorBar = ["#f94144","#f8961e","#f9c74f","#90be6d","#688cc2"][Math.floor(criteria.coverage.percentage/25)]
      return "width: "+widthBar+"; background-color: "+colorBar+";"
    },
    stylePercentage(criteria){
      if(criteria.coverage.percentage === "") return "background-color: #E5E5E5";
      let backgroundPercentage = ["#f94144","#f8961e","#f9c74f","#90be6d","#688cc2"][Math.floor(criteria.coverage.percentage/25)]
      return "background-color: "+backgroundPercentage+"BB;"
    }
  }
}
</script>

<style scoped>

.criteria_summary{
  width: max(440px, 45%);
}
.criteria {
  display: flex;
  flex-direction: row;
  position: relative;
  border: 1px solid #dee2e6;
  overflow: hidden;
  margin-top: 1px;
  margin-bottom: 1px;
}

.criteriaTitle {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 17px;
  flex-wrap: nowrap;
  padding: 0 0.8rem;
  max-width: 240px;
  min-width: 160px;
  width: 45%;
  background-color: #f1efee;
  cursor: pointer;
}
.criteriaTitle:hover{
  background-color: #1F77D022;
}

.criteriaIcon {
  margin-right: 0.75rem;
  display: inline-block;
  position: relative;
  color: #4F4A48FF;
}

.criteriaPercentage {
  background-color: #00000019;
  min-width: 35px;
  font-size: 1.1rem;
  height: 2.8rem;
  line-height: 2.8rem;
  width: 50px;
  text-align: center;
  font-weight: bold;
}

.criteriaProgress {
  flex-grow: 1;
  position: relative;
  margin-top: 20px;
  margin-left: 1rem;
  margin-right: 1rem;
  background-color: #00000019;
  height: 6px;
}

.criteriaProgressBar{
  position: absolute;
  top: 0;
  bottom: 0;
}

</style>
