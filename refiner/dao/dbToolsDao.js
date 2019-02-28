var Sequelize =  require('sequelize');
var refinerConfig = require('../config/refinerConfig');

var dbUtils = require('../utils/dbUtils');
var log4js = require('../utils/log4js');
var allDbUtils = require('../utils/allDbUtils');

var utils = require('../utils/utils');
var sqlConfig = require('./sqlConfig');
const logger=log4js.getLogger();


class dbToolsDao {
	constructor(_seq) {
		this._sequelize = _seq;
    }

	getSequelize(){
		return this._sequelize;
	}
	query(sql){
		return this._sequelize.query(sql,{type:Sequelize.QueryTypes.SELECT});
	}
	query(sql,params){
		return this._sequelize.query(sql,{type:Sequelize.QueryTypes.SELECT,replacements:params});
	}
	
	testConn(_sjylx){
		var sql=null;
		if(utils.equals(_sjylx.toLowerCase(),'mysql')){
			sql=sqlConfig.sqlMap.dbTools.testMysqlConn;
		}
		return this._sequelize.query(sql,{type:Sequelize.QueryTypes.SELECT});
	}
}

module.exports = dbToolsDao;