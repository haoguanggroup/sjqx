/**
 * sql配置文件
 * 注意：只允许写通用型select语句
 * 静态sql
 * */
exports.sqlMap={
	sf:{
		datasource:"SELECT distinct sjydm,sjymc,'9' jllx FROM ty_sjypz a where a.yxbz='1'",
		jobs:"select a.clwjbm,a.sslxbm,a.bqwj,a.htbqwjm,b.clbh,c.clmc, c.kssj, c.seconds, c.minute, c.hour, c.day, c.month, c.week, c.year from t_ywclwj a inner join t_zxcl b on b.clwjbm=a.clwjbm inner join t_dscl c on c.clbh=b.clbh where a.yxbz='1' and b.yxbz='1' and c.yxbz='1'"

	},
	dbTools:{
		datasource:"SELECT a.sjylx,b.sjydm sjydm,b.sjymc sjymc,a.csdm,a.csmc,b.csz csz FROM ty_sjylxpz a left JOIN ty_sjypz b ON a.csdm = b.csdm and a.sjylx=b.sjylx and a.yxbz=b.yxbz WHERE a.yxbz = '1' and b.sjydm=?",
		testMysqlConn:"select now()"
	},
	common:{
		distinctCsdm:"select distinct csdm,csmc from s_jdmb"
	},
	ywtz:{
		allYwtz:"select sjy.*,ywxx.*,ywhj.*,ywsx.*,hjsx.*,zywhj.*,zhjsx.* from\n" +
					"(SELECT distinct sjydm, sjymc  FROM ty_sjypz a where a.yxbz='1')sjy\n" + 
					"left join (SELECT lsh ywxx_lsh,sjydm ywxx_sjydm,jllx ywxx_jllx,bm ywxx_bm,mc ywxx_mc,sjbm ywxx_sjbm,clwjzxlx ywxx_clwjzxlx,sfljzx ywxx_sfljzx,cjr ywxx_cjr,cjsj ywxx_cjsj,yxbz ywxx_yxbz FROM t_ywxx where yxbz='1') ywxx on ywxx.ywxx_sjydm=sjy.sjydm\n" + 
					"left join (SELECT lsh ywhj_lsh,ywbm ywhj_ywbm,bm ywhj_bm,sjbm ywhj_sjbm,mc ywhj_mc,sfby ywhj_sfby,hjxh ywhj_hjxh,qzhjbh ywhj_qzhjbh,clwjzxlx ywhj_clwjzxlx,sfljzx ywhj_sfljzx,cjr ywhj_cjr,cjsj ywhj_cjsj,yxbz ywhj_yxbz FROM t_ywhj where yxbz='1') ywhj on ywhj.ywhj_ywbm=ywxx.ywxx_bm \n" + 
					"left join (SELECT lsh ywsx_lsh,sslx ywsx_sslx,ssbm ywsx_ssbm,sxbm ywsx_sxbm,sxmc ywsx_sxmc,sxsjlx ywsx_sxsjlx,sxz ywsx_sxz,fxdj ywsx_fxdj,cjr ywsx_cjr,cjsj ywsx_cjsj,yxbz ywsx_yxbz FROM t_ywsx where yxbz='1' and sslx='1') ywsx on ywsx.ywsx_ssbm=ywxx.ywxx_bm\n" + 
					"left join (SELECT lsh hjsx_lsh,sslx hjsx_sslx,ssbm hjsx_ssbm,sxbm hjsx_sxbm,sxmc hjsx_sxmc,sxsjlx hjsx_sxsjlx,sxz hjsx_sxz,fxdj hjsx_fxdj,cjr hjsx_cjr,cjsj hjsx_cjsj,yxbz hjsx_yxbz FROM t_ywsx where yxbz='1' and sslx='2') hjsx on hjsx.hjsx_ssbm=ywhj.ywhj_bm\n" + 
					"left join (SELECT lsh zywhj_lsh,ywbm zywhj_ywbm,bm zywhj_bm,sjbm zywhj_sjbm,mc zywhj_mc,sfby zywhj_sfby,hjxh zywhj_hjxh,qzhjbh zywhj_qzhjbh,clwjzxlx zywhj_clwjzxlx,sfljzx zywhj_sfljzx,cjr zywhj_cjr,cjsj zywhj_cjsj,yxbz zywhj_yxbz FROM t_ywhj where yxbz='1') zywhj on zywhj.zywhj_sjbm=ywhj.ywhj_bm\n" + 
					"left join (SELECT lsh zhjsx_lsh,sslx zhjsx_sslx,ssbm zhjsx_ssbm,sxbm zhjsx_sxbm,sxmc zhjsx_sxmc,sxsjlx zhjsx_sxsjlx,sxz zhjsx_sxz,fxdj zhjsx_fxdj,cjr zhjsx_cjr,cjsj zhjsx_cjsj,yxbz zhjsx_yxbz FROM t_ywsx where yxbz='1' and sslx='2') zhjsx on zhjsx.zhjsx_ssbm=zywhj.zywhj_bm\n" + 
					// "left join (SELECT lsh ywcl_lsh,clwjbm ywcl_clwjbm,clwjlx ywcl_clwjlx,sslxbm ywcl_sslxbm,sfqdwj ywcl_sfqdwj,bqwj ywcl_bqwj,htbqwjm ywcl_htbqwjm,cjr ywcl_cjr,cjsj ywcl_cjsj,yxbz ywcl_yxbz FROM t_ywclwj  where yxbz='1' and clwjlx='1')ywcl on ywcl.ywcl_sslxbm=ywxx.ywxx_bm\n" + 
					// "left join (SELECT lsh hjcl_lsh,clwjbm hjcl_clwjbm,clwjlx hjcl_clwjlx,sslxbm hjcl_sslxbm,sfqdwj hjcl_sfqdwj,bqwj hjcl_bqwj,htbqwjm hjcl_htbqwjm,cjr hjcl_cjr,cjsj hjcl_cjsj,yxbz hjcl_yxbz FROM t_ywclwj  where yxbz='1' and clwjlx='2')hjcl on hjcl.hjcl_sslxbm=ywhj.ywhj_bm\n"+
					"order by sjy.sjydm,ywxx.ywxx_bm,ywhj.ywhj_hjxh,ywhj.ywhj_bm,ywsx.ywsx_sxbm,hjsx.hjsx_sxbm",
	   //  allYwtz:"select sjy.*,ywxx.* from\n" +
				// "(SELECT distinct sjydm, sjymc  FROM ty_sjypz a where a.yxbz='1')sjy\n" + 
				// "left join (SELECT lsh ywxx_lsh,sjydm ywxx_sjydm,jllx ywxx_jllx,bm ywxx_bm,mc ywxx_mc,sjbm ywxx_sjbm,clwjzxlx ywxx_clwjzxlx,sfljzx ywxx_sfljzx,cjr ywxx_cjr,cjsj ywxx_cjsj,yxbz ywxx_yxbz FROM t_ywxx where yxbz='1') ywxx on ywxx.ywxx_sjydm=sjy.sjydm\n" + 
				// "order by sjy.sjydm,ywxx.ywxx_bm",
	},
	dscl:{
		allDscl:"select a.clbh, a.clmc, a.kssj, a.seconds, a.minute, a.hour, a.day, a.month, a.week, a.year,a.jssj,c.mc,c.bm,b.clwjlx, t.htbqwjm htbqwjm,t.bqwj\n" +
		" from t_dscl a inner join t_zxcl b on a.clbh=b.clbh and b.yxbz=a.yxbz and b.clwjlx='1'\n" + 
		"inner join t_ywxx c on c.bm=b.sslxbm and c.yxbz=a.yxbz\n" + 
		"inner join t_ywclwj t on t.sslxbm=c.bm and t.sfqdwj='1' and t.yxbz=a.yxbz\n" + 
		"where a.yxbz='1' and t.htbqwjm is not null\n" + 
		"union all\n" + 
		"select a.clbh, a.clmc, a.kssj, a.seconds, a.minute, a.hour, a.day, a.month, a.week, a.year,a.jssj,c.mc,c.bm,b.clwjlx,t.htbqwjm htbqwjm,t.bqwj\n" + 
		" from t_dscl a inner join t_zxcl b on a.clbh=b.clbh and b.yxbz=a.yxbz and b.clwjlx='2'\n" + 
		"inner join t_ywhj c on c.bm=b.sslxbm and c.yxbz=a.yxbz\n" + 
		"inner join t_ywclwj t on t.sslxbm=c.bm and t.sfqdwj='1' and t.yxbz=a.yxbz\n" + 
		"where a.yxbz='1' and t.htbqwjm is not null"

	}

};
/**
 * 动态 方法sql
 * */
