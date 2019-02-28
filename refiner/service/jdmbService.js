let jdmbDao = require('../dao/jdmbDao');
var commonDao = require('../dao/commonDao');
let dbUtils  = require('../utils/dbUtils');
var refinerConfig = require('../config/refinerConfig');
var log4js = require('../utils/log4js');
const logger=log4js.getLogger();
var utils = require('../utils/utils');

class commonService {

    static init(){
    	if(!this.jdmbDao){
    		this.jdmbDao= new jdmbDao();
		}
		if(!this.commonDao){
    		this.commonDao= new commonDao();
		}
    }

	static selectJdmb(_jdmbcx){
		this.init();
		var _pager=_jdmbcx.pager;
		var _order=_jdmbcx.order;
		return this.commonDao.findAllObjsPager('jdmb',_jdmbcx,_pager,_order).then(data=>{
			return Promise.resolve(data); 
		}).catch(err=>{
			logger.error(err);
			return Promise.reject(err);
		});
    }
    
	static saveorupdateJdmb(_jdmb){
		this.init();
		return dbUtils.getSequelize().transaction().then(t=>{
		
			var _lsh=utils.generateSN();
			if(utils.isEmpty(_jdmb.csdm) && utils.isEmpty(_jdmb.zdm)){
				//新增
				_bq.bqbm=utils.generateCode('jdmb-');
				_bq.lsh=_lsh;
				return this.commonDao.save(_jdmb,'jdmb',t).then(d1=>{
					t.commit();
					return Promise.resolve(d1); 
				}).catch(err=>{
					logger.error(err);
					t.rollback();
					return Promise.reject(err);
				});
			}else{
				//修改
				return this.commonDao.remove({csdm:_jdmb.csdm,zdm:_jdmb.zdm},'jdmb',t).then(d1=>{
					_jdmb.lsh=_lsh;
					return this.commonDao.save(_jdmb,'jdmb',t).then(d2=>{
						t.commit();
						return Promise.resolve(d1); 
					}).catch(err=>{
						logger.error(err);
						t.rollback();
						return Promise.reject(err);
					});
				}).catch(err=>{
					logger.error(err);
					t.rollback();
					return Promise.reject(err);
				});

			}

		}).catch(err=>{
			logger.error(err);
			return Promise.reject(err);
		});
    }
    
    
	static deleteJdmb(_jdmb){
		this.init();
		return dbUtils.getSequelize().transaction().then(t=>{
		
			this.commonDao.remove({lsh:_jdmb.lsh},'jdmb',t).then(d1=>{
				t.commit();
				return Promise.resolve(d1); 
			}).catch(err=>{
				logger.error(err);
				t.rollback();
				return Promise.reject(err);
			});
		}).catch(err=>{
			logger.error(err);
			return Promise.reject(err);
		});
	}
}
module.exports = commonService;


