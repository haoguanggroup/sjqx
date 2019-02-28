let dbUtils  = require('../utils/dbUtils');
var log4js = require('../utils/log4js');
var refinerConfig = require('../config/refinerConfig');
const logger=log4js.getLogger();
var utils = require('../utils/utils');
var sqlConfig = require('./sqlConfig');

class sjcl_wjDao {

    constructor() {
		this.sequelize = dbUtils.getSequelize();
		if (!this.sequelize.isDefined('zxcl')) {
			logger.debug('执行策略表关系模型未建立');
        }
        if (!this.sequelize.isDefined('dscl')) {
			logger.debug('时间策略表关系模型未建立');
        }
        if (!this.sequelize.isDefined('ywclwj')) {
			logger.debug('业务处理文件表关系模型未建立');
		}
        this.zxcl = this.sequelize.models.zxcl;
        this.dscl = this.sequelize.models.dscl;
        this.ywclwj = this.sequelize.models.ywclwj;
    }
    
    //执行策略——文件
    getSjcl_wj(obj) {
        var sqlAndParam = sqlConfig.dynamicSql.selectSjcl_wj(obj);
        var querySql=sqlAndParam.sql;
        var queryParam=sqlAndParam.param;
        return this.sequelize.query(querySql,{replacements : queryParam,type :this.sequelize.QueryTypes.SELECT});
    }


}
module.exports = sjcl_wjDao;