var Sequelize =  require('sequelize');
var refinerConfig = require('../config/refinerConfig');

var log4js = require('./log4js');
const logger=log4js.getLogger();
const Op = Sequelize.Op;

const operatorsAliases = {
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



var sequelize = null;
class dbUtils {
	static getSequelize() {
		if (sequelize) {
			logger.debug('获取-----------sequelize');			
			return sequelize;
		}
		try {
			logger.debug('获取初始 sequelize');
			sequelize = new Sequelize(refinerConfig.dbConfig.database, refinerConfig.dbConfig.user, refinerConfig.dbConfig.password, {
				host: refinerConfig.dbConfig.host,
				dialect: refinerConfig.dbConfig.type,
				port: refinerConfig.dbConfig.port,
				pool: {
					max: refinerConfig.dbConfig.max,
					min: refinerConfig.dbConfig.min,
					idle: refinerConfig.dbConfig.idle
				},
				timezone:refinerConfig.dbConfig.timezone,
				operatorsAliases:operatorsAliases
			});
		} catch (error) {
			logger.error('连接数据库失败。'+error);
			throw error;
		}

		return sequelize;
	}
	static query(sql){
		return this.getSequelize().query(sql,{type:Sequelize.QueryTypes.SELECT});
	}
	static query(sql,params){
		return this.getSequelize().query(sql,{type:Sequelize.QueryTypes.SELECT,replacements:params});
	}
  static execSql(sql,params){
    return this.getSequelize().query(sql,{replacements:params});
  }
  static execSql(sql,params,t){
    return this.getSequelize().query(sql,{type:Sequelize.QueryTypes.UPDATE,replacements:params,transaction:t});
  }
}

module.exports = dbUtils;