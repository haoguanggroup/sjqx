let dbUtils  = require('../utils/dbUtils');

var log4js = require('../utils/log4js');
const logger=log4js.getLogger();
var sequelize = dbUtils.getSequelize();

var utils = require('../utils/utils');
var Sequelize =  require('sequelize');
var refinerConfig = require('../config/refinerConfig');

class DataSourceDao {
    constructor() {
		this.sequelize = dbUtils.getSequelize();
		if (!this.sequelize.isDefined('sjypz')) {
			logger.debug('数据源关系模型未建立');
		}
		this.sjypz = this.sequelize.models.sjypz;
		this.sjylxpz = this.sequelize.models.sjylxpz;
    }
    
    findDataSource(){
		//return this.sjypz.findAll();
		return this.sequelize.query("SELECT DISTINCT(sjymc) FROM ty_sjypz WHERE yxbz = '1'",{
			type : sequelize.QueryTypes.SELECT
		});
	}
	
	findDataBase(sjymc){
		if(!sjymc){
			return Promise.reject('数据源名称不能为空!');
		}
		
    	return this.sequelize.query("select distinct TABLE_SCHEMA from information_schema.tables,ty_sjypz a WHERE a.sjymc = ? AND a.yxbz = '1' AND sjylx = 'mysql'",{
			replacements : [sjymc],
			type : sequelize.QueryTypes.SELECT
		});
	}

	findDataTable(sjbmc){
		if(!sjbmc){
			return Promise.reject('数据源名称不能为空!');
		}
		
    	return this.sequelize.query("select distinct TABLE_NAME from information_schema.tables where TABLE_SCHEMA = ?",{
			replacements : [sjbmc],
			type : sequelize.QueryTypes.SELECT
		});
	}

	findDataParameter(sjymc){
    	if (!sjymc) {
            return Promise.reject('数据源名称不能为空');
        }
		return this.sequelize.query("SELECT b.*,a.csmc FROM refiner2.ty_sjylxpz a RIGHT JOIN refiner2.ty_sjypz b ON a.csdm = b.csdm WHERE a.yxbz = 1 AND b.yxbz = 1 AND b.sjymc = ?",{
			replacements : [sjymc],
			type : sequelize.QueryTypes.SELECT
		});
	}

	delete(lshs, transaction) {
        if (!lshs) {
            return Promise.reject('删除数据源错误，修改数据不能为空');
		}
		lshs.forEach((data,index)=>{
			
			return this.sjypz.update({ yxbz: refinerConfig.constantVar.yxbz.wx }, { where: { lsh: data, yxbz: refinerConfig.constantVar.yxbz.yx }, transaction: transaction});
		});
		return Promise.resolve(true);
	}
	
    add(obj, transaction) {
        if (!obj) {
           return Promise.reject( '新增数据源错误，数据源信息不能为空');
		}
		
		var sjyObj = [];
		obj.forEach((data,index)=>{
			var tempObj = {
				lsh: utils.generateSN(),
				cjr: data.cjr,
				yxbz: refinerConfig.constantVar.yxbz.yx,
				sjylx: data.sjylx,
				sjydm: data.sjydm,
				sjymc: data.sjymc,
				csdm: data.csdm,
				csz: data.csz
			};
			sjyObj.push(tempObj)
		});
		return this.sjypz.bulkCreate(sjyObj, {transaction: transaction,ignoreDuplicates : true});	
	}

	insertDataSource(sjyObj){		    
		return this.ywbqdxBq.bulkCreate(sjyObj);
	}
	
	testConnect(obj){
		if(!obj){
			return Promise.reject( '数据库连接信息不能有空');
		}
		var sequelize = null;
    	try {
			sequelize = new Sequelize('refiner2',obj.user, obj.password, {
				host: obj.host,
				dialect: obj.type,
				port: obj.port,
			});
		} catch (error) {
			throw error;
		}
		return sequelize;
	}
}

module.exports = DataSourceDao;