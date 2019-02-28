let dbUtils  = require('../utils/dbUtils');
var log4js = require('../utils/log4js');
var refinerConfig = require('../config/refinerConfig');
var sqlConfig = require('./sqlConfig');
const logger=log4js.getLogger();

var utils = require('../utils/utils');


class rwjkDao {

	constructor() {
		this.sequelize = dbUtils.getSequelize();
		if (!this.sequelize.isDefined('ywxx')) {
			logger.debug('业务信息表关系模型未建立');
        }
        if (!this.sequelize.isDefined('ywclwj')) {
			logger.debug('业务处理文件表关系模型未建立');
        }
        if (!this.sequelize.isDefined('bqwjzxrz')) {
			logger.debug('标签文件执行任务表关系模型未建立');
        }
        
        this.ywxx = this.sequelize.models.ywxx;
        this.ywclwj = this.sequelize.models.ywclwj;   
        this.bqwjzxrz = this.sequelize.models.bqwjzxrz;     
	}

    //查询任务
    findAllRw(obj,pageNo,pageSize) {
        var sqlAndParam= sqlConfig.dynamicSql.findAllRw(obj,pageNo,pageSize);
        var querySql=sqlAndParam.sql;
        var queryParam=sqlAndParam.param;
        return this.sequelize.query(querySql,{replacements : queryParam,type :this.sequelize.QueryTypes.SELECT});
    }

    //总数
    findCount(obj) {
        var sqlAndParam= sqlConfig.dynamicSql.findCount(obj);
        var querySql=sqlAndParam.sql;
        var queryParam=sqlAndParam.param;
        return this.sequelize.query(querySql,{replacements : queryParam,type :this.sequelize.QueryTypes.SELECT});
    }

    //查询业务信息
    findAllYwxx() {		
    	return this.ywxx.findAll({
			where:{yxbz:refinerConfig.constantVar.yxbz.yx}	
		});
	}

    //更新
	updateYwclwj(obj,transaction){
		var ywclwj=this.ywclwj;
        var update_obj = {yxbz:refinerConfig.constantVar.yxbz.yx};
        logger.debug('bm1-----------1>',JSON.stringify(obj));
        utils.createNewObject(obj,ywclwj,update_obj);	
        logger.debug('bm2-----------2>',JSON.stringify(update_obj));
		return this.ywclwj.update(
			{yxbz:refinerConfig.constantVar.yxbz.wx},
			{where:update_obj,transaction: transaction
        });
	}
    

}
module.exports = rwjkDao;