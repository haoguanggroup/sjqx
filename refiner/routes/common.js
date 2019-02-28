var express = require('express');
var router = express.Router();
var result = require('../models/result.js');
var log4js = require('../utils/log4js');
var commonService=require('../service/commonService');
var refinerConfig = require('../config/refinerConfig');
var logger=log4js.getLogger();
var utils = require('../utils/utils');
var fs = require('fs');

router.get('/getSn',(req,res)=>{
	res.json(result.resData(result.resHeadSuccess(),{sn:utils.generateSN()}));
});
router.get('/getObj/:ywdx',(req,res)=>{
	var ywdx=req.params.ywdx;
	var where=req.query;
	commonService.getAllObjs(ywdx,where).then(datas=>{
		res.json(result.resData(result.resHeadSuccess(),datas));
	}).catch(err=>{
		res.json(result.resData(result.resHeadError(),null));
	});
});
router.post('/delObj/:ywdx',(req,res)=>{	
	var where=req.body;
	commonService.deleteObj(where,req.params.ywdx).then(datas=>{
		res.json(result.resData(result.resHeadSuccess(),null));
	}).catch(err=>{
		res.json(result.resData(result.resHeadError(),null));
	});
});
router.get('/getObjOrder/:ywdx',(req,res)=>{
	var ywdx=req.params.ywdx;
	var where=req.query.where;
	var order=req.query.order;
	commonService.getAllObjs(ywdx,where,order).then(datas=>{
		res.json(result.resData(result.resHeadSuccess(),datas));
	}).catch(err=>{
		res.json(result.resData(result.resHeadError(),null));
	});
});
router.get('/allCsdm',(req,res)=>{
	var ywdx=req.params.ywdx;
	var where=req.query;
	commonService.getDistictCsdm().then(datas=>{
		res.json(result.resData(result.resHeadSuccess(),datas));
	}).catch(err=>{
		res.json(result.resData(result.resHeadError(),null));
	});
});

router.get('/download/:fn', (req, res)=> {
	var wjmc=req.params.fn;
	var path="E:\\kettleHome\\uploadFiles\\uf-201901155321\\"+wjmc;
	fs.exists(path,function(exists) {
        if(exists) {
        	var f = fs.createReadStream(path);
        	res.writeHead(200, {
        		'Content-Type': 'application/force-download',
        		'Content-Disposition': 'attachment; filename='+wjmc
        	});
        	f.pipe(res);
        	//res.json(result.resData(result.resHeadSuccess('下载成功！'),{fileName:wjmc}));
        } else {
        	res.json(result.resData(result.resHeadError('对不起！您下载的文件不存在.'),null));
        }
    });
	
	
});

router.get('/getPager',(req,res)=>{
	res.json(result.resData(result.resHeadSuccess(),refinerConfig.constantVar.pageInfo));
});
router.post('/login',(req,res)=>{
	commonService.login(req.body.userName,req.body.password).then(datas=>{
		if(utils.isNotEmpty(datas)&&datas.length>0){
			res.json(result.resData(result.resHeadSuccess(),datas[0]));
		}else{
			res.json(result.resData(result.resHeadLoginError(),null));				
		}
	}).catch(err=>{
		res.json(result.resData(result.resHeadLoginError(),null));
	});
});
router.post('/testPost',(req,res)=>{
	//get body参数 及 路径 ？后的参数
	logger.debug('req.query====>',JSON.stringify(req.query));
	//路径上的参数
	logger.debug('req.params====>',JSON.stringify(req.params));
	//post body参数 
	
	logger.debug('req.body.name====>',JSON.stringify(req.body.name));
	
	res.json(result.resData(result.resHeadSuccess(),{sn:utils.generateSN()}));
});
module.exports = router;