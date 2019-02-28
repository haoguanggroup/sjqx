var express = require('express');
var router = express.Router();
var result = require('../models/result.js');
var multer  = require('multer');
var log4js = require('../utils/log4js');
const logger=log4js.getLogger();
var dataSrcService = require('../service/dataSrcService');



/** 查询信息 */
router.get('/query/:entity',(req,res) => {
	var entity=req.params.entity;
	var params=req.query;
	if('dataSrc'==entity){
		dataSrcService.selectDataSource().then(data=>{
			res.json(result.resData(result.resHeadSuccess(),data));
		}).catch(err => {
	        res.json(result.resData(result.resHeadError('获取失败'),null));  
	    });
	}else if('dataSrcParam'==entity){
		dataSrcService.selectDataSrcParameter(params).then(data=>{
			res.json(result.resData(result.resHeadSuccess(),data));
		}).catch(err => {
	        res.json(result.resData(result.resHeadError('获取失败'),null));  
	    });
	}
});

/** 删除 */
router.post('/delete',(req,res) => {
    var _sjy = req.body;
    dataSrcService.deleteDataSrc(_sjy).then((data) =>{
        res.json(result.resData(result.resHeadSuccess(),null)); 
    }).catch(err => {
        res.json(result.resData(result.resHeadError('删除失败'),null));  
    });
});
/** 测试连接 */
router.post('/testConn',(req,res) => {
    var _sjy = req.body;
    
    dataSrcService.testConn(_sjy).then((data) =>{
    	
        res.json(result.resData(result.resHeadSuccess('测试连接成功!'),null)); 
    }).catch(err => {
    	logger.error(err);
        res.json(result.resData(result.resHeadError('测试连接失败，原因：'+err.message),null));  
    });
});

/** 保存更新 */
router.post('/updateDataSource',(req,res) => {
    var obj = req.body;
    dataSrcService.saveOrUpdateDataSource(obj).then((data) => {
        res.json(result.resData(result.resHeadSuccess(),null));
    }).catch(err => {
        logger.debug('err----->'+err);
        res.json(result.resData(result.resHeadError('保存失败')));
	});
});


module.exports = router;