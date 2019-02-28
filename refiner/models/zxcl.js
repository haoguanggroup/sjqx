/* jshint indent: 2 */

var utils = require('../utils/utils');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zxcl', {
    lsh: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    clwjlx: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    sslxbm: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    clbh: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    cjr: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'system'
    },
    cjsj: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    yxbz: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 't_zxcl',
    timestamps: false,
    freezeTableName: true
  });
};
