var vm = new Vue({
	el: '#app',
	data:{
		dialogFormVisible: false,
		dialogFormVisibleEdit: false,

		selectRwjk:{
			ywmc:'',
			clwj:'',
			kssj:'',
			jssj:''
		},
		RwjkData:[],
		//业务名称
		ywmcOptions:[],
		formLabelWidth: '120px',
		//分页
		total: 0,
		currentPage:1,
		defaultPageSize:10,
		pages: 0,
		pageSize :10,
		Pager:[],
		color1:'',

	},

	methods: {
		handleSizeChange(val) {			
			this.pageSize = `${val}`;
			this.pageSize = parseInt(this.pageSize);
			this.selectAllSjclDatas();
			if(this.flag == 0){
			  this.selectAllRwjkData() ;
			}
		},

		handleCurrentChange(val) {
			this.currentPage = `${val}`;
			this.selectAllSjclDatas();
			if(this.flag == 0){
			  this.selectAllRwjkData() ;
			}
		},

		//所有任务监控
		selectAllSjclDatas(){
			var pageInfo = {pageSize:this.pageSize,pageNo:this.currentPage};
			var data = {};
			var sel_data = init.getRequestData(data,pageInfo);
			var total_data = init.getRequestData(data,{});
			console.log(sel_data);
			axios.post(this.url+'/rwjk/findCount', total_data).then(res => {
				if(!res.data.resBody){
					this.total = 0;
				}
				this.total = res.data.resBody[0].total;
				console.log('total11------>',this.total);
			});
			axios.post(this.url+'/rwjk/findAllRwjks', sel_data).then(res => {
				let rwjkdatas = res.data.resBody;
				// console.log(rwjkdatas[0].cjsj);
				// this.total = res.data.resBody.length;
				this.RwjkData=[];
				rwjkdatas.forEach(e => {
					this.RwjkData.push({
						ywbm:e.ywbm,
						ywmc:e.ywmc,
						clwjbm:e.clwjbm,
						qddclwjm:e.bqwjmc,
						hdzt:e.zxzt,
						kssj:e.zxkssj,
						jssj:e.zxjssj,
					});
				});				
			}).catch((error) => {
				console.log('查询所有数据失败',error);                        
			});
		},

		//查询符合所有条件的任务监控
		selectAllRwjkData(){
			var pageInfo = {pageSize:this.pageSize,pageNo:this.currentPage};
			console.log('mc--->',this.selectRwjk.ywmc);
			var data = {mc:this.selectRwjk.ywmc,bqwj:this.selectRwjk.clwj,kssj:this.selectRwjk.kssj,jssj:this.selectRwjk.jssj};
			var total_data = init.getRequestData(data,{});
			var sel_data = init.getRequestData(data,pageInfo);
			console.log(sel_data);			
			axios.post(this.url+'/rwjk/findCount', total_data).then(res => {
				if(!res.data.resBody){
					this.total = 0;
				}else{
					this.total = res.data.resBody[0].total;
					console.log('total------>',this.total);
				}				
			});
			axios.post(this.url+'/rwjk/findAllRwjks',sel_data).then((res) => {
				let r_data = res.data.resBody;
				this.RwjkData=[];
				r_data.forEach(e => {
					this.RwjkData.push({
						ywbm:e.ywbm,
						ywmc:e.ywmc,
						clwjbm:e.clwjbm,
						qddclwjm:e.bqwjmc,
						hdzt:e.zxzt,
						kssj:e.zxkssj,
						jssj:e.zxjssj,
					});
				});	
				//查询后搜索条件制空
				this.flag = 0;
				// this.selectJdmb.csmc ='';
				// this.selectJdmb.zdm ='';
				// this.selectJdmb.zmc ='';
			}).catch((error) => {
				console.log('查询失败',error);                        
			});	
		},


		//删除
		deleteYwclwj(clwjbm){
			var pageInfo = {};
			var data = {clwjbm:clwjbm};
			var del_data = init.getRequestData(data,pageInfo);
			console.log(del_data);
			this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				axios.post(this.url+'/rwjk/deleteYwclwj', del_data).then((res) => {
					this.total = this.total - 1;
					console.log('res.data.resBody.state',res.data.head.state);
					if( res.data.head.state== 1){
						this.RwjkData =[];		
						var m =  (this.total % this.pageSize) ; 
						if(m == 0){
						  this.currentPage = this.currentPage - 1;
						}				
						this.selectAllSjclDatas();
					}
				});				
				this.$message({
					type: 'success',
					message: '删除成功!'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},


		// 获取业务名称
		getYwmc(){
			var pageInfo = {};
			var data = {};
			var selYw_data = init.getRequestData(data,pageInfo);
			axios.post(this.url+'/rwjk/findAllYwxx',selYw_data).then((res) => {
				var ywData = res.data.resBody ;   
				ywData.forEach(e => {
				this.ywmcOptions.push({
					value:e.bm,
					label:e.mc
				});
				});
				console.log('ywmcOptions-->',this.ywmcOptions);
			
			});	
		},

		//获取pageSize
		getPager(){
			axios.get(this.url+'/common/getPager', null).then((res) => {
				var PagerData = res.data.resBody;
				this.Pager= PagerData.selPageSize;
				console.log('Pager', this.Pager);
			});	
		},


		},
	mounted(){
		this.url = init.getUrl();
		this.getPager();
		this.getYwmc();
		this.selectAllSjclDatas();

	},
});