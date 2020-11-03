export default {
  methods: {
      createPipelineCall(data, callBackHandler) {
          axios({
              method: 'post',
              url: 'http://194.210.120.204:20495/dev/pipeline',
              data: data
          }).then(response => {
              return callBackHandler(response);
          })
          .catch(error => {
              return callBackHandler(error);
          });
      },
      runPipelineCall(data, callBackHandler){
        axios({
          method: 'post',
          url: 'http://194.210.120.204:20495/dev/pipeline/'+data+'/run',
        }).then(response => {
            return callBackHandler(response);
        })
        .catch(error => {
            return callBackHandler(error);
        });

      },
      checkSatusCall(data, callBackHandler){
        axios({
          method: 'post',
          url: 'http://194.210.120.204:20495/dev/pipeline/'+data+'/status',
        }).then(response => {
            return callBackHandler(response);
        })
        .catch(error => {
            return callBackHandler(error);
        });

      }
  }
}
