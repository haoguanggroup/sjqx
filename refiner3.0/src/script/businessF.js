var vm = new Vue({
    el: '#app',
    data: {
        sjlxOptions: [],
        fxdjOptions: [],
        zxlxOptions: [],
        regionOptions: [],
        treeData: [],
        defaultProps: {
            children: 'children',
            label: 'label'
        },
        entity: {},
        //业务表单显示隐藏
        businessFormShow: false,
        //业务表单信息
        businessFormChange:1,
        businessForm: {
            lsh: '',
            bm: '',
            mc: '',
            ssxt: '',
            sjbm: '',
            cjr: '',
            cjsj: '',
            yxbz: '',
            scclwj: '上传处理文件',
            checked: false,
        },
        //表格显示隐藏
        isShowTable: true,
        //表格数据
        tableData3: [],
        //表格初始长度
        tableData3Length: "",
        //取消按钮显示隐藏
        isShowCancel: true,
        //删除键显示隐藏
        isShowDelete: true,
        //树节点键值
        key: '',
        // 业务特征表单显示隐藏
        businessFeatureAttrFormShow: '',
        //业务特征属性表单信息
        businessFeatureAttrForm: {
            lsh: '',
            ywmc: '',
            sxmc: '',
            sxbm: '',
            sxmc: '',
            sxsjlx: '',
            sxz: '',
            fxdj: '',
            cjr: '',
            cjsj: ''
        },
        //环节信息显示隐藏
        businessTypeLinkFormShow: '',
        //环节信息表单
        businessTypeLinkForm: {
            lsh: '',
            ywbm: '',
            bm: '',
            mc: '',
            sfby: "",
            hjxh: '',
            qzhjbh: '',
            cjr: '',
            cjsj: '',
            checked: false,
        },
        //环节属性表
        businessTypeLinkAttrForm: {
            lsh: '',
            hjbm: '',
            sxbm: '',
            sxmc: '',
            hjsxlx: '',
            sxz: '',
            fxdj: '',
            cjr: '',
            cjsj: ''
        },
        //环节属性表显示隐藏
        businessTypeLinkAttrFormShow: '',
        //是否必要
        sfbyOptions: [
            {
                label: "是",
                value: '1'
            },
            {
                label: "否",
                value: "0"
            }
        ],
        //提交参数
        params: {
             //存放启动文件信息（lxq）
            qdFiles:{},
            //原启动文件（lxq）
            yqdFiles:{},
            addFiles: [],
            delFiles: [],
        },
        fileList: [],
        Files: [],
        radio: "",
        //设置执行类型表单显示隐藏
        dialogFormVisible: false,
        form: {
            region: '',
        },
        timeForm: {
            region: ''
        },
        time: false,
        formLabelWidth: '120px',
        zxlxIndex: '',
        ssxt: '',//所属系统
        sjydm: '',//数据源代码
        ywbm: '', //业务编码
        ywmc: '', //业务名称
        hjbm: '', //环节编码
        sslxbm: '',//所属类型编码（上传文件需要的参数）
        // isShowDoType:false,
        // doType:'',
        isShowForm: false,
        isShowForm1: false,
        //文件是否重复(lxq)
        sfcf:0,
        //启动文件索引（lxq）
        qdFileIndex:'',
    },
    mounted() {
        //获得文件表格初始长度
        this.tableData3Length = this.tableData3.length;
        this.Url = init.getUrl();
        this.initTree();
        // 获取数据类型
        this.initDict('sjlx', this.sjlxOptions);
        this.initDict('fxdj', this.fxdjOptions);
        this.initDict('zxlx', this.zxlxOptions);
        //获取时间策略
        axios.post(this.Url + '/sjcl/findAllSjcls', init.getRequestData({}, {})).then(res => {
            let rwjkdatas = res.data.resBody.rows;
            rwjkdatas.forEach(e => {
                this.regionOptions.push({
                    value: e.clbh,
                    label: e.clmc
                });
            });
            console.log('时间策略-->', this.regionOptions);
        }).catch((error) => {
            console.log('获取时间策略失败', error);
        });
    },
    methods: {
        //上传文件input
        upInput(a, b) {
            this.isShowForm = a;
            this.isShowForm1 = b;
        },
        initDict(csdm, obj) {
            axios.get(this.Url + '/getDict/' + csdm).then(res => {
                console.log(res.data.resBody)
                for (var i = 0; i < res.data.resBody.length; i++) {
                    obj.push({ value: res.data.resBody[i].zdm, label: res.data.resBody[i].zmc });
                }
            }).catch(err => {
                console.log(err)
            });
        },
        initTree() {
            let _data = [];
            // 获取一级树源
            axios.get(this.Url + "/sf/query/datasource").then(res => {
                for (var i = 0; i < res.data.resBody.length; i++) {
                    _data.push({
                        label: res.data.resBody[i].sjymc,
                        sjydm: res.data.resBody[i].sjydm,
                        key: "sjy",
                        children: []
                    });
                }
                // 获取二级树源
                let t_node = null;
                for (let j = 0; j < _data.length; j++) {      
                    axios.get(this.Url + "/sf/query/ywxx", { params: { sjydm: _data[j].sjydm } }).then(res => {
                        for (let k = 0; k < res.data.resBody.length; k++) {
                            t_node = null;
                            t_node = res.data.resBody[k];
                            t_node.label = res.data.resBody[k].mc;
                            t_node.key = "business";
                            t_node.files = [];
                            t_node.children = [{ label: "业务特征", children: [], key: "ywtz" }, { label: "业务环节", children: [], key: "ywhj" }];
                            _data[j].children.push(t_node);

                        }
                        //业务特征
                        for (let i = 0; i < _data[j].children.length; i++) {
                            axios.get(this.Url + "/sf/query/ywsx", {
                                params: init.getRequestData({ ssbm: _data[j].children[i].bm }, {}).body.data
                            }).then(res => {
                                for (let k = 0; k < res.data.resBody.length; k++) {
                                    t_node = null;
                                    t_node = res.data.resBody[k];
                                    t_node.label = res.data.resBody[k].sxmc;
                                    t_node.key = "businessProp";
                                    _data[j].children[i].children[0].children.push(t_node);
                                }
                            }).catch(err => {
                                console.log(err)
                            });
                            //获取业务文件信息
                            axios.get(this.Url + "/sf/query/ywclwj",
                                { params: { sslxbm: _data[j].children[i].bm } })
                                .then(res => {
                                    console.log(res)
                                    for (let a = 0; a < res.data.resBody.length; a++) {
                                        var t_file = null;
                                        t_file = res.data.resBody[a];
                                        _data[j].children[i].files.push(t_file);
                                    }
                                }).catch(err => {
                                    console.log(err)
                                })
                            // 业务环节
                            axios.get(this.Url + "/sf/query/ywhj", {
                                params: init.getRequestData({ ywbm: _data[j].children[i].bm }, {}).body.data
                            }).then(res => {
                                // console.log(res)
                                for (let k = 0; k < res.data.resBody.length; k++) {
                                    t_node = null;
                                    t_node = res.data.resBody[k];
                                    t_node.label = res.data.resBody[k].mc;
                                    t_node.key = "link";
                                    t_node.files = [];
                                    t_node.children = [];
                                    _data[j].children[i].children[1].children.push(t_node);
                                }
                                //环节属性
                                // console.log(_data)
                                for (let p = 0; p < res.data.resBody.length; p++) {
                                    //获取环节文件信息
                                    console.log("sslxbm:" + _data[j].children[i].children[1].children[p].bm)
                                    axios.get(this.Url + "/sf/query/ywclwj",
                                        { params: { sslxbm: _data[j].children[i].children[1].children[p].bm } })
                                        .then(res => {
                                            console.log(res.data.resBody)
                                            for (let a = 0; a < res.data.resBody.length; a++) {
                                                var t_file = null;
                                                t_file = res.data.resBody[a];
                                                _data[j].children[i].children[1].children[p].files.push(t_file);
                                            }
                                        }).catch(err => {
                                            console.log(err)
                                        })
                                    //  console.log(_data[j].children[i].children[1].children[p].bm)
                                    axios.get(this.Url + "/sf/query/ywsx", {
                                        params: { ssbm: _data[j].children[i].children[1].children[p].bm }
                                    }).then(res => {

                                        for (let q = 0; q < res.data.resBody.length; q++) {
                                            t_node = null;
                                            t_node = res.data.resBody[q];
                                            t_node.label = res.data.resBody[q].sxmc;
                                            t_node.key = "linkProp";
                                            _data[j].children[i].children[1].children[p].children.push(t_node);
                                        }
                                    }).catch(err => {
                                        console.log(err)
                                    })
                                }

                            }).catch(err => {
                                console.log(err)
                            });
                        }
                    }).catch(err => {
                        console.log(err)
                    });
                }
            }).catch(err => {
                console.log(err)
            })
            this.treeData = _data;
        },

        //是否启动
        sfqd() {      
            for (var i = 0; i < this.tableData3.length; i++) {
               // this.tableData3[i].start = 0;
                if (this.tableData3[i].start == 1) {
                    this.radio = this.tableData3[i].fileName;
                }
                if (this.radio == this.tableData3[i].fileName) {
                    this.tableData3[i].start = 1;
                    this.qdFileIndex = this.tableData3[i].fileName;
                    this.params.qdFiles = {
                        clwjbm: this.tableData3[i].clwjbm,
                        sfqdwj: 1,
                        zxlx: this.tableData3[i].zxlx,
                        bqwj: this.tableData3[i].fileName,
                        sjcls: this.tableData3[i].sjcl
                    }
                }
            }
        },
        // 点击树节点
        open(_a,_b,_c) {
            this.cancelAll();
            this.cancelData();
            console.log('a--->',_a);
            console.log('b--->',_b);
            console.log('c--->',_c);
            this.key = _a.key;
            this.entity = _a;
            console.log('this.key',this.key)
            if (this.key == "sjy") {
                this.ssxt = _a.label;
                this.sjydm = _a.sjydm;
            }
            else if (this.key == "business") {
                this.showForm(true, false, false, false);
                //数据回填
                this.businessForm = _a;
                this.businessForm.ssxt = _b.parent.data.label;
                this.ywbm = _a.bm;
                this.ywmc = _a.label;
                this.upInput(true, false);
                _a.files.forEach(e => {
                    this.tableData3.push({
                        fileName: e.bqwj,
                        status: "已经上传",
                        start: e.sfqdwj,
                        cjr: e.cjr,
                        cjsj: e.cjsj,
                        clwjbm: e.clwjbm,
                        clwjlx: e.clwjlx,
                        htbqwjm: e.htbqwjm,
                        lsh: e.lsh,
                        sslxbm: e.sslxbm,
                        zxlx: e.zxlx,
                        zxsx: e.zxsx,
                    })
                });
          
                //原启动文件（lxq）
                if(this.tableData3.length == 0){
                    this.params.yqdFiles ={};
                }else{
                    for(var i = 0;i < this.tableData3.length;i++){
                        if(this.tableData3[i].start == 1){
                            this.params.yqdFiles = {
                                clwjbm:this.tableData3[i].clwjbm,
                                sslxbm:this.tableData3[i].sslxbm
                            };
                            this.params.yqdFiles_xg = {
                                sfqdwj: 0,
                                zxlx: '',
                                bqwj: this.tableData3[i].fileName,
                                clwjlx:this.tableData3[i].clwjlx,
                                sjcls: this.tableData3[i].sjcl,
                                clwjbm:this.tableData3[i].clwjbm,
                                sslxbm:this.tableData3[i].sslxbm,
                                htbqwjm:this.tableData3[i].htbqwjm,
                            };
                              
                        }
                    }
                }             
                this.sfqd();
            }
            else if (this.key == "businessProp") {
                this.showForm(false, true, false, false)
                this.ywbm = _b.parent.parent.data.bm;
                console.log(this.ywbm)
                //数据回填
                this.businessFeatureAttrForm = _a;
                this.businessFeatureAttrForm.ywmc = _b.parent.parent.data.label;

            } else if (this.key == "link") {
                this.showForm(false, false, true, false)
                //数据回填
                this.businessTypeLinkForm = _a;
                this.hjbm = _a.bm;
                this.upInput(false, true)
                _a.files.forEach(e => {
                    this.tableData3.push({
                        fileName: e.bqwj,
                        status: "已经上传",
                        start: e.sfqdwj,
                        cjr: e.cjr,
                        cjsj: e.cjsj,
                        clwjbm: e.clwjbm,
                        clwjlx: e.clwjlx,
                        htbqwjm: e.htbqwjm,
                        lsh: e.lsh,
                        sslxbm: e.sslxbm,
                        zxlx: e.zxlx,
                        zxsx: e.zxsx,
                    });
                });
                //原启动文件（lxq）
                if(this.tableData3.length == 0){
                    this.params.yqdFiles ={};
                }else{
                    for(var i = 0;i < this.tableData3.length;i++){
                        if(this.tableData3[i].start == 1){
                            this.params.yqdFiles = {
                                clwjbm:this.tableData3[i].clwjbm,
                                sslxbm:this.tableData3[i].sslxbm
                            }
                        }
                    }
                }             
                this.sfqd();
                console.log(this.tableData3)
            } else if (this.key == "linkProp") {
                this.showForm(false, false, false, true);
                //数据回填
                this.hjbm = _b.parent.data.bm;
                this.businessTypeLinkAttrForm = _a;
                this.businessTypeLinkAttrForm.hjbm = _b.parent.data.bm;
            }
        },
        //表格多选框
        handleCurrentChange() {

        },
        showForm(a, b, c, d) {
            this.businessFormShow = a;
            this.businessFeatureAttrFormShow = b;
            this.businessTypeLinkFormShow = c;
            this.businessTypeLinkAttrFormShow = d;
        },
        // 新增业务
        addBusiness() {
            if (this.key == "sjy") {
                this.showForm(true, false, false, false);
                this.businessForm = {};
                this.businessForm.ssxt = this.ssxt;
                this.businessForm.sjydm = this.sjydm;
                this.upInput(true, false)
            }
            else {
                this.$notify({
                    title: '警告',
                    message: '请选择数据源',
                    type: 'warning'
                });
            }
        },
        // 新增特征addFeature
        addFeature() {
            if (this.key == "business") {
                this.showForm(false, true, false, false);
                this.businessFeatureAttrForm = {};
                this.businessFeatureAttrForm.ssbm = this.sjydm;
                this.businessFeatureAttrForm.ywmc = this.ywmc;
            }
            else if (this.key == "link") {
                this.showForm(false, false, false, true);
                this.businessTypeLinkAttrForm = {};
                this.businessTypeLinkAttrForm.hjbm = this.hjbm;
                // this.businessTypeLinkAttrForm.ywmc = this.ywmc
            }
            else {
                this.$notify({
                    title: '警告',
                    message: '请选择业务',
                    type: 'warning'
                });
            }
        },
        // 新增环节
        addLink() {
            this.tableData3 = [];
            if (this.key == "business") {
                this.showForm(false, false, true, false);
                this.businessTypeLinkForm = {};
                this.businessTypeLinkForm.ywbm = this.ywbm;
                this.businessTypeLinkForm.sjydm = this.sjydm;
                this.isShowForm1 = true;
                this.cancelAll();
                this.upInput(false, true)
            }
            else {
                this.$notify({
                    title: '警告',
                    message: '请选择业务',
                    type: 'warning'
                });
            }
        },
        //启动文件事件
        getCurrentRow(_index,_item) {
            //this.qdFile = {};
            this.params.qdFiles = {};
            this.params.qdFiles = {
                clwjbm: _item.clwjbm,
                sfqdwj: 1,
                zxlx:  this.form.region,
                bqwj: _item.fileName,
                sjcls: this.timeForm.region
            }
            console.log('this.params.qdFiles',this.params.qdFiles);
        },
        changeDoType() {
            if (this.form.region == "2") {
                this.time = true;
            } else {
                this.time = false
            }
        },
        changeDoTime() {

        },
        // 导航
        handleSelect(key, keyPath) {

        },
        //  上传文件
        uploadConfig() {
            var files = document.getElementById("inputFile").files;
            // var linkFiles = document.getElementById("file").files;
            if (files && files.length) {
                for (let item of files) {
                    this.fileList.push(item['name']);

                    //判断是否有重复的文件（lxq）
                    for(var i = 0;i < this.tableData3.length;i++){
                        if(item['name'] == this.tableData3[i].fileName){
                            this.sfcf = 1; 
                        }
                    }
                    if(this.sfcf == 1){
                        this.$alert(item['name']+' 文件已存在，不能重复上传！', '警告', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                type: 'info',
                                message: `已取消上传该文件`
                                });
                            }
                        });
                        this.sfcf = 0;
                    }
                    else{
                        this.Files.push(item);
                        this.tableData3.unshift({
                            fileName: item['name'],
                            status: "未上传",
                        })   
                    }    
                }
            }

            console.log(this.Files)
            console.log(this.fileList)
        },
        // 删除文件
        deleteFile(index) {
            if (this.tableData3[index].status != "未上传") {
                this.params.delFiles.push({
                    lsh: this.tableData3[index].lsh,
                    clwjbm: this.tableData3[index].clwjbm
                })
                //是否有删除文件（lxq）
                this.params.sfscwj = 1;
            }

            if (this.key == "business") {
                var dom = document.getElementById('inputFile');
            } else if (this.key == "link") {
                var dom = document.getElementById('file');
            }
           // dom.value == " ";
            this.fileList.splice(index, 1);
            this.Files.splice(index, 1);
            this.tableData3.splice(index, 1);
            // console.log('del',params.delFiles);
        },
        //修改表格颜色
        tableRowStyle({ row, rowIndex }) {
            if (rowIndex < this.fileList.length) {
                return 'background-color: #e0edf5'
            }
            else {
                return 'background-color: #e0edf5'
            }
        },
        // 修改table header的背景色
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return 'background-color:#189ad8;color: #fff;font-weight: 500;'
            }
        },
        showRow(row) { },
        //下载
        download() {

        },
        setType(index) {
            this.zxlxIndex = index;
            this.dialogFormVisible = true;
        },
        //选择事件策略
        sjclSubmit() {
            this.dialogFormVisible = false;
            this.tableData3[this.zxlxIndex].zxlx = this.form.region;
            this.tableData3[this.zxlxIndex].sjcl = this.timeForm.region;
            console.log("________" + this.tableData3[this.zxlxIndex].zxlx);
        },
        //上传文件
        testUpload() {
            var pform = document.getElementById("pform");
            let formdata = new FormData(pform);

    
            //此处必须设置为  multipart/form-data
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            console.log(formdata);
            axios.post(this.Url + '/sf/file/uploading', formdata, config).then((res) => {
                console.log(res)
            }).catch((error) => {
                console.log(err)
            });

        },
        getADddFiles() {
            var afs=[];
            for (var i = 0; i < this.fileList.length; i++) {
                var obj={
                    clwjbm: "",
                    sfqdwj: this.tableData3[i].start,
                    zxlx: this.tableData3[i].zxlx,
                    bqwj: this.tableData3[i].fileName,
                    sjcls: this.tableData3[i].sjcl
                };     
            afs.push(obj);  
            }
            this.params.addFiles=afs;
            console.log('this.params.addFiles',this.params.addFiles);
        },
        // 业务提交
        submitBusiness() {
            this.sfqd();
            this.getADddFiles();
            console.log(this.businessForm)
            this.params.ywxx = this.businessForm;
            console.log(this.params);

            var type = "ywxx";
            var params = this.params;
            this.submit(type, params);
        },
        // 环节提交
        submitLink() {
            this.sfqd();
            this.getADddFiles();
            console.log(this.params)
            this.params.ywhj = this.businessTypeLinkForm;
            var type = "ywhj";
            var params = this.params;
            this.submit(type, params);
        },
        // 业务特征提交
        bisinessFeatrueSubmit() {
            this.businessFeatureAttrForm.sslx = 1;
            this.businessFeatureAttrForm.ssbm = this.ywbm;
            console.log(this.businessFeatureAttrForm)
            var type = "ywsx";
            var params = this.businessFeatureAttrForm;
         
            this.submit(type, params);
        },
        //环节特征提交
        linkPropSubmit() {
            this.businessTypeLinkAttrForm.sslx = 2;
            this.businessTypeLinkAttrForm.ssbm = this.hjbm;
            console.log(this.businessTypeLinkAttrForm);
            var type = "ywsx";
            var params = this.businessTypeLinkAttrForm;
            this.submit(type, params);
        },
        submit(type, params) {
            console.log('params',params);
            this.params.sfxzwj = 0;
            if(params.addFiles &&params.qdFiles){
                var afs=params.addFiles;
                for(var i=0;i<afs.length;i++){                   
                    if(params.qdFiles.bqwj==afs[i].bqwj){
                        params.addFiles.splice(i,1);
                        break;
                    }
                }
                if(params.addFiles.length > 0){
                    this.params.sfxzwj = 1;
                }else{
                    this.params.sfxzwj = 0;
                }
            } 

            
            axios.post(this.Url + "/sf/save/" + type, params).then(res => {
                console.log('res',res);
                console.log('res.data.resBody',res.data);
                if (res.data.head.result == 1) {
                    
                    //ywxx或ywhj时才上传文件(lxq)
                    if((type=="ywxx"||type=="ywhj") && this.params.sfxzwj==1 ){
                        document.getElementById("sslxbm").value = res.data.resBody.bm;
                        this.testUpload();
                    }               
                    this.initTree();
                    this.cancelAll();
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    console.log('_a',_a);
                    this.open(_a,_b,_c); 
                } else {
                    this.$message.error('保存失败');
                }
            }).catch(err => {
                console.log(err)
            });
        },
        cancelData(){
            this.tableData3 = [];
            this.businessForm = {};
            this.businessFeatureAttrForm = {};
            this.businessTypeLinkForm = {};
            this.businessTypeLinkAttrForm = {};
        },
        cancelAll() {
            this.fileList = [];
            this.Files = [];
            this.params = { addFiles: [], delFiles: [] };
        },
        //取消
        cancel() {
            this.cancelAll();
        },
        //删除业务
        delBusiness() {
            var params = {
                lsh: this.businessForm.lsh,
                sjydm: this.businessForm.sjydm,
                bm: this.businessForm.bm
            };
            var type = "ywxx";
            console.log(this.businessForm.lsh, this.businessForm.sjydm, this.businessForm.bm)
            this.del(type, params);
        },
        //删除业务特征
        delBusinessProp() {
            var type = "ywsx"
            var params = {
                lsh: this.businessFeatureAttrForm.lsh,
                sslx: 1,
                ssbm: this.businessFeatureAttrForm.ssbm,
                sxbm: this.businessFeatureAttrForm.sxbm
            };
            console.log(this.businessFeatureAttrForm.lsh, this.businessFeatureAttrForm.ssbm, this.businessFeatureAttrForm.sxbm)
            this.del(type, params);
        },
        //删除环节
        delLink() {
            var type = "ywhj";
            var params = {
                lsh: this.businessTypeLinkForm.lsh,
                ywbm: this.businessTypeLinkForm.ywbm,
                bm: this.businessTypeLinkForm.bm
            };
            console.log(this.businessTypeLinkForm.lsh, this.businessTypeLinkForm.ywbm, this.businessTypeLinkForm.bm);
            this.del(type, params);
        },
        //删除环节属性
        delLinkProp() {
            var type = "ywsx";
            var params = {
                lsh: this.businessTypeLinkAttrForm.lsh,
                sslx: 2,
                ssbm: this.businessTypeLinkAttrForm.ssbm,
                sxbm: this.businessTypeLinkAttrForm.sxbm
            };
            this.del(type, params);

        },
        del(type, params) {
            axios.post(this.Url + "/sf/remove/" + type, params).then(res => {
                console.log(res)
                if (res.data.head.result == 1) {
                    this.initTree();
                    this.cancelAll();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.showForm(false,false,false,false)  
                } else {
                    this.$message.error('删除失败');
                }
            }).catch(err => {
                console.log(err)
                this.$message.error('删除失败');
            })

        },
        //下载
        downLoad(obj) {
            console.log(obj.lsh, obj.clwjbm)
            window.open(this.Url + "/sf/download?lsh="+obj.lsh+"&clwjbm="+obj.clwjbm);
        }
    },


})