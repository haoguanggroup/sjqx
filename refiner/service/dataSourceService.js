let DataSourceDao = require('../dao/dataSourceDao');

var log4js = require('../utils/log4js');
const logger=log4js.getLogger();
var refinerConfig = require('../config/refinerConfig');
var dbUtils  = require('../utils/dbUtils');

class dataSourceService {
    static init(){
    	if(!this.dataSourceDao){
    		this.dataSourceDao= new DataSourceDao();
    	}
    }

    static selectDataSource(){
		this.init();
		return this.dataSourceDao.findDataSource();
	}
	
	static selectDataBase(sjymc){
		this.init();
		return this.dataSourceDao.findDataBase(sjymc);
	}

	static selectDataTable(sjbmc){
		this.init();
		return this.dataSourceDao.findDataTable(sjbmc);
	}
	
	static selectDataParameter(sjymc){
		this.init();
		return this.dataSourceDao.findDataParameter(sjymc);
	}
	
	static updateDataSource(obj){
		this.init();
		var lshs = [];
		obj.forEach((data,index) => {
			lshs.push(data.lsh);
		});
		return dbUtils.getSequelize().transaction().then(t=>{
			return this.dataSourceDao.delete(lshs,t).then(d1=>{
				return this.dataSourceDao.add(obj,t).then(d2=>{
					t.commit();
					return Promise.resolve(true);
				}).catch(err=>{
					t.rollback();
					return Promise.reject(err);
				});	
			}).catch(err=>{
				t.rollback();
				return Promise.reject(err);
			});
		}).catch(err=>{
			return Promise.reject(err);
		});
	}

	static insertDataSource(obj){
		this.init();
		var sjyObj = [];
		obj.forEach((data,index)=>{
			sjyObj.push({sjywdx:data.sjywdx,zdlx:data.zdlx,zdm:data.zdm,zdzj:data.zdzj,lsh:utils.generateSN(),yxbz:refinerConfig.constantVar.yxbz.yx});
		});
		return this.dataSourceDao.insertDataSource(sjyObj);
	}

	static testConnectService(obj){
		this.init();
		var sequelize = this.dataSourceDao.testConnect(obj);
		if(sequelize){
			return 'cg';
		}else{
			return 'sb';
		}
	}
}

module.exports = dataSourceService;