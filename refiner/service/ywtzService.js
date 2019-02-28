var ywtzDao = require('../dao/ywtzDao');
var dataSrcDao = require('../dao/dataSrcDao');
var commonDao = require('../dao/commonDao');
var sqlConfig = require('../dao/sqlConfig');
var log4js = require('../utils/log4js');
var logger=log4js.getLogger();
var refinerConfig = require('../config/refinerConfig');
var dbUtils  = require('../utils/dbUtils');
var utils = require('../utils/utils');
var path = require('path');
var _ = require('lodash');
var child_process = require("child_process");

class ywtzService {
 	static init(){
    	if(!this.ywtzDao){
    		this.ywtzDao= new ywtzDao();
    	}
    	if(!this.dataSrcDao){
    		this.dataSrcDao= new dataSrcDao();
    	}
    	if(!this.commonDao){
    		this.commonDao= new commonDao();
    	}
    }

    static clearArrayKey(_a,_b,_type,_ywbm){
        var target=[];
        var param_keys=Object.getOwnPropertyNames(_b); 
        _a.forEach(item=>{ 
            var obj={};
            for(var key of param_keys){
                obj[key]=item[_b[key]];
            }
            if(_type)obj.type=_type;
            if(_ywbm)obj.ywbm=_ywbm;
            target.push(obj);
        });

        return target;
    }
    static addhjsx(_hjxxs,_data,_ywbm,_hjbm,_type){
        var _this=this;
        _hjxxs.forEach(hjxx=>{
            hjxx.children=[{label:'环节子流程',id:'zlc'+hjxx.id,type:'all-zlc'}
                                ,{label:'环节特征',id:'hjtz'+hjxx.id,type:'all-hjtz'}];
            hjxx.children.forEach(xxfl=>{
                if('all-zlc'==xxfl.type){
                    var zlc=_.filter(_.uniqBy(_data, 'zywhj_bm'), function(o) { 
                        if(utils.equals(o.zywhj_sjbm,hjxx.id)&&utils.isNotEmpty(o.zywhj_bm)){
                            return true;
                        }
                        return false;
                   });
                    if(utils.isNotEmpty(zlc)){
                         xxfl.children=_.sortBy(_this.clearArrayKey(zlc,{label:"zywhj_mc",id:"zywhj_bm",sxh:"zywhj_hjxh"},'zlc',_ywbm),["sxh"]);
                         
                         xxfl.children.forEach(zywlc=>{
                            _this.addhjsx(xxfl.children,_data,_ywbm,zywlc.id,'2');
                         });
                    }
                }else{
                    if(_type=='2'){
                        var zlc=_.filter(_.uniqBy(_data, 'zhjsx_sxbm'), function(o) { 
                            logger.debug('_hjbm========>'+_hjbm+'  zhjsx_ssbm======>'+o.zhjsx_ssbm);
                            if(utils.equals(o.zhjsx_ssbm,_hjbm)&&utils.isNotEmpty(o.zhjsx_sxbm)){
                                return true;
                            }
                            return false;
                        });
                        xxfl.children=_this.clearArrayKey(zlc,{label:"zhjsx_sxmc",id:"zhjsx_sxbm"},'zhjsx');
               
                    }else{
                        var zlc=_.filter(_.uniqBy(_data, 'hjsx_sxbm'), function(o) { 
                            if(utils.equals(o.hjsx_ssbm,_hjbm)&&utils.isNotEmpty(o.hjsx_sxbm)){
                                return true;
                            }
                            return false;
                        });
                        xxfl.children=_this.clearArrayKey(zlc,{label:"hjsx_sxmc",id:"hjsx_sxbm"},'hjsx');
               
                    }
                 }
            });
        });
    }
    static clearAllFeature(_target){
        _target.forEach((item,index)=>{
            if('all-ywtz'==item.type
                ||'all-ywhj'==item.type
                ||'all-zlc'==item.type
                ||'all-hjtz'==item.type){
                if(utils.isEmpty(item.children)){
                    _target.splice(index,1);
                }else{
                    this.clearAllFeature(item.children);
                }
            }
            if(item.children){
                this.clearAllFeature(item.children);
            }

        });
    }
    static getAllYwtz(){
    	this.init();
        var _this=this;
    	return this.ywtzDao.getAllYwtz().then(data=>{
    		
			var target=_this.clearArrayKey(_.uniqBy(data, 'sjydm'),{label:"sjymc",id:"sjydm"},'sjy');
            
            target.forEach(sjy=>{
                  sjy.children=_this.clearArrayKey(_.filter(_.uniqBy(data, 'ywxx_bm'), function(o) { 
                        if(utils.equals(o.sjydm,sjy.id)&&utils.isNotEmpty(o.ywxx_bm)){
                            return true;
                        }
                        return false;
                   }),{label:"ywxx_mc",id:"ywxx_bm"},'ywxx');
                  sjy.children.forEach(ywxx=>{
                        ywxx.children=[{label:'业务流程',id:'ywhj'+ywxx.id,type:'all-ywhj'}
                                      ,{label:'业务特征',id:'ywtz'+ywxx.id,type:'all-ywtz'}];
                        ywxx.children.forEach(xxfl=>{
                            if('all-ywhj'==xxfl.type){
                                xxfl.children=_this.clearArrayKey(_.filter(_.uniqBy(data, 'ywhj_bm'), function(o) { 
                                    if(utils.equals(o.sjydm,sjy.id)&&utils.equals(o.ywhj_ywbm,ywxx.id)&& utils.isEmpty(o.ywhj_sjbm) &&utils.isNotEmpty(o.ywhj_bm)){
                                        return true;
                                    }
                                    return false;
                               }),{label:"ywhj_mc",id:"ywhj_bm",sxh:"ywhj_hjxh"},'ywhj',ywxx.id);
                               xxfl.children.forEach(ywhj=>{                                 
                                 this.addhjsx(xxfl.children,data,ywxx.id,ywhj.id,'1');
                               });
                            }else{
                                xxfl.children=_this.clearArrayKey(_.filter(_.uniqBy(data, 'ywsx_sxbm'), function(o) { 
                                    if(utils.equals(o.sjydm,sjy.id)&&utils.equals(o.ywhj_ywbm,ywxx.id)&&utils.isNotEmpty(o.ywsx_sxbm)){
                                        return true;
                                    }
                                    return false;
                               }),{label:"ywsx_sxmc",id:"ywsx_sxbm"},'ywsx');
                            }
                        });
                  });
            });
            _this.clearAllFeature(target);
            return Promise.resolve(target);
		}).catch(err=>{
			return Promise.reject(err);
		});
    }
   static save(_type,_obj){
      this.init();
      var objName='ywxx'; 
      var lx='1';

      if(_type=='hjxx'){
        objName='ywhj';
        lx='2';
      }
      var obj=_obj[_type];
      var _this=this;
      var ywhjs=_obj.ywhj;
      var ywsxs=_obj.ywsx;
      var ywclwjs=_obj.ywclwj;
      var zxcls=_obj.zxcl;
      return dbUtils.getSequelize().transaction().then(async t=>{
        var lsh=utils.generateSN();
        var _o=obj;
        if(utils.equals(obj.operateType,'C')||utils.equals(obj.operateType,'U')){
            if(utils.isEmpty(obj.bm)){
                obj.bm=utils.generateCode('sf-');
            }
            var _target=null;
            obj.lsh=lsh;
            _o=await _this.commonDao.save(obj,objName,t);
        }
        if(utils.isNotEmpty(ywhjs)){
            for(var i=0;i<ywhjs.length;i++){
                ywhjs[i].lsh=lsh;
                if(utils.isEmpty(ywhjs[i].ywbm)&&objName=='ywxx'){
                    ywhjs[i].ywbm=_o.bm;                            
                }
                if(utils.isEmpty(ywhjs[i].sjbm)&&objName=='ywhj'){
                    ywhjs[i].sjbm=_o.bm;   
                    ywhjs[i].ywbm=_o.ywbm;                         
                }
                if(utils.isEmpty(ywhjs[i].bm)){
                    ywhjs[i].bm=utils.generateCode('hj-');
                }
                _target=await _this.commonDao.save(ywhjs[i],'ywhj',t);
            }
        }
        if(utils.isNotEmpty(ywsxs)){
            for(var i=0;i<ywsxs.length;i++){
                ywsxs[i].lsh=lsh;
                ywsxs[i].sslx=lx; 
                if(utils.isEmpty(ywsxs[i].ssbm))
                    ywsxs[i].ssbm=_o.bm; 
                if(utils.isEmpty(ywsxs[i].sxbm)){
                    ywsxs[i].sxbm=utils.generateCode('sx-');
                }
                _target= await _this.commonDao.save(ywsxs[i],'ywsx',t);
            }
        }
        if(utils.isNotEmpty(ywclwjs)){
            var wjcclj=await _this.getFilePath(_o.bm);
            for(var i=0;i<ywclwjs.length;i++){
                ywclwjs[i].lsh=lsh;
                ywclwjs[i].clwjlx=lx;  
                if(utils.isEmpty(ywclwjs[i].sslxbm))
                    ywclwjs[i].sslxbm=_o.bm; 
                if(utils.isEmpty(ywclwjs[i].clwjbm)){
                    ywclwjs[i].clwjbm=utils.generateCode('wj-');
                }
                ywclwjs[i].htbqwjm=wjcclj+'/'+ywclwjs[i].bqwj;
                _target=await _this.commonDao.save(ywclwjs[i],'ywclwj',t);
            }
        }
        if(utils.isNotEmpty(obj.qdwjmc)){
            var sc=sqlConfig.dynamicSql.ywtz.getGxQdwjConfig(_o.bm,obj.qdwjmc);
            await dbUtils.execSql(sc.sql,sc.param,t);
        }
        if(utils.isNotEmpty(zxcls)){
            for(var i=0;i<zxcls.length;i++){
                var zxcl={lsh:lsh,clwjlx:lx,sslxbm:_o.bm,clbh:zxcls[i]};                   
                _target=await _this.commonDao.save(zxcl,'zxcl',t);
            }
        }
        t.commit();
        return _o;
      }).catch(err=>{
            logger.error(err);
            return Promise.reject(err);
      });
   }

