var markDao = require('../dao/markDao');
var dataSrcDao = require('../dao/dataSrcDao');
var commonDao = require('../dao/commonDao');
var log4js = require('../utils/log4js');
var logger=log4js.getLogger();
var refinerConfig = require('../config/refinerConfig');
var dbUtils  = require('../utils/dbUtils');

var utils = require('../utils/utils');

class markService {
    static init(){
    	if(!this.markDao){
    		this.markDao= new markDao();
    	}
    	if(!this.dataSrcDao){
    		this.dataSrcDao= new dataSrcDao();
    	}
    	if(!this.commonDao){
    		this.commonDao= new commonDao();
    	}
    }

    static _assemble01(_sjydm){
    	return this.markDao.getYwbqdx(_sjydm).then(d2=>{
			return Promise.resolve(d2);
		}).catch(err=>{
			return Promise.reject(err);
		});

    }
    static _assemble(_sz){
    	var _this=this;
    	var _target=[];
    	return new Promise(function (resolve, reject) {
    		var _index=_sz.length-1;
    		if(_index<0){
    			reject(null);
    		}
    		_sz.forEach(async(item,index)=>{
				var _obj={sjydm:item.sjydm,sjymc:item.sjymc};
				_obj.ywdxs=await _this._assemble01(item.sjydm);
				_target.push(_obj);
				if(_index==index){
					resolve(_target);
				}
			});
    	}).then(datas=>{
			return Promise.resolve(_target);
    	}).catch(err=>{
			logger.error(err);
			return Promise.reject(err);
		}); 
    }
    static selectDataSource(){
		this.init();
		return this.dataSrcDao.findDataSource().then(async datas=>{
			var target= await this._assemble(datas);
			return Promise.resolve(target);
		}).catch(err=>{
			logger.error(err);
			return Promise.reject(err);
		});
	}

	static selectDataSrcYwbqdx(){
		this.init();
		var _this=this;
		var _target=[];
		return _this.dataSrcDao.findDataSource().then(async datas=>{
			for(var i=0;i<datas.length;i++){
				var _obj={};
				_obj.sjydm=datas[i].sjydm;
				_obj.ywdxs= await _this.markDao.getDataBaseTable(_obj.sjydm);
				_target.push(_obj);
			}
			return Promise.resolve(_target);
		}).catch(err=>{
			logger.error(err);
			return Promise.reject(err);
		});
	}

