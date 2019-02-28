var express = require('express');
var router = express.Router();
var result = require('../models/result');
var utils = require('../utils/utils');
var serviceFeatureService=require('../service/serviceFeatureService');
var log4js = require('../utils/log4js');
var multiparty = require('multiparty');
var refinerConfig = require('../config/refinerConfig');
var fs = require('fs');
var path = require('path');
var logger=log4js.getLogger();
var util = require('util');
var child_process = require("child_process");




/**
 * *************************
 * 方法区
 * *************************
 * **/

//1：删除文件夹下文件
function delFile(sf){
	// 是否存在删除文件
	if(utils.equals(refinerConfig.constantVar.sf.shi,sf.sfscwj)){
		// 存在，先删除文件
		if(sf.delFiles){
			sf.delFiles.forEach((item,index)=>{
				// 查询并删除
				return serviceFeatureService.query('ywclwj',item).then(datas=>{
					datas.forEach((data,index)=>{
						utils.delFile(data.htbqwjm,()=>{logger.info('删除文件',data.htbqwjm);});
					});
					return Promise.resolve(true);
				});
			});
		}
	}
	return Promise.resolve(true);
}
//获取上传路径
function hqsjybm(bm){
	if(utils.isEmpty(bm)){
		// 设置文件存储
	    return Promise.resolve(path.join(refinerConfig.appConfig.uploadPath,utils.generateCode('uf-'))); 
	}else{
		return serviceFeatureService.query('ywclwj',{sslxbm:bm}).then(datas=>{
			if(datas.length>0){
				var htbqwjm=datas[0].htbqwjm;
				if(utils.isNotEmpty(htbqwjm))
					return Promise.resolve(path.parse(htbqwjm).dir); 
			}
		    return Promise.resolve(path.join(refinerConfig.appConfig.uploadPath,utils.generateCode('uf-'))); 
		}).catch(err=>{
			return Promise.reject(err);
		});
	}
}
//2：上传文件到夹文件
function uploadFile(req, res,sf){
	return hqsjybm(sf).then(pathInfo=>{
		if(utils.isNotEmpty(pathInfo)){
			utils.mkdirs(pathInfo,function(){
				/* 生成multiparty对象，并配置上传目标路径 */
				var form = new multiparty.Form();
				/* 设置编辑 */
				form.encoding = 'utf-8';
				form.uploadDir =pathInfo;
				// 设置文件大小限制
				form.maxFilesSize = 20 * 1024 * 1024;
				// 设置所有文件的大小总和
				// form.maxFields = 1000;
				// 上传后处理
				form.parse(req, function(err, fields, files) {
					files.inputFiles.forEach((file,index)=>{
			         // 同步重命名文件名
						fs.renameSync(file.path,path.join(pathInfo,file.originalFilename));
					});
					
			    });
				return Promise.resolve(pathInfo);
			});
		}
		return Promise.resolve(true);
	}).catch(err=>{
		logger.error(err);
		return Promise.reject(null);
	});
	
}
/**
 * *************************
 * 路由区
 * *************************
 * **/
router.post('/file/uploading', function(req, res, next) {
	var form = new multiparty.Form();
    form.encoding = 'utf-8';
    form.uploadDir =refinerConfig.appConfig.tmpUploadPath;
    // 设置文件大小限制
    form.maxFilesSize = 20 * 1024 * 1024;
    // 设置所有文件的大小总和
    // form.maxFields = 1000;
    // 上传后处理
    form.parse(req, function(err, fields, files) {
    	var bm=fields.sslxbm[0];
		logger.debug('----------------文件上传编码------------------------------',bm);
    	return hqsjybm(bm).then(pathInfo=>{
    		if(utils.isNotEmpty(pathInfo)){
    			utils.mkdirs(pathInfo,function(){
    	        	files.inputFile.forEach((file,index)=>{
    			          fs.renameSync(file.path,path.join(pathInfo,file.originalFilename));
    			          logger.debug(path.join(pathInfo,file.originalFilename));
    			 	});
    			});
    		}
    	}).catch(err=>{
    		logger.error(err);
    		return Promise.reject(null);
    	});

    	 res.writeHead(200, {'content-type': 'text/plain'});
//         res.write('received upload:\n\n');
         res.end(JSON.stringify(result.resData(result.resHeadSuccess(),null)));
    });
});
/**
 * 查询
 * */
