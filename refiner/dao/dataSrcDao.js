let dbUtils  = require('../utils/dbUtils');

var log4js = require('../utils/log4js');
const logger=log4js.getLogger();
var sequelize = dbUtils.getSequelize();
var utils = require('../utils/utils');
var allDbUtils = require('../utils/allDbUtils');
var Sequelize =  require('sequelize');
var refinerConfig = require('../config/refinerConfig');
var sqlConfig = require('./sqlConfig');
var DbToolsDao = require('./dbToolsDao');

class DataSrcDao {
    constructor() {
		this.sequelize = dbUtils.getSequelize();
		if (!this.sequelize.isDefined('sjypz')) {
			logger.debug('数据源关系模型未建立');
		}
		this.sjypz = this.sequelize.models.sjypz;
		this.sjylxpz = this.sequelize.models.sjylxpz;
    }
    
    findDataSource(){
		return dbUtils.query(sqlConfig.sqlMap.sf.datasource);
	}
	findDataSrcParameter(_param){
		var param=sqlConfig.dynamicSql.getSjy(_param);
		return dbUtils.query(param.sql,param.param);		
	}
	saveDataSrc(_ds, _t){
		return this.sjypz.bulkCreate(_ds, {transaction: _t,ignoreDuplicates : true});
	}

	
	deleteDataSrc(_ds, _t) {
		return this.sjypz.update({ yxbz: refinerConfig.constantVar.yxbz.wx }, { where: { sjydm:_ds.sjydm, yxbz: refinerConfig.constantVar.yxbz.yx }, transaction:  _t});
	}
	
	testConn(_ds){
		var dbTools=new DbToolsDao(allDbUtils.getSequelize(_ds));
		return dbTools.testConn(_ds.sjylx);
	}
	
}

module.exports = DataSrcDao;