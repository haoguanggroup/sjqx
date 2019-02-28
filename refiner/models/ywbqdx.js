/* jshint indent: 2 */

var utils = require('../utils/utils');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ywbqdx', {
      lsh: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      field: 'lsh'
    },
    sjydm: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      field: 'sjydm'
    },
    sjywdx: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'sjywdx'
    },
    bqywdxmc: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'bqywdxmc'
    },
    bqywdx: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
      field: 'bqywdx'
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
      field: 'cjsj',
      get() {
          return utils.formatDateTime(this.getDataValue('cjsj'));
      }
    },
    yxbz: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '1',
      field: 'yxbz'
    }
  }, {
    tableName: 't_ywbqdx',
    timestamps: false,
    freezeTableName: true
  });
};
