var vm = new Vue({
    el:"#app",
    data:{
        showInput: true,
        showPwd: false,
        user: '',
        pwd: '',
        isTrue: false,
        errorInfo: '',
        Url:'',
        isShowForm:true
    },
    created() {
//         axios.get("static/ip.json").then((res)=>{
//         console.log(res.data[0].ip);
//        this.Url=res.data[0].ip
//     }).catch((err)=>{
// console.log(err)
// 	})
this.Url = init.getUrl()
console.log(this.Url)
			  },
    methods: {
        check: function(event) {
					//获取值
					var name = this.name;
					var password = this.pwd;
					if (name == '' || password == '') {
						this.$message({
							message: '账号或密码为空！',
							type: 'error'
						})
						return;
					}

				},
				//获得焦点变色
				pwdaddColor() {
					this.showPwd = true;
					this.showInput = false;
				},
				useraddColor(){
					this.showPwd = false;
					this.showInput = true;
				},
				removeColor() {
					this.showPwd = false;
					this.showInput = false;
				},
				//登录
				open6() {

                    if(this.user == ""){
						this.$notify.error({
          title: '错误',
          message: '用户名不能为空！'
		})
                        return false;
                    }else if(this.pwd == ''){
						this.$notify.error({
          title: '错误',
		  message: '密码不能为空！'
						})
                    }else{
						this.isTrue = false;
						// window.location.href = 'refiner.html';
					axios.post(this.Url+'/common/login', {
								userName: this.user,
								password: md5(this.pwd)      
						}).then((res) => {
												
								console.log();
								if(res.data.head.result == '0'){
									alert("登录失败")
								}else{
									window.location.href = 'refiner.html';
									localStorage.setItem('name',res.data.user);
								}
						}).catch(err => {
							console.log(err);
						})
                    }  
                }
    },
})