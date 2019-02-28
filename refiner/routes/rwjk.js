var express = require('express');
var router = express.Router();
var result = require('../models/result.js');
var commonService = require('../service/commonService') ;
var log4js = require('../utils/log4js');
var rwjkService = require('../service/rwjkService');
var refinerConfig = require('../config/refinerConfig');
var moment = require('moment');
const logger=log4js.getLogger();
var utils = require('../utils/utils');


//查询
router.post('/findAllRwjks',(req, res) =>{
    var dataObj = req.body.body;
    var obj = dataObj.data;
    logger.debug('obj',JSON.stringify(obj));
    var pageNo = dataObj.pageInfo.pageNo;  
    var pageSize = dataObj.pageInfo.pageSize;
    rwjkService.findAllRwjks(obj,pageNo,pageSize).then((data)=>{
        if(data.length > 0){    
            for(var i = 0;i < data.length;i++){
                var kssj = utils.formatDateTime(data[i].zxkssj);
                var jssj = utils.formatDateTime(data[i].zxjssj);
                data[i].zxkssj = kssj;
                data[i].zxjssj = jssj;
            }            
            res.json(result.resData(result.resHeadSuccess(),data));
            logger.debug('data-------------->',data);
        } else{
            res.json(result.resData(result.resHeadError("未查询到结果"),null));
        }      
    });  
});

//总数
router.post('/findCount',(req, res) =>{
    var dataObj = req.body.body;
    var obj = dataObj.data;
    rwjkService.findCount(obj).then((data)=>{
        logger.debug('total',data[0].total);
        if(data[0].total > 0){                
            res.json(result.resData(result.resHeadSuccess(),data));
           // logger.debug('data',JSON.stringify(data));
        } else{
            res.json(result.resData(result.resHeadError("未查询到结果"),null));
        }      
    });  
});


//业务名称
router.post('/findAllYwxx',(req, res) =>{
    rwjkService.findAllYwxx().then((data)=>{
        if(data.length > 0){                
            res.json(result.resData(result.resHeadSuccess(),data));
            logger.debug('data',JSON.stringify(data));
        } else{
            res.json(result.resData(result.resHeadError("未查询到结果"),null));
        }      
    });  
});


//删除
router.post('/deleteYwclwj',(req,res) =>{
    var dataObj = req.body.body;
    var ywclwjObj = dataObj.data;
    rwjkService.deleteYwclwj(ywclwjObj).then((data)=>{
        if(data > 0){                
            res.json(result.resData(result.resHeadSuccess(),data));
            logger.debug('data',data);
        } else{
            res.json(result.resData(result.resHeadError("删除失败"),null));
        }      
    });  
})

module.exports = router;