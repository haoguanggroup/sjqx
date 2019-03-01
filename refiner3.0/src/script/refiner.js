var vm = new Vue({
    el:"#app",
    data:{
     Url:'',
     currentPage1: 5,
     currentPage2: 5,
     currentPage3: 5,
     currentPage4: 4,		   
     value: '',
     formInline: {
       code: '',
       name: '',
       zhuti: ''
     },
     isCollapse: true,
     // tableData: Array(3).fill(item),
     isShow: false,
     username:"admin", 
      isShowHome:true,
      index:''
    
    },
    mounted() {
        
    },
    methods:{
       
        getUrl(){
      if(this.index=="home"){
        return "views/home.html";
      }else if(this.index=="dataSrc"){
          return "views/dataSrc.html";
        }
      else if(this.index=="bqk"){
        return "views/bqk.html";
      }
      else if(this.index=="ywtz"){
        return "views/ywtz.html";
      }
      else if(this.index=="srcDataDetails"){
        return "http://127.0.0.1:8083/kettle/status/";
      } 
      else if(this.index=="srcData"){
        return "views/data.html";
      }
      else if(this.index=="timeStrategy"){
        return "views/timeStrategy.html";
      }
      else{
        return "views/home.html";
      }
      },
    homeShow(){
        this.index="home"
        
        
    },
    dataSrcShow(){
        this.index="dataSrc"
        
        
    },
    bqkShow(){
        this.index="bqk"
       
    },
    ywtzShow(){
        this.index="ywtz" 
    },

    srcDataShow(){
        this.index="srcData"
      
    },
    srcDataDetailsShow(){
        this.index="srcDataDetails"
       
    },
   timeStrategy(){
     this.index="timeStrategy"
   },
    handleClose(){

    },
    handleOpen(){

    },
    logout(){
        // alert(111)
        location.href="index.html"
    }
    },
  
  
})