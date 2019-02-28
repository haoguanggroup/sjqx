var express = require('express');
var router = express.Router();
var result = require('../models/result.js');
var multer  = require('multer');
var log4js = require('../utils/log4js');
const logger=log4js.getLogger();
var labelManagementService = require('../service/labelManagementService');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/',(req,res) => {
	res.json(result.resData(result.resHeadSuccess('yes'),null));

});

/** 
* 获取全部系统名 
*/
router.get('/findAllSystem',(req, res) =>{
    labelManagementService.findAllSystem().then((data) =>{
		logger.debug('cg',data);
        if(data){
            logger.debug('cg',JSON.stringify(data));
            res.json(result.resData(result.resHeadSuccess(),data));
        } else{
            logger.debug('sb');
            res.json(result.resData(result.resHeadError("查询标签系统失败"),null));
        }   
	})
});

/** 
* 标签详情 
*/
router.post('/selectTagDetails',(req, res) =>{
	var lsh = req.body.lsh;
	// var bqObj = dataObj.data;
	// var bqbm = bqObj.bqbm; //获取标签编码
	labelManagementService.findTagDetails(lsh).then((data) =>{
		logger.debug('cg',data);
        if(data){
            logger.debug('cg',JSON.stringify(data));
            res.json(result.resData(result.resHeadSuccess(),data));
        } else{
            logger.debug('sb');
            res.json(result.resData(result.resHeadError("查询标签失败"),null));
        }   
	})
});

/**	
* 获取标签表树 
*/
router.get('/selectTableTree',(req, res) =>{
	var sjydm = req.query.sjydm;
	labelManagementService.selectTableTree(sjydm).then((data) =>{
		logger.debug('cg',data);
        if(data){
            logger.debug('cg',JSON.stringify(data));
            res.json(result.resData(result.resHeadSuccess(),data));
        } else{
            logger.debug('sb');
            res.json(result.resData(result.resHeadError("获取标签树失败"),null));
        }   
	})
});

/**	
* 获取标签树 
*/
router.get('/selectTagDetailsTree',(req, res) =>{
	//获取sjywdx
	var sjywdx = req.query.sjywdx;

	labelManagementService.selectTagDetailsTree(sjywdx).then((data) =>{
		logger.debug('cg',data);
        if(data){
            logger.debug('cg',JSON.stringify(data));
            res.json(result.resData(result.resHeadSuccess(),data));
        } else{
            logger.debug('sb');
            res.json(result.resData(result.resHeadError("获取标签树失败"),null));
        }   
	})
});

/** 数据库表列表 */
router.get('/selectDataTable',(req,res) => {
    let sjbmc = 'refiner2';

    labelManagementService.selectDataTable(sjbmc).then((data) =>{

        res.json(result.resData(result.resHeadSuccess(),data));   

    }).catch(err => {

        res.json(result.resData(result.resHeadError('获取失败'),null));  
    });
})

/**
 * 获取历史标签
 */
router.post('/getTagDetailsList',(req, res) =>{
	//获取标签表对象

	labelManagementService.getTagDetailsList().then((data) =>{
		logger.debug('cg',JSON.stringify(data));
		res.json(result.resData(result.resHeadSuccess(),data));
	}).catch(err =>{
		logger.debug('sb');
		res.json(result.resData(result.resHeadError("获取历史标签失败"),null));
	});
})

/**
 * 使用历史标签,保存
 */
router.post('/histroyTagDetails',(req, res) =>{
	var bqObj = req.body;

	labelManagementService.histroyTagDetails(bqObj).then((data) =>{
		logger.debug('cg',JSON.stringify(data));
		res.json(result.resData(result.resHeadSuccess(),data));
	}).catch(err =>{
		logger.debug('sb');
		res.json(result.resData(result.resHeadError("保存标签失败"),null));
	});
})

/**
 * 新增-标签
 */
router.post('/newTagDetails',(req, res) =>{
	var bqObj = req.body;

	labelManagementService.newTagDetails(bqObj).then((data) =>{
		logger.debug('cg',JSON.stringify(data));
		res.json(result.resData(result.resHeadSuccess(),data));
	}).catch(err =>{
		logger.debug(err);
		res.json(result.resData(result.resHeadError("新增标签失败")));
	});
})

/** 
* 删除-标签 
*/
router.post('/deleteTagDetails',(req, res) =>{
	var lsh = req.body.lsh;

	labelManagementService.deleteTagDetails(lsh).then((data) =>{
		logger.debug('cg',JSON.stringify(data));
		res.json(result.resData(result.resHeadSuccess()));
	}).catch(err =>{
		logger.debug(err);
		res.json(result.resData(result.resHeadError("删除标签失败")));
	});
})

/**
 * 修改-标签
 */
router.post('/updateTagDetails',(req, res) =>{
	var bqObj = req.body;

	labelManagementService.updateTagDetails(bqObj).then((data) =>{
		logger.debug('cg',JSON.stringify(data));
		res.json(result.resData(result.resHeadSuccess(),data));
	}).catch(err =>{
		logger.debug(err);
		res.json(result.resData(result.resHeadError("新增标签失败"),null));
	});
})

/**
 * 删除业务对象下的标签
 */
router.post('/deleteYwbqdxBq',(req, res) =>{
	var lsh = req.body.lsh;

	labelManagementService.deleteYwbqdxBq(lsh).then((data) =>{
		logger.debug('cg',JSON.stringify(data));
		res.json(result.resData(result.resHeadSuccess(),data));
	}).catch(err =>{
		logger.debug(err);
		res.json(result.resData(result.resHeadError("新增标签失败"),null));
	});
})

/**
 * 获取业务对象主键
 */
router.post('/getYwbqdxID',(req, res) =>{
	var obj = req.body;

	labelManagementService.getYwbqdxID(obj).then((data) =>{
		logger.debug('cg',JSON.stringify(data));
		res.json(result.resData(result.resHeadSuccess(),data));
	}).catch(err =>{
		logger.debug(err);
		res.json(result.resData(result.resHeadError("新增标签失败"),null));
	});
})

module.exports = router;