let LabelManagementDao = require('../dao/labelManagementDao');
let dbUtils  = require('../utils/dbUtils');

var refinerConfig = require('../config/refinerConfig');
var log4js = require('../utils/log4js');
const logger=log4js.getLogger();

var utils = require('../utils/utils');

class labelManagementService {
    static init(){
    	if(!this.labelManagementDao){
    		this.labelManagementDao= new LabelManagementDao();
    	}
	}
	
	/**
	 * 标签详情
	 * @param {标签编码} bqbm 
	 */
	static findTagDetails(lsh){
        this.init();
		return this.labelManagementDao.findTagDetails(lsh);
	}
	
	/**
	 * 获取标签系统
	 */
	 static findAllSystem(){
        this.init();
		return this.labelManagementDao.findAllSystem();
	}
	
	/**	
	 * 获取标签表树
	 */
	static selectTableTree(sjydm){
        this.init();
		return this.labelManagementDao.selectTableTree(sjydm);
	}

	/**	
	 * 获取标签树
	 */
	static selectTagDetailsTree(sjywdx){
        this.init();
		return this.labelManagementDao.selectTagDetailsTree(sjywdx);
	}

	/**
	 * 获取数据表
	 */
	static selectDataTable(sjbmc){
		this.init();
		return this.labelManagementDao.findDataTable(sjbmc);
	}

	/**
	 * 获取历史标签
	 */
	 static getTagDetailsList(){
        this.init();
		return this.labelManagementDao.getTagDetailsList();
	}

	/**
	 * 使用历史标签,保存
	 */
	
	static histroyTagDetails(bqobj){
		this.init();
		// bqobj.forEach((data,index)=>{
		// 	obj.push({sjywdx:data.sjywdx,zdlx:data.zdlx,zdm:data.zdm,zdzj:data.zdzj,lsh:utils.generateSN(),yxbz:refinerConfig.constantVar.yxbz.yx,cjr:req.session.user,cjcj: new Date().getTime()});
		// });
		if(bqobj){
			return Promise.reject('业务信息不能为空');
		}
		//标签业务对象
		var ywbqdxObj = {sjywdx:bqobj.sjywdx,sjywdxmc:bqobj.sjywdxmc,bqywdx:'t_refiner_'+bqobj.sjywdx};
		return dbUtils.getSequelize().transaction().then(t=>{
			return this.labelManagementDao.insertYwbqdx(ywbqdxObj,t).then(d1=>{
				return this.labelManagementDao.bulkInsertYwbqdxBq(bqobj,t).then(d2=>{
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

	 /**
	  * 新增-标签
	  */
	static newTagDetails(bqObj){
        this.init();
		return this.labelManagementDao.newTagDetails(bqObj);
	}

	/** 
    * 删除-标签 
	*/
	static deleteTagDetails(lsh){
		this.init();
		return this.labelManagementDao.updateBqk(lsh);
	}

	/**
	 * 修改-标签
	 */
	static updateTagDetails(bqobj){
		this.init();
		var lsh = bqobj.lsh;

		return dbUtils.getSequelize().transaction().then(t =>{
			return this.labelManagementDao.updateBqk(lsh,t).then(r1=>{
				logger.debug('1----->'+r1);
			}).then(()=>{
				return this.labelManagementDao.insertBqk(bqobj,t)
				.then(r2=>{
					logger.debug('2----->'+r2);
					t.commit();
					return Promise.resolve();
				}).catch(err=>{
					logger.error('----->'+err);
					t.rollback();
					return Promise.reject(err);
				});
			});
		});
	}

	/**
	 * 删除业务对象下的标签
	 */
	static deleteYwbqdxBq(lsh){
		this.init();
		return this.labelManagementDao.deleteYwbqdxBq(lsh);
	}

	/**
	 * 获取业务对象ID
	 */
	static getYwbqdxID(obj){
		this.init();
		return this.labelManagementDao.getYwbqdxID(obj);
	}
}

module.exports = labelManagementService;