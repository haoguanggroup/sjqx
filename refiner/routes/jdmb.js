var express = require('express');
var router = express.Router();
var result = require('../models/result.js');
var commonService = require('../service/commonService') ;
var log4js = require('../utils/log4js');
var jdmbService = require('../service/jdmbService');
var refinerConfig = require('../config/refinerConfig');
var moment = require('moment');
const logger=log4js.getLogger();
var utils = require('../utils/utils');

router.post('/select/jdmb',(req,res)=>{
	//标签库查询
	var params=req.body;
	jdmbService.selectJdmb(params).then(data=>{
		res.json(result.resData(result.resHeadSuccess(),data));
	}).catch(err => {
        logger.error(err);
        res.json(result.resData(result.resHeadError(err),null));  
    });
});


router.post('/saveorupdate/jdmb',(req,res)=>{
	var params=req.body;
	jdmbService.saveorupdateJdmb(params).then(data=>{
		res.json(result.resData(result.resHeadSuccess(),data));
	}).catch(err => {
        logger.error(err);
        res.json(result.resData(result.resHeadError(err),null));  
    });
});

router.post('/deleteJdmb',(req,res)=>{
	var params=req.body;
	jdmbService.deleteJdmb(params).then(data=>{
		res.json(result.resData(result.resHeadSuccess(),data));
	}).catch(err => {
        logger.error(err);
        res.json(result.resData(result.resHeadError(err),null));  
    });
});




module.exports = router;