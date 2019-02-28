/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sjylxpz', {
    lsh: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
      field: 'lsh'
    },
    sjylx: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true,
      field: 'sjylx'
    },
    cslx: {
      type: DataTypes.STRING(60),
      allowNull: false,
      field: 'cslx'
    },
    csdm: {
      type: DataTypes.STRING(60),
      allowNull: false,
      primaryKey: true,
      field: 'csdm'
    },
    csmc: {
      type: DataTypes.STRING(60),
      allowNull: false,
      field: 'csmc'
    },
    cssjlx: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'cssjlx'
    },
    sxh: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'sxh'
    },
    cjr: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'system',
      field: 'cjr'
    },
    cjsj: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'cjsj'
    },
    yxbz: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '1',
      field: 'yxbz'
    }
  }, {
    tableName: 'ty_sjylxpz',
    timestamps: false,
    freezeTableName: true
  });
};