   static execKettel(_lx,_bm){
        var _this=this;
        _this.commonDao.findAllObjs(_lx,{bm:_bm}).then(datas=>{
            logger.debug('==='+_lx+'======>'+_bm);
            if(utils.isNotEmpty(datas)){
                var dx=datas[0];
                if(utils.equals(dx.sfljzx,refinerConfig.constantVar.sf.shi)){
                    _this.commonDao.findAllObjs('ywclwj',{sslxbm:_bm,sfqdwj:refinerConfig.constantVar.sf.shi}).then(d1=>{
                         logger.debug('===d1======>'+d1.length);
                        if(utils.isNotEmpty(d1)){
                           _this.execFile(d1[0].htbqwjm);
                        }
                    }).catch(err=>{
                        return Promise.reject(err);
                    });
                }
            }
            return Promise.resolve(null);
        }).catch(err=>{
                return Promise.reject(err);
        });
   }
   static execFile(_wjm){
    this.init();
    var execUrl=refinerConfig.appConfig.kettleExecPath;
    var tmp_lswj=null;
    if('.kjb'==_wjm.substring(_wjm.lastIndexOf('.'))){
        tmp_lswj=execUrl+'executeJob/?job='+_wjm;
    } else if('.ktr'==_wjm.substring(_wjm.lastIndexOf('.'))){
        tmp_lswj=execUrl+'executeTrans/?trans='+_wjm;
    }
 
    if(utils.isNotEmpty(tmp_lswj)){
        child_process.exec(tmp_lswj, function(err, stdout, stderr) {
           logger.info(stdout);
        });
    }
    
   }
   static getFilePath(_sslxbm){
        if(utils.isEmpty(_sslxbm)){
            // 设置文件存储
            return Promise.resolve(path.join(refinerConfig.appConfig.uploadPath,utils.generateCode('uf-'))); 
        }else{
            return this.commonDao.query('ywclwj',{sslxbm:_sslxbm}).then(datas=>{                
                if(datas.length>0){
                    return Promise.resolve(path.parse(datas[0].htbqwjm).dir); 
                }
                return Promise.resolve(path.join(refinerConfig.appConfig.uploadPath,utils.generateCode('uf-'))); 
            }).catch(err=>{
                return Promise.reject(err);
            });
        }
   }
}
module.exports = ywtzService;