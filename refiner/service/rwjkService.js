let rwjkDao = require('../dao/rwjkDao');
let dbUtils  = require('../utils/dbUtils');
var refinerConfig = require('../config/refinerConfig');
var log4js = require('../utils/log4js');
const logger=log4js.getLogger();

class rwjkService {

    static init(){
    	if(!this.rwjkDao){
    		this.rwjkDao= new rwjkDao();
    	}
    }

    //所有执行中的文件
    static findAllRwjks(obj,pageNo,pageSize){
        this.init();
		return this.rwjkDao.findAllRw(obj,pageNo,pageSize);
    }

    //总数
    static findCount(obj){
        this.init();
		return this.rwjkDao.findCount(obj);
    }

    //查询业务信息
    static findAllYwxx(){
        this.init();
		return this.rwjkDao.findAllYwxx();
    }

    //删除
    static deleteYwclwj(obj){
        logger.debug('bm--------------->',JSON.stringify(obj));
        return this.rwjkDao.updateYwclwj(obj);
    }
    
     

   




}
module.exports = rwjkService;


