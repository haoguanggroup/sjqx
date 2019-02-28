const dbUtils  = require('../utils/dbUtils');
const utils  = require('../utils/utils');
const log4js = require('../utils/log4js');
const logger=log4js.getLogger();
var refinerConfig = require('../config/refinerConfig');

const objkey=[{}];
class commonDao {
	
	constructor() {
		this.sequelize = dbUtils.getSequelize();
		if (!this.sequelize.isDefined('jdmb')) {
			logger.debug('jdmb模型未建立');
		}
		this.jdmb = this.sequelize.models.jdmb;
		if (!this.sequelize.isDefined('user')) {
			logger.debug('jdmb模型未建立');
		}
		this.user = this.sequelize.models.user;
	}
	deleteData(_lx,_where,t){
		// return 	this.findAllObjs(_lx,_where).then(datas=>{
		// 	if(utils.isEmpty(datas)){
		// 		return Promise.resolve(null); 
		// 	}
		// }).catch(err=>{
		// 	return Promise.reject(err); 
		// });
		var where =this.getWhereByPrimaryKey(_lx,_where);
		return this.remove(where,_lx,t);
		
	}
	async save(obj,lx,t){
		var _obj = utils.createNewObject(obj,this.sequelize.models[lx],{});		
		await this.deleteData(lx,obj,t);
		var target= await this.saveUtils(_obj,lx,t);
		return target; 	
	}
	saveUtils(obj,lx,t){
		return new Promise((resolve, reject) => {
			return this.sequelize.models[lx].create(obj,{transaction:t}).then(data=>{
				resolve(data);
			}).catch(err=>{
			    reject(err);
			});
		});
	}
	getWhereByPrimaryKey(lx,_where){
		var _obj=dbUtils.getSequelize().models[lx].attributes;
		var target={};
		Object.getOwnPropertyNames(_obj).forEach((item,index)=>{

			if(_obj[item].primaryKey&&_where[item]&&'lsh'!=item){
				target[item]=_where[item];
			}

		});
		return target;
	}

	bulkSave(obj,lx,t){
		return this.sequelize.models[lx].bulkCreate(obj);
	}
	async remove(where,lx,t){
		var obj={yxbz:refinerConfig.constantVar.yxbz.wx};
		var where_obj = utils.createNewObject(where,this.sequelize.models[lx],where_obj);
		var param={where:where_obj};
		if(t){
			param.transaction=t;
		}
		var target=await this.sequelize.models[lx].update(obj,param);
		return target;
	}
	
	findAllObjs(_ywdx,_where,_order){
		var where={yxbz:refinerConfig.constantVar.yxbz.yx};
		utils.createNewObject(_where,this.sequelize.models[_ywdx],where);
		var _param={where:where};
		if(_order){
			_param.order=_order;
		}
		return this.sequelize.models[_ywdx].findAll(_param);
	}

	query(lx,param){
		var queryParam={};
		if(utils.isEmpty(queryParam.where)){
			queryParam['where']={};
		}
		if(utils.isEmpty(queryParam.where.yxbz)){
			queryParam.where['yxbz']=refinerConfig.constantVar.yxbz.yx;
		}
		queryParam.where=utils.createNewObject(param,this.sequelize.models[lx],queryParam.where);
		var tmp=this.sequelize.models[lx].findAll(queryParam);
		return tmp;
	}
	findAllObjsPager(_ywdx,_where,_pager,_order) {
		var where={yxbz:refinerConfig.constantVar.yxbz.yx};
		utils.createNewObject(_where,this.sequelize.models[_ywdx],where);
		var _pageNo=_pager.currentPage;
		if(utils.isEmpty(_pageNo)|| isNaN(_pageNo)){
			_pageNo=1;
		}
		var _pageSize=_pager.pageSize;
		if(utils.isEmpty(_pageSize)|| isNaN(_pageSize)){
			_pageSize=10;
		}
		var findParam={where: where,limit: _pageSize,offset:(_pageNo-1)*_pageSize};
		if(_order){
			findParam.order=_order;
		}
		return this.sequelize.models[_ywdx].findAndCountAll(findParam);
	}
	loginUser(yhm,mm){
		return this.user.findAll({
	        where:{
	        	yxbz:'1',
	        	yhm:yhm,
	        	mm:mm
	        }
	    }).then(datas=>{
	    	return Promise.resolve(datas); 
	    });
	}
	
	findAllJdmb(){
		/***
		 * 注意：
		 * 返回：
		 *    00: return this.jdmb.findAll() ;
		 * 与 01: return this.jdmb.findAll().then(datas=>{return Promise.resolve(datas);});
		 * 的区别！ 00=返回需要使用dataValues;来获取数据，且没有经过格式化
		 *          01=直接返回查询结果数据
		 * */
		return this.jdmb.findAll({
	    	attributes: ['csdm', 'zdm', 'csmc', 'zmc', 'sxh','cjsj'],
	        order: [
	            ['csdm'],
	            ['sxh']
	        ],
	        where:{
	        	yxbz:'1'
	        }
	    });
//	    .then(datas=>{
//	    	
//	    	return Promise.resolve(datas); 
//	    });
	}
	
	testAdd(t_jdmb,t){
		return this.jdmb.create(t_jdmb,{transaction:t});

	}
	
//	generateSN(){
//	    return this.sequelize({
//	        order: [
//	            ['csdm'],
//	            ['sxh']
//	        ],
//	        where:{
//	        	yxbz:'1'
//	        }
//	    });
//	}
}
module.exports = commonDao;