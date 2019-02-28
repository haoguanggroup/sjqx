/* jshint indent: 2 */

var utils = require('../utils/utils');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ywclwj', {
    lsh: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    clwjbm: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    clwjlx: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    sslxbm: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    sfqdwj: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    bqwj: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    htbqwjm: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    cjr: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'system'
    },
    cjsj: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
          return utils.formatDateTime(this.getDataValue('cjsj'));
      }
    },
    yxbz: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 't_ywclwj',
    timestamps: false,
    freezeTableName: true
  });
};
