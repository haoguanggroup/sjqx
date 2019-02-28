module.exports = {
	
    appConfig:{
    	uploadPath:'E:\\kettleHome\\uploadFiles',
    	tmpUploadPath:'E:\\kettleHome\\uploadFiles\\tmp\\',
    	port:3355,
    	code:1,
    	codeTime:'',
    	sn:1,
    	snTime:'',
    	kettleExecPath:'curl -u cluster:cluster http://127.0.0.1:8083/kettle/'
    },    
	dbConfig: {
		type	 : 'mysql',
		host     : '192.168.30.171',       
		user     : 'jzqljd',              
		password : 'Jzqljd@01',       
		port: '3306',                  
		database: 'refiner2', 
		// 最大连接数，默认为10
		max: 10,
		min: 0,
		idle: 10000,
		timezone: '+08:00'
	},
	constantVar:{
		pageInfo:{
			currentPage:1,
	    	pageSize:10,
	    	showPageNum:8,
	    	selPageSize:[10,20,50,100,1000],
	    	total:0
		},
		result:{
			cg:1,
			sb:0
		},
		state:{
			cg:1,
			sb:0,
			dlyc:500
		},
		yxbz:{
			wx:0,
			yx:1,
			zx:2
		},
		sf:{
			shi:'1',
			fou:'0',
			xg:'2'
		}
	}
};