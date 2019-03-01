var vm = new Vue({
  Url:'',
  el:'#app',
  data:{
    data: [{
      label: '互联网+政务',
      children: [{
        label: '审批业务数据表',
        children: [
          {label: '冲正收费类型'},
          {label: '业务来源'},   
          {label: '是否超期'}  
        ]
      }]
    }],
    defaultProps: {
      children: 'children',
      label: 'label'
    },
    options:[
      {
        value:'审批业务数据表',
        label:'spywsjb'
      },
      {
        value:'行政审批表',
        lable:'spywsjb1'
      }
    ],
    ssywdxList:[
      {
        value:'审批业务数据表',
        label:'spywsjb'
      },
      {
        value:'行政审批表',
        lable:'spywsjb1'
      }
    ],
    labelPosition: 'right',
    zj:[],
    primaryList:[
      {
        label:'审批业务数据表.业务流水号',
        value:'ywlsh'
      },
      {
        label:'审批业务数据表.事项ID',
        value:'sxid'
      }
    ],
    bqdm:'',
    bqmc:'',
    dywh:'',
    bqcsdmList:[
      {
        label:'冲正收费类型',
        value:'czsflx'
      }
    ],
    bqms:'',
    cjsj:'',
    ssywdx:'',
    bqcsdm:'',
    cjr:'',
    formLabelAlign:{

    },
    isShow:true,
    showYwdx:false,
    showBq:false,
    isShowBq:false,
    //新增标签数据
    addLabelFormData:[
      {
        bqdm:'',
        bqmc:'',
        dywh:'',
        bqcsdm:'',
        bqcsdmList:''
      },
     
    ]
  },

  
  mounted() {
this.Url=init.getUrl();
console.log(this.Url)
  },
  // created(){
  //   // this.couponSelected = this.couponList[0].id
  // },
  methods: {
    handleNodeClick(a,b,c) {
      if(a.label=='冲正收费类型' ){
        this.isShowBq = true;
        this.isShow=false;
       axios.post(this.Url)
        }
        if(a.label=='是否超期' ||a.label=='业务来源'){
          this.isShowBq = false;
          this.isShow=false;
        }
     
    },
    addBq(){
      this.isShowBq=false;
      this.isShow=true;     
      this.showYwdx=false;
    },
    selectYwdx(){
      
      // for(var i = 0;i < 2;i++){
      //   this.primaryList[i].label = this.ssywdxList[i].text+'.'+'业务流水号';
      // }
      this.showYwdx=true;
    },
    selectBqcsdm(){
      this.showBq=true;
    },
    onSubmit(){

    },
    //添加标签
    addLabel(){
     this.addLabelFormData.push(
       {
      bqdm:'',
      bqmc:'',
      dywh:'',
      bqcsdm:'',
      bqcsdmList:''
     },
     )
    },
    deleteLabel(index){
this.addLabelFormData.splice(index,1)
    }
  },

})