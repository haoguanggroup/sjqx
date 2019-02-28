var express = require('express');
var router = express.Router();
var result = require('../models/result.js');
var log4js = require('../utils/log4js');
const logger=log4js.getLogger();
var ywtzService = require('../service/ywtzService');
var multiparty = require('multiparty');
var child_process = require("child_process");
var refinerConfig = require('../config/refinerConfig');
var utils = require('../utils/utils');
var fs = require('fs');
var path = require('path');

/** 查询信息 */
router.get('/query/:entity',(req,res) => {
	var entity=req.params.entity;
	var params=req.query;
	if('allYwtz'==entity){
		ywtzService.getAllYwtz().then(data=>{
			logger.debug('allYwtz data----->',JSON.stringify(data));
			res.json(result.resData(result.resHeadSuccess(),data));
		}).catch(err => {
            logger.error(err);
	        res.json(result.resData(result.resHeadError('获取失败'),null));  
	    });
	}
});
/**信息保存*/
router.post('/save/:entity',(req,res)=>{
	var obj=req.body;
	var entity=req.params.entity;
	ywtzService.save(entity,obj).then(data=>{
		res.json(result.resData(result.resHeadSuccess(),data));
	}).catch(err => {
        logger.error(err);
        res.json(result.resData(result.resHeadError('获取失败'),null));  
    });
});

router.post('/file/uploading', (req, res, next)=> {
	var form = new multiparty.Form();
    form.encoding = 'utf-8';
    form.uploadDir =refinerConfig.appConfig.tmpUploadPath;
    form.maxFilesSize = 20 * 1024 * 1024;
    form.parse(req, function(err, fields, files) {
    	logger.debug(JSON.stringify(fields));
	    var bm=fields.sslxbm[0];
	    var lx=fields.lx[0];
		return ywtzService.getFilePath(bm).then(pathInfo=>{
    
    		if(utils.isNotEmpty(pathInfo)){
    			utils.mkdirs(pathInfo,function(){
    	        	files.inputFile.forEach((file,index)=>{
    			          fs.renameSync(file.path,path.join(pathInfo,file.originalFilename));
    			          logger.debug(path.join(pathInfo,file.originalFilename));
    			 	});
    			});
    		}
    		ywtzService.execKettel(lx,bm);
    	}).catch(err=>{
    		logger.error(err);
    		return Promise.reject(null);
    	});
    	 res.writeHead(200, {'content-type': 'text/plain'});
         res.end(JSON.stringify(result.resData(result.resHeadSuccess(),null)));
    });
  // res.end(JSON.stringify(result.resData(result.resHeadSuccess(),null)));
});
router.get('/download',(req, res)=>{
	var lsh=req.query.lsh;
	var filePaht=req.query.filePaht;
	var wjmc=req.query.wjmc;
	if(utils.isEmpty(filePaht)){
		res.json(result.resData(result.resHeadError('处理文件编码不可为空'),null));
		return;
	}
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
module.exports = router;