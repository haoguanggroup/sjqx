let dbUtils  = require('../utils/dbUtils');
var log4js = require('../utils/log4js');
var refinerConfig = require('../config/refinerConfig');
const logger=log4js.getLogger();
var utils = require('../utils/utils');


class sjclDao {

	constructor() {
		this.sequelize = dbUtils.getSequelize();
		if (!this.sequelize.isDefined('dscl')) {
			logger.debug('时间策略表关系模型未建立');
		}
		this.dscl = this.sequelize.models.dscl;
	}


	//查询
	findAll(obj,pageNo,pageSize) {
		var dscl=this.dscl;
		var where_obj = {yxbz:refinerConfig.constantVar.yxbz.yx};
		utils.createNewObject(obj,dscl,where_obj);		
		let sequelizeParam={where: where_obj};
    	if(utils.isNotEmpty(pageNo)&&utils.isNotEmpty(pageSize)){
    		sequelizeParam.offset=((pageNo-1)*pageSize);
    		sequelizeParam.limit=pageSize;
    	}
		sequelizeParam.order=[['kssj', 'DESC'],['cjsj', 'DESC']]; 
		
    	return this.dscl.findAndCountAll(sequelizeParam);
	}


	//增加
	insertSjcl(obj,transaction){
		var dscl=this.dscl;
		var creat_obj = {lsh:utils.generateSN(),yxbz:refinerConfig.constantVar.yxbz.yx};
		utils.createNewObject(obj,dscl,creat_obj);				    
		logger.debug("creat_obj-------------------->"+JSON.stringify(creat_obj));
		return this.dscl.create(creat_obj,{transaction:transaction});
    }
    
	//更新
	updateSjcl(obj,transaction){
		var dscl=this.dscl;
		var update_obj = {yxbz:refinerConfig.constantVar.yxbz.yx};
		utils.createNewObject(obj,dscl,update_obj);	
		return this.dscl.update(
			{yxbz:refinerConfig.constantVar.yxbz.wx},
			{where:update_obj,transaction: transaction
        });
	}

}
module.exports = sjclDao;