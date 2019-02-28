/* jshint indent: 2 */

var utils = require('../utils/utils');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ywsx', {
    lsh: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    sslx: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    ssbm: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    sxbm: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    sxmc: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sxsjlx: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sxz: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fxdj: {
      type: DataTypes.STRING(10),
      allowNull: true
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
    tableName: 't_ywsx',
    timestamps: false,
    freezeTableName: true
  });
};
