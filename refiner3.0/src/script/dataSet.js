var vm = new Vue({
    el:'#app',
    watch: {
        filterText(val) {
          this.$refs.tree2.filter(val);
        }
      },
    data:{
        Url:'',
        activeIndex: '1',
        activeIndex2: '1',
        radio: '1',
        dataSrcType:[],
        dataMetaForm:{
            dataMeta:''
        },
        //树形控件
        filterText: '',
        data2: [{
          id: 1,
          label: '互联网+政务',
          children: [{id: 5,label: '行政区划'},
                     {id: 6,label: '单位信息'},
          {id: 7,label: '用户（业务人员）信息'},
          {id: 8,label: '事项类型'},
          {id: 9,label: '审批数据'}]
        }, {
          id: 2,
          label: '公共资源交易中心',
          children: [{id: 51,label: '招标单位（部门）信息'},
                     {id: 61,label: '项目信息'},
                     {id: 71,label: '企业信息'},
                     {id: 81,label: '项目信息发布'},
                     {id: 91,label: '企业应标信息'}]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        checked: false,
        textarea: '',
        radio2:'',
        isShow:true
      
    },
    methods:{
        //树形控件
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
          },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
          },
          chooseDataType(){

          },
          choose(label){
           if(label==2){
            this.isShow=true;
           }else{
               this.isShow=false;
           }
          }
    },
    mounted(){
        this.Url=init.getUrl();
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
    }
})