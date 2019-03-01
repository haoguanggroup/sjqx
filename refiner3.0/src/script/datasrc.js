var vm = new Vue({
    el:"#app",
    data:{
    	url:"",
    	sjys:[],
    	sjyxx: {},
    	sjylx:[],
    	isShowSave:false,
		isShowDelete:false,
    },
    methods: {
      queryDataSrc(){
    	  var vm=this;
    	//查询数据源
          axios.get(this.url + '/ds/query/dataSrc').then(res => {
              vm.sjys = res.data.resBody;
          }).catch((error) => {
        	  this.$message.error(error);
          });
      },
      queryDataSrcParam(_obj){
    	  var vm=this;
      	//查询数据源参数
	        axios.get(this.url + '/ds/query/dataSrcParam',{params:_obj}).then(res => {
	            vm.sjyxx = res.data.resBody;
	        }).catch((error) => {
	      	  this.$message.error(error);
	        });
       },
      initDataSrc(){
     	  var vm=this;    
    	  vm.sjyxx={sjylx:'', sjydm:'', sjymc:'',sjycsz:[]};
    	  vm.isShowSave=true;
    	  vm.isShowDelete=false;
      },
      changeSjylx(_target){
		  this.queryDataSrcParam({sjylx:_target});
      },
      exec(_operation){
     	  var vm=this;
    	  if(_operation=='save'){
    		  if(vm.sjyxx.sjymc==""){
    			  vm.$message({
                      message:"请输入数据源名称！",
                      type: 'error'
                  });
    			  return;
			  }
    		  axios.post(this.url + '/ds/updateDataSource',vm.sjyxx).then(res => {
    			  vm.$message({
                      message:res.data.head.message,
                      type: 'success'
                  });
    			  vm.initDataSrc();
    			  vm.queryDataSrc();
    			  
          }).catch((error) => {
        	  vm.$message({message:error.message,type: 'error'});
          });
    		 
    	  }else if(_operation=='delete'){
    		  this.$confirm('确定删除该数据源，是否继续?', '提示', {
    				confirmButtonText: '确定',
    				cancelButtonText: '取消',
    				type: 'warning'
    			}).then(() => {
    				  axios.post(this.url + '/ds/delete',vm.sjyxx).then(res => {
    	    			  vm.$message({
    	                      message:res.data.head.message,
    	                      type: 'success'
    	            });
    	    			  vm.initDataSrc();
    	    			  vm.queryDataSrc();
              }).catch((error) => {
            	  vm.$message({message:error.message,type: 'error'});
              });
    			}).catch(() => {
    				vm.$message({
	    				type: 'info',
	    				message: '已取消删除'
    				});          
    			});
    	  }else if(_operation=='testConn'){
			 var mtype='error';

			 //校验值不能为空
			 if(vm.sjyxx.sjymc == "" || vm.sjyxx.sjymc == null ){
				vm.$message({
					message:"请输入数据源名称！",
					type: 'warning'
				});
				return;
			 }
			 for(var i = 0;i < vm.sjyxx.sjycsz.length;i++){
				if(vm.sjyxx.sjycsz[i].csz == "" || vm.sjyxx.sjycsz[i].csz == null){
					vm.$message({
						message:"请输入"+vm.sjyxx.sjycsz[i].csmc+"!",
						type: 'warning'
					});
					return;
				}
			 }

			 axios.post(this.url + '/ds/testConn',vm.sjyxx).then(res => {
				  
				  if(res.data.head.result=='1'){
					  mtype='success';
				  }
    			  vm.$message({
                      message:res.data.head.message,
                      type:mtype
                  });
              }).catch((error) => {
            	  vm.$message({
                      message:error.message,
                      type:mtype
                  });
              });
    	  }
      },
      handleOpen(key, keyPath) {
    	  this.queryDataSrcParam({sjydm:key});
    	  this.isShowDelete=true;
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted() { 
  	    var vm=this;
  	    vm.url = init.getUrl();
    	axios.get(this.url + '/getDict/sjylx').then(res => {
				vm.sjylx = res.data.resBody;
			}).catch((error) => {
				vm.$message.error(error);
		});
    	vm.initDataSrc();
    	vm.queryDataSrc();
    }
})