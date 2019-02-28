let UserDao = require('../dao/userDao');
let CommonDao = require('../dao/commonDao');
let sqlConfig = require('../dao/sqlConfig');
const dbUtils  = require('../utils/dbUtils');
var Sequelize =  require('sequelize');
var refinerConfig = require('../config/refinerConfig');
var log4js = require('../utils/log4js');
const logger=log4js.getLogger();

class commonService {

    static init(){
    	if(!this.userDao){
    		this.userDao= new UserDao();
    	}
    	if(!this.commonDao){
    		this.commonDao= new CommonDao();
    	}
    }
	static getAllUser(){
		this.init();
		return this.userDao.findAllUser();
	}
	static deleteObj(where,lx){
		this.init();
		return this.commonDao.remove(where,lx);
	}
	static getAllObjs(_ywdx,_where,_order){
		this.init();
		
		return this.commonDao.findAllObjs(_ywdx,_where,_order);
	}
	static getDistictCsdm(){
		this.init();
		var sql=sqlConfig.sqlMap.common.distinctCsdm;
		return dbUtils.query(sql).then(datas=>{			
			return Promise.resolve(datas); 
		});
	}
	
	/**
	 * 获取简单码表
	 * */
	static getAllJdbm(){
		this.init();
		
		return this.commonDao.findAllJdmb().then(datas=>{			
			return Promise.resolve(datas); 
		});
	}
	/**
	 * 登录
	 * */
	static login(yhm,mm){
		this.init();
		return this.commonDao.loginUser(yhm,mm);
	}
	
	static testTransaction(){
		this.init();
		var jdmb={lsh:'1231',csdm:'abcd',zdm:'1',csmc:'abcd',zmc:'1',sxh:300};
	
		return dbUtils.getSequelize().transaction().then(transaction=>{
			return this.commonDao.jdmb.create(jdmb,{transaction:transaction}).then(results=>{
		    	
				transaction.commit();
		    	return Promise.resolve(result.resData(result.resHeadSuccess(),results)); 
		    }).catch(err=>{
		    	 transaction.rollback();
		    	 logger.error(err);
		    	 return Promise.reject(result.resData(result.resHeadError(err.message),null)); 
		    });
		});

	}
	    
	

}
module.exports = commonService;


