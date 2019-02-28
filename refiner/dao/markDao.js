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

class markDao {
    constructor() {
		this.sequelize = dbUtils.getSequelize();
    }
    
    getYwbqdx(_sjydm){
    	return this.sequelize.models.ywbqdx.findAll({where:{yxbz:refinerConfig.constantVar.yxbz.yx,sjydm:_sjydm}});
	}
	getDataBaseTable(_sjydm){
		return allDbUtils.getDbTools(_sjydm).then(_seq=>{
			var dbTools=new DbToolsDao(_seq);
			if(dbTools.getSequelize()&&dbTools.getSequelize().config){
				return allDbUtils.getDbInfo(_sjydm).then(dbinfo=>{
					var _target=sqlConfig.dynamicSql.mark.getDataBaseTable(dbinfo);
					return dbTools.query(_target.sql,_target.param).then(data=>{
						return Promise.resolve(data);
					}).catch(err=>{
						logger.error(err);
						return Promise.reject(err);
					});
				}).catch(err=>{
					logger.error(err);
					return Promise.reject(err);
				});
			
			}else
				return Promise.reject(null);
		}).catch(err=>{
			logger.error(err);
			return Promise.reject(err);
		});
	}
	selectTableColumns(_sjydm,_tn){
		return allDbUtils.getDbTools(_sjydm).then(_seq=>{
			var dbTools=new DbToolsDao(_seq);
			if(dbTools.getSequelize()&&dbTools.getSequelize().config){
				return allDbUtils.getDbInfo(_sjydm).then(dbinfo=>{
					dbinfo.tableName=_tn;
					var _target=sqlConfig.dynamicSql.mark.getTableColumns(dbinfo);
					return dbTools.query(_target.sql,_target.param).then(data=>{
						return Promise.resolve(data);
					}).catch(err=>{
						logger.error(err);
						return Promise.reject(err);
					});
				}).catch(err=>{
					logger.error(err);
					return Promise.reject(err);
				});
			}else
				return Promise.reject(null);
		}).catch(err=>{
			logger.error(err);
			return Promise.reject(err);
		});
	}
}

module.exports = markDao;