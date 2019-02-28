let dbUtils  = require('../utils/dbUtils');

var refinerConfig = require('../config/refinerConfig');
var log4js = require('../utils/log4js');
const logger=log4js.getLogger();

var sequelize = dbUtils.getSequelize();

var utils = require('../utils/utils');

class LabelManagementDao {
    constructor() {
		this.sequelize = dbUtils.getSequelize();
		if (!this.sequelize.isDefined('bqk')) {
			logger.debug('标签库关系模型未建立');
		}
		if (!this.sequelize.isDefined('ywbqdxBq')) {
			logger.debug('业务标签对象-标签关联关系模型未建立');
		}
		if (!this.sequelize.isDefined('ywbqdx')) {
			logger.debug('业务标签对象关系模型未建立');
		}

		this.bqk = this.sequelize.models.bqk;
		this.ywbqdxBq = this.sequelize.models.ywbqdxBq;
		this.ywbqdx = this.sequelize.models.ywbqdx;
	}
	
	/**
	 * 标签详情
	 * @param {标签编码} bqbm 
	 */
	findTagDetails(lsh) {
		if (!lsh) {
            return Promise.reject('标签流水号不能为空');
		}
		return this.sequelize.query("SELECT  * FROM t_bqk WHERE yxbz = 1 AND lsh = ?",{
			replacements : [lsh],
			type : sequelize.QueryTypes.SELECT
		})
		// return this.sequelize.query("SELECT a.sjywdx,a.lsh AS lsh2,c.lsh AS lsh3,b.* FROM refiner2.t_ywbqdx a,refiner2.t_bqk b,refiner2.t_ywbqdx_bq c WHERE a.yxbz = '1' AND b.yxbz = '1' AND c.yxbz = '1' AND b.bqbm = c.zdm AND a.sjywdx = c.sjywdx AND b.lsh = ?",{
		// 	replacements : [lsh],
		// 	type : sequelize.QueryTypes.SELECT
		// })
	}

	/**
	* 新增标签库
	*/
	insertBqk(bqObj,transaction){
		var bqk=this.bqk;
		var creat_obj = {lsh:utils.generateSN(),yxbz:refinerConfig.constantVar.yxbz.yx};
		utils.createNewObject(bqObj,bqk,creat_obj);				    
		logger.debug("creat_obj-------------------->"+JSON.stringify(creat_obj));
		return this.bqk.create(creat_obj,{transaction:transaction});
	}

	/**
	* 新增业务标签对象
	*/
	insertYwbqdx(ywbqdxObj,transaction){
		var ywbqdx=this.ywbqdx;
		var creat_obj = {lsh:utils.generateSN(),yxbz:refinerConfig.constantVar.yxbz.yx};
		utils.createNewObject(ywbqdxObj,ywbqdx,creat_obj);				    
		logger.debug("creat_obj-------------------->"+JSON.stringify(creat_obj));
		return this.ywbqdx.create(creat_obj,{transaction:transaction});
	}

	/**
	* 新增业务标签对象-标签关联
	*/
	insertYwbqdxBq(bqObj,transaction){
		var ywbqdxBq=this.ywbqdxBq;
		var creat_obj = {lsh:utils.generateSN(),yxbz:refinerConfig.constantVar.yxbz.yx};
		utils.createNewObject(bqObj,ywbqdxBq,creat_obj);				    
		logger.debug("creat_obj-------------------->"+JSON.stringify(creat_obj));
		return this.ywbqdxBq.create(creat_obj,{transaction:transaction});
	}

	/**
	* 修改标签库
	*/
	updateBqk(lsh){
		return this.bqk.update(
			{yxbz:refinerConfig.constantVar.yxbz.wx},
			{where:{lsh:lsh,yxbz:refinerConfig.constantVar.yxbz.yx}
        });
	}

	/**
	* 修改业务标签对象
	*/
	updateYwbqdx(bqObj,transaction){
		var ywbqdx=this.ywbqdx;
		//var update_obj = {yxbz:refinerConfig.constantVar.yxbz.yx};
		//utils.createNewObject(bqObj,ywbqdx,update_obj);	
		return this.ywbqdx.update(
			{yxbz:refinerConfig.constantVar.yxbz.wx},
			{where:{lsh:bqObj,yxbz:refinerConfig.constantVar.yxbz.yx},transaction: transaction
        });
	}

	/**
	* 修改业务标签对象-标签关联
	*/
	updateYwbqdxBq(bqObj,transaction){
		var ywbqdxBq=this.ywbqdxBq;
		//var update_obj = {yxbz:refinerConfig.constantVar.yxbz.yx};
		//utils.createNewObject(bqObj,ywbqdxBq,update_obj);	
		return this.ywbqdxBq.update(
			{yxbz:refinerConfig.constantVar.yxbz.wx},
			{where:{lsh:bqObj,yxbz:refinerConfig.constantVar.yxbz.yx},transaction: transaction
        });
	}

