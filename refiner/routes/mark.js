var express = require('express');
var router = express.Router();
var result = require('../models/result.js');
var multer  = require('multer');
var log4js = require('../utils/log4js');
const logger=log4js.getLogger();
var markService = require('../service/markService');



/** 查询信息 */
router.get('/query/:entity',(req,res) => {
	var entity=req.params.entity;
	var params=req.query;
	if('dataSrc'==entity){
		markService.selectDataSource().then(data=>{
			logger.debug("---------------->"+data);
			res.json(result.resData(result.resHeadSuccess(),data));
		}).catch(err => {
            logger.error(err);
	        res.json(result.resData(result.resHeadError('获取失败'),null));  
	    });
	}else if('dataSrcYwbqdx'==entity){
		markService.selectDataSrcYwbqdx().then(data=>{
			logger.debug("---------------->"+data);
			res.json(result.resData(result.resHeadSuccess(),data));
		}).catch(err => {
            logger.error(err);
	        res.json(result.resData(result.resHeadError('获取失败'),null));  
	    });
	}else if('tableColumns'==entity){
		markService.selectTableColumns(params).then(data=>{
			res.json(result.resData(result.resHeadSuccess(),data));
		}).catch(err => {
            logger.error(err);
	        res.json(result.resData(result.resHeadError('获取失败'),null));  
	    });
	}else if('markColumns'==entity){
		markService.selectMarkColumns(params).then(data=>{
			res.json(result.resData(result.resHeadSuccess(),data));
		}).catch(err => {
            logger.error(err);
	        res.json(result.resData(result.resHeadError(err),null));  
	    });
	}else if('bqywdx'==entity){
		markService.selectBqywdx(params).then(data=>{

			res.json(result.resData(result.resHeadSuccess(),data));
		}).catch(err => {
            logger.error(err);
	        res.json(result.resData(result.resHeadError(err),null));  
	    });
	}

});

/** 保存信息 */
router.post('/update',(req,res) => {
	var sjywdx=req.body.sjywdx;
	var ywbqdxBq=req.body.ywbqdxBq;
	markService.saveOrUpdateMark(sjywdx,ywbqdxBq).then(d1=>{
		res.json(result.resData(result.resHeadSuccess(),d1));
	}).catch(err => {
        logger.error(err);
        res.json(result.resData(result.resHeadError(err.message),null));  
    });
});
/** 删除 */
router.post('/delete',(req,res) => {
	var sjywdx=req.body.sjywdx;
	markService.delete(sjywdx).then(d1=>{
		res.json(result.resData(result.resHeadSuccess(),d1));
	}).catch(err => {
        logger.error(err);
        res.json(result.resData(result.resHeadError(err.message),null));  
    });
});

/****标签库begin**************/
router.post('/select/bqk',(req,res)=>{
	//标签库查询
	var params=req.body;
	markService.selectBqk(params).then(data=>{
		res.json(result.resData(result.resHeadSuccess(),data));
	}).catch(err => {
        logger.error(err);
        res.json(result.resData(result.resHeadError(err),null));  
    });
});
router.post('/saveorupdate/bqk',(req,res)=>{
	var params=req.body;
	markService.saveorupdateBqk(params).then(data=>{
		res.json(result.resData(result.resHeadSuccess(),data));
	}).catch(err => {
        logger.error(err);
        res.json(result.resData(result.resHeadError(err),null));  
    });
});
router.post('/deleteBq',(req,res)=>{
	var params=req.body;
	markService.deleteBqk(params).then(data=>{
		res.json(result.resData(result.resHeadSuccess(),data));
	}).catch(err => {
        logger.error(err);
        res.json(result.resData(result.resHeadError(err),null));  
    });
});
/****标签库end**************/

module.exports = router;