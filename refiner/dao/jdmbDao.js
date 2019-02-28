let dbUtils  = require('../utils/dbUtils');
var log4js = require('../utils/log4js');
var refinerConfig = require('../config/refinerConfig');
const logger=log4js.getLogger();

var utils = require('../utils/utils');


class jdmbDao {

	constructor() {
		this.sequelize = dbUtils.getSequelize();
		if (!this.sequelize.isDefined('jdmb')) {
			logger.debug('简单码表关系模型未建立');
		}
		this.jdmb = this.sequelize.models.jdmb;
	}


	//查询
	findAll(obj,pageNo,pageSize) {
		var jdmb=this.jdmb;
		var where_obj = {yxbz:refinerConfig.constantVar.yxbz.yx};
		utils.createNewObject(obj,jdmb,where_obj);		
		let sequelizeParam={where: where_obj};
    	if(utils.isNotEmpty(pageNo)&&utils.isNotEmpty(pageSize)){
    		sequelizeParam.offset=((pageNo-1)*pageSize);
    		sequelizeParam.limit=pageSize;
    	}
		sequelizeParam.order=[['csdm'],['sxh'],['zdm'],	['cjsj', 'DESC']]; 
		
    	return this.jdmb.findAndCountAll(sequelizeParam);
	}

	//模糊查询
	selectJdmb(obj,pageNo,pageSize) {
		return this.jdmb.findAndCountAll({
			where: {
				csmc: {	$like: `%${obj.csmc}%`},
				zmc:{$like: `%${obj.zmc}%`},
				zdm:{$like: `%${obj.zdm}%`},
				yxbz:refinerConfig.constantVar.yxbz.yx
			},
			order: [['csdm'],['sxh'],['zdm'],['cjsj', 'DESC']],
			limit: pageSize,
			offset:(pageNo-1)*pageSize,			
		});
	}

	//增加码表
	insertJdmb(obj,transaction){
		var jdmb=this.jdmb;
		var creat_obj = {lsh:utils.generateSN(),yxbz:refinerConfig.constantVar.yxbz.yx};
		utils.createNewObject(obj,jdmb,creat_obj);				    
		logger.debug("creat_obj-------------------->"+JSON.stringify(creat_obj));
		return this.jdmb.create(creat_obj,{transaction:transaction});
    }
    
	//更新码表
	updateJdmb(obj,transaction){
		var jdmb=this.jdmb;
		var update_obj = {yxbz:refinerConfig.constantVar.yxbz.yx};
		utils.createNewObject(obj,jdmb,update_obj);	
		return this.jdmb.update(
			{yxbz:refinerConfig.constantVar.yxbz.wx},
			{where:update_obj,transaction: transaction
        });
	}

}
module.exports = jdmbDao;