router.get('/query/:entity',(req,res)=>{
	var entity=req.params.entity;
	var params=req.query;

	logger.debug('param====>'+JSON.stringify(params));
	var promise=serviceFeatureService.query(entity,params);
	promise.then(datas=>{
		// logger.debug('查询结果',datas);
		res.json(result.resData(result.resHeadSuccess(),datas));
	}).catch(err=>{
		res.json(result.resData(result.resHeadError(err),null));
	});
});

/**
 * 下载
 * */
router.get('/download',(req, res)=>{
	var lsh=req.query.lsh;
	var clwjbm=req.query.clwjbm;
	if(utils.isEmpty(clwjbm)){
		res.json(result.resData(result.resHeadError('处理文件编码不可为空'),null));
		return;
	}
	
	return serviceFeatureService.query('ywclwj',{clwjbm:clwjbm}).then(datas=>{
		var filePaht=datas[0].htbqwjm;
		var wjmc=datas[0].bqwj;
		logger.debug('filePaht',filePaht);
		logger.debug('wjmc',wjmc);
		fs.exists(filePaht,function(exists) {
	        if(exists) {
	        	var f = fs.createReadStream(filePaht);
	        	res.writeHead(200, {
	        		'Content-Type': 'application/force-download',
	        		'Content-Disposition': 'attachment; filename='+(utils.urlEncode(wjmc))
				});
				
				f.pipe(res);
				res.end();
	        } else {
	        	res.json(result.resData(result.resHeadError('对不起！您下载的文件不存在.'),null));
	        }
	    });
		
	});
	
});
/**
 * 保存/修改
 * */
router.post('/save/:entity',(req, res)=>{
	// var type=req.params.type;
	
	var lx=req.params.entity;
	var sf=req.body;
	var sfxg = 0;
	logger.debug("类型---->",lx);
	logger.debug("sf---->",sf);
	if(utils.equals(lx,'ywxx') || utils.equals(lx,'ywhj') || utils.equals(lx,'ywsx')){
		serviceFeatureService.save(sf,lx,sfxg).then(d3=>{
			logger.debug("d3---->",JSON.stringify(d3) );
			res.json(result.resData(result.resHeadSuccess(),d3));
			return serviceFeatureService.query('ywclwj',{sslxbm:d3.bm,sfqdwj:'1'}).then(data =>{
				var htbqwjm = data[0].htbqwjm;
				logger.debug('--------htbqwjm-------',htbqwjm);
				if(utils.equals(lx,'ywxx') || utils.equals(lx,'ywhj')){
					// var curl = refinerConfig.constantVar.curl + htbqwjm;
					// var child = child_process.exec(curl,function(err,stdout,stderr){
					// 	logger.debug('stdout',stdout);
					// });
					var curl = 'curl -u cluster:cluster http://127.0.0.1:8083/kettle/executeJob/?job=F:\\work\\kettleWork\\SJZFC.kjb';
					var child = child_process.exec(curl, function(err, stdout, stderr) {
					    console.log(stdout);
					});

				}
			});
				
		}).catch(err=>{
			res.json(result.resData(result.resHeadError(err),null));					
		});
	}
});




/**
 * 删除
 * **/
router.post('/remove/:entity',(req, res)=>{
	// var type=req.params.type;
	
	var lx=req.params.entity;
	var sf=req.body;
	
	serviceFeatureService.remove(lx,sf).then(data=>{
		res.json(result.resData(result.resHeadSuccess(),data));
	}).catch(err=>{
		logger.debug(err);
		res.json(result.resData(result.resHeadError('删除失败！'),null));
	});
});


module.exports = router;