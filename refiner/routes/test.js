var express = require('express');
var router = express.Router();
var result = require('../models/result.js');
var multer  = require('multer');
var log4js = require('../utils/log4js');
const logger=log4js.getLogger();
var commonService = require('../service/commonService');


router.get('/',(req,res) => {
	res.json(result.resData(result.resHeadSuccess('yes'),null));

});

router.get('/getAllUser',(req, res) =>{
  // let commonService=new CommonService();
  commonService.getAllUser().then((data)=>{
    res.json(result.resData(result.resHeadSuccess(),data));
  });
  
});
router.get('/getPageInfo',(req, res) =>{
    res.json(result.resData(result.resHeadSuccess(),commonService.getPageInfo()));  
});

router.post('/testPost',(req, res) =>{
	
    res.json(result.resData(result.resHeadSuccess(),commonService.getPageInfo()));  
});
// 自定义 multer 的 diskStorage 的存储目录与文件名
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'logs')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
});

var upload = multer({ storage: storage });
  

router.post('/upload',upload.any(), function (req, res, next) {
  console.log(req.files[0]);  // 上传的文件信息
  // req.files 是 `photos` 文件数组的信息
  // req.body 将具有文本域数据，如果存在的话
  for (var i = req.files.length - 1; i >= 0; i--) {
  	logger.debug('req.files[i].originalname  '+req.files[i].originalname);
  }
  logger.debug('req.files.length====>'+req.files.length);
});

module.exports = router;