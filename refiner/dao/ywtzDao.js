let dbUtils  = require('../utils/dbUtils');

var log4js = require('../utils/log4js');
const logger=log4js.getLogger();
var sequelize = dbUtils.getSequelize();
var utils = require('../utils/utils');
var Sequelize =  require('sequelize');
var refinerConfig = require('../config/refinerConfig');
var sqlConfig = require('./sqlConfig');
var DbToolsDao = require('./dbToolsDao');

class ywtzDao {
    constructor() {
		this.sequelize = dbUtils.getSequelize();
    }
    
    getAllYwtz(){
    	return dbUtils.query(sqlConfig.sqlMap.ywtz.allYwtz).then(data=>{
    		return Promise.resolve(data);
    	}).catch(err=>{
			logger.error(err);
			return Promise.reject(err);
		});;
	}
	
}

module.exports = ywtzDao;