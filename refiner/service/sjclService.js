let sjclDao = require('../dao/sjclDao');
let dbUtils  = require('../utils/dbUtils');
var refinerConfig = require('../config/refinerConfig');
var log4js = require('../utils/log4js');
const logger=log4js.getLogger();

class sjclService {

    static init(){
    	if(!this.sjclDao){
    		this.sjclDao= new sjclDao();
    	}
    }

    //有效时间策略,单条记录查询
    static findAllSjcls(obj,pageNo,pageSize){
        this.init();
		return this.sjclDao.findAll(obj,pageNo,pageSize);
    }


    //删除时间策略
	static deleteSjcl(sjcl){
        this.init();
		return this.sjclDao.updateSjcl(sjcl);
    } 

    //插入
	 static insertSjcl(sjcl,sjcl1,pageNo,pageSize){
        this.init();        
		return dbUtils.getSequelize().transaction().then(t =>{  
          
			return this.sjclDao.findAll(sjcl,pageNo,pageSize).then(result=>{
                logger.debug('length',result.count);
				if(result.count > 0 ){
                    logger.debug('已存在该条记录');   
                } else{
                    return this.sjclDao.insertSjcl(sjcl1,t).then(r=>{
                        logger.debug('2----->'+JSON.stringify(r));
                        t.commit();
                        return Promise.resolve(r);
                    }).catch(err=>{
                        logger.error('----->'+err);
                        t.rollback();
                    });
                }
            });  
        }); 
    }

    //更新
	static updateSjcl(sjcl1,sjcl3,pageNo,pageSize){ 
         this.init();
		return dbUtils.getSequelize().transaction().then(transaction =>{         
			return this.sjclDao.updateSjcl(sjcl1,transaction).then(result=>{
				if(result > 0){
                    return this.sjclDao.insertSjcl(sjcl3,transaction).then(r=>{
                        logger.debug('2----->'+r);
                        transaction.commit();
                        return Promise.resolve(r);
                    }).catch(err=>{
                        logger.error('----->'+err);
                        transaction.rollback();
                    });
                }else{
                    logger.debug('删除原纪录发生错误');   
                }
			});
		});   
    }    
}
module.exports = sjclService;


