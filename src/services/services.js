export default {
  methods: {
      createPipelineCall(data, callBackHandler) {
          console.log(data)
          axios({
              method: 'post',
              url: 'http://194.210.120.204:20495/stage/v1/pipeline',
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
              url: 'http://194.210.120.204:20495/stage/v1/pipeline'+data+'/delete',
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
          url: 'http://194.210.120.204:20495/stage/v1/pipeline/'+data+'/run',
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
          url: 'http://194.210.120.204:20495/stage/v1/pipeline/'+data+'/status',
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
          url: 'http://194.210.120.204:20495/stage/v1/pipeline/'+id+'/compressed_files',
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
          url: 'http://194.210.120.204:20495/stage/v1/pipeline/'+id+'/pull_request',
          data: data.repo
        }).then(response => {
            return callBackHandler(response);
        })
        .catch(error => {
            return callBackHandler(error.response);
        });


    }
  }
}
