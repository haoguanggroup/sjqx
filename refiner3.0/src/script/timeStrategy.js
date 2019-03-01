var vm = new Vue({
    el:"#app",
    data:{
      url:"",
      dialogFormVisibleFind:false,
      dialogFormVisibleEdit:false,
      dialogFormVisibleAdd:false,
      dialogFormVisibleInstruction:false,
      // Wshow:false,
      // Yshow:false,
      formLabelWidth: '120px',
      tableData: [{
        clbh:'',
        clmc:'',
        kssj:'',
        task:'',
        status:'',
        cjr:'',
        cjsj:'',
      }
      ],
      EditSjcl:
      {
        clbh:"",
        clmc:"",
        task:"",
        parameter:"",
        status:"",
        isworkday:"",
        kssj:"",
        year:"",
        month:"",
        week:"",
        day:"",
        hour:"",
        minute:"",
        seconds:""
      },
      FindSjcl:
      {
        clbh:"",
        clmc:"",
        task:"",
        parameter:"",
        status:"",
        isworkday:"",
        kssj:"",
        year:"",
        month:"",
        week:"",
        day:"",
        hour:"",
        minute:"",
        seconds:""
      },
      AddSjcl:{
        clmc:"",
        task:"",
        parameter:"",
        status:"",
        isworkday:"",
        kssj:"",
        year:"",
        month:"",
        week:"",
        day:"",
        hour:"",
        minute:"",
        seconds:""
      },
      statusOptions:[],
      isworkdayOptions:[],
      total: 0,
      currentPage:1,
      defaultPageSize:10,
      pages: 0,
      pageSize :10,
      Pager:[],
      rules: {
        clmc: [
          { required: true, message: '请输入时间策略名称', trigger: 'blur' }
        ]
      }

    },
    methods: {

      handleSizeChange(val) {			
        this.pageSize = `${val}`;
        this.pageSize = parseInt(this.pageSize);
        this.selectAllSjclDatas();
        // if(this.flag == 0){
        //   this.selectAllSjclData() ;
        // }
      },
      //分页
      handleCurrentChange(val) {
        this.currentPage = `${val}`;
        alert('this.currentPage',this.currentPage);
        this.selectAllSjclDatas();
        // if(this.flag == 0){
        //   this.selectAllSjclData() ;
        // }
      },

      //有效时间策略
      selectAllSjclDatas(){
        var pageInfo = {pageSize:this.pageSize,pageNo:this.currentPage};
        var data = {};
        var sel_data = init.getRequestData(data,pageInfo);
        console.log(sel_data);
        axios.post(this.url+'/sjcl/findAllSjcls', sel_data).then(res => {
          //alert(res.data.resBody.count);
          let sjcldatas = res.data.resBody.rows;
          console.log(sjcldatas[0].cjsj);
          this.total = res.data.resBody.count;
          this.tableData=[];
          sjcldatas.forEach(e => {
            this.tableData.push({
              clbh:e.clbh,
              clmc:e.clmc,
              kssj:e.kssj,
              task:e.task,
              status:e.status,
              cjr:e.cjr,
              cjsj:e.cjsj,
            });
          });	
        }).catch((error) => {
          console.log('查询所有数据失败',error);                        
        });
      },

      //增加时间策略
      addSjcl(){
        var date = new Date();
        var nowdate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        var pageInfo = {};
        var data = {
          clmc:this.AddSjcl.clmc,
          kssj:this.AddSjcl.kssj,
          year:this.AddSjcl.year,
          week:this.AddSjcl.week,
          month:this.AddSjcl.month,
          day:this.AddSjcl.day,
          hour:this.AddSjcl.hour,
          minute:this.AddSjcl.minute,
          seconds:this.AddSjcl.seconds,
          task:this.AddSjcl.task,
          parameter:this.AddSjcl.parameter,
          status:this.AddSjcl.status,
          isworkday:this.AddSjcl.isworkday,
          cjsj:nowdate
        };
        var add_data = init.getRequestData(data,pageInfo);
        console.log(add_data);			
        axios.post(this.url+'/sjcl/insertSjcl', add_data).then((res) => {
          alert('res.data.state'+res.data.head.state);
          if(res.data.head.state == 1){
            this.dialogFormVisibleAdd = false;
            this.$alert('您已成功添加一条时间策略', {
              dangerouslyUseHTMLString: true
            }).then(() =>{
              this.tableData =[];
              this.selectAllSjclDatas();
              this.AddSjcl.clbh = '';
              this.AddSjcl.clmc = ''; 
              this.AddSjcl.kssj = '';
              this.AddSjcl.year = '';
              this.AddSjcl.week = '';
              this.AddSjcl.month = '';
              this.AddSjcl.day = '';
              this.AddSjcl.hour = '';
              this.AddSjcl.minute = '';
              this.AddSjcl.seconds = '';
              this.AddSjcl.task = '';
              this.AddSjcl.parameter = '';
              this.AddSjcl.status = '';  
              this.AddSjcl.isworkday = '';
            });	
          }else{
            this.$alert('添加失败', {
                    dangerouslyUseHTMLString: true
                });		
          }
        }).catch((error) => {
          this.$notify({
            title: '警告',
            message: '添加失败!',
            type: 'warning'
          });                       
        });
      },


      //删除时间策略
      deleteSjcl(clbh){
        var pageInfo = {};
        var data = {clbh:clbh};
        var del_data = init.getRequestData(data,pageInfo);
        console.log(del_data);
        this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(this.url+'/sjcl/deleteSjcl', del_data).then((res) => {
            this.total = this.total - 1;
            if( res.data.head.state == 1){
              this.tableData =[];
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


      //编辑时间策略前查找单条记录
      findAndEditSjcl(clbh){

        this.dialogFormVisibleEdit = true;
        var pageInfo = {};
        var data = {clbh:clbh};
        var findE_data = init.getRequestData(data,pageInfo);
        console.log(findE_data);
        //alert(tabCode);
        axios.post(this.url+'/sjcl/findAllSjcls',findE_data).then((res) => {
          let find_data = res.data.resBody.rows;
          console.log(find_data); 
          this.EditSjcl.clbh = find_data[0].clbh;
          this.EditSjcl.clmc = find_data[0].clmc;   
          this.EditSjcl.kssj = find_data[0].kssj;
          this.EditSjcl.year = find_data[0].year;
          this.EditSjcl.week = find_data[0].week;
          this.EditSjcl.month = find_data[0].month;
          this.EditSjcl.day = find_data[0].day;   
          this.EditSjcl.hour = find_data[0].hour;
          this.EditSjcl.minute = find_data[0].minute;
          this.EditSjcl.seconds = find_data[0].seconds;
          this.EditSjcl.status = find_data[0].status;
          this.EditSjcl.task = find_data[0].task;
          this.EditSjcl.parameter = find_data[0].parameter;
          this.EditSjcl.isworkday = find_data[0].isworkday;      
        }).catch((error) => {
            this.$notify({
              title: '警告',
              message: '读取失败!',
              type: 'warning'
            });                       
          });
      },

      //编辑时间策略
      editSjcl(){
        var date = new Date();
        var nowdate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();					
        var pageInfo = {};
        var data = {          
          clbh:this.EditSjcl.clbh,
          clmc:this.EditSjcl.clmc,
          kssj:this.EditSjcl.kssj,
          year:this.EditSjcl.year,
          week:this.EditSjcl.week,
          month:this.EditSjcl.month,
          day:this.EditSjcl.day,
          hour:this.EditSjcl.hour,
          minute:this.EditSjcl.minute,
          seconds:this.EditSjcl.seconds,
          task:this.EditSjcl.task,
          parameter:this.EditSjcl.parameter,
          status:this.EditSjcl.status,
          isworkday:this.EditSjcl.isworkday,
          cjsj:nowdate
        };
        var i_data = init.getRequestData(data,pageInfo);
        console.log(i_data);
        this.$confirm('此操作将修改该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisibleEdit = false;
          axios.post(this.url+'/sjcl/updateSjcl', i_data).then((res) => {
            if(res.data.resBody){
              this.tableData =[];
              this.currentPage = 1;
              this.selectAllSjclDatas();
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
            }
          }).catch((error) => {
            this.$notify({
              title: '警告',
              message: '修改失败!',
              type: 'warning'
            });                       
          });
        });			
      },

      //查看详情
      findSjcl(clbh){
        this.dialogFormVisibleFind = true;
        var pageInfo = {pageSize:1,pageNo:1};
        var data = {clbh:clbh};
        var findE_data = init.getRequestData(data,pageInfo);
        console.log(findE_data);
        //alert(tabCode);
        axios.post(this.url+'/sjcl/findAllSjcls',findE_data).then((res) => {
          let find_data = res.data.resBody.rows;
          console.log(find_data); 
          this.FindSjcl.clbh = find_data[0].clbh;
          this.FindSjcl.clmc = find_data[0].clmc;   
          this.FindSjcl.kssj = find_data[0].kssj;
          this.FindSjcl.year = find_data[0].year;
          this.FindSjcl.week = find_data[0].week;
          this.FindSjcl.month = find_data[0].month;
          this.FindSjcl.day = find_data[0].day;   
          this.FindSjcl.hour = find_data[0].hour;
          this.FindSjcl.minute = find_data[0].minute;
          this.FindSjcl.seconds = find_data[0].seconds;
          this.FindSjcl.status = find_data[0].status;
          this.FindSjcl.task = find_data[0].task;
          this.FindSjcl.parameter = find_data[0].parameter;
          this.FindSjcl.isworkday = find_data[0].isworkday;      
        }).catch((error) => {
            this.$notify({
              title: '警告',
              message: '读取失败!',
              type: 'warning'
            });                       
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

      // 获取状态（status）
      getMbStatus(){
        var csdm = 'status';
        axios.get(this.url+'/getDict/status',{params:{csdm:'status'}}).then((res) => {
          var mbData = res.data.resBody ;   
          mbData.forEach(e => {
            this.statusOptions.push({
              value:e.zdm,
              label:e.zmc
            });
          });
          console.log('status-->',this.statusOptions);
        
        });	
      },

      //获取是否工作日
      getMbIsworkday(){
        var csdm = 'status';
        axios.get(this.url+'/getDict/isworkday',{params:{csdm:'isworkday'}}).then((res) => {
          var mbData = res.data.resBody ;   
          mbData.forEach(e => {
            this.isworkdayOptions.push({
              value:e.zdm,
              label:e.zmc
            });
          });
          console.log('isworkdayOptions-->',this.isworkdayOptions);
        
        });	
      },

      //清空值，验证清除、
      addCancel(formName){
        this.dialogFormVisible = false;
        this.$refs[formName].resetFields();	
      }


    },
    
    mounted() {
      this.url = init.getUrl();
      this.selectAllSjclDatas();
      this.getPager();
      this.getMbStatus();
      this.getMbIsworkday();
    }
})