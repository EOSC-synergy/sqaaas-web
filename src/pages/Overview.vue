<template>
  <div class="content">
    <div class="container-fluid">
			<span>User: {{username}}</span>
      <div class="row">
        <div class="col-md-6" style="margin-top:40px;">
            <card>
              <template slot="header">
                <h4 class="card-title text-center">CONFIG YAML</h4>
              </template>

              <template>
                <div class="col-12">
                  <base-input type="text"
                            label="Repository Name"
                            :disabled="false"
                            placeholder="worsica-processing"
                            v-model="repo.name">
                  </base-input>
                  <div>
                    <div class="row">
                      <span class="custom-label">Customize workspace:</span>
                      <span class="custom-label">Yes</span><base-checkbox name="workpace" v-model="config.workspace.yes"></base-checkbox>
                      <span class="custom-label">No</span><base-checkbox name="workspace" v-model="config.workspace.no"></base-checkbox>
                    </div>
                    <div v-show='this.config.workspace.yes' style="padding-left:30px;">
                      <!-- <base-input type="text"
                            label="Node Agent"
                            :disabled="false"
                            placeholder="docker-compose"
                            v-model="config.repo.agent">
                      </base-input> -->
                      <base-input type="text"
                            label="Path Deploy Template"
                            :disabled="false"
                            placeholder=".sqa/docker-compose.yml"
                            v-model="repo.path">
                      </base-input>
                      <base-input type="text"
                            label="Repository URL"
                            :disabled="false"
                            placeholder="https://github.com/WORSICA/worsica-processing.git"
                            v-model="repo.url">
                      </base-input>
                      <div class="row">

                        <base-input class="col-md-4" type="text"
                            label="Branch"
                            :disabled="false"
                            placeholder="master"
                            v-model="repo.branch">
                        </base-input>
                        <base-input class="col-md-4" type="text"
                            label="Image"
                            :disabled="false"
                            placeholder="worsica/worsica-processing"
                            v-model="repo.image">
                        </base-input>
                        <base-input class="col-md-4" type="text"
                            label="Tag"
                            :disabled="false"
                            placeholder="latest"
                            v-model="repo.tag">
                        </base-input>
                      </div>
                      <div>
                        <button type="button" class="btn-simple btn btn-xs btn-info" @click="addRepo()"><i class="fa fa-plus"></i>ADD REPOSITORY</button>
                      </div>
                    </div>

                    <div v-show="showRepo" style="padding-top:20px;">
                      <span class="custom-label">Repositories</span>
                      <ul class="list-group">
                        <li class="list-group-item"
                          v-for="(repo,key) in config.repos"
                          :key="key"
                        >
                        {{repo.name}} <span><button type="button" class="btn-simple btn btn-xs btn-info" @click="removeRepo(key)"><i class="fa fa-minus"></i></button></span>

                        </li>

                      </ul>



                    </div>



                  </div>

                </div>
              </template>
            </card>
          </div>
          <div class="col-md-6" style="margin-top:40px;">
            <card>
              <template slot="header">
                <h4 class="card-title text-center">DOCKER COMPOSE YAML</h4>
              </template>

              <template>
                <div class="" style="justify-content: center;margin-top:60px;">
                  <div style="padding:20px 80px;display:grid;">
                    <img style="height:150px;" src="../../public/img/full-assessment.jpg" alt="">
                    <button class="btn btn-primary btn-simple" @click="gotoFull()">Full Assessment</button>
                  </div>
                  <div style="padding:20px 80px;display:grid;">
                    <img style="height:150px;" src="../../public/img/customized-assessment.png" alt="">
                    <button class="btn btn-primary btn-simple" @click="gotoCustomized()">Customized Assessment</button>
                  </div>
                </div>
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
  export default {
    components: {
      Card
    },
    data () {
      return {
        username:'',

        repo:{
            name:'',
            path:'',
            url:'',
            branch:'',
            image:'',
            tag:''
          },
        config:{
          repos:[],
          workspace:{
            yes:false,
            no:true
          },
        },
        showRepo:false,



      }
    },
    watch:{
      'config.workspace.yes'(val){
        console.log(val)
        if(val==true){
          this.config.workspace.no = false;
        }else{
          this.config.workspace.no = true;
        }
      },
      'config.workspace.no'(val){
        console.log(val)
         if(val==true){
          this.config.workspace.yes = false;
        }else{
          this.config.workspace.yes = true;
        }
      },

    },
    methods:{
      addRepo(){
        console.log(this.repo)
        this.config.repos.push(this.repo);
        this.showRepo = true;
        console.log(this.config.repos)
        // this.cleanWorkspace()

      },
      removeRepo(item){
        // this.$delete(this.config.repos,item)
        // if (this.isEmpty(this.repos)) {
        //   this.showRepo = false;
        // }
        this.cleanWorkspace()
      },
      cleanWorkspace(){
        this.repo.name = '';
        this.repo.path = '',
        this.repo.url = '';
        this.repo.branch = '';
        this.repo.image = '';
        this.repo.tag = '';
      },
      isEmpty(obj) {
			for(var key in obj) {
				if(obj.hasOwnProperty(key))
					return false;
			}
			return true;
		},

    },
    created(){
        var token = JSON.parse(localStorage.getItem("access_token"));
        console.log(token)
        var decode = jwtDecode(token.access_token)
        console.log(decode)
        var _this = this
        $.ajax({
			url: this.env.url_user_info,
			type: 'POST',
			contentType: 'application/json',
			headers: {
				'Authorization': 'Bearer ' + token.access_token
			},
			success: function (result) {
        // CallBack(result);

        _this.username = result
			},
			error: function (error) {

			}
        });
      }
  }
</script>
<style scoped>
.custom-label{
  padding-top:5px;
  padding-left:20px;
  color: #9A9A9A;

}

</style>
