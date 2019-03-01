var vm = new Vue({
    el:'#app',
    data:{
        jdmbcx:{},
				jdmbDialogVisible:false,
				jdmbDisabled:true,
        jdmbData:[],
        pager:{},
        dialogTitle:'',
        formLabelWidth: '120px',
        jdmb:{lsh:'', csdm:'', csmc:'', zdm:'', zmc:'', sxh:''},
        olnyShow:false
    },
    methods: {
		 handleSizeChangeJdmb(_val){
			 vm.pager.pageSize=parseInt(_val);
			 vm.execJdmb('selectJdmb',vm.jdmbcx);
		 },
		 handleCurrentChangeJdmb(_val){
			 vm.pager.currentPage=parseInt(_val);
			 vm.execJdmb('selectJdmb',vm.jdmbcx);
		 },
		 execJdmb(_operation,_param){
			 var vm=this;
			 if(_operation=='getPager'){
				 axios.get(this.url+'/common/getPager', null).then((res) => {
					 vm.pager = res.data.resBody;
				 }).catch((error) => {
					 vm.$message({message:error.message,type: 'error'});

				 }); 
			 }else if(_operation=='initJdmb'){
				 vm.kscsz=[];
				 vm.jdmb={lsh:'', jdmbbm:'', jdmbmc:'', jdmbms:'', dywh:'', dycsdm:''};         
				 vm.jdmbDialogVisible = false;
				 vm.olnyShow=false;
				 vm.dialogTitle='';
			 }else if(_operation=='selectJdmb'){
				 vm.jdmbcx.pager=vm.pager;
				 vm.jdmbcx.order=['csdm','zdm','lsh','cjsj'];
				 axios.post(this.url+'/jdmb/select/jdmb', vm.jdmbcx).then((res) => {
					 vm.jdmbData = res.data.resBody.rows;
					 vm.pager.total=res.data.resBody.count;			 
				 }).catch((error) => {
					 vm.$message({message:error.message,type: 'error'});
				 });
			 }else if(_operation=='selectCsdm'){
				 axios.get(this.url+'/common/allCsdm').then((res) => {
					 vm.csdms = res.data.resBody;
				 }).catch((error) => {
					 vm.$message({message:error.message,type: 'error'});
				 });
			 }else if(_operation=='newLable'){
				 vm.execJdmb('initJdmb',null);
				 vm.dialogTitle='新增码值';
				 vm.jdmbDialogVisible = true;
				 vm.jdmbDisabled = false;
			 }else if(_operation=='editJdmb'){
				 vm.execJdmb('initJdmb',null);
				 //ES6新语法---克隆对象  Object.assign({}, _param)
				 vm.jdmb=Object.assign({}, _param);
				 vm.jdmbDisabled = true;
				 vm.dialogTitle='编辑码值';
				 vm.jdmbDialogVisible = true;
			 }else if(_operation=='showJdmb'){
				 vm.execJdmb('initJdmb',null);
				 vm.jdmb=Object.assign({}, _param);
				 vm.dialogTitle='查看码值';
				 vm.jdmbDisabled = true;
				 vm.jdmbDialogVisible = true;
				 vm.olnyShow=true;
			 }else if(_operation=='deleteJdmb'){
				 vm.$confirm('确定删除该码值?', '提示', {
					 confirmButtonText: '确定',
					 cancelButtonText: '取消',
					 type: 'warning'
				 }).then(() => {
					 axios.post(this.url + '/jdmb/deleteJdmb',_param).then(res => {
						 var _type="error";
						 if(res.data.head.result=='1'){
							 _type='success';
							 vm.execJdmb('initJdmb',null);
							 vm.execJdmb('selectJdmb',null);
						 }
						 vm.$message({ message:res.data.head.message,type: _type});
					 }).catch((error) => {
						 vm.$message({message:error.message,type: 'error'});
					 });
				 }).catch(() => {
					 vm.$message({type: 'info',message: '已取消删除'});          
				 });
			 }else if(_operation=='saveorupdate'){
					if(vm.isEmpty(vm.jdmb.csdm)||vm.isEmpty(vm.jdmb.zdm)){
						vm.$message({type: 'warning',message: '参数代码、值代码 为必填项！'});
						return;
					}
				 axios.post(this.url+'/jdmb/saveorupdate/jdmb', vm.jdmb).then((res) => {
					 var _type="error";
					 if(res.data.head.result=='1'){
						 _type='success';
						 vm.execJdmb('initJdmb',null);
						 vm.execJdmb('selectJdmb',null);
					 }
					 vm.$message({ message:res.data.head.message,type: _type});
				 }).catch((error) => {
					 vm.$message({message:error.message,type: 'error'});
				 });

			 } 
		 },
		 handleOpen_jdmblx(key, keyPath){
			 var jdmblx_obj = {};
			 vm.jdmbcx.jdmblx = keyPath[0];
			 vm.execJdmb('selectJdmb',vm.jdmbcx);
			// console.log('l', key);
		 },

		 isEmpty(data){
			if(!data ||data==null||data==undefined||data=='undefined'||data==''||data.length==0||data=='{}'){
				return true;
			}
			return false;
		},

	},

    mounted() {
			var vm=this;
			vm.url = init.getUrl();
		  vm.execJdmb('selectJdmb',null);
    },
})