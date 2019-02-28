let dbUtils  = require('../utils/dbUtils');

var log4js = require('../utils/log4js');
const logger=log4js.getLogger();
class UserDao {

	constructor() {
		this.sequelize = dbUtils.getSequelize();
		if (!this.sequelize.isDefined('user')) {
			logger.debug('用户关系模型未建立');
		}
		this.user = this.sequelize.models.user;
	}

    findAllUser(){
    	return this.user.findAll();
    }
	// login(userName, password, transaction) {
	// 	if (typeof userName !== 'string' || typeof password !== 'string') {
	// 		return Promise.reject('传入的数据类型不对，确保传入的参数类型为string类型');
	// 	}
	// 	if (!userName || !password) {
	// 		return Promise.reject('传入的参数不能为空');
	// 	}
	// 	return this.user.findOne({
	// 		where: {
	// 			password: password,
	// 			$or: [
	// 				{ userName: {
	// 					$eq: userName
	// 				} },
	// 				{ mobilePhone: {
	// 					$eq: userName
	// 				} }
	// 			  ],d
	// 			validFlag: '0'
	// 		},
	// 		transaction
	// 	});
	// }
}
module.exports = UserDao;