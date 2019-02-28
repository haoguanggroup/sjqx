let dataSrcDao = require('../dao/dataSrcDao');

var log4js = require('../utils/log4js');
const logger=log4js.getLogger();
var refinerConfig = require('../config/refinerConfig');
var dbUtils  = require('../utils/dbUtils');
var allDbUtils = require('../utils/allDbUtils');
var utils = require('../utils/utils');
class dataSourceService {
    static init(){
    	if(!this.dataSourceDao){
    		this.dataSrcDao= new dataSrcDao();
    	}
    }

    static selectDataSource(){
		this.init();
		return this.dataSrcDao.findDataSource();
	}
	
	static selectDataSrcParameter(_ds){
		this.init();
		return this.dataSrcDao.findDataSrcParameter(_ds).then(data=>{
			if(data.length>0){
				var data0=data[0];
				var tmp={sjylx:data0.sjylx,sjydm:data0.sjydm,sjymc:data0.sjymc};
				var sjycsz=[];
				data.forEach(item=>{
					sjycsz.push({csdm:item.csdm,csmc:item.csmc,csz:item.csz});
				});
				tmp.sjycsz=sjycsz;
				return Promise.resolve(tmp);
			}
			return Promise.resolve({});
		}).catch(err=>{
			return Promise.reject(err);
		});
	}
	
	static deleteDataSrc(_ds){
		this.init();
		return this.dataSrcDao.deleteDataSrc(_ds);
	}
	
	static testConn(_ds){
		this.init();
		var sjy={sjylx:_ds.sjylx.toLowerCase(), sjydm:_ds.sjydm, sjymc:_ds.sjymc};
		_ds.sjycsz.forEach((item,index) => {			
			sjy[item.csdm]=item.csz;
		});
		return this.dataSrcDao.testConn(sjy);
	}
	static saveOrUpdateDataSource(_obj){
		this.init();
		var _sjys = [];
		var _lsh=utils.generateSN();
		if(utils.isEmpty(_obj.sjydm)){
			_obj.sjydm=utils.generateCode('sjy');
		}
		_obj.sjycsz.forEach((item,index) => {
			var sjy={lsh:_lsh, sjylx:_obj.sjylx, sjydm:_obj.sjydm, sjymc:_obj.sjymc, csdm:item.csdm, csz:item.csz};
			_sjys.push(sjy);
		});
		return dbUtils.getSequelize().transaction().then(t=>{
			return this.dataSrcDao.deleteDataSrc(_obj,t).then(d1=>{
				return this.dataSrcDao.saveDataSrc(_sjys,t).then(d2=>{
					allDbUtils.clearDbInfo();
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

}

module.exports = dataSourceService;