	/**
	 * 获取标签系统
	 */
	findAllSystem() {
		return this.sequelize.query("SELECT DISTINCT(b.sjymc),b.sjydm FROM refiner2.ty_sjypz b WHERE b.yxbz = '1'",{
			type : sequelize.QueryTypes.SELECT
		})
	}
	
	/**
	 * 获取标签表树
	 */
	selectTableTree(sjydm) {
		return this.sequelize.query("SELECT a.lsh,a.sjywdxmc,a.sjywdx,a.cjr,a.cjsj FROM t_ywbqdx a WHERE a.yxbz = '1' AND sjydm = ?",{
			replacements : [sjydm],
			type : sequelize.QueryTypes.SELECT
		})
	}

	/**
	 * 获取标签树
	 */
	selectTagDetailsTree(sjywdx) {
		return this.sequelize.query("SELECT b.lsh,b.bqmc,c.lsh AS bqlsh FROM refiner2.t_bqk b, refiner2.t_ywbqdx a,refiner2.t_ywbqdx_bq c WHERE a.yxbz = '1' AND b.yxbz = '1' AND c.yxbz = '1' AND b.bqbm = c.zdm AND a.sjywdx = c.sjywdx AND a.sjywdx = ?",{
			replacements : [sjywdx],
			type : sequelize.QueryTypes.SELECT
		})
	}

	/**
	 * 获取数据表
	 */
	findDataTable(sjbmc){
		if(!sjbmc){
			return Promise.reject('数据表名称不能为空!');
		}
		
    	return this.sequelize.query("select distinct(TABLE_NAME),TABLE_COMMENT from information_schema.tables where TABLE_SCHEMA = ?",{
			replacements : [sjbmc],
			type : sequelize.QueryTypes.SELECT
		});
	}

	/**
	 * 获取历史标签
	 */
	getTagDetailsList(){
		return this.sequelize.query("SELECT a.lsh,a.bqmc,a.bqbm FROM refiner2.t_bqk a WHERE a.yxbz = 1",{
			type : sequelize.QueryTypes.SELECT
		})
	}

	/**
	 * 新增-标签
	 */
	newTagDetails(bqObj){
		var bqk=this.bqk;
		var creat_obj = {lsh:utils.generateSN(),bqbm:utils.generateCode('bm'),yxbz:refinerConfig.constantVar.yxbz.yx};
		utils.createNewObject(bqObj,bqk,creat_obj);				    
		return this.bqk.create(creat_obj);
	}
	
	/**
	 * 使用历史标签,保存
	 */
	histroyTagDetails(obj){		    
		return this.ywbqdxBq.bulkCreate(obj);
	}

	/**
	 * 删除业务对象下的标签
	 */
	deleteYwbqdxBq(lsh){
		return this.ywbqdxBq.update(
			{yxbz:refinerConfig.constantVar.yxbz.wx},
			{where:{lsh:lsh,yxbz:refinerConfig.constantVar.yxbz.yx}
        });
	}

	/**
	 * 获取业务对象ID
	 */
	getYwbqdxID(obj){
		if(!obj){
			return Promise.reject('数据源名称不能为空!');
		}
		
    	return this.sequelize.query("SELECT column_name,column_comment FROM INFORMATION_SCHEMA. COLUMNS t1 WHERE table_name = ? AND table_schema = 'refiner2' and t1.column_name IN(select column_name from  INFORMATION_SCHEMA.KEY_COLUMN_USAGE t where t.table_schema='refiner2' and table_name = ?)",{
			replacements : [obj[0],obj[0]],
			type : sequelize.QueryTypes.SELECT
		});
	}

	/**
	 * 批量新增标签关联对象
	 */
	bulkInsertYwbqdxBq(obj, transaction) {
        if (!bqobj) {
           return Promise.reject( '标签信息不能为空');
		}
		
		var sjyObj = [];
		bqobj.forEach((data,index)=>{
			var tempObj = {
				lsh: utils.generateSN(),
				yxbz: refinerConfig.constantVar.yxbz.yx,
				sjywdx: data.sjywdx,
				zdlx: data.zdlx,
				zdm: data.zdm,
				zdzj: data.zdzj
			};
			sjyObj.push(tempObj)
		});
		return this.sjypz.bulkCreate(sjyObj, {transaction: transaction,ignoreDuplicates : true});	
	}
}

module.exports = LabelManagementDao;