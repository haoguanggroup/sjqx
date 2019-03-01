var vm = new Vue({
  Url: '',
  el: '#app',
  data: {
    radioIndex: 0,
    //风险等级
    fxdjOptions: [],
    //数据类型
    sjlxOptions: [],
    filterText: '',
    treeData: [],
    defaultProps: {
      children: 'children',
      label: 'label'
    },
    //主题表
    themeForm: {
      lsh: '',
      ztbm: '',
      ztmc: '',
      cjr: '',
      cjsj: '',
      yxbz: ''
  },
    //主题表显示
    themeFormShow: false,
    //业务表
    businessForm: {
      lsh: '',
      ywbm: '',
      ywmc: '',
      ssxt: '',
      sjbm: '',
      cjr: '',
      cjsj: '',
      yxbz: '',
      scclwj: '上传处理文件',
      checked: false,
    },
    businessFormShow: false,
    //业务特征属性表
    businessFeatureAttrForm:{
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
    businessFeatureAttrFormShow: true,
    //业务类型环节
    businessTypeLinkForm:{
      lsh: '',
      ywbm: '',
      hjbm: '',
      hjmc: '',
      sfby: "",
      hjxh: '',
      qzhjbh: '',
      cjr: '',
      cjsj: '',
      checked: false,
    },
    businessTypeLinkFormShow: false,
    // 业务环节属性
    businessTypeLinkAttrForm: {
      lsh: '',
      hjbm: '',
      hjsxbm: '',
      hjsxmc: '',
      hjsxlx: '',
      hjsxz: '',
      fxdj: '',
      cjr: '',
      cjsj: ''
    },
    businessTypeLinkAttrFormShow: false,
    tableData3: [],
    tableData3Length: "",
    multipleSelection: [],
    templateRadio: false,
    dialogFormVisible: false,
    form: {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    },
    formLabelWidth: '120px',
    sfbyOptions: [{
      label: "是",
      value: 1
    }, {
      label: '否',
      value: 0
    }],
    isShowTable: true,
    timeForm:{
      region: ''
    },
    time: false,
    radio1: '',
    radio2: '',
    //导航
    activeIndex: '1',
    activeIndex2: '1',
    //删除取消按钮显示
    isShowCancel: false,
    isShowDelete: true,
    level: '',
    //上传文件
    file: [],
    fileList: [],
    Files: [],
    filesIndex: '0',
    getIndex: '',
    //设置执行类型
    isShowType: false,
    //提交的y业务信息参数
    businessParams: {
      sfxzwj: '',
      sfscwj: '',
      addFiles: [],
      delFiles: [],
      inputFiles: []
    },
    doType: "",
    sjydm: '',
    jllx: '',
    sjbm: '',
    ssxt: '',//所属系统
    //提交业务特征参数
    businessFeatureParams: {
      lsh: "",
      sslx: "",
      ssbm: "",
      sxbm: "",
      sxmc: "",
      sxsjlx: "",
      sxz: "",
      fxdj: ""
    },
    //执行类型
    zxlxOptions: [],
    //时间策略
    regionOptions: [],
    zxlxIndex: '',
    ssbm: '',
    sslx: '',
  },
  mounted() {
    //保存初始tableData3的长度
    this.tableData3Length = this.tableData3.length;
    this.Url = init.getUrl();
    let _data = [];
    //获取一级树源
    axios.get(this.Url + "/sf/query/datasource")
      .then(res => {
        for (var i = 0; i < res.data.resBody.length; i++) {
          _data.push({
            label: res.data.resBody[i].sjymc,
            sjydm: res.data.resBody[i].sjydm,
            children: []
          })
        }
        //获取二级树源
        for (let j = 0; j < _data.length; j++) {
          axios.get(this.Url + "/sf/query/ywxx", { params: { sjydm: _data[j].sjydm } }).then(res => {
            for (let k = 0; k < res.data.resBody.length; k++) {
              _data[j].children.push({
                label: res.data.resBody[k].mc,
                sjydm: res.data.resBody[k].sjydm,  //数据源代码
                lsh: res.data.resBody[k].lsh,   //流水号
                bm: res.data.resBody[k].bm,         //编码
                sjbm: res.data.resBody[k].sjbm,  //上级编码
                yxbz: res.data.resBody[k].yxbz, //有效标志
                cjr: res.data.resBody[k].cjr, //创建人
                cjsj: res.data.resBody[k].cjsj, //创建时间
                children: [{
                  label: "业务特征",
                  children: []
                },
                {
                  label: "业务环节",
                  children: []
                }
                ]
              })
            }
            //获取四级树源
            console.log(j)
            for (let i = 0; i < _data[j].children.length; i++) {
              console.log('属性所属类型编码 ssbm', _data[j].children[i].bm);
              axios.get(this.Url + "/sf/query/ywsx", {
                params: init.getRequestData({ ssbm: _data[j].children[i].bm }, {}).body.data
              }).then(res => {
                console.log(res.data.resBody)
                for (let k = 0; k < res.data.resBody.length; k++) {
                  _data[j].children[i].children[0].children.push({
                    label: res.data.resBody[k].sxmc,
                    lsh: res.data.resBody[k].lsh,     //流水号
                    sslx: res.data.resBody[k].sslx,   //所属类型
                    sxbm: res.data.resBody[k].sxbm,   //属性编码
                    ssbm: res.data.resBody[k].ssbm,   //所属编码
                    cjr: res.data.resBody[k].cjr,  //创建人
                    cjsj: res.data.resBody[k].cjsj, //创建时间
                    fxdj: res.data.resBody[k].fxdj, //风险等级
                    sxsjlx: res.data.resBody[k].sxsjlx, //属性数据类型
                    sxz: res.data.resBody[k].sxz,
                    yxbz: res.data.resBody[k].yxbz,
                    key: "business"
                  })
                }
                console.log(_data[j].children[i].children[0].children)
              }).catch(err => {
                console.log(err)
              })
              //业务环节  
              console.log('环节所属的业务编码 ywbm:', _data[j].children[i].bm);
              axios.get(this.Url + "/sf/query/ywhj", {
                params: init.getRequestData({ ywbm: _data[j].children[i].bm }, {}).body.data
              }).then(res => {
                for (let k = 0; k < res.data.resBody.length; k++) {
                  _data[j].children[i].children[1].children.push({
                    label: res.data.resBody[k].mc,
                    lsh: res.data.resBody[k].lsh,     //流水号
                    ywbm: res.data.resBody[k].ywbm,   //业务编码
                    bm: res.data.resBody[k].bm,   //编码
                    key: "link",
                    cjr: res.data.resBody[k].cjr, //创建人
                    cjsj: res.data.resBody[k].cjsj, //创建时间
                    hjxh: res.data.resBody[k].hjxh, //环节序号
                    qzhjbh: res.data.resBody[k].qzhjbh,
                    sfby: res.data.resBody[k].sfby, //是否必要
                    yxbz: res.data.resBody[k].yxbz,
                  })
                }
              }).catch(err => {
                console.log(err)
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    this.treeData = _data;
    //获取数据类型
    axios.get(this.Url + '/getDict/sjlx')
      .then(res => {
        console.log(res.data.resBody)
        for (var i = 0; i < res.data.resBody.length; i++) {
          this.sjlxOptions.push(
            {
              value: res.data.resBody[i].zdm,
              label: res.data.resBody[i].zmc
            }
          )
        }
      }).catch(err => {
        console.log(err)
      });
    // 获取风险等级
    axios.get(this.Url + '/getDict/fxdj')
      .then(res => {
        console.log(res)
        for (var i = 0; i < res.data.resBody.length; i++) {
          this.fxdjOptions.push(
            {
              value: res.data.resBody[i].zdm,
              label: res.data.resBody[i].zmc
            }
          )
        }
      }).catch(err => {
        console.log(err)
      });
    //获取执行类型
    axios.get(this.Url + '/getDict/zxlx').then(res => {
      // alert("dsn");
      var zxlxData = res.data.resBody;
      zxlxData.forEach(e => {
        this.zxlxOptions.push({
          value: e.zdm,
          label: e.zmc
        });
      });
      console.log('执行类型-->', this.zxlxOptions);
    });
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
    //选择事件策略
    sjclSubmit() {
      console.log('this.zxlxIndex', this.zxlxIndex);
      this.tableData3[this.zxlxIndex].zxlx = this.form.region;
      this.dialogFormVisible = false;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getCurrentRow(index) {
      // alert(this.radio1)
      console.log(this.radio1);
      console.log(index)
      this.filesIndex = index;
    },
    setType(index) {
      console.log(index);
      console.log(this.tableData3);
      this.tableData3[index].zxlx = '';
      this.zxlxIndex = index;
      this.timeForm.region = '';
      this.form.region = '';
      this.dialogFormVisible = true;
    },
    //点击树节点
    open(a, b, c) {
      this.businessParams = {
        sfxzwj: '',
        sfscwj: '',
        addFiles: [],
        delFiles: [],
        inputFiles: []
      }
      this.isShowCancel = false;
      this.isShowDelete = true;
      console.log(a)
      console.log(b)
      console.log(c)
      if (b.level == 1) {
        this.level = 1;
        this.ssxt = a.label;
        console.log('所属系统', this.ssxt);
        this.sjbm = a.sjydm;
        console.log('上级编码', this.sjbm);
      }
      else if (b.level == 2) {
        console.log('a', a);
        console.log('b', b);
        this.level = 2;
        this.sjydm = a.sjydm;
        console.log('数据源代码', this.sjydm);
        this.jllx = a.jllx;
        this.ssbm = a.bm;
        this.sslx = '1';
        //数据回填
        this.businessForm.ywmc = a.label;
        this.businessForm.ywbm = a.bm;
        this.businessForm.ssxt = b.parent.data.label;
        this.businessForm.lsh = a.lsh;
        this.businessForm.cjr = a.cjr;
        this.businessForm.cjsj = a.cjsj;
        // this.themeFormShow=false;
        this.businessParams = {
          sfyxzwj: '',
          sfscwj: '',
          ywxx: {
            lsh: "",
            sjydm: "",
            jllx: "",
            bm: "",
            mc: "",
            cjr: "",
            cjsj: "",
            yxbz: ""
          },
          addFiles: [ ],
          delFiles: [ ],
          inputFiles: [ ]
        }
        this.isShowTable = true;
        this.businessFormShow = true;
        this.businessFeatureAttrFormShow = false;
        this.businessTypeLinkFormShow = false;
        this.businessTypeLinkAttrFormShow = false;
        this.doType = 1;
      }
      else if (b.level == 3) {
        this.level = 3;
      }
      else if (b.level == 4 && a.key == "business") {
        console.log('b', b);
        this.level = 4;
        this.businessFormShow = false;
        this.businessFeatureAttrFormShow = true;
        this.businessTypeLinkFormShow = false;
        this.businessTypeLinkAttrFormShow = false;
        //数据回填
        this.businessFeatureAttrForm.ywmc = b.parent.parent.data.label;
        this.ssbm = a.ssbm;
        this.sslx = a.sslx;
        this.businessFeatureAttrForm.sxmc = a.label;
        this.businessFeatureAttrForm.sxbm = a.sxbm;
        this.businessFeatureAttrForm.lsh = a.lsh;
        this.businessFeatureAttrForm.sxsjlx = a.sxsjlx;
        this.businessFeatureAttrForm.fxdj = a.fxdj;
        this.businessFeatureAttrForm.sxz = a.sxz;
        this.businessFeatureAttrForm.cjr = a.cjr;
        this.businessFeatureAttrForm.cjsj = a.cjsj;
      }
      else if (b.level == 4 && a.key == "link") {
        this.level = 4;
        //数据回填
        this.businessTypeLinkForm.lsh = a.lsh;
        this.businessTypeLinkForm.ywbm = a.ywbm;
        this.businessTypeLinkForm.hjbm = a.bm;
        this.businessTypeLinkForm.hjmc = a.label;
        this.businessTypeLinkForm.sfby = a.sfby;
        this.businessTypeLinkForm.hjxh = a.hjxh;
        this.businessTypeLinkForm.qzhjbh = a.qzhjbh;
        this.businessTypeLinkForm.cjr = a.cjr;
        this.businessTypeLinkForm.cjsj = a.cjsj;
        this.businessParams = {
          sfxzwj: '',
          sfscwj: '',
          ywhj: {
            lsh: this.businessTypeLinkForm.lsh,
            ywbm: this.businessTypeLinkForm.ywbm,
            bm: this.businessTypeLinkForm.hjbm,
            mc: this.businessTypeLinkForm.hjmc,
            sfby: this.businessTypeLinkForm.sfby,
            hjxh: this.businessTypeLinkForm.hjxh,
            qzhjbh: this.businessTypeLinkForm.qzhjbh,
            cjr: this.businessTypeLinkForm.cjr,
            cjsj: this.businessTypeLinkForm.cjsj,
            yxbz: 1
          },
          addFiles: [ ],
          delFiles: [ ],
          inputFiles: [ ]
        }
        this.businessFormShow = false;
        this.businessFeatureAttrFormShow = false;
        this.businessTypeLinkFormShow = true;
        this.businessTypeLinkAttrFormShow = false;
        this.doType = 2;
      }
    },
    //新增业务
    addBusiness() {
      var date = new Date();
      var nowdate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      if (this.level != 1) {
        this.$notify({
          title: '警告',
          message: '请选择数据源',
          type: 'warning'
        });
      } else {
        this.businessForm.ywmc = "";
        this.businessForm.ywbm = "";
        this.businessForm.ssxt = this.ssxt;
        this.businessForm.lsh = "";
        this.businessForm.cjr = "";
        this.businessForm.cjsj = "";
        this.businessParams = {
          sfxzwj: '',
          sfscwj: '',
          ywxx: {
            lsh: this.businessForm.lsh,
            sjydm: this.sjbm,
            jllx: '1',
            bm: this.businessForm.ywbm,
            mc: this.businessForm.ywmc,
            sjbm: this.sjbm,
            cjr: 'res.session.name',
            cjsj: nowdate,
            yxbz: '1'
          },
          addFiles: [
          ],
          delFiles: [
          ],
          inputFiles: [
          ]
        }
        this.businessFeatureAttrFormShow = false;
        this.businessFormShow = true;
        this.themeFormShow = false;
        this.businessTypeLinkFormShow = false;
        this.businessTypeLinkAttrFormShow = false;
        this.isShowCancel = true;
        this.isShowDelete = false
        this.tableData3 = [];
      }
    },
    //新增特征
    addFeature() {
      if (this.level != 2) {
        this.$notify({
          title: '警告',
          message: '请选择业务',
          type: 'warning'
        });
      } else {
        this.businessParams = {
          sfxzwj: '',
          sfscwj: '',
          addFiles: [ ],
          delFiles: [ ],
          inputFiles: [ ]
        };
        this.businessFeatureAttrFormShow = true;
        this.businessFormShow = false;
        this.themeFormShow = false;
        this.businessTypeLinkFormShow = false;
        this.businessTypeLinkAttrFormShow = false;
        this.businessFeatureAttrForm.sxmc = "";
        this.businessFeatureAttrForm.sxbm = "";
        this.businessFeatureAttrForm.sxsjlx = "";
        this.businessFeatureAttrForm.sxz = "";
        this.businessFeatureAttrForm.fxdj = "";
        this.tableData3 = [];
        this.isShowCancel = true;
        this.isShowDelete = false;
      }
    },
    //新增环节
    addLink() {
      if (this.level != 2) {
        this.$notify({
          title: '警告',
          message: '请选择业务',
          type: 'warning'
        });
      } else {
        this.businessParams = {
          sfxzwj: '',
          sfscwj: '',
          ywhj: {
            lsh: this.businessTypeLinkForm.lsh,
            ywbm: this.businessTypeLinkForm.ywbm,
            bm: this.businessTypeLinkForm.hjbm,
            mc: this.businessTypeLinkForm.hjmc,
            sfby: this.businessTypeLinkForm.sfby,
            hjxh: this.businessTypeLinkForm.hjxh,
            qzhjbh: this.businessTypeLinkForm.qzhjbh,
            cjr: this.businessTypeLinkForm.cjr,
            cjsj: this.businessTypeLinkForm.cjsj,
            yxbz: 1
          },
          addFiles: [ ],
          delFiles: [ ],
          inputFiles: [ ]
        }
        this.businessFeatureAttrFormShow = false;
        this.businessFormShow = false;
        this.themeFormShow = false;
        this.businessTypeLinkFormShow = true;
        this.businessTypeLinkAttrFormShow = false;
        this.businessTypeLinkForm.hjmc = "";
        this.businessTypeLinkForm.sfby = "";
        this.businessTypeLinkForm.hjxh = "";
        this.businessTypeLinkForm.qzhjbh = "";
        this.tableData3 = [];
        this.isShowCancel = true;
        this.isShowDelete = false;     
      }
    },
    changeDoType() {
      console.log(this.form.region)
      if (this.form.region == "2") {
        this.time = true;
      } else {
        this.time = false
      }
    },
    changeDoTime() {},
    //导航
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //  上传文件
    uploadConfig() {
      alert('上传');
      var files = document.getElementById("file").files;
      console.log(files)
      if (files && files.length) {
        for (let item of files) {
          this.radioIndex = this.radioIndex + 1;

          this.fileList.push(item['name']);
          this.Files.push(item);
          this.tableData3.unshift({
            fileName: item['name'],
            status: "未上传",
            lable: this.radioIndex
          })
        }
      }
      console.log(this.Files)
      console.log(this.fileList)
    },
    //删除文件
    deleteFile(index) {
      console.log('删除', index)
      var dom = document.getElementById('file');
      dom.value == "";
      this.fileList.splice(index, 1);
      this.Files.splice(index, 1);
      this.tableData3.splice(index, 1);
      this.filesIndex = "";
    },
    //表格样式
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
    showRow(row) {
    },
    //下载
    download() {
    },
    //业务提交
    submitBusiness() {
      //业务名称
      this.businessParams.ywxx.mc = this.businessForm.ywmc;
      //是否有新增文件
      this.fileList.length > 0 ? this.businessParams.sfxzwj = 1 : this.businessParams.sfxzwj = 0;
      //是否有删除文件
      (this.tableData3.length - this.fileList.length) < this.tableData3Length ? this.businessParams.sfscwj = 1 : this.businessParams.sfscwj = 0;
      //addFiles    inputFiles
      console.log('this.da', this.tableData3);
      for (let i = 0; i < this.tableData3.length; i++) {
        console.log('radio----.>', this.radio1);
        if (this.radio1 == this.fileList[i]) {
          this.businessParams.addFiles.push({
            sfqdwj: 1,
            clwjbm: "",
            zxlx: this.tableData3[i].zxlx,
            bqwj: this.fileList[i],
            sjcls: this.timeForm.region,
          })
        }
        else {
          this.businessParams.addFiles.push({
            sfqdwj: 0,
            clwjbm: "",
            zxlx: this.tableData3[i].zxlx,
            bqwj: this.fileList[i],
            sjcls: this.timeForm.region,
          })
        }
      }
      console.log('businessParams', this.businessParams);
      axios.post(this.Url + "/sf/save/ywxx", this.businessParams).then(res => {
      }).catch(err => {
        console.log(err)
      })
    },
    //环节提交
    submitLink() {
      //是否有新增文件
      this.fileList.length > 0 ? this.businessTypeLinkForm.sfxzwj = 1 : this.businessTypeLinkForm.sfxzwj = 0;
      //是否有删除文件
      (this.tableData3.length - this.fileList.length) < this.tableData3Length ? this.businessTypeLinkForm.sfscwj = 1 : this.businessTypeLinkForm.sfscwj = 0;
      console.log('this.da', this.tableData3);
      for (let i = 0; i < this.tableData3.length; i++) {
        console.log('radio----.>', this.radio1);
        if (this.radio1 == this.fileList[i]) {
          this.businessTypeLinkForm.addFiles.push({
            sfqdwj: 1,
            clwjbm: "",
            zxlx: this.tableData3[i].zxlx,
            bqwj: this.fileList[i],
            sjcls: this.timeForm.region,
          })
        }
        else {
          this.businessTypeLinkForm.addFiles.push({
            sfqdwj: 0,
            clwjbm: "",
            zxlx: this.tableData3[i].zxlx,
            bqwj: this.fileList[i],
            sjcls: this.timeForm.region,
          })
        }
      }
      axios.post(this.Url + "/sf/save/ywhj", feature_data).then(res => {
      }).catch(err => {
        console.log(err)
      });
    },
    //业务特征提交
    bisinessFeatrueSubmit() {
      var date = new Date();
      var nowdate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      var feature_data = {
        lsh: this.businessFeatureAttrForm.lsh,
        sslx: this.sslx,
        ssbm: this.ssbm,
        sxbm: this.businessFeatureAttrForm.lsh,
        sxmc: this.businessFeatureAttrForm.sxmc,
        sxsjlx: this.businessFeatureAttrForm.sxsjlx,
        sxz: this.businessFeatureAttrForm.sxz,
        fxdj: this.businessFeatureAttrForm.fxdj
      }
      console.log('this.ssbm', this.ssbm);
      console.log('feature_data', feature_data);
      axios.post(this.Url + "/sf/save/ywsx", feature_data).then(res => {
      }).catch(err => {
        console.log(err)
      });
    },
    handleCurrentChange() {}
  },
})