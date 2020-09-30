<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12" style="margin-top:40px;">
            <card>
              <template slot="header">
                <h4 class="card-title text-center">Select SQA Criteria</h4>
              </template>
                <select class="custom-select col-md-6" id="sqacriteria" v-model='criteria' style="margin-top:3rem;margin-bottom:3rem;margin-left:20px;">
                  <option value="default">Choose a criteria...</option>
                  <option value="qc_style">qc_style</option>
                  <option value="qc_coverage">qc_coverage</option>
                  <option value="qc_functional">qc_functional</option>
                  <option value="qc_security">qc_security</option>
                  <option value="qc_doc">qc_doc</option>
                </select>
              <template>
              </template>
            </card>

            <div class="row">
              <div class="col-md-6">
                <card >
                  <template slot="header">
                    <h4 class="card-title text-center">Tox Tool</h4>
                  </template>
                  <div class="row">
                    <base-input style="padding-left:40px;" type="text"
                            label="Tox file"
                            :disabled="false"
                            placeholder="/myrepo-testing/tox.ini"
                            v-model="tox.file">
                    </base-input>
                    <base-input style="padding-left:40px;" type="text"
                            label="text env"
                            :disabled="false"
                            placeholder="stylecheck"
                            v-model="tox.env">
                    </base-input>
                    <button type="button" class="btn-simple btn btn-xs btn-info" @click="addTox()" style="padding-left:40px;"><i class="fa fa-plus"></i>ADD TOX</button>

                  </div>

                  <template>
                  </template>
                </card>
              </div>
              <div class="col-md-6">
                <card>
                  <template slot="header">
                    <h4 class="card-title text-center">Add Comands</h4>
                  </template>
                  <div class="row">
                    <base-input style="padding-left:40px;" type="text"
                            label="Command"
                            :disabled="false"
                            placeholder="npm install"
                            v-model="command">
                    </base-input>
                    <button type="button" class="btn-simple btn btn-xs btn-info" @click="addCommand()" style="padding-left:40px;"><i class="fa fa-plus"></i>ADD COMMAND</button>

                  </div>
                  <div v-show="showCommands" style="padding-top:20px;">
                    <span class="custom-label">Volume</span>
                    <ul class="list-group">
                      <li class="list-group-item d-flex justify-content-between"
                        v-for="(command,key) in commands"
                        :key="key"
                      >
                      {{key}}<span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeCommand(vol,key)"><i class="fa fa-minus"></i></button></span>

                      </li>

                    </ul>
                  </div>
                  <template>
                  </template>
                </card>
              </div>
            </div>
            <card>
              <template slot="header">
                <!-- <h4 class="card-title text-center">ADD Criteria</h4> -->
              </template>
                <div class="text-right" style="padding-top:1rem;padding-bottom:10px;">
                  <button type="button" class="btn-fill btn btn-info" @click="addService()"><i class="fa fa-plus"></i>ADD CRITERIA</button>
                </div>
              <template>
              </template>
            </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  import jwtDecode from "jwt-decode"
  import YAML from 'json-to-pretty-yaml'
  export default {
    components: {
      Card
    },
    data () {
      return {
        criteria:'default',
        command:'',
        commands:[],
        tox:{
          file:'',
          env:''
        },
        showCommands:false,



      }
    },
    watch:{
        'criteria'(val){
          console.log(val)
        }

    },
    methods:{
      addComand(){

      }

    },
    created(){

      }
  }
</script>
<style scoped>
.custom-label{
  padding-top:5px;
  padding-left:20px;
  color: #9A9A9A;

}
input[type=number]::-webkit-inner-spin-button {
  opacity: 1;
}

</style>
