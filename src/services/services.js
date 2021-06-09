import jwtDecode from "jwt-decode"
export default {
  data(){
    return {

    }
  },
  methods: {
      checkauthCall(callBackHandler){
        var session = JSON.parse(localStorage.getItem("session"));
        var token = session.user.access_token;
        var decode = jwtDecode(token)
        var _this = this
        $.ajax({
          url: this.env.url_user_info,
          type: 'POST',
          contentType: 'application/json',
          headers: {
            'Authorization': 'Bearer ' + token
        },
          success: function (result) {
            callBackHandler(result)
          },
          error: function (error) {
            callBackHandler(error)
          }
        });
      },
      createPipelineCall(data, callBackHandler) {
          axios({
              method: 'post',
              url: this.env.api,
              data: data
          }).then(response => {
              return callBackHandler(response);
          })
          .catch(error => {
              return callBackHandler(error.response);
          });
      },
      updatePipelineCall(id, data,callBackHandler) {
          axios({
              method: 'put',
              url: this.env.api+'/'+id,
              data:data

          }).then(response => {
              return callBackHandler(response);
          })
          .catch(error => {
              return callBackHandler(error.response);
          });
      },
      deletePipelineCall(data, callBackHandler) {
          axios({
              method: 'delete',
              url: this.env.api +'/'+data,
          }).then(response => {
              return callBackHandler(response);
          })
          .catch(error => {
              return callBackHandler(error.response);
          });
      },
      runPipelineCall(data, callBackHandler){
        axios({
          method: 'post',
          url: this.env.api +'/'+data.id+'/run?issue_badge=true&repo_url='+data.url+'&repo_branch='+data.branch,
        }).then(response => {
            return callBackHandler(response);
        })
        .catch(error => {
            return callBackHandler(error.response);
        });

      },
      checkStatusCall(data, callBackHandler){
        axios({
          method: 'get',
          url: this.env.api +'/'+data+'/status',
        }).then(response => {
            return callBackHandler(response);
        })
        .catch(error => {
            return callBackHandler(error.response);
        });

      },
    downloadFileCall(id, callBackHandler){
      axios({
          method: 'get',
          url: this.env.api +'/'+id+'/compressed_files',
          contentType:'application/zip',
          responseType: 'blob'
        }).then(response => {
            return callBackHandler(response);
        })
        .catch(error => {
            return callBackHandler(error.response);
        });

    },
    pullRequestCall(id,data, callBackHandler){
      axios({
          method: 'post',
          url: this.env.api +'/'+id+'/pull_request',
          data: data
        }).then(response => {
            return callBackHandler(response);
        })
        .catch(error => {
            return callBackHandler(error.response);
        });


    },
    getConfigCall(id,callBackHandler){
         axios({
          method: 'get',
          url: this.env.api +'/'+id+'/config/jepl',
        }).then(response => {
            return callBackHandler(response);
        })
        .catch(error => {
            return callBackHandler(error.response);
        });

    },
    getBuilderScriptCall(id,callBackHandler){
         axios({
          method: 'get',
          url: this.env.api +'/'+id+'/config/scripts',
        }).then(response => {
            return callBackHandler(response);
        })
        .catch(error => {
            return callBackHandler(error.response);
        });

    },
    getComposerCall(id,callBackHandler){
         axios({
          method: 'get',
          url: this.env.api +'/'+id+'/composer/jepl',
        }).then(response => {
            return callBackHandler(response);
        })
        .catch(error => {
            return callBackHandler(error.response);
        });

    },
    getJenkCall(id,callBackHandler){
         axios({
          method: 'get',
          url: this.env.api +'/'+id+'/jenkinsfile/jepl',
        }).then(response => {
            return callBackHandler(response);
        })
        .catch(error => {
            return callBackHandler(error.response);
        });

    },
    getBadgeCallPOST(id,callBackHandler){
         axios({
          method: 'post',
          url: this.env.api +'/'+ id+ '/badge',
        }).then(response => {
            return callBackHandler(response);
        })
        .catch(error => {
            return callBackHandler(error.response);
        });

    },
    getBadgeCallGET(id,callBackHandler){
         axios({
          method: 'get',
          url: this.env.api +'/'+ id+ '/badge?share=html',
        }).then(response => {
            return callBackHandler(response);
        })
        .catch(error => {
            return callBackHandler(error.response);
        });

    },
  }
}
