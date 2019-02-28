var dbUtils  = require('../utils/dbUtils');
var log4js = require('../utils/log4js');
var sqlConfig = require('./sqlConfig');
var logger=log4js.getLogger();

var utils = require('../utils/utils');
var refinerConfig = require('../config/refinerConfig');

class serviceFeatureDao {
	
	constructor() {
		this.sequelize = dbUtils.getSequelize();
		if (!this.sequelize.isDefined('ywxx')) {
			logger.error('业务信息模型未建立！');
		}
		if (!this.sequelize.isDefined('ywhj')) {
			logger.error('业务信息模型未建立！');
		}
		if (!this.sequelize.isDefined('ywsx')) {
			logger.error('业务信息模型未建立！');
		}
		if (!this.sequelize.isDefined('ywclwj')) {
			logger.error('业务信息模型未建立！');
		}
	}
	
	queryDatasource(){		
		return dbUtils.query(sqlConfig.sqlMap.sf.datasource);
		
		//return this.sequelize.models['sjypz'].findAll({attributes: ['sjydm', 'sjymc'],where:{yxbz:refinerConfig.constantVar.yxbz.yx}});
	}

	query2(lx,param){
		var tmp=this.sequelize.models[lx].findAll(param);
		return tmp;
	}
	
	query(lx,param){
		var queryParam={};
		if(utils.isEmpty(queryParam.where)){
			queryParam['where']={};
		}
		if(utils.isEmpty(queryParam.where.yxbz)){
			queryParam.where['yxbz']=refinerConfig.constantVar.yxbz.yx;
		}
		queryParam.where=utils.createNewObject(param,this.sequelize.models[lx],queryParam.where);
		var tmp=this.sequelize.models[lx].findAll(queryParam);
		return tmp;
	}
	
	save(obj,lx,t){
		if(utils.equals('ywxx',lx)){
			return this.sequelize.models.ywxx.create(obj,{transaction:t});			
		}else if(utils.equals('ywhj',lx)){
			return this.sequelize.models.ywhj.create(obj,{transaction:t});
		}else if(utils.equals('ywsx',lx)){
			return this.sequelize.models.ywsx.create(obj,{transaction:t});
		}else if(utils.equals('ywclwj',lx)){
			return this.sequelize.models.ywclwj.bulkCreate(obj);
		}else if(utils.equals('zxcl',lx)){
			return this.sequelize.models.zxcl.bulkCreate(obj);
		}else if(utils.equals('ywclwj-dg',lx)){
			return this.sequelize.models.ywclwj.create(obj,{transaction:t});
		}
	}
	remove(where,lx,t){
		var obj={yxbz:refinerConfig.constantVar.yxbz.wx};
		var where_obj = utils.createNewObject(where,this.sequelize.models[lx],where_obj);
		if(utils.equals('ywxx',lx)){
			return this.sequelize.models.ywxx.update(obj,{where:where_obj,transaction:t});			
		}else if(utils.equals('ywhj',lx)){
			return this.sequelize.models.ywhj.update(obj,{where:where_obj,transaction:t});
		}else if(utils.equals('ywsx',lx)){
			return this.sequelize.models.ywsx.update(obj,{where:where_obj,transaction:t});
		}else if(utils.equals('ywclwj',lx)){
			return this.sequelize.models.ywclwj.update(obj,{where:where_obj,transaction:t});
		}
	}
	
	
}
module.exports = serviceFeatureDao;