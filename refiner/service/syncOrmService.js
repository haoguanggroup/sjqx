var Sequelize =  require('sequelize');
var dbUtils = require('../utils/dbUtils');
var log4js = require('../utils/log4js');
const logger=log4js.getLogger();

class syncOrmService {

	static syncOrm() {
		let sequelize = dbUtils.getSequelize();
		require('../models/user')(sequelize, Sequelize);
		require('../models/sjypz')(sequelize, Sequelize);
		require('../models/sjylxpz')(sequelize, Sequelize);
		require('../models/bqk')(sequelize, Sequelize);
		require('../models/ywbqdx')(sequelize, Sequelize);
		require('../models/ywbqdx_bq')(sequelize, Sequelize);

		require('../models/jdmb')(sequelize, Sequelize);
		require('../models/ywxx')(sequelize, Sequelize);
		require('../models/ywhj')(sequelize, Sequelize);
		require('../models/ywsx')(sequelize, Sequelize);
		require('../models/ywclwj')(sequelize, Sequelize);

		require('../models/bqwjzxrz')(sequelize, Sequelize);
		require('../models/dscl')(sequelize, Sequelize);
		require('../models/zxcl')(sequelize, Sequelize);			
		

		
		logger.info('同步映射完成。');
	}
}

module.exports = syncOrmService;