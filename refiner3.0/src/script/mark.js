var vm = new Vue({
    el:"#app",
    data:{
    	url:"",
    	sjys:[],
      sjyYwdx:[],
      sjywdxs:[{sjywdx:'',sjywdxmc:'',mrsjywdx:''}],
      ywbqdx:{sjydm:'001',sjywdx:'',bqywdxmc:'',bqywdx:'',tags:[]},
      ywbqdxBq:{lsh:'',glbm:'',sjydm:'',bqywdx:'',zdlx:'',zdm:'',zdsjlx:'',zdsjcd1:'',zdsjcd2:'',bqbm:'',zdzj:'',yxbz:'1',zdsjcd:'',sxh:'',addOrUpdate:''},
      viewCtr:{showBqgl:true,showBqk:false,addMark_dis:true,olnyShow:false,zdsjzdcd:10,isShowZswcd:false,sjywdx_dis:false,bqywdx_dis:true,dialogTitle:'',showDialog:false,lbl_sjcd:'',isShowSave:true,isShowDelete:true,isShowXswcd:false},
      bkq:[],
      marks:[],    
      syssjlx:[],
      kscsz:[],
      ywbqdxBqOld:{},
      /**标签库属性beging*/
      bqkPage:{
        bqkcx:{},
        bqkDialogVisible:false,
        bqkData:[],
        pager:{},
        dialogTitle:'',
        formLabelWidth: '120px',
        kscsz:[],
        bq:{lsh:'', bqbm:'', bqmc:'', bqms:'', dywh:'', dycsdm:'',bqlx:''},
        csdms:[],
        olnyShow:false,
        bqlx:[],
        count:[],
        ksbqlx:[]
      }
    }, 
    methods: {
      /**标签库方法beging*/
      changeCsdm(csdm){
        axios.get(this.url + '/getDict/'+csdm).then(res => {
            vm.bqkPage.kscsz= res.data.resBody;
        }).catch((error) => {
            vm.$message({message:error.message,type: 'error'});
        });
      },
      handleSizeChangeBqk(_val){
        vm.bqkPage.pager.pageSize=parseInt(_val);
        vm.execBqk('selectBqk',vm.bqkPage.bqkcx);
      },
      handleCurrentChangeBqk(_val){
        vm.bqkPage.pager.currentPage=parseInt(_val);
        vm.execBqk('selectBqk',vm.bqkPage.bqkcx);
      },
      execBqk(_operation,_param){
        var vm=this;
        if(_operation=='getPager'){
          axios.get(this.url+'/common/getPager', null).then((res) => {
            vm.bqkPage.pager = res.data.resBody;
          }).catch((error) => {
            vm.$message({message:error.message,type: 'error'});
          }); 
        }else if(_operation=='initBq'){
          vm.bqkPage.kscsz=[];
          vm.bqkPage.bq={lsh:'', bqbm:'', bqmc:'', bqms:'', dywh:'', dycsdm:'',dybqlx:''};         
          vm.bqkPage.bqkDialogVisible = false;
          vm.bqkPage.olnyShow=false;
          vm.bqkPage.dialogTitle='';
        }else if(_operation=='selectBqk'){
          vm.bqkPage.bqkcx.pager=vm.bqkPage.pager;    
				  vm.bqkPage.bqkcx.order=['bqlx','dycsdm','cjsj'];
          axios.post(this.url+'/mark/select/bqk', vm.bqkPage.bqkcx).then((res) => {
            vm.bqkPage.bqkData = res.data.resBody.rows;
            vm.bqkPage.pager.total=res.data.resBody.count;
          }).catch((error) => {
            vm.$message({message:error.message,type: 'error'});
          });
        }else if(_operation=='selectCsdm'){
          axios.get(this.url+'/common/allCsdm').then((res) => {
            vm.bqkPage.csdms = res.data.resBody;
          }).catch((error) => {
            vm.$message({message:error.message,type: 'error'});
          });
        }else if(_operation=='newLable'){
          vm.execBqk('initBq',null);
          vm.bqkPage.dialogTitle='新增标签';
          vm.bqkPage.bqkDialogVisible = true;
        }else if(_operation=='editBq'){
          vm.execBqk('initBq',null);
          vm.bqkPage.dialogTitle='编辑标签';
          vm.bqkPage.bqkDialogVisible = true;
          //ES6新语法---克隆对象  Object.assign({}, _param)
          vm.bqkPage.bq=Object.assign({}, _param);

        }else if(_operation=='showBq'){
          vm.execBqk('initBq',null);
          vm.bqkPage.bq=Object.assign({}, _param);
          vm.bqkPage.dialogTitle='查看标签';
          vm.bqkPage.bqkDialogVisible = true;
          vm.bqkPage.olnyShow=true;
        }else if(_operation=='deleteBq'){
          vm.$confirm('确定删除该标签?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.post(this.url + '/mark/deleteBq',_param).then(res => {
              var _type="error";
              if(res.data.head.result=='1'){
                _type='success';
                vm.execBqk('initBq',null);
                vm.execBqk('selectBqk',null);
                vm.bqkPage.bqlx = [];
                vm.getMenuBqlx();
              }
              vm.$message({ message:res.data.head.message,type: _type});
            }).catch((error) => {
              vm.$message({message:error.message,type: 'error'});
            });
          }).catch(() => {
            vm.$message({type: 'info',message: '已取消删除'});          
          });
        }else if(_operation=='saveorupdate'){
           if(vm.isEmpty(vm.bqkPage.bq.bqmc)||vm.isEmpty(vm.bqkPage.bq.bqms)||vm.isEmpty(vm.bqkPage.bq.dycsdm) ||vm.isEmpty(vm.bqkPage.bq.bqlx)){
             vm.$message({type: 'warning',message: '标签名称、标签描述、对应参数代码、标签类型 为必填项！'});
             return;
           }
          axios.post(this.url+'/mark/saveorupdate/bqk', vm.bqkPage.bq).then((res) => {
            var _type="error";
            if(res.data.head.result=='1'){
              _type='success';
              vm.execBqk('initBq',null);
              vm.execBqk('selectBqk',null);
              vm.bqkPage.bqlx = [];
              vm.getMenuBqlx();
            }
            vm.$message({ message:res.data.head.message,type: _type});
          }).catch((error) => {
            vm.$message({message:error.message,type: 'error'});
          });

        } 
      },
      //点击标签类型菜单
      handleOpen_bqlx(key, keyPath){
        var bqlx_obj = {};
        vm.bqkPage.bqkcx.bqlx = keyPath[0];
        vm.execBqk('selectBqk',vm.bqkPage.bqkcx);
        console.log('l', key);
      },
      //菜单栏标签类型
      getMenuBqlx(){
        axios.get(this.url + '/getDict/bqlx').then(res => {
          var bqlx = res.data.resBody;
          var bqlxmc = [];
          for(let i = 0;i< bqlx.length;i++){
            bqlxmc.push(bqlx[i].zdm);
            axios.post(this.url+'/mark/select/bqk', {bqlx:bqlxmc[i],pager:{}}).then((res) => {
              vm.bqkPage.count[i]=res.data.resBody.count;
             // console.log('1111',vm.bqkPage.count[i]);
              vm.bqkPage.bqlx.push({
                count:vm.bqkPage.count[i],
                zmc:bqlx[i].zmc,
                zdm:bqlx[i].zdm
              });
            }).catch((error) => {
              vm.$message({message:error.message,type: 'error'});
            });
          }
        }).catch((error) => {
          vm.$message({message:error.message,type: 'error'});
        }); 
      },

      /**标签库方法end*/
      initYwbqdx(){
        var vm=this;
        vm.ywbqdx={sjydm:'',sjywdx:'',bqywdxmc:'',bqywdx:'',tags:[]};
        vm.sjywdxs=[];
        vm.marks=[];
        vm.kscsz=[];
        vm.sjywdx_dis=false;
        vm.viewCtr.addMark_dis=true;
      },
      exec(_operation,_param){
        var vm=this;       
        if('newLable'==_operation){
          if(vm.isEmpty(vm.ywbqdx.bqywdx)||vm.isEmpty(vm.ywbqdx.sjywdx)){
             vm.$message({message:'请先选择所属业务对象，并输入合法的标签业务对象！',type: 'error'});
             return;
          }
          vm.viewCtr.olnyShow=false;
          vm.viewCtr.showDialog=true;
          vm.kscsz=[];
          vm.viewCtr.isShowXswcd=false;
          vm.viewCtr.isShowZswcd=false;          
          vm.viewCtr.dialogTitle='新增标签字段';
          //addOrUpdate 增加(Create)、读取查询(Retrieve)、更新(Update)和删除(Delete)
          vm.ywbqdxBq={lsh:'',glbm:'',sjydm:vm.ywbqdx.sjydm,bqywdx:vm.ywbqdx.bqywdx,zdlx:'2',zdm:'',zdsjlx:'',zdsjcd1:'',zdsjcd2:'',bqbm:'',zdzj:'',yxbz:'1',addOrUpdate:'C'};
          vm.ywbqdxBqOld=vm.ywbqdxBq;
        }else if('addYwbqdx'==_operation){
          if(vm.isEmpty(vm.ywbqdxBq.bqbm)||vm.isEmpty(vm.ywbqdxBq.zdm)||vm.isEmpty(vm.ywbqdxBq.zdzj)||vm.isEmpty(vm.ywbqdxBq.zdsjlx)){
              vm.$message({message:'标签、字段名、字段注解、数据类型为必填项！',type: 'error'});
              return false;
          }else{
            //判断标签是否发生变化
            var isChange=true;
            for(var item in vm.ywbqdxBqOld){
              if(vm.ywbqdxBqOld[item]!=vm.ywbqdxBq[item]){
                isChange=false;
                break;
              }
            }
            if(!isChange){
              vm.$message({message:'数据未发生变化！',type: 'error'});
              return false;
            }
            if(vm.marks&&vm.marks.length>0&&vm.ywbqdxBq.addOrUpdate!='U'){
              for(var i=0;i<vm.marks.length;i++){
                var item=vm.marks[i];
                 if(item.zdm==vm.ywbqdxBq.zdm && item.addOrUpdate!='D') {
                  vm.$message({message:'字段名['+item.zdm+'] 已存在!',type: 'error'});
                  return false;
                }else if(item.zdzj==vm.ywbqdxBq.zdzj && item.addOrUpdate!='D') {
                  vm.$message({message:'字段注解['+item.zdzj+'] 已存在!',type: 'error'});
                  return false;
                }
              }
            }
            vm.ywbqdxBq.zdsjcd='';
            if('decimal'==vm.ywbqdxBq.zdsjlx){
              vm.ywbqdxBq.zdsjcd=vm.ywbqdxBq.zdsjcd1+','+vm.ywbqdxBq.zdsjcd2;
            }else if('varchar'==vm.ywbqdxBq.zdsjlx||'char'==vm.ywbqdxBq.zdsjlx||'string'==vm.ywbqdxBq.zdsjlx){
              vm.ywbqdxBq.zdsjcd=vm.ywbqdxBq.zdsjcd1;
            }
            
            vm.marks.push(vm.ywbqdxBq);
            if(vm.ywbqdxBq.addOrUpdate!='U') {
              vm.ywbqdx.tags.push(vm.ywbqdxBq);
            }
            vm.viewCtr.showDialog=false;
            vm.$message({type: 'info',message: '注意：该操作保存后生效！'});
          }
        }else if('save'==_operation){
          // if(1==1)return;
          if(vm.isEmpty(vm.ywbqdx.sjydm)|| vm.isEmpty(vm.ywbqdx.sjywdx)|| vm.isEmpty(vm.ywbqdx.bqywdxmc)|| vm.isEmpty(vm.ywbqdx.bqywdx)){
            vm.$message({message:'所属业务对象、标签业务对象及名称 为必填项！',type: 'error'});
            return false;
          }
          if(vm.isEmpty(vm.marks)){
            vm.$message({message:'数据未发生变化！',type: 'error'});
            return false;
          }
          var _len=0;
          if(vm.isEmpty(vm.ywbqdx.lsh)){
            vm.ywbqdx.tags.forEach(item=>{
              if(item.zdlx=='1'){
                item.addOrUpdate='C';
                item.sjydm=vm.ywbqdx.sjydm;
                item.bqywdx=vm.ywbqdx.bqywdx;
                vm.marks.unshift(item);
              }
            });
          }else{
            _len=vm.ywbqdx.tags.length;
          }
          vm.marks.forEach((item,index)=>{
              if(vm.isEmpty(item.sxh))
                item.sxh=index+_len;
           });
          
          axios.post(this.url + '/mark/update',{sjywdx:vm.ywbqdx,ywbqdxBq:vm.marks}).then(res => {
            var _type='error';
            if(res.data.head.result=='1')_type='success';
            vm.$message({ message:res.data.head.message,type: _type});
            vm.initYwbqdx();
            vm.hqsjy();
          }).catch((error) => {
            vm.$message({message:error.message,type: 'error'});
          });
        }else if('delete'==_operation){
          if(vm.isEmpty(vm.ywbqdx.sjydm)|| vm.isEmpty(vm.ywbqdx.sjywdx)|| vm.isEmpty(vm.ywbqdx.bqywdxmc)|| vm.isEmpty(vm.ywbqdx.bqywdx)){
            vm.$message({message:'请选择要删除的标签对象！',type: 'error'});
            return false;
          }
          vm.$confirm('确定删除该标签对象，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.post(this.url + '/mark/delete',{sjywdx:vm.ywbqdx}).then(res => {
              vm.$message({ message:res.data.head.message,type: 'success'});
              vm.initYwbqdx();
              vm.hqsjy();
            }).catch((error) => {
              vm.$message({message:error.message,type: 'error'});
            });
          }).catch(() => {
            vm.$message({type: 'info',message: '已取消删除'});          
          });
        }else if('deleteMark'==_operation){

          for(var i=0;i<vm.marks.length;i++){
            var item=vm.marks[i];
            if(_param==item.zdm){
              vm.marks.splice(i,1);
              break;               
            }
          }
          for(var i=0;i<vm.ywbqdx.tags.length;i++){
            var item=vm.ywbqdx.tags[i];
            if(_param==item.zdm){
               if(!vm.isEmpty(item.glbm)){
                  item.addOrUpdate='D';
                  vm.marks.push(item);
               }
               vm.ywbqdx.tags.splice(i,1);  
               break;             
            }
          }
          vm.$message({type: 'warning',message: '注意：该操作保存后生效！'});
        }else if('modfiyMark'==_operation){

          for(var i=0;i<vm.ywbqdx.tags.length;i++){
            var item=vm.ywbqdx.tags[i];
            if(_param==item.zdm){
              vm.kscsz=[];
              vm.viewCtr.isShowXswcd=false;
              vm.viewCtr.isShowZswcd=false;          
              vm.viewCtr.dialogTitle='编辑标签字段';
              vm.ywbqdxBq=item;
              vm.ywbqdxBq.addOrUpdate='U';
              vm.ywbqdxBqOld=vm.ywbqdxBq;
              vm.changeSjlx(vm.ywbqdxBq.zdsjlx);
              vm.viewCtr.showDialog=true;
              break;             
            }
          }
        }else if('olnyShow'==_operation){
          
          for(var i=0;i<vm.ywbqdx.tags.length;i++){
            var item=vm.ywbqdx.tags[i];
            if(_param==item.zdm){
              vm.kscsz=[];
              vm.viewCtr.isShowXswcd=false;
              vm.viewCtr.isShowZswcd=false;          
              vm.viewCtr.dialogTitle='查看标签字段';
              vm.ywbqdxBq=item;
              vm.ywbqdxBqOld=vm.ywbqdxBq;
              vm.changeSjlx(vm.ywbqdxBq.zdsjlx);
              vm.viewCtr.showDialog=true;
              vm.viewCtr.olnyShow=true;
              break;             
            }
          }

        }
          

      },
      hqsjy(){
        var vm=this;
        //获取数据源
        axios.get(this.url + '/mark/query/dataSrc').then(res => {
            vm.sjys= res.data.resBody;
        }).catch((error) => {
            vm.$message({message:error.message,type: 'error'});
        });
      },
      isEmpty(data){
        if(!data ||data==null||data==undefined||data=='undefined'||data==''||data.length==0||data=='{}'){
          return true;
        }
        return false;
      },
      changeSjywdx(_sjywdx){
        //查询主键及标签
        var vm=this;
       // vm.ywbqdx={sjywdx:'',bqywdxmc:'',bqywdx:'',tags:[]};
        vm.marks=[];
        var _target=null;
        for(var i=0;i<vm.sjywdxs.length;i++){
          var item=vm.sjywdxs[i];
          if(_sjywdx==item.sjywdx){
            _target=item;
            break;
          }
        }
        vm.ywbqdx.bqywdxmc=_target.sjywdxmc+"_标签表";
        vm.ywbqdx.bqywdx=_target.mrsjywdx;
        var _obj={sjydm:vm.ywbqdx.sjydm,tableName:_target.sjywdx};
        vm.getTableColumn(_obj);
      },
      changeBqbm(_bqbm){
        var vm=this;
        var csdm=null;
        var tagetItem=null;
        for(var i=0;i<vm.bkq.length;i++){
          var item=vm.bkq[i];
           if(_bqbm==item.bqbm){
            tagetItem=item;
            csdm=item.dycsdm;
            break;
          }
        }
        if(!vm.isEmpty(tagetItem)){
          vm.ywbqdxBq.zdm=tagetItem.dycsdm;
          vm.ywbqdxBq.zdzj=tagetItem.bqmc;
        }
        if(!vm.isEmpty(csdm)){
          //查询数据类型
          axios.get(this.url + '/getDict/'+csdm).then(res => {
              vm.kscsz= res.data.resBody;
          }).catch((error) => {
              vm.$message({message:error.message,type: 'error'});
          });
        }
      },
      changeSjlx(_sjlx){
        var vm=this;
       // _sjlx=='date'||_sjlx=='datetime'||_sjlx=='time'||_sjlx=='integer'
        vm.viewCtr.isShowXswcd=false;
        vm.viewCtr.isShowZswcd=false;
        vm.viewCtr.lbl_sjcd='';
        if('varchar'==_sjlx||'char'==_sjlx||'string'==_sjlx){
          vm.viewCtr.isShowZswcd=true;
          vm.viewCtr.lbl_sjcd='字符长度';
          vm.viewCtr.zdsjzdcd=2000;
        }else if('decimal'==_sjlx){
          vm.viewCtr.isShowXswcd=true;
          vm.viewCtr.isShowZswcd=true;
          vm.viewCtr.lbl_sjcd='整数位长度';
          vm.viewCtr.zdsjzdcd=20;
        }
      },
      setInput(_p){
        var vm=this;
        if(vm.ywbqdx.bqywdx!=''){
          if('1'==_p)
            vm.viewCtr.bqywdx_dis=false;
          else
            vm.viewCtr.bqywdx_dis=true;
        }
      },      
      handleOpen(key, keyPath) {
        var _obj={};
        _obj.sjydm=keyPath[0];
        if(keyPath.length>1){
          _obj.ywdxmc=keyPath[1];
          vm.sjywdx_dis=true;
          vm.getYwbqdx(_obj.sjydm,_obj.ywdxmc);
        }else{
          vm.sjywdx_dis=false;
          vm.getSjyYwdx(_obj.sjydm);
        }
       
      },
      getSjyYwdx(_sjydm){
        var vm=this;
        vm.initYwbqdx();
        if(vm.sjyYwdx&&vm.sjyYwdx.length>0){
          vm.sjyYwdx.forEach(item=>{
              if(item.sjydm==_sjydm){
                vm.sjywdxs=item.ywdxs;
                vm.ywbqdx.sjydm=_sjydm;
                return;
              }
          });
        }            
      },
      getYwbqdx(_sjydm,_bqywdx){
        var vm=this;
        vm.initYwbqdx();
        
        axios.get(this.url + '/mark/query/bqywdx',{params:{sjydm:_sjydm,bqywdx:_bqywdx}}).then(res => {
          vm.ywbqdx=res.data.resBody;
          vm.viewCtr.addMark_dis=false;
          
        }).catch((error) => {
          vm.$message({message:error.message,type: 'error'});
        });            
      },
      getTableColumn(_obj){
        var vm=this;
        //查询数据源
        axios.get(this.url + '/mark/query/tableColumns',{params:_obj}).then(res => {
          vm.ywbqdx.tags=res.data.resBody;
          vm.viewCtr.addMark_dis=false;
          if(vm.isEmpty(vm.ywbqdx.tags)){
            vm.viewCtr.addMark_dis=true;
            vm.$message({message:'对不起！该目标对象无主键/唯一键，无法建立标签对象！',type:'error'});
          }
        }).catch((error) => {
          vm.$message({message:error.message,type: 'error'});
        });
      },
      getMarkColumns(_obj){
        var vm=this;
        //查询数据源
        axios.get(this.url + '/mark/query/markColumns',{params:_obj}).then(res => {
          vm.ywbqdx.tags=res.data.resBody;
        }).catch((error) => {
          vm.$message({message:error.message,type: 'error'});
        });
      }

    },
    mounted() { 
      var vm=this;
      vm.url = init.getUrl();
      vm.execBqk('getPager',null);
      vm.execBqk('selectCsdm',null);
      //获取数据源
      vm.hqsjy();
      //获取数据源下的业务对象
      axios.get(this.url + '/mark/query/dataSrcYwbqdx').then(res => {
          vm.sjyYwdx= res.data.resBody;
      }).catch((error) => {
          vm.$message({message:error.message,type: 'error'});
      });
      //查询数据类型
      axios.get(this.url + '/getDict/syssjlx').then(res => {
          vm.syssjlx= res.data.resBody;
      }).catch((error) => {
          vm.$message({message:error.message,type: 'error'});
      });
      //获取标签库
      axios.get(this.url + '/common/getObj/bqk').then(res => {
          vm.bkq= res.data.resBody;
      }).catch((error) => {
          vm.$message({message:error.message,type: 'error'});
      });
      axios.get(this.url + '/getDict/bqlx').then(res => {
        vm.bqkPage.ksbqlx = res.data.resBody;
      }).catch((error) => {
        vm.$message({message:error.message,type: 'error'});
      });
      //获取码表中的标签类型
      this.getMenuBqlx();
      this.initYwbqdx();
      this.execBqk('selectBqk',null);
    }
})