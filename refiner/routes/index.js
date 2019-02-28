let express  = require('express');
let router = express.Router();
//测试api路由
router.use('/test', require('./test'));
//公共api路由
router.use('/common', require('./common'));
//业务特征
router.use('/sf',require('./serviceFeature'));
router.use('/ds',require('./dataSrc'));
router.use('/mark',require('./mark'));
router.use('/ywtz',require('./ywtz'));

///** 数据源 */
router.use('/dataSource', require('./dataSource'));

//简单码表
router.use('/jdmb', require('./jdmb'));
//任务监控
router.use('/rwjk', require('./rwjk'));
//时间策略
router.use('/sjcl', require('./sjcl'));

/** 数据源 */
router.use('/dataSource', require('./dataSource'));
/** 标签管理 */
router.use('/labelManagement', require('./labelManagement'));

//定时策略
router.use('/sjcl_Wj', require('./sjcl_Wj'));
module.exports = router;