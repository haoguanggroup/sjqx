var UserDao = require('../dao/userDao');
var ServiceFeatureDao = require('../dao/serviceFeatureDao');
var dbUtils  = require('../utils/dbUtils');
var Sequelize =  require('sequelize');
var refinerConfig = require('../config/refinerConfig');
var log4js = require('../utils/log4js');
var logger=log4js.getLogger();
var utils = require('../utils/utils');
var path = require('path');
//获取上传路径

class serviceFeatureService {

    static init(){
    	if(!this.serviceFeatureDao){
    		this.serviceFeatureDao= new ServiceFeatureDao();
    	}
    }

	static query(entity,params){
		this.init();
		var jgj=null;
		var where=params;
		if(utils.equals('datasource',entity)){
			jgj=this.serviceFeatureDao.queryDatasource();		
		}else{
			jgj=this.serviceFeatureDao.query(entity,params);
		}
		return jgj;
	}
	
	static remove(entity,params,t){
		this.init();
		//做一些参数判断
		if(utils.isEmpty(params)||utils.isEmpty(params.lsh)){
			return Promise.reject('参数异常！');
		}
		var where={yxbz:refinerConfig.constantVar.yxbz.yx};
		if(utils.equals('ywxx',entity)){
			where.bm=params.bm;
			var jgj=dbUtils.getSequelize().transaction().then(t=>{
				return this.serviceFeatureDao.remove(where,entity,t).then(d1=>{
					where.bm='';
					where.ywbm=params.bm;
					return this.serviceFeatureDao.remove(where,'ywhj',t).then(d2=>{
						where.ssbm=params.bm;
						where.sslx='1';
						return this.serviceFeatureDao.remove(where,'ywsx',t).then(d3=>{
							where.sslxbm=params.bm;
							where.clwjlx='1';
							return this.serviceFeatureDao.remove(where,'ywclwj',t).then(d4=>{
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
		}else if(utils.equals('ywhj',entity)){
			jgj=dbUtils.getSequelize().transaction().then(t=>{
				return this.serviceFeatureDao.remove(where,entity,t).then(d1=>{
					where.bm='';
					where.ywbm=params.bm;
					return this.serviceFeatureDao.remove(where,'ywhj',t).then(d2=>{
						where.ssbm=params.bm;
						where.sslx='2';
						return this.serviceFeatureDao.remove(where,'ywsx',t).then(d3=>{
							where.sslxbm=params.bm;
							where.clwjlx='2';
							return this.serviceFeatureDao.remove(where,'ywclwj',t).then(d4=>{
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
		}else if(utils.equals('ywsx',entity)||utils.equals('ywclwj',entity)){
			where=params;
			jgj=dbUtils.getSequelize().transaction().then(t=>{
				return this.serviceFeatureDao.remove(where,entity,t).then(d1=>{
					t.commit();
					return Promise.resolve(true);
				}).catch(err=>{
					t.rollback();
					return Promise.reject(err);
				});
			}).catch(err=>{
				return Promise.reject(err);
			});
		}
		return jgj;
	}
	//删除 处理文件
	static scclwj(sf,transaction){
		if(utils.equals(refinerConfig.constantVar.sf.shi,sf.sfscwj)){
			if(sf.delFiles){
				sf.delFiles.forEach((item,index)=>{
					// 查询并删除
					this.serviceFeatureDao.remove(item,'ywclwj',transaction).then(data=>{

					}).catch(err=>{
						logger.error('删除处理文件 出错！！');
						return Promise.reject(err);
					});
				});
				return Promise.resolve(true);
			}
		}
		logger.debug('transaction',true);
		return Promise.resolve(true);
		
	}
	
	static getFile(files,clwjbm){
		files.forEach((item,index)=>{	
			if(utils.equals(clwjbm,item.clwjbm)){
				return item;
			}
		});
		return null;
	}
	static hqsjybm(bm){
		if(utils.isEmpty(bm)){
			// 设置文件存储
		    return Promise.resolve(path.join(refinerConfig.appConfig.uploadPath,utils.generateCode('uf-'))); 
		}else{
			return this.query('ywclwj',{sslxbm:bm}).then(datas=>{
				logger.debug('文件存储',datas);
				if(datas.length>0){
					return Promise.resolve(path.parse(datas[0].htbqwjm).dir); 
				}
			    return Promise.resolve(path.join(refinerConfig.appConfig.uploadPath,utils.generateCode('uf-'))); 
			}).catch(err=>{
				return Promise.reject(err);
			});
		}
	}

	//新增 处理文件(lxq)
	static xzclwj(sf,lsh,lx,obj,transaction){
		var sslxbm = obj.bm;
		var clwjlx='2';
		if(utils.equals('ywxx',lx))clwjlx='1';
		if(utils.equals(refinerConfig.constantVar.sf.shi,sf.sfxzwj)){
			logger.debug('新增处理文件',sf.addFiles);
			if(sf.addFiles){
				logger.debug('新增处理文件1----------------》1',sslxbm);
				return this.hqsjybm(sslxbm).then(pathInfo=>{
					logger.debug('PA',pathInfo);
					var files=[];
					logger.debug('处理文件2----------------》99999',sf.addFiles[0]);
					sf.addFiles.forEach((item,index)=>{		
						var clwj=item;			
						clwj.lsh=lsh;
						clwj.clwjlx=clwjlx;
						clwj.sslxbm=sslxbm;
						clwj.clwjbm=utils.generateCode('wj-');
						clwj.htbqwjm=path.join(pathInfo,clwj.bqwj);
						delete clwj.sjcls;
						files.push(clwj);
					});
					logger.debug('新增处理文件2----------------》2',files);
					return this.serviceFeatureDao.save(files,'ywclwj',transaction).then(datas=>{
						logger.debug('******************************',datas);
						return Promise.resolve(true);
					}).catch(err=>{
						logger.error('err--------------------------',err);
						return Promise.reject(err);
					});
				});
				
			}
		}
		return Promise.resolve(true);
	}

	//删除原启动文件（lxq）
	static scyqdwj(sf,lsh,transaction){
		logger.debug('----%%%%%%%%%%%%删除-%%%%%%%%%%%%-----',sf.yqdFiles);
		if(utils.isNotEmpty(sf.yqdFiles)){		
			return this.serviceFeatureDao.remove(sf.yqdFiles,'ywclwj',transaction).then(data=>{
				logger.debug('data进入',data);	
				if(data[0] > 0){
					if(utils.isNotEmpty(sf.qdFiles.clwjbm)){
						return Promise.resolve(true);
					}else{
						sf.yqdFiles_xg.lsh = lsh;
						return this.serviceFeatureDao.save(sf.yqdFiles_xg,'ywclwj-dg',transaction).then(datas =>{
							logger.debug('datas.length进入',datas);							
							if(datas){
								return Promise.resolve(true);
							}
							else{
								return Promise.reject(err);
							}
						}).catch(err=>{
							logger.error('修改出错！！',err);
							return Promise.reject(err);
						});
					}
					
				}else{
					return Promise.reject(err);
				}		
			}).catch(err=>{
				logger.error('删除原启动文件 出错！！',err);
				return Promise.reject(err);
			});
		}
		return Promise.resolve(true);
	}

	//新增启动文件(lxq)
	static xzqdwj(sf,lsh,lx,obj,transaction){
		var sslxbm = obj.bm;
		var clwjlx='2';
		if(utils.equals('ywxx',lx))clwjlx='1';
		if(sf.qdFiles){
			logger.debug('新增启动文件(lxq)',sf.qdFiles.sfqdwj);
			return this.hqsjybm(sslxbm).then(pathInfo=>{
				logger.debug('PA',pathInfo);
				
				var qdwj = {};
				qdwj.lsh=lsh;
				qdwj.clwjlx=clwjlx;
				qdwj.sslxbm=sslxbm;
				qdwj.bqwj = sf.qdFiles.bqwj;
				qdwj.sfqdwj = sf.qdFiles.sfqdwj;
				qdwj.zxlx = sf.qdFiles.zxlx;
				qdwj.clwjbm=utils.generateCode('wj-');
				qdwj.htbqwjm=path.join(pathInfo,sf.qdFiles.bqwj);
				logger.debug('新增启动文件(lxq)',qdwj);
				
				return this.serviceFeatureDao.save(qdwj,'ywclwj-dg',transaction).then(qd_datas =>{
					logger.debug('新增启动文件(lxq)----------------',qd_datas);
						
						// if(utils.equals('2',qd_datas.zxlx)){
						// 	var sjclItem=this.getFile(files,item.clwjbm);
						// 	if(utils.isEmpty(sjclItem)||utils.isEmpty(sjclItem.sjcls)){
						// 		return Promise.reject('定时 需配置时间策略！');
						// 	}else{
						// 		var sjcls=sjclItem.sjcls;
						// 		var zxcls=[];
						// 		sjcls.forEach((d1,i1)=>{
						// 			d1.clwjbm=item.clwjbm;
						// 			d1.clbh=d1.clbh;
						// 			zxcls.push(d1);
						// 		});
						// 		this.serviceFeatureDao.save(zxcls,'zxcl',transaction).then(d1=>{
									
						// 		}).catch(err=>{
						// 			return Promise.reject(err);
						// 		});
						// 	}
						// }
					
					return Promise.resolve(true);
				}).catch(err=>{
					logger.error('新增启动文件 出错！！');
					return Promise.reject(err);
				});
			});
		}
	}
	/***
	 * 保存、修改 业务特征
	 * 
	 * @param lx 类型 ywxx,ywhj
	 * @param lsh新增时 lsh
	 */
	static saveSf(lx,obj,lsh,sfxg,transaction){
        logger.debug('obj',obj);
		//判断内容是否更改(lxq)
		return this.serviceFeatureDao.query(lx,obj).then(data =>{
			if(data.length > 0 ){
				logger.debug('个数',data.length);
				return Promise.resolve(data[0]);
			}else{
		        if(!obj|| !obj.lsh || utils.isEmpty(obj.lsh)){
		            //新增
		            obj.lsh=lsh;
					if(sfxg == 0){
						obj.bm=utils.generateCode('sf-');
					}
		            logger.debug('新增',obj.bm);
		            return this.serviceFeatureDao.save(obj,lx,transaction).then(datas=>{
		                logger.debug('新增',obj.bm);
						logger.debug('新增ywxx_datas',datas);
		                return Promise.resolve(datas);
		            }).catch(err=>{
		                return Promise.reject(err);
		            });
		        }else{
		            //修改
		            return this.serviceFeatureDao.remove({lsh:obj.lsh},lx,transaction).then(datas=>{
			            sfxg = 1;
						obj.lsh=null;
		                return this.saveSf(lx,obj,lsh,sfxg,transaction);
		            }).catch(err=>{
		                return Promise.reject(err);
		            });
		        }
			}
		}).catch(err=>{
            return Promise.reject(err);
        });

	}


	
	//保存业务/环节 及处理文件 
	static save(sf,lx,sfxg){
		logger.debug('保存业务/环节 及处理文件lx= '+lx);
		this.init();
		if(utils.equals(lx,'ywxx')||utils.equals(lx,'ywhj')){
			var obj=sf[lx];
			logger.debug('ywxx_obj',obj);
			return dbUtils.getSequelize().transaction().then(t=>{				
				return this.scclwj(sf,t).then(d1=>{
					logger.debug('删除',d1);
					var lsh=utils.generateSN();
					logger.debug('lsh',lsh);
					return this.saveSf(lx,obj,lsh,sfxg,t).then(d2=>{
						logger.debug('保存d2',JSON.stringify(d2));
						return this.xzclwj(sf,lsh,lx,d2,t).then(d3=>{
							logger.debug('新增d3',d3);
							//删除原启动文件(lxq)	
							return this.scyqdwj(sf,lsh,t).then(d4=>{
								logger.debug('d4',d4);
								//新增启动文件(lxq)
								return this.xzqdwj(sf,lsh,lx,d2,t).then(d5=>{
									t.commit();
									return Promise.resolve(d2);
								}).catch(err=>{
									t.rollback();
									return Promise.reject(err);
								});	
							}).catch(err=>{
								t.rollback();
								return Promise.reject(err);
							});
						
						}).catch(err=>{
							t.rollback();
							return Promise.reject(err);
						});
					}).catch(err=>{
						t.rollback();
						return Promise.reject(err);
					});
					
				}).catch(err=>{
					//t.rollback();
					logger.error(err);
					return Promise.reject(err);
				});
			}).catch(err=>{
				return Promise.reject(err);
			});
		}else if(utils.equals(lx,'ywsx')){
			logger.debug('保存ywsx');
			return dbUtils.getSequelize().transaction().then(t=>{
				this.saveYwtz(sf,t,null).then(d1=>{
					logger.debug('---------------->保存ywsx',d1);
					t.commit();
					return Promise.resolve(d1);
				}).catch(err=>{
					logger.error('保存ywsx-err',err);
					return Promise.reject(err);
				})
			}).catch(err=>{
				return Promise.reject(err);
			});
		}
		return Promise.resolve(true);
	}
	
	//特征是否存在
	static tzsfcz(obj,old_lsh){
		logger.debug('修改ywsx1');
		if(utils.isEmpty(obj.sxbm)){
			logger.debug('修改ywsx2');
			obj.sxbm=utils.generateCode('sx');
			//logger.debug('保存ywsx-sxbm',obj.sxbm);
		}else{
			logger.debug('修改ywsx');
			var where={sslx:obj.sslx,ssbm:obj.ssbm,sxbm:obj.sxbm,yxbz:refinerConfig.constantVar.yxbz.yx,lsh:{$ne:old_lsh}};
			logger.debug('where',where);
			return this.serviceFeatureDao.query2('ywsx',{where:where}).then(data=>{
				if(data.length > 0){
					return Promise.reject('该编码['+obj.ssbm+']已被['+data.ssmc+']使用！');	
				}else{
					return Promise.resolve(data);
				}
				
			});
			logger.info('已执行....');
		}
		return Promise.resolve(true);
	}
	//保存业务特征
	static saveYwtz(obj,t,old_lsh){
		if(utils.isEmpty(obj.sslx)){
			return Promise.reject('特征所属（业务/环节）不可为空！');
		}
		if(utils.isEmpty(obj.ssbm)){
			return Promise.reject('特征所属编码不可为空！');
		}
		if(utils.isEmpty(obj.sxmc)){
			return Promise.reject('特征名称不可为空！');
		}
		//新增
		if(utils.isEmpty(obj.lsh)){
			var lsh=utils.generateSN();
			obj.lsh=lsh;
			logger.debug('保存ywsx-lsh',obj.lsh);
			return this.tzsfcz(obj,old_lsh).then(data=>{
				return this.serviceFeatureDao.save(obj,'ywsx',t).then(ywsx=>{
					return Promise.resolve(ywsx);
				}).catch(err=>{
					return Promise.reject(err);
				});
			}).catch(err=>{
				logger.debug('保存ywsx-err',err);
				return Promise.reject(err);
			});
		}else{
        //修改
			//验证未做
			return this.serviceFeatureDao.remove({lsh:obj.lsh},'ywsx',t).then(datas=>{
				var old_lsh=obj.lsh;
				obj.lsh=null;
				return this.saveYwtz(obj,t,old_lsh);
			}).catch(err=>{
				return Promise.reject(err);
			});
		}
	
	}

}
module.exports = serviceFeatureService;


