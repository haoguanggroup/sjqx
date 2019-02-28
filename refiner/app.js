var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session  = require('express-session');
var router = require('./routes');
var result = require('./models/result');
var config = require('./config/refinerConfig');
var log4js = require('./utils/log4js');
var utils = require('./utils/utils');
var syncOrmService=require('./service/syncOrmService');
var commonService=require('./service/commonService');

const logger=log4js.getLogger();
const app = express();
app.use(cookieParser());
log4js.useLogger(app,logger);
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 900000 }
	}));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Expose-Headers", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Access-Token");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'3.2.1')
    res.header("Content-Type","application/json;charset=utf-8");
    if (req.method=="OPTIONS") {
    	res.send(200);
        return;
    }
    next();
});


logger.debug('同步对象关系映射....');
syncOrmService.syncOrm();

function refreshJdbm(){
	commonService.getAllJdbm().then(datas=>{
		let t_jdmb=null;
		let t_csdm=null;
		let t_jdmbdx=null;
		datas.push({csdm:'~!@#$%^&*()_+=-'});
		datas.forEach((data,index)=>{
			t_jdmb=data;
			if(t_csdm!==t_jdmb.csdm){
				if(t_csdm!=null){
					app.set(t_csdm,t_jdmbdx);
				}
				t_jdmbdx=[];
			}
			t_csdm=t_jdmb.csdm;		
			t_jdmbdx.push(t_jdmb);
		});
	});
}

refreshJdbm();
app.use("/getDict/:csdm",(req,res)=>{
	var csdm=req.params.csdm;
	if(csdm=='allRefresh'){
		refreshJdbm();
	}
	res.json(result.resData(result.resHeadSuccess(),app.get(csdm)));  
});
app.all('/*', (req, res, next) => {
	if(req.session.user) {
		next();
	} else if (req.path.includes('/login')) {
		next();
	} else {
		//res.json(result.resData(result.resHeadLoginError('登录失效'),null));
		next();
	}
});

app.use('/', router);
app.listen(config.appConfig.port, () => {
	logger.info('start server: ','http://localhost:'+config.appConfig.port);
});