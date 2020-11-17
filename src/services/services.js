export default {
  data(){
    return {
      api: 'http://194.210.120.204:20495/stage/v1/pipeline',
    }
  },
  methods: {
      createPipelineCall(data, callBackHandler) {
          console.log(data)
          axios({
              method: 'post',
              url: this.api,
              data: data
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
              url: this.api +'/'+data,
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
          url: this.api +'/'+data+'/run',
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
          url: this.api +'/'+data+'/status',
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
          url: this.api +'/'+id+'/compressed_files',
        }).then(response => {
          console.log(response)
            return callBackHandler(response);
        })
        .catch(error => {
            return callBackHandler(error.response);
        });

    },
    pullRequestCall(id,data, callBackHandler){
      axios({
          method: 'post',
          url: this.api +'/'+id+'/pull_request',
          data: data
        }).then(response => {
            return callBackHandler(response);
        })
        .catch(error => {
            return callBackHandler(error.response);
        });


    }
  }
}
