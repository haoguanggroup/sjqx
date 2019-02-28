var ywtzDao = require('../dao/ywtzDao');
var dataSrcDao = require('../dao/dataSrcDao');
var commonDao = require('../dao/commonDao');
var sqlConfig = require('../dao/sqlConfig');
var log4js = require('../utils/log4js');
var logger=log4js.getLogger();
var refinerConfig = require('../config/refinerConfig');
var dbUtils  = require('../utils/dbUtils');
var utils = require('../utils/utils');
var path = require('path');
var _ = require('lodash');
var ywtzService = require("./ywtzService");

var schedule = require('node-schedule');

var allScheduleParams=[];
var allSchedule=[];
class scheduleService {
 	static init(){
        if(!this.commonDao){
    		this.commonDao= new commonDao();
    	}
    }
    static initScheduleParam(_clbh,target){
        var _this=this;
        _this.init();
        var dd=[];
        target.forEach(item=>{
            var obj={clbh:item.clbh,clmc:item.clmc, kssj:item.kssj,seconds:item.seconds
                ,minute:item.minute,hour:item.hour,day:item.day,month:item.month
                ,week:item.week,year:item.year,jssj:item.jssj};
            if(utils.isNotEmpty(_clbh)){
                if(utils.equals(_clbh,item.clbh)){
                    dd.push(obj);
                }
            }else
                dd.push(obj);
        });
        dd=_.uniqWith(dd,_.isEqual);

        dd.forEach((item,index)=>{
            var scheduleParam={rule:_this.createRule(item)};
            var obj=_.find(allScheduleParams,{clbh:item.clbh});
            if(utils.isNotEmpty(obj)){
                allScheduleParams.splice(allScheduleParams.indexOf(obj),1);
            }
            var temp="";
            if (utils.isNotEmpty(item.kssj)) {
                // scheduleParam.start=item.kssj;
                scheduleParam.start= new Date(item.kssj.getTime());
                temp=temp+'开始调度时间为：'+utils.formatDateTime(item.kssj);
            }
            if (utils.isNotEmpty(item.jssj)) {
                // scheduleParam.end=item.kssj;
                scheduleParam.end = new Date(item.jssj.getTime()+ 10000);
                temp=temp+'终止调度时间为：'+utils.formatDateTime(item.kssj);
            }
            logger.info(item.clmc+" is load"+temp);               
            allScheduleParams.push({clbh:item.clbh,clmc:item.clmc,scheduleParam:scheduleParam,dscl:item});
        });
    }
    static async start(_clbh,_data){
        this.init();
        var _this=this;
        if(utils.isNotEmpty(_clbh)){
            var scheduleParam=_.find(allScheduleParams,{clbh:_clbh});
            if(utils.isEmpty(_data)){
                _data= await this.getAllSchedule();
            }
            var obj=_.find(allSchedule,{clbh:_clbh});
            if(utils.isNotEmpty(obj)){
                obj.job.cancel();
                allSchedule.splice(allSchedule.indexOf(obj),1);
            }
            var job=schedule.scheduleJob(scheduleParam.scheduleParam, function(){
                logger.info('定时策略：'+scheduleParam.clmc+'('+scheduleParam.clbh+') 任务启动...');

                var dzxs=_.filter(_data,scheduleParam.dscl);
                dzxs.forEach(data=>{
                    logger.info('定时策略：'+scheduleParam.clmc+'('+scheduleParam.clbh+') 执行('+data.mc+','+data.bm+','+data.clwjlx+')文件 '+data.bqwj);
                    ywtzService.execFile(data.htbqwjm);
                });
            }); 
            allSchedule.push({clbh:scheduleParam.clbh,job:job});
        }else{
             if(utils.isEmpty(_data)){
                    _data= await this.getAllSchedule();
             }
            allScheduleParams.forEach(scheduleParam=>{
               
                this.start(scheduleParam.clbh,_data);
            });
        }

        
    }
    static stop(_clbh){
        this.init();
        if(utils.isNotEmpty(_clbh)){
            var obj=_.find(allSchedule,{clbh:_clbh});
            var param=_.find(allScheduleParams,{clbh:_clbh});

            if(utils.isNotEmpty(obj)){
                obj.job.cancel();
                allSchedule.splice(allSchedule.indexOf(obj),1);
                allScheduleParams.splice(allScheduleParams.indexOf(param),1);
            }
        }else{
            allSchedule.forEach((item,index)=>{
                this.stop(item.clbh);
            });
        }
        
    }

    static createRule(item){
       return utils.changeEmptyToOther(item.seconds,'*')
         +' '+utils.changeEmptyToOther(item.minute,'*')
         +' '+utils.changeEmptyToOther(item.hour,'*')
         +' '+utils.changeEmptyToOther(item.day,'*')
         +' '+utils.changeEmptyToOther(item.month,'*')
         +' '+utils.changeEmptyToOther(item.week,'*');

    }
    static getAllSchedule(){
        this.init();
        return dbUtils.query(sqlConfig.sqlMap.dscl.allDscl);
    }
    static async initAllSchedule(){
        this.init();
        var _this=this;
        _this.stop();
        var target= await _this.getAllSchedule();
        logger.info('allScheduleParams--------->',allScheduleParams);
        _this.initScheduleParam(null,target);
        logger.info('allScheduleParams--------->',allScheduleParams);
        logger.info('allSchedule--------->',allSchedule);
        _this.start(null,target);
        logger.info('allSchedule--------->',allSchedule);
    }

}
module.exports = scheduleService;