exports.dynamicSql={
    mark:{
    	getTableColumns:function(_param){
			var sjydm=_param.sjydm;
			var sql=null;
			var paramData=[];
			var sjlx=_param.sjylx.toLowerCase();
			if(sjlx=='mysql'){
				sql="select a.* ,case when a.zdsjcd1 is null and a.zdsjcd2 is null then '' when cast(a.zdsjcd2 as char) is null then zdsjcd1 else concat(cast(zdsjcd1 as char),',',cast(zdsjcd2 as char)) end zdsjcd from (select column_name zdm,column_comment zdzj,data_type zdsjlx,case when column_key='PRI' then '1' else '0' end zdlx,case when data_type='decimal' then NUMERIC_PRECISION else CHARACTER_MAXIMUM_LENGTH end  zdsjcd1,case when data_type='decimal' then NUMERIC_SCALE end  zdsjcd2,ORDINAL_POSITION sxh from information_schema.columns where upper(table_name)=upper(?) and upper(table_schema)=upper(?) and column_key='PRI')a order by sxh";
				paramData.push(_param.tableName);
				paramData.push(_param.database);
			}
			return {sql:sql,param:paramData};
		},
		getDataBaseTable:function(_param){
			var sjlx=_param.sjylx.toLowerCase();
			var sql=null;
			var paramData=[];
			if(sjlx=='mysql'){
				sql="SELECT TABLE_NAME sjywdx,case when length(ifnull(TABLE_COMMENT,TABLE_NAME))=0 then TABLE_NAME else ifnull(TABLE_COMMENT,TABLE_NAME) end sjywdxmc,concat('t_refiner_',Lower(TABLE_NAME)) mrsjywdx FROM information_schema.TABLES WHERE table_schema=?";
				paramData.push(_param.database);
			}
			return {sql:sql,param:paramData};
		}
    },
    ywtz:{
    	getGxQdwjConfig:function(_sslxbm,_qdwjm){
    		var sql="UPDATE t_ywclwj SET sfqdwj = case when bqwj=? then '1' else '0' end  WHERE  sslxbm = ? and yxbz='1' ";
			var paramData=[];
			paramData.push(_qdwjm);
			paramData.push(_sslxbm);
    		return {sql:sql,param:paramData};
    	}
    },
	
	getSjy:function(_param){
		var sql="SELECT a.sjylx,'' sjydm,'' sjymc,a.csdm,a.csmc,a.mrz csz FROM ty_sjylxpz a  WHERE a.yxbz = '1'";
		var paramData=[];
		
		if(_param.sjydm){
			sql="SELECT a.sjylx,b.sjydm sjydm,b.sjymc sjymc,a.csdm,a.csmc,b.csz csz FROM ty_sjylxpz a left JOIN ty_sjypz b ON a.csdm = b.csdm and a.sjylx=b.sjylx and a.yxbz=b.yxbz WHERE a.yxbz = '1'";
			sql+=" and b.sjydm=?";
			paramData.push(_param.sjydm);
		}
		
		if(_param.sjylx){
			sql+=" and a.sjylx=?";
			paramData.push(_param.sjylx);
		}
		sql+=" order by a.sxh";
		return {sql:sql,param:paramData};
	},
	testSql1:function(params){
		
	},
	findAllRw:function(obj,pageNo,pageSize){
		var sql = "select a.clwjbm as clwjbm ,a.bqwj as bqwjmc,b.zxkssj as zxkssj,b.zxjssj as zxjssj,b.zxzt as zxzt,c.mc as ywmc,c.bm as ywbm from t_ywclwj a"
		+" left join t_bqwjzxrz b on a.clwjbm = b.clwjbm " 
		+" left join t_ywxx c on a.sslxbm = c.bm " 
		+" where a.sfqdwj = '1' and a.yxbz = '1' and a.clwjlx = '1'"
		+" order by b.zxkssj"; 
		var paramData=[];
		if(obj.mc!= null  && obj.mc !=""&& obj.mc !="''"){
			sql = sql + " and c.mc like ?";
			paramData.push("%"+obj.mc+"%");
		}
		if(obj.bqwj != null  && obj.bqwj !=""&& obj.bqwj !="''"){
			sql = sql + " and a.bqwj like ?";
			paramData.push("%"+obj.bqwj+"%");
		}
		if(obj.kssj != null && obj.jssj != null){
			sql = sql + " and b.zxkssj between ? and ?";
			paramData.push(obj.kssj,obj.jssj);
		}
		if(pageNo != null && pageSize != null){
			sql=sql+" limit "+((pageNo-1)*pageSize)+","+pageSize;
		}
		
		return {sql:sql,param:paramData};
	},

	findCount:function(obj){
		var sql_total = "select count(1) as total from t_ywclwj a"
		+" left join t_bqwjzxrz b on a.clwjbm = b.clwjbm " 
		+" left join t_ywxx c on a.sslxbm = c.bm " 
		+" where a.sfqdwj = '1' and a.yxbz = '1' and a.clwjlx = '1'";
		var paramData_total=[];
		if(obj.mc!= null  && obj.mc !=""&& obj.mc !="''"){
			sql_total = sql_total + " and c.mc like ?";
			paramData_total.push("%"+obj.mc+"%");
		}
		if(obj.bqwj != null  && obj.bqwj !=""&& obj.bqwj !="''"){
			sql_total = sql_total + " and a.bqwj like ?";
			paramData_total.push("%"+obj.bqwj+"%");
		}
		if(obj.kssj != null && obj.jssj != null){
			sql_total = sql_total + " and b.zxkssj between ? and ?";
			paramData_total.push(obj.kssj,obj.jssj);
		}
		return {sql:sql_total,param:paramData_total};

	},
	//事件策略——处理文件
	selectSjcl_wj:function(obj){
		var sql_sjcl = "select a.clwjbm,a.sslxbm,a.bqwj,a.htbqwjm,b.clbh,c.clmc, c.kssj, c.seconds, c.minute, c.hour, c.day, c.month, c.week, c.year"
		+ " from t_ywclwj a inner join t_zxcl b on b.clwjbm=a.clwjbm"
		+ " inner join t_dscl c on c.clbh=b.clbh"
		+ " where a.yxbz='1' and b.yxbz='1' and c.yxbz='1'";
		var param_Sjcl = [];
		if(obj.clbh != null  && obj.clbh !=""&& obj.clbh !="''"){
			sql_sjcl = sql_sjcl+" and b.clbh = ?";
			param_Sjcl.push(obj.clbh);
		}
		if(obj.clwjbm != null  && obj.clwjbm !=""&& obj.clwjbm !="''"){
			sql_sjcl = sql_sjcl+" and a.clwjbm = ?";
			param_Sjcl.push(obj.clwjbm);
		}		
		return {sql:sql_sjcl,param:param_Sjcl};
	}
};