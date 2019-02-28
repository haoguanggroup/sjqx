var Sequelize =  require('sequelize');
var refinerConfig = require('../config/refinerConfig');

var dbUtils = require('../utils/dbUtils');
var log4js = require('../utils/log4js');
var sqlConfig = require('../dao/sqlConfig');
var logger=log4js.getLogger();
var Op = Sequelize.Op;

var operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};
var db = {};
var dbinfo = {};
class AllDbUtils{
	static getDbTools(_sjybm){
		if(db[_sjybm]){
			logger.info('直接获取已存在的资源！！！');
			return Promise.resolve(db[_sjybm]);
		}else{
			logger.info('第一次初始化资源！！！');
			return this.getDbInfo(_sjybm).then(sjyxx=>{
				db[_sjybm]=this.getSequelize(sjyxx);
				return Promise.resolve(db[_sjybm]);
			}).catch(err=>{
				logger.error(err);
				return Promise.reject(err);
			});			
		}
	}
	static clearDbInfo(){
		db={};
		dbinfo={};
	}
	static getDbInfo(_sjybm){
		if(dbinfo[_sjybm]){
			return Promise.resolve(dbinfo[_sjybm]);
		}else{
			return dbUtils.query(sqlConfig.sqlMap.dbTools.datasource,[_sjybm]).then(data=>{
				var _sjyxx={};
				if(data.length>0){
					_sjyxx.sjylx=data[0].sjylx;
					data.forEach(item=>{
						_sjyxx[item.csdm]=item.csz;
					});
				}
				dbinfo[_sjybm]=_sjyxx;
				return Promise.resolve(dbinfo[_sjybm]);
			}).catch(err=>{
				logger.error(err);
				return Promise.reject(err);
			});
		}
	}
	
	static getSequelize(_sjyxx) {
		var sequelize=null;
		if(_sjyxx){
			try {
				logger.debug('获取初始 sequelize');
				sequelize = new Sequelize(_sjyxx.database, _sjyxx.user, _sjyxx.password, {
					host: _sjyxx.host,
					dialect: _sjyxx.sjylx.toLowerCase(),
					port: _sjyxx.port,
//					pool: {
//						max: _sjyxx.max,
//						min: _sjyxx.min,
//						idle: _sjyxx.idle
//					},
					timezone:refinerConfig.dbConfig.timezone,
					operatorsAliases:operatorsAliases
				});
			} catch (error) {
				logger.error('连接数据库失败。'+error);
				throw error;
			}
		}
		return sequelize;
	}
	
	
}

module.exports = AllDbUtils;