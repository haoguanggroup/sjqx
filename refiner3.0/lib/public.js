
    //     //获取浏览器的类型
    //   function init(){
    //         var Sys={};
    //         var browserName = window.navigator.userAgent;
    //         var UserAgent = "";
    //         if(/Trident/i.test(browserName) && !/opera/.test(browserName)){  
    //                UserAgent="IE";    
    //         }else if(/firefox/i.test(browserName)){  
    //             UserAgent="Firefox";  
    //         }else if(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)){  
    //                UserAgent="Chrome";  
    //        }else if(/opera/i.test(browserName)){  
    //                 UserAgent="Opera";  
    //        }else if(/webkit/i.test(browserName) &&!(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))){  
    //                 UserAgent="Safari";  
    //        }else{  
    //                 UserAgent="unKnow";  
    //        }  
    //          return UserAgent;
    //     }
    
    ;
(function(window, undefined) {
	window.init = {
        //获取浏览器信息
		getuserAgent: function() {
			var Sys = {};
			var browserName = window.navigator.userAgent;
			var UserAgent = "";
			if (/Trident/i.test(browserName) && !/opera/.test(browserName)) {
				UserAgent = "IE";
			} else if (/firefox/i.test(browserName)) {
				UserAgent = "Firefox";
			} else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
				UserAgent = "Chrome";
			} else if (/opera/i.test(browserName)) {
				UserAgent = "Opera";
			} else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) &&
					/mozilla/i.test(browserName))) {
				UserAgent = "Safari";
			} else {
				UserAgent = "unKnow";
			}
			return UserAgent;
        },
        
        //请求参数
        getRequestData:	function (data,pageInfo){
			var requestData={
					head:{
						userName:"",
						userID:"",
						mask:"",
						ticket:"",
						tranfunc:"",
						terminalID:"",
						terminalType:this.getuserAgent()
					},
					body:{
						pageInfo:pageInfo,
						data:data
					}
			};
			return requestData;
        },
        //ip
        getUrl:function(){
        	//return "http://192.168.43.20:3355";
		//	return "http://192.168.0.8:3355";
	//	return "http://192.168.0.3:3355"
	return "http://127.0.0.1:3355"
		},
		//获取业务
		// getBusiness:function(){
		// var data=["纳税申报","发票发放","税种登记","跨区涉税事项报告","退税申请","增值税专用发票代开","税务变更登记",]
		// return data
		// },
		
		//获取业务特征
		// getBusinessFeature:function(){
		// var	data=["是否跨层级审批","是否跨部门审批","应到现场次数","事项办结提前天数","登记-受理历时时长（天）","办结类型","审批类型","所剩工作日","收费情况","事项类型",
		// 		]
		// 	return data
		// }
}
})(window);
// init可以用其他的符号代替
init.getuserAgent();
init.getRequestData();
init.getUrl();
// init.getBusiness();
// init.getBusinessFeature();