	static selectTableColumns(_param){
		this.init();
		return this.markDao.selectTableColumns(_param.sjydm,_param.tableName);
	}
	static delete(_sjywdx){
		this.init();
		var sjywdx=_sjywdx;
		//是否删除已建立的表

		return dbUtils.getSequelize().transaction().then(t=>{
          return this.commonDao.remove({sjydm:sjywdx.sjydm,bqywdx:sjywdx.bqywdx,yxbz:refinerConfig.constantVar.yxbz.yx},'ywbqdx',t).then(d1=>{
			return this.commonDao.remove({sjydm:sjywdx.sjydm,bqywdx:sjywdx.bqywdx,yxbz:refinerConfig.constantVar.yxbz.yx},'ywbqdxBq',t).then(d2=>{
					t.commit();
					return Promise.resolve(d2);
				}).catch(err=>{
					t.rollback();
					logger.error(err);
					return Promise.reject(err);
				});	
			}).catch(err=>{
				t.rollback();
				logger.error(err);
				return Promise.reject(err);
			});			
		}).catch(err=>{
			logger.error(err);
			return Promise.reject(err);
		});
	}
	static savebqYwdx(item,t){
		this.init();
		var _this=this;
		return new Promise(function (resolve, reject) {
			if(utils.isEmpty(item.glbm)){
				//新增
                item.glbm=utils.generateCode('gl-');
				_this.commonDao.save(item,'ywbqdxBq',t).then(d3=>{
					resolve(d3)
				}).catch(err=>{
					logger.error(err);
					reject(err);
				});
			}else{
				 _this.commonDao.remove({glbm:item.glbm,yxbz:refinerConfig.constantVar.yxbz.yx},'ywbqdxBq',t).then(d2=>{
				
				  if(utils.equals('U',item.addOrUpdate)){
					_this.commonDao.save(item,'ywbqdxBq',t).then(d3=>{
						resolve(d3)
					}).catch(err=>{
						logger.error(err);
						reject(err);
					});
				  }

				}).catch(err=>{
					logger.error(err);
					reject(err);
				});
			}
		}).then(datas=>{
			return Promise.resolve(datas);
    	}).catch(err=>{
			logger.error(err);
			return Promise.reject(err);
		}); 
	}
	static async saveOrUpdateMark(_sjywdx,_ywbqdxBq){
		this.init();
		var sjywdx=_sjywdx;
		var ywbqdxBqs=_ywbqdxBq;
		var _lsh=utils.generateSN();
		var sql="";
		if(utils.isEmpty(_sjywdx.lsh)){
			//验证是否存在业务标签对象名称
			var tmp_obj=await this.markDao.selectTableColumns(_sjywdx.sjydm,_sjywdx.bqywdx);
			if(utils.isNotEmpty(tmp_obj)){
				return Promise.reject({message:'该业务对象名称已经存在！'})
			}
		}
		if(ywbqdxBqs&&ywbqdxBqs.length>0){
			for (var i = 0; i < ywbqdxBqs.length; i++) {
				var item= ywbqdxBqs[i];
				if(item.addOrUpdate=='C'){
					//新增
                    //判断字段是否存在
				}
			}
		}
		
		
		//操作类型：1=重新建表，0=追加列 ,2、重新建表且初始化数据
		//sjywdx.czlx='1';
		if(utils.isEmpty(_sjywdx.lsh)){
			sjywdx.lsh=_lsh;//新增
			return dbUtils.getSequelize().transaction().then(t=>{
				return this.commonDao.save(sjywdx,'ywbqdx',t).then(async d1=>{
					if(ywbqdxBqs&&ywbqdxBqs.length>0){
						for (var i = 0; i < ywbqdxBqs.length; i++) {
							var item= ywbqdxBqs[i];
							item.lsh=_lsh;
							await this.savebqYwdx(item,t);
							
						}
					}
					
					t.commit();
					
					return Promise.resolve(d1);
				}).catch(err=>{
					t.rollback();
					logger.error(err);
					return Promise.reject(err);
				});
			}).catch(err=>{
				logger.error(err);
				return Promise.reject(err);
			});
		}else{
			return dbUtils.getSequelize().transaction().then( t=>{
				var a=async()=>{
					if(ywbqdxBqs&&ywbqdxBqs.length>0){
						for (var i = 0; i < ywbqdxBqs.length; i++) {
							var item= ywbqdxBqs[i];
							item.lsh=_lsh;
							await this.savebqYwdx(item,t);
						}
					}
					t.commit();
				};
				a();				
				return Promise.resolve(ywbqdxBqs);
			}).catch(err=>{
				logger.error(err);
				return Promise.reject(err);
			});
		}
		
	}
	static selectBqywdx(_param){
		this.init();
		return this.commonDao.findAllObjs('ywbqdx',_param).then(d1=>{
			var target=null;
			if(d1 &&d1.length>0){
				target=d1[0].dataValues;
				return this.commonDao.findAllObjs('ywbqdxBq',_param,[['sxh']]).then(d2=>{
					target.tags=d2;
					return Promise.resolve(target); 
				}).catch(err=>{
					logger.error(err);
					return Promise.reject(err);
				});
			}else{
				return Promise.reject('空');
			}

		}).catch(err=>{
			logger.error(err);
			return Promise.reject(err);
		});
	}
	//标签库begin
	static selectBqk(_bqkcx){
		this.init();
		var _pager=_bqkcx.pager;
		var _order=_bqkcx.order;
		return this.commonDao.findAllObjsPager('bqk',_bqkcx,_pager,_order).then(data=>{
			return Promise.resolve(data); 
		}).catch(err=>{
			logger.error(err);
			return Promise.reject(err);
		});
	}
	static saveorupdateBqk(_bq){
		this.init();
		return dbUtils.getSequelize().transaction().then(t=>{
		
			var _lsh=utils.generateSN();
			if(utils.isEmpty(_bq.bqbm)){
				//新增
				_bq.bqbm=utils.generateCode('bq-');
				_bq.lsh=_lsh;
				return this.commonDao.save(_bq,'bqk',t).then(d1=>{
					t.commit();
					return Promise.resolve(d1); 
				}).catch(err=>{
					logger.error(err);
					t.rollback();
					return Promise.reject(err);
				});
			}else{
				//修改
				return this.commonDao.remove({bqbm:_bq.bqbm},'bqk',t).then(d1=>{
					_bq.lsh=_lsh;
					return this.commonDao.save(_bq,'bqk',t).then(d2=>{
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
	static deleteBqk(_bq){
		this.init();
		return dbUtils.getSequelize().transaction().then(t=>{
		
			this.commonDao.remove({bqbm:_bq.bqbm},'bqk',t).then(d1=>{
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

module.exports = markService;