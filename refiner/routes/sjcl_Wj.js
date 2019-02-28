

var express = require('express');
var router = express.Router();
var result = require('../models/result');
var log4js = require('../utils/log4js');
var logger=log4js.getLogger();
var path = require('path');
var sjcl_wjSevvice = require('../service/sjcl_wjSevvice');

/**
 * *************************
 * 方法区
 * *************************
 * **/
//获取时间策略
// function getSjcl_wj(obj){
//     logger.debug('cdmk');
//     return sjcl_wjSevvice.getSjcl_wj(obj);
// }


// var sjcls = getSjcl_wj({});
// logger.debug('时间策略',JSON.stringify(getSjcl_wj({})));


//


// 组装调度
// var jod = [];

// function getSchedule(sjcls){
//     var time =[];
//     sjcls.forEach((item,index) => {
//         time[index]= item;
//         var j = schedule.scheduleJob(time[index],function(){
//             logger.debug('time is ok');
//         });
//     });
    
//     // return time;
// }



// var sjcls = [{second:12,minute:15,hour:17,date:23,month:1,year:'*',dayOfWeek:'?'}];

// getSchedule(sjcls);












// router.get('/test',function(req, res){
//     var obj_cl  = {};


//     return getSjcl_wj(obj_cl).then(data =>{
//         logger.debug(data);
//     });
// });


module.exports = router;

