var express = require('express');
var router = express.Router();
var result = require('../models/result.js');
var multer  = require('multer');
var log4js = require('../utils/log4js');
const logger=log4js.getLogger();
var dataSourceService = require('../service/dataSourceService');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/',(req,res) => {
	res.json(result.resData(result.resHeadSuccess('yes'),null));

});

/** 数据源列表 */
router.get('/selectDataSource',(req,res) => {

    dataSourceService.selectDataSource().then((data) =>{

        res.json(result.resData(result.resHeadSuccess(),data));   

    }).catch(err => {

        res.json(result.resData(result.resHeadError('获取失败'),null));  
    });
});

/** 数据库列表 */
router.get('/selectDataBase',(req,res) => {
    var sjymc = req.query.sjymc;

    dataSourceService.selectDataBase(sjymc).then((data) =>{

        res.json(result.resData(result.resHeadSuccess(),data));   

    }).catch(err => {

        res.json(result.resData(result.resHeadError('获取失败'),null));  
    });
})

/** 数据库表列表 */
router.get('/selectDataTable',(req,res) => {
    let sjbmc = req.query.sjbmc;

    dataSourceService.selectDataTable(sjbmc).then((data) =>{

        res.json(result.resData(result.resHeadSuccess(),data));   

    }).catch(err => {

        res.json(result.resData(result.resHeadError('获取失败'),null));  
    });
})

/** 获取数据源信息 */
router.get('/selectDataParameter',(req,res) => {
    var sjymc = req.query.sjymc;
    dataSourceService.selectDataParameter(sjymc).then((data,err) =>{

        res.json(result.resData(result.resHeadSuccess(),data));   

    }).catch(err =>{

        res.json(result.resData(result.resHeadError('获取失败'),null));   
    });
});

/** 更新数据源信息 */
router.post('/updateDataSource',(req,res) => {
    var obj = req.body;
    dataSourceService.updateDataSource(obj).then((data,err) => {
        res.json(result.resData(result.resHeadSuccess()));
    }).catch(err => {
        logger.debug('err----->'+err);
        res.json(result.resData(result.resHeadError('保存失败')));
	});
})

/**新增数据源 */
router.post('/insertDataSource',(req,res) => {
    //获取数据源对象
    var obj = req.body;

    dataSourceService.insertDataSource(obj).then((data,err) => {
        res.json(result.resData(result.resHeadSuccess()));
    }).catch(err => {
        res.json(result.resData(result.resHeadError('保存失败')));
	});
})

/** 测试连接 */
router.post('/testConnect',(req,res) => {
    let obj = {
        host : req.body.host,
        user : req.body.user,
        password : req.body.password,
        port : req.body.port,
        type : req.body.type,
        database : req.body.database
    }
    
    dataSourceService.testConnectService(obj).then((data,err) => {
        res.json(result.resData(result.resHeadSuccess(),data));
    }).catch(err => {
        res.json(result.resData(result.resHeadError('连接失败'),null));
	});
})


module.exports = router;