const constantVar=require('../config/refinerConfig').constantVar;
var utils = require('../utils/utils');
exports.resData = function(resHead, resbody) {
	var result = {};
	result.head = resHead;
	result.resBody = resbody;
	return result;
};

var resHead = function(result,state, message) {
	var resHead = {};
	resHead.result = result;
	resHead.state = state;
	resHead.resTime=utils.formatDateTime(new Date());
	resHead.message = ((result==constantVar.result.cg && message==null)?"操作成功！":message);
	return resHead;
};

exports.resHeadSuccess = function(message) {
	
	return resHead(constantVar.result.cg,constantVar.state.cg,message);
};

exports.resHeadError = function(message) {
	return resHead(constantVar.result.sb,constantVar.state.sb,message);
};

exports.resHeadLoginError = function(message) {
	if(utils.isEmpty(message))message='用户名密码错误！';
	return resHead(constantVar.result.sb,constantVar.state.dlyc,message);
};

