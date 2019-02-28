let sjcl_wjDao = require('../dao/sjcl_wjDao');
let dbUtils  = require('../utils/dbUtils');
var refinerConfig = require('../config/refinerConfig');
var log4js = require('../utils/log4js');
const logger=log4js.getLogger();

class sjcl_wjSevvice {

    static init(){
    	if(!this.sjcl_wjDao){
    		this.sjcl_wjDao= new sjcl_wjDao();
    	}
    }

    //执行策略——文件
    static getSjcl_wj(obj){
        this.init();
		return this.sjcl_wjDao.getSjcl_wj(obj);
    }






}
module.exports = sjcl_wjSevvice;


