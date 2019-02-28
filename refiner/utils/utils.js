var refinerConfig = require('../config/refinerConfig');
var numeral=require('numeral');
var log4js = require('../utils/log4js');
var logger=log4js.getLogger();
var moment=require('moment');
var fs = require('fs');
var path = require('path');
var urlencode = require('urlencode');

class Utils {

	static formatDateTime(datetime){
		return Utils.formatDate(datetime,'YYYY-MM-DD HH:mm:ss');
	}
	static formatDate(datetime){
		return Utils.formatDate(datetime,'YYYY-MM-DD');
	}
	static formatDate(datetime,_format){
		return moment(datetime).format(_format);
	}
	static parseDateTime(datetime){
		return Utils.parseDate(datetime,'YYYY-MM-DD HH:mm:ss');
	}
	static parseDate(datetime){
		return Utils.parseDate(datetime,'YYYY-MM-DD');
	}
	
	static parseDate(datetime,_format){
		return moment(datetime,_format);
	}
	/**
	 * 从输入参数中生成一个符合daoModel的对象
	 * */
	static createNewObject(_input_obj,_dao_obj,_out_obj){
		if(Utils.isEmpty(_out_obj)){
			_out_obj={};
		}
		if(Utils.isNotEmpty(_input_obj)){ 
			var param_keys=Object.getOwnPropertyNames(_input_obj);		    	
			param_keys.forEach((item,index)=>{
				if(_dao_obj.attributes.hasOwnProperty(item) && !_out_obj.hasOwnProperty(item)){
					_out_obj[item]=_input_obj[item];
				}
			});
		}
		return _out_obj;
	}
	static clearObjectNullAttr(){
		
	}
	/**
	 * 生成业务流水号
	 * */
	static generateSN(){
		var todate=Utils.formatDate(new Date(),'YYYYMMDD');
		if(todate==refinerConfig.appConfig.snTime){
			refinerConfig.appConfig.sn=refinerConfig.appConfig.sn+1;
		}else{
			refinerConfig.appConfig.snTime=todate;
			refinerConfig.appConfig.sn=1;
		}
		return todate+numeral(parseInt(Math.random()*(100+1),10)).format('000')+numeral(refinerConfig.appConfig.sn).format('000000000');
	}
	/**
	 * 生成待前缀的编码
	 * */
	static generateCode(perfix){
		var todate=Utils.formatDate(new Date(),'YYYYMMDD');
		if(todate==refinerConfig.appConfig.codeTime){
			refinerConfig.appConfig.code=refinerConfig.appConfig.code+1;
		}else{
			refinerConfig.appConfig.codeTime=todate;
			refinerConfig.appConfig.code=1;
		}
		return perfix+todate+numeral(parseInt(Math.random()*(1000+1),10)).format('0000')+refinerConfig.appConfig.code;
	}
	/**
	 * 判断空
	 * */
    static isEmpty(data){
    	if(!data ||data==null||data==undefined||data=='undefined'||data==''||data.length==0||JSON.stringify(data)=='{}'){
    		return true;
    	}
    	return false;
    }
    /**
	 * 判断非空
	 * */
    static isNotEmpty(data){         
       return !Utils.isEmpty(data);
    }
    static changeEmptyToOther(data,_other){ 
       if(Utils.isEmpty(data)){
       		return _other;
       }        
       return data;
    }
    /**
     * 判断两个或多个字符串是否值相等
     * */
    static equals(str1,str2){
    	if(str1==str2 &&(str1!=null&&str1!=undefined&&str1!='undefined')){
    		return true;
    	}
    	return false;
    }
    /**
     * 創建多級目錄
     * */
    static mkdirs(dirpath, callback){
    	fs.exists(dirpath, function(exists) {
            if(exists) {
                callback();
            } else {
                //尝试创建父目录，然后再创建当前目录
            	Utils.mkdirs(path.dirname(dirpath), function(){
                        fs.mkdir(dirpath,callback);
                });
            }
        });
    }
    /**
     * 删除文件
     * 调用该方法删除文件
     * */
    static delFile(filePath,callback){
    	//是否备份
    	
    	fs.unlinkSync(filePath,callback);
    }
    /**
     * 请求一个restful
     * @param url
     * @return responseBody
     * */
    // static requestApi(url){
	// 	var responseBody=null;
	// 	const a = async() =>{
	// 		return new Promise(function (resolve,reject){
	// 			var req = require('http').request(url, function (res) {
	// 				res.on('data',function (chunk) {
	// 					console.log('=========>'+chunk);
	// 					responseBody= chunk;
	// 					console.log('=========>1'+responseBody);
	// 					return resolve(responseBody);
	// 				});

	// 			});
	// 			req.end();  
	// 		}); 
			
	// 	}
	// 	a().then((responseBody) =>{
	// 		console.log('=========>2'+responseBody);
	// 		return responseBody;
	// 	});
	// }
	
    static urlEncode(_target){
    	return urlencode(_target);
    }


}
module.exports = Utils;