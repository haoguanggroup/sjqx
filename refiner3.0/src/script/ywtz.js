var vm = new Vue({
    el: '#app',
    data: {
        url:'',
        viewCtr:{},
        ywxx:{},
        hjxx:{},
        ywhj:{},
        ywsx:{},
        ywclwj:{},
        zxcl:{},
        allYwdx:[],
        tmpValues:{hjs:0,sysSjlx:[],sysFxdj:[],sysSjy:[],qdwjmc:'',sysSjcl:[],sysYws:[],sfljzx:null,clwjzxlx:null,},
        ywhjs:[],
        ywsxs:[],
        ywclwjs:[],
        zxcls:[],
        obj:'',
        defaultProps: {children: 'children',label: 'label',id:'id'}

    },
    mounted() {
        var vm=this;
        vm.url = init.getUrl();
        vm.initPage();
        vm.initTree();
        axios.get(vm.url + '/getDict/sjlx').then(res => {
              vm.tmpValues.sysSjlx= res.data.resBody;
          }).catch((error) => {
              vm.$message({message:error.message,type: 'error'});
          });
          axios.get(vm.url + '/getDict/fxdj').then(res => {
              vm.tmpValues.sysFxdj= res.data.resBody;
          }).catch((error) => {
              vm.$message({message:error.message,type: 'error'});
          });
          axios.get(vm.url + '/common/getObj/dscl').then(res => {
              vm.tmpValues.sysSjcl= res.data.resBody;
          }).catch((error) => {
              vm.$message({message:error.message,type: 'error'});
          });
           axios.get(this.url + '/ds/query/dataSrc').then(res => {
              vm.tmpValues.sysSjy = res.data.resBody;
          }).catch((error) => {
              vm.$message({message:error.message,type: 'error'});
          });

    },
    methods: {
        initPage(){
            var vm=this;
            vm.viewCtr={showSjcl:false,showCjxx:false,showSyhjs:false,xzhj_dis:true,newYwsx_dis:false
            ,showYwhjForm:false,ywhjPaneName:'',ywsxPaneName:'',clwjPaneName:''};
            // operateType C:创建 R查询、U 更新、D 删除
            vm.ywxx={qdwjmc:'',lsh:null, sjydm:null, jllx:'1', bm:null, mc:null,sfljzx:null,clwjzxlx:null, sjbm:null, operateType:null};
            vm.hjxx={qdwjmc:'',lsh:null, ywbm:null, bm:null, sjbm:null, mc:null,sfljzx:null,clwjzxlx:null, sfby:null, hjxh:null, qzhjbh:null, operateType:null};
            vm.ywhj={lsh:null, ywbm:null, bm:null, sjbm:null, mc:null,sfljzx:null,clwjzxlx:null, sfby:null, hjxh:null, qzhjbh:null, operateType:null};
            vm.ywsx={lsh:null, sslx:null, ssbm:null, sxbm:null, sxmc:null, sxsjlx:null, sxz:null, fxdj:null, operateType:null};
            vm.ywclwj={lsh:null, clwjbm:null, clwjlx:null, sslxbm:null, sfqdwj:null, bqwj:null, htbqwjm:null, operateType:null};
            vm.zxcl={lsh:null, clwjlx:null,sslxbm:null, clbh:null, operateType:null};
            vm.ywhjs=[];
            vm.ywsxs=[];
            vm.ywclwjs=[];
            vm.zxcls=[];
            vm.tmpValues.hjs=0;
            vm.tmpValues.qdwjmc='';
            vm.tmpValues.sfljzx='0';
            vm.tmpValues.clwjzxlx='2';
            vm.obj='';
        },
        showMessage(_obj){
            //alert(_obj.message);
             vm.$message({message:_obj.message,type: _obj.type});
        },
        initYwxx(){
            var vm=this;
            vm.viewCtr.ywhjPaneName='业务流程';
            vm.viewCtr.ywsxPaneName='业务特征';
            vm.viewCtr.clwjPaneName='业务处理文件';
            vm.obj='ywxx';
        },
        initHjxx(){
            var vm=this;
            vm.viewCtr.ywhjPaneName='环节子流程';
            vm.viewCtr.ywsxPaneName='环节特征';
            vm.viewCtr.clwjPaneName='环节处理文件';
            vm.obj='hjxx';
        },
        isEmpty(data){
            if(!data ||data==null||data==undefined||data=='undefined'||data==''||data.length==0||data=='{}'){
              return true;
            }
            return false;
        },
        
        initTree(){
            var vm=this;
            axios.get(vm.url + "/ywtz/query/allYwtz").then(r1 => {
                vm.allYwdx= r1.data.resBody;
            }).catch((error) => {
                vm.$message({message:error.message,type: 'error'});
            });
             axios.get(vm.url + '/common/getObj/ywxx').then(res => {
              vm.tmpValues.sysYws= res.data.resBody;
              }).catch((error) => {
                  vm.$message({message:error.message,type: 'error'});
              });
        },
        checkSaveVal(_p,_type){
            var vm=this;
            if('notNull'==_type){
                for(var item of _p){
                    if(vm.isEmpty(item.val)){
                        vm.showMessage({type: 'info',message: item.message+' 为必填项！'});
                        return false;
                    }
                }
            }else if('checkYwhj'==_type){
                var notNullVals=null;
                var qz="";
                for(var i=0;i<_p.length;i++){
                    qz='第'+(i+1)+'个';
                    notNullVals=[{message:qz+'环节名称',val:_p[i].mc},{message:qz+'环节序号',val:_p[i].hjxh},{message:qz+'环节必要性',val:_p[i].hjxh}];
                    if(!vm.checkSaveVal(notNullVals,'notNull')){
                        return false;
                    }
                }
            }else if('checkYwsx'==_type){
                var notNullVals=null;
                var qz="";
                for(var i=0;i<_p.length;i++){
                    qz='第'+(i+1)+'个';
                    notNullVals=[{message:qz+'特征数据类型',val:_p[i].sxsjlx},{message:qz+'特征名称',val:_p[i].sxmc},{message:qz+'特征值',val:_p[i].sxz},{message:qz+'风险等级',val:_p[i].fxdj}];
                    if(!vm.checkSaveVal(notNullVals,'notNull')){
                        return false;
                    }
                }
            }else if('checkYwclwj'==_type){
                if(!vm.isEmpty(_p)){
                    if(vm.isEmpty(vm.tmpValues.qdwjmc)){
                        vm.showMessage({type: 'error',message: '请选择一个启动文件为必填项！'});                        
                        return false;
                    }
                    if(vm.isEmpty(vm.tmpValues.clwjzxlx)){
                        vm.showMessage({message:'请选择执行类型！',type: 'info'});
                        return false;
                    }
                }
            }
            return true;
        },
        clearUpdateObjs(_objs){
            var objs=[];
            for(var obj of _objs){
                if("C"==obj.operateType||"U"==obj.operateType){
                    objs.push(obj);
                }
            }
            return objs;
        },
        exec(_operation,_param){
            var vm=this;
            if('delete'==_operation){
                var t_obj=vm.obj;
                var t_name='业务';
                _param=vm.ywxx;
                if(vm.obj=='hjxx'){
                    t_obj='ywhj';
                    t_name='环节';
                    _param=vm.hjxx;
                }
                 vm.$confirm('确定删除 '+t_name+'('+_param.mc+')?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning' 
                }).then(() => {
                    axios.post(vm.url + "/common/delObj/" + t_obj, {bm:_param.bm}).then(res => {
                        if (res.data.head.result == 1) {
                            vm.$message({ message:res.data.head.message,type: 'success'});
                            vm.initTree();
                            vm.initPage();
                            if(vm.obj=="ywxx"){
                                vm.initYwxx();
                            }else{
                                vm.initHjxx();
                            }
                        } else {
                            vm.$message({type: 'error',message: res.data.head.message});
                        }
                    }).catch(err => {
                        vm.$message({type: 'error',message: err});
                    });
                }).catch(err=>{
                    vm.$message({type: 'info',message: '取消操作'});
                });  
            }else if('uploadFile'==_operation){
                document.getElementById("sslxbm").value = _param;
                document.getElementById("lx").value = (vm.obj=='hjxx'?'ywhj':vm.obj);
                var pform = document.getElementById("pform");
                let formdata = new FormData(pform);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                axios.post(vm.url + '/ywtz/file/uploading', formdata, config).then((res) => {
                    vm.$message({ message:'已成功上传文件！',type: 'success'});
                }).catch((error) => {
                    vm.$message({ message:error,type: 'error'});
                });
                            
            }else if('save'==_operation){
                axios.post(vm.url + "/ywtz/save/" + vm.obj, _param).then(res => {
                    if (res.data.head.result == 1) {
                        vm.$message({ message:'数据已保存成功！',type: 'success'});
                        if((vm.obj=="ywxx"||vm.obj=="hjxx") && (!vm.isEmpty(_param.ywclwj)) ){
                           vm.exec('uploadFile',res.data.resBody.bm);
                        }               
                        vm.initTree();
                        var tmp_type=vm.obj;
                        vm.initPage();
                        if(tmp_type=="ywxx"){
                            vm.initYwxx();
                        }else{
                            vm.initHjxx();
                        }
                    } else {
                        vm.$message({type: 'error',message: '保存失败'});
                    }
                }).catch(err => {
                    vm.$message({type: 'error',message: err});
                });
            }else if('saveCheck'==_operation){
                var param={};
                var notNullVals=null;
                if(vm.obj=="ywxx"){
                    param.ywxx=vm.ywxx;
                    param.ywxx.qdwjmc=vm.tmpValues.qdwjmc;
                    notNullVals=[{message:'业务名称',val:vm.ywxx.mc}];
                }else{
                    param.hjxx=vm.hjxx;
                    param.hjxx.qdwjmc=vm.tmpValues.qdwjmc;
                    notNullVals=[{message:'环节名称',val:vm.hjxx.mc},{message:'环节序号',val:vm.hjxx.hjxh},{message:'环节必要性',val:vm.hjxx.hjxh}];
                }
                if(!vm.checkSaveVal(notNullVals,'notNull')){
                    return false;
                } 
                
                var txxx='';
                param.ywhj=vm.clearUpdateObjs(vm.ywhjs);
                if(vm.isEmpty(param.ywhj)){
                    txxx=txxx+vm.viewCtr.ywhjPaneName+' ';
                }else{
                    if(!vm.checkSaveVal(param.ywhj,'checkYwhj')){
                        return false;
                    }
                }
                param.ywsx=vm.clearUpdateObjs(vm.ywsxs);
                if(vm.isEmpty(param.ywsx)){
                    txxx=txxx+vm.viewCtr.ywsxPaneName+' ';
                }else{
                    if(!vm.checkSaveVal(param.ywsx,'checkYwsx')){
                        return false;
                    }
                }
                param.ywclwj=vm.clearUpdateObjs(vm.ywclwjs);
                if(vm.isEmpty(param.ywclwj)){
                    txxx=txxx+vm.viewCtr.clwjPaneName+' ';
                }else{
                    if(!vm.checkSaveVal(param.ywclwj,'checkYwclwj')){
                        return false;
                    }
                    param[vm.obj].clwjzxlx= vm.tmpValues.clwjzxlx;
                    param[vm.obj].sfljzx= vm.tmpValues.sfljzx;
                    
                    if(vm.tmpValues.clwjzxlx=='1'){
                        param.zxcl=vm.zxcls;
                         if(vm.isEmpty(param.zxcl)){
                            vm.showMessage({message:'请至少选择一个执行策略！',type: 'info'});
                            return false;
                         }
                    }
                }
                if(!vm.isEmpty(txxx)){
                    vm.$confirm(txxx+' 没有信息变动，是否继续保存?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning' 
                    }).then(() => {
                        vm.exec('save',param);
                    }).catch(err=>{
                        vm.$message({type: 'info',message: '取消操作'});
                    });  
                }else{
                    vm.exec('save',param);
                }
            }else if ('downLoadFile'==_operation) {
                window.open(this.url + "/ywtz/download?wjmc="+_param.bqwj+"&filePaht="+_param.htbqwjm);
            }else if ('deleteFile'==_operation) { 
                if(_param.bqwj==vm.tmpValues.qdwjmc){
                    vm.$message({type: 'info',message: '暂时不允许删除启动文件！'});
                    return;
                }
                vm.$confirm('确定删除该文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning' 
                }).then(() => {                    
                    if(!vm.isEmpty(_param.clwjbm)){

                        axios.post(vm.url + '/common/delObj/ywclwj',{clwjbm:_param.clwjbm}).then(res => {
                          var _type='error';
                          if(res.data.head.result=='1'){
                            _type='success';
                            vm.execCommonCode(_operation,_param);
                          }
                          vm.$message({ message:res.data.head.message,type: _type});
                        }).catch((error) => {
                          vm.$message({message:error.message,type: 'error'});
                        });
                  }else{
                      vm.execCommonCode(_operation,_param);
                  }
                }).catch(err=>{
                    vm.$message({type: 'info',message: '取消删除'});
                });
            }else if ('changeUploadFile'==_operation) {
                var files = document.getElementById("inputFile").files;           
                if (files && files.length) {
                    for (const item of files) {
                        var sfcf=false;
                        if(vm.ywclwjs&&vm.ywclwjs.length>0){
                            for(var clwj of vm.ywclwjs){
                                if(item['name'] == clwj.bqwj){
                                   sfcf=true;
                                   vm.$message({message:'文件 ('+item['name']+')已存在，已忽略该文件！',type: 'error'});
                                   break;
                                }
                            }
                        }
                        if(!sfcf)
                            vm.ywclwjs.push({sfqdwj:'0',bqwj:item['name'],operateType:'C'});
                    }
                }
            }else if('newYwsx'==_operation){
                vm.ywsxs.push({lsh:null, sslx:null, ssbm:null, sxbm:null, sxmc:null, sxsjlx:null, sxz:null, fxdj:'',operateType:'C'});
            }else if('deleteYwsx'==_operation){
                if(vm.isEmpty(_param.sxmc)&&vm.isEmpty(_param.sxbm)){
                    vm.ywsxs.splice(vm.ywsxs.indexOf(_param), 1);
                    return;
                }
                vm.$confirm('确定删除该特征?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning' 
                }).then(() => {
                    if(!vm.isEmpty(_param.sxbm)){
                        axios.post(vm.url + '/common/delObj/ywsx',{sxbm:_param.sxbm}).then(res => {
                          var _type="error";
                          if(res.data.head.result=='1'){
                            _type='success';
                            vm.ywsxs.splice(vm.ywsxs.indexOf(_param), 1);
                          }
                          vm.$message({ message:res.data.head.message,type: _type});
                        }).catch((error) => {
                          vm.$message({message:error.message,type: 'error'});
                        });
                  }else
                    vm.ywsxs.splice(vm.ywsxs.indexOf(_param), 1);   
                });             
            }else if('newYwxx'==_operation){
                
                vm.initYwxx();
                vm.ywxx.operateType='C';
                vm.ywxx.sjydm=_param;
                vm.viewCtr.showSyhjs=true;
            }else if('newYwhj'==_operation){
                var zdhjxh=1;
                if(vm.ywhjs && vm.ywhjs.length>0){
                    var hjxhsz=_.sortedUniq( _.map(vm.ywhjs, 'hjxh'));                   
                    zdhjxh=hjxhsz[hjxhsz.length-1]+1;
                    if(vm.ywhjs.length>zdhjxh){
                        zdhjxh=vm.ywhjs.length;
                    }
                }
                var t_ywhj= { mc:'环节'+zdhjxh, sfby:'1', hjxh:zdhjxh, operateType:'C'};
                vm.ywhjs.push(t_ywhj);
                vm.exec('showYwhj',t_ywhj);
            }else if('showYwhj'==_operation){
                vm.ywhj={};
                vm.viewCtr.showYwhjForm=true;
                vm.ywhj=_param;
            }else if('deleteYwhj'==_operation){
                vm.$confirm('确定删除该环节?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning' 
                }).then(() => {
                    if(!vm.isEmpty(_param.bm)){
                        axios.post(vm.url + '/common/delObj/ywhj',{bm:_param.bm}).then(res => {
                          var _type="error";
                          if(res.data.head.result=='1'){
                            _type='success';
                            vm.execCommonCode(_operation,_param);
                          }
                          vm.$message({ message:res.data.head.message,type: _type});
                        }).catch((error) => {
                          vm.$message({message:error.message,type: 'error'});
                        });
                  }else
                    vm.execCommonCode(_operation,_param);
              }).catch(() => {
                vm.$message({type: 'info',message: '取消删除'});          
              });
            }else if('changeYwhj'==_operation){
                if(vm.isEmpty(_param.operateType)){
                    _param.operateType='U';
                }
                vm.ywhjs=_.sortBy(vm.ywhjs,["hjxh"]); 
            }else if('changeObj'==_operation){
                if(vm.isEmpty(_param.operateType)){
                    _param.operateType='U';
                }
            }
        },
        execCommonCode(_operation,_param){
            var vm=this;
            if('deleteYwhj'==_operation){
                if(_param.mc==vm.ywhj.mc){
                    vm.ywhj={};
                    vm.viewCtr.showYwhjForm=false;
                }
                vm.ywhjs.splice(vm.ywhjs.indexOf(_param), 1);
            }else if ('deleteFile'==_operation) { 
                if(_param.bqwj==vm.tmpValues.qdwjmc){
                    vm.tmpValues.qdwjmc="";
                    vm.tmpValues.clwjzxlx="2";
                    vm.tmpValues.sfljzx="0";
                    vm.zxcls=[];
                }
                vm.ywclwjs.splice(vm.ywclwjs.indexOf(_param), 1);
            }else if('hqywxx'==_operation){
              axios.get(vm.url + '/common/getObj/ywxx',{params:_param}).then(res => {
                  vm.ywxx= res.data.resBody[0];
                  vm.tmpValues.clwjzxlx=vm.ywxx.clwjzxlx;
                  vm.tmpValues.sfljzx=vm.ywxx.sfljzx;
              }).catch((error) => {
                  vm.$message({message:error.message,type: 'error'});
              });
            }else if('hqywhj'==_operation){
              axios.get(vm.url + '/common/getObj/ywhj',{params:_param}).then(res => {
                  vm.ywhjs= res.data.resBody;
                  if(!vm.isEmpty(vm.ywhjs))
                  vm.ywhjs=_.sortBy(vm.ywhjs,["hjxh"]); 
              }).catch((error) => {
                  vm.$message({message:error.message,type: 'error'});
              });
            }else if('hqywsx'==_operation){
              axios.get(vm.url + '/common/getObj/ywsx',{params:_param}).then(res => {
                  vm.ywsxs= res.data.resBody;
              }).catch((error) => {
                  vm.$message({message:error.message,type: 'error'});
              });
            }else if('hqywclwj'==_operation){
              axios.get(vm.url + '/common/getObj/ywclwj',{params:_param}).then(res => {
                  vm.ywclwjs= res.data.resBody;
                  if(vm.ywclwjs&&vm.ywclwjs.length>0){
                       
                        var obj=(_.find( vm.ywclwjs, { 'sfqdwj': '1'}));
                        if(obj)vm.tmpValues.qdwjmc=obj.bqwj;
                  }
              }).catch((error) => {
                  vm.$message({message:error.message,type: 'error'});
              });
            }else if('hqzxcl'==_operation){
                axios.get(vm.url + '/common/getObj/zxcl',{params:_param}).then(res => {
                  vm.zxcls= res.data.resBody;
                  if(!vm.isEmpty(vm.zxcls))
                    vm.zxcls=_.map(vm.zxcls,'clbh');
              }).catch((error) => {
                  vm.$message({message:error.message,type: 'error'});
              });
            }else if('hqhjxx'==_operation){
              axios.get(vm.url + '/common/getObj/ywhj',{params:_param}).then(res => {
            
                 if(res.data.resBody)
                    vm.hjxx= res.data.resBody[0];
              }).catch((error) => {
                  vm.$message({message:error.message,type: 'error'});
              });
            }
        },
        //事件区
        handleNodeClick(data){
            var vm=this;
            vm.initPage();
            if('sjy'==data.type){
                vm.exec('newYwxx',data.id);
            }else if('ywxx'==data.type){
              vm.initYwxx();  
              vm.execCommonCode('hqywxx',{bm:data.id});
              vm.execCommonCode('hqywhj',{ywbm:data.id});
              vm.execCommonCode('hqywsx',{ssbm:data.id});
              vm.execCommonCode('hqywclwj',{sslxbm:data.id});
              vm.execCommonCode('hqzxcl',{sslxbm:data.id});

            }else if('ywhj'==data.type||'zlc'==data.type){
              vm.initHjxx(); 
              vm.execCommonCode('hqhjxx',{bm:data.id});
              vm.execCommonCode('hqywhj',{sjbm:data.id});
              vm.execCommonCode('hqywsx',{ssbm:data.id});
              vm.execCommonCode('hqywclwj',{sslxbm:data.id});
              vm.execCommonCode('hqzxcl',{sslxbm:data.id});
            }
        },
        changeHjs(_v){
            var vm=this;
            if(!isNaN(_v)&&_v>0){
                if(vm.ywhjs.length>0){
                    this.$message.info('已重置所有环节');
                    vm.ywhjs=[];
                }
                for(var i=1;i<=_v;i++){
                 vm.ywhjs.push({ mc:'环节'+i, sfby:'1', hjxh:i, operateType:'C'});
                }
            }
        },
        handleOpen(key, keyPath) {
            var vm=this;
            var _obj={};
            vm.initPage();

            _obj.sjydm=keyPath[0];
            if(keyPath.length>1){
               _obj.ywbm=keyPath[1];            
            }else{              
              vm.exec('newYwxx',_obj.sjydm);
            }
        },
    }


});