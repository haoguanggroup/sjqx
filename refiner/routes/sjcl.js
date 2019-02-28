var express = require('express');
var router = express.Router();
var result = require('../models/result.js');
var commonService = require('../service/commonService') ;
var log4js = require('../utils/log4js');
var sjclService = require('../service/sjclService');
var refinerConfig = require('../config/refinerConfig');
var moment = require('moment');
const logger=log4js.getLogger();
var utils = require('../utils/utils');

//查询
router.post('/findAllSjcls',(req, res) =>{
    var dataObj = req.body.body;
    var sjcl = dataObj.data;
    var pageNo = dataObj.pageInfo.pageNo;  
    var pageSize = dataObj.pageInfo.pageSize; 
    sjclService.findAllSjcls(sjcl,pageNo,pageSize).then((data)=>{
        logger.debug(data.count);
        if(data.count > 0){                
            res.json(result.resData(result.resHeadSuccess(),data));
            logger.debug('data',JSON.stringify(data));
        } else{
            res.json(result.resData(result.resHeadError("未查询到结果"),null));
        }      
    });  
});

//删除时间策略
router.post('/deleteSjcl',(req,res) => {
    var dataObj = req.body.body;
    var sjclObj = dataObj.data;
	sjclService.deleteSjcl(sjclObj).then((data,err) =>{
        logger.debug('data',data);
        if(data > 0){
            res.json(result.resData(result.resHeadSuccess(),data));
        } else{          
            res.json(result.resData(result.resHeadError("删除失败"),null));
        }   
    });

});


//新增时间策略
router.post('/insertSjcl',(req,res) => {
    var yxbz = refinerConfig.constantVar.yxbz.yx;
    var dataObj = req.body.body;
    var pageNo = dataObj.pageInfo.pageNo;  
    var pageSize = dataObj.pageInfo.pageSize;
    var sjclObj = dataObj.data;
    var sjcl = {clbh:sjclObj.clbh};
	var sjcl1 = {
        clbh:utils.generateCode('dscl'),
        clmc:sjclObj.clmc,
        kssj:sjclObj.kssj,
        year:sjclObj.year,
        week:sjclObj.week,
        month:sjclObj.month,
        day:sjclObj.day,
        hour:sjclObj.hour,
        minute:sjclObj.minute,
        seconds:sjclObj.seconds,
        task:sjclObj.task,
        parameter:sjclObj.parameter,
        status:sjclObj.status,
        isworkday:sjclObj.isworkday,
        cjr:'req.session.user',
        cjsj:sjclObj.cjsj
    };
    sjclService.insertSjcl(sjcl,sjcl1,pageNo,pageSize).then((data) =>{
        if(data){
            res.json(result.resData(result.resHeadSuccess(),data));
        } else{
            res.json(result.resData(result.resHeadError("插入失败"),null));
        }   

	});
});

//更新时间策略
router.post('/updateSjcl',(req,res) => {
    var yxbz = refinerConfig.constantVar.yxbz.yx;
    var dataObj = req.body.body;
    var pageNo = dataObj.pageInfo.pageNo;  
    var pageSize = dataObj.pageInfo.pageSize;
    var sjclObj = dataObj.data;
    var sjcl1 = {clbh:sjclObj.clbh};
	var sjcl3 = {    
        clbh:sjclObj.clbh,
        clmc:sjclObj.clmc,
        kssj:sjclObj.kssj,
        year:sjclObj.year,
        week:sjclObj.week,
        month:sjclObj.month,
        day:sjclObj.day,
        hour:sjclObj.hour,
        minute:sjclObj.minute,
        seconds:sjclObj.seconds,
        task:sjclObj.task,
        parameter:sjclObj.parameter,
        status:sjclObj.status,
        isworkday:sjclObj.isworkday,
        cjr:req.session.user,
        cjsj:sjclObj.cjsj};

    sjclService.updateSjcl(sjcl1,sjcl3,pageNo,pageSize).then((data,err) =>{
        if(data){
            logger.debug('cg',JSON.stringify(data));
            res.json(result.resData(result.resHeadSuccess(),data));
        } else{
            res.json(result.resData(result.resHeadError("更新失败"),null));
        }   

	});
});




module.exports = router;