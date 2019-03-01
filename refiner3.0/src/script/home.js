
var vm = new Vue({
    el:'#app',
    data:{
      //浏览器类型
      browser:'',
      Url:'',
        activeName: 'first',
        //数据源数据
        filterText: '',
        treeData: [      
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dataMetaForm:{
          dataMeta:'',
          region:'',
          checked: true,
          drive:'',
          url:'',
          login:'用户名和密码',
          userName:'',
          password:'',
          database:'',
                 
        },
        //数据源类型
        dataSrcType:[],
        activeIndex2:"1",
        //登录方式
        loginOptions:[
          {
            label:"用户名和密码",
            value:"用户名和密码"
          },
          {
            label:"无身份验证",
            value:"无身份验证"
          }
        ],
        mysqlData:'',
        status:'modify'
    },
    methods: {
    
    
        handleClick(tab, event) {
            console.log(tab, event);
          },
          //数据源事件
          filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
          },
          //点击树节点展开
          open(a,b,c){  
            console.log(a)
            console.log(b)
            
            if(b.level=1){
              axios.get(this.Url+"/dataSource/selectDataParameter?sjymc="+a.label)
              .then(res=>{
                console.log(res)
                this.mysqlData = res.data.resBody;
                for(let i = 0;i<res.data.resBody.length;i++){
              if(res.data.resBody[i].csmc=="服务器ip"){
                this.dataMetaForm.url=res.data.resBody[i].csz;  
                this.dataMetaForm.dataMeta=res.data.resBody[i].sjylx;             
              }else if(res.data.resBody[i].csmc=="用户名"){
                this.dataMetaForm.userName=res.data.resBody[i].csz;
              }else if(res.data.resBody[i].csmc=="密码"){
                this.dataMetaForm.password=res.data.resBody[i].csz;
              }else if(res.data.resBody[i].csmc=="端口号"){
                this.dataMetaForm.url= this.dataMetaForm.url+":"+res.data.resBody[i].csz;
              }
                }              
              }).catch(err=>{
                console.log(err)
              })
            }else{
              alert(111)
            }
          },
          handleSelect(){

          },
          //保存
          save(){
            let url =  this.dataMetaForm.url.split(':');
               console.log(url)
            for(let i = 0;i<this.mysqlData.length;i++){           
              if(this.mysqlData[i].csmc=="服务器ip"){            
                this.mysqlData[i].csz=url[0];                
                             
              }else if(this.mysqlData[i].csmc=="用户名"){
                this.mysqlData[i].csz=this.dataMetaForm.userName
               
              }else if(this.mysqlData[i].csmc=="密码"){
                this.mysqlData[i].csz=this.dataMetaForm.password
                
              }else if(this.mysqlData[i].csmc=="端口号"){
                this.mysqlData[i].csz=url[1]              
              }
                }
                console.log(this.mysqlData)
           axios.post(this.Url+"/dataSource/updateDataSource",
           
             this.mysqlData
             
           ).then(res=>{
            console.log(res)
            this.status="modify"
           }).catch(err=>{
            console.log(err)
            this.status="modify"
           })
          },
          add(){
            this.status="add"
          },
        //选择数据源类型
        chooseDataType(){
         console.log(this.dataMetaForm.dataMeta)
         axios.get(this.Url+'/dataSource/selectDataParameter?sjylx='+this.dataMetaForm.dataMeta,{          
         }).then(res=>{
      
     //  console.log(res)
        this.dataMetaForm.URL=res.data.resBody[0][0].csdm;
        this.dataMetaForm.url=res.data.resBody[0][0].csz;
        this.dataMetaForm.userName=res.data.resBody[0][1].csdm;
        // console.log('---------'+this.dataMetaForm.URL)
         }).catch(err=>{
          console.log(err)
         })
        },
        testContent(){
          axios.post(this.Url+'/dataSource/testConnect',{
            data:{
              type   : 'mysql',
              host : '192.168.30.171', 
              user : 'jzqljd', 
              password : 'Jzqljd@01', 
              port: '3306', 
            }
          },{
            
          }).then(res=>{
              console.log(res)
          }).catch(err=>{
              console.log(err)
          })
        }
    },
    mounted() {   
      
      console.log(init.getRequestData())  
    this.Url=init.getUrl();
      //获取一级树状数据源
      var Data = [];
      axios.get(this.Url+'/dataSource/selectDataSource')
      .then(res=>{
      console.log(res.data.resBody)    
      for(var i = 0;i<res.data.resBody.length;i++){
       Data.push(
          {
           id:res.data.resBody[i].lsh,
           label:res.data.resBody[i].sjymc,
           children:[]
          }
        )


      }  
   
    //  console.log(this.data2)
       //获取二级树状数据源
       
       for(let i = 0;i<Data.length;i++){  
         console.log(Data[i].label)
        axios.get(this.Url+'/dataSource/selectDataBase?sjymc='+Data[i].label,{
        })
        .then(res=>{
         //  console.log(res.data.resBody)
        // console.log(this.data2[index])
        // Data[index].children=[];          
         for(let j = 0;j<res.data.resBody.length;j++){
        //   console.log(i) 
          Data[i].children.push(
            {
              id:j+Data.length+1,
             label:res.data.resBody[j].TABLE_SCHEMA,
             children:[]
            }  
          )   
          console.log("------------"+Data[i].children[j].label)
          axios.get(this.Url+"/dataSource/selectDataTable?sjbmc="+Data[i].children[j].label)
          .then(res=>{
        //  console.log(res)
          for(let k = 0;k<res.data.resBody.length;k++){
         //   console.log(Data[i].children[j])
            Data[i].children[j].children.push({
              label:res.data.resBody[k].TABLE_NAME
            })
          }
      
          }).catch(err=>{
          console.log(err)
          })
         }
         console.log(Data)
     //Data[0].children = new Set(Data[0].children)
     this.data2=Data;
      

        }).catch(err=>{
          console.log(err)
        })
       }
     
     //console.log(this.data2) 
      }).catch(err=>{
      console.log(err)
      })
//选择数据源
    axios.get(this.Url+'/dataSource/selectDataParameter')
    .then(res=>{
    console.log(res)
    }).catch(err=>{
   console.log(err)
    })
    // this.borwser=window.zhyy.consts.userId;
    // console.log(this.borwser)

    //获取数据源
  axios.get(this.Url+'/getDict/sjylx')
  .then(res=>{
    console.log(res.data.resBody);
    for(var i = 0;i<res.data.resBody.length;i++){
      this.dataSrcType.push({
        value:res.data.resBody[i].zdm,
        label:res.data.resBody[i].zmc
      })
    } 
  }).catch(err=>{
    console.log(err)
  })    
    },
  
})