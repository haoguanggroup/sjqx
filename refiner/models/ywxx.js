/* jshint indent: 2 */

var utils = require('../utils/utils');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ywxx', {
    lsh: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    sjydm: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    jllx: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: '1'
    },
    bm: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    mc: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    sjbm: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    clwjzxlx: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    sfljzx: {
      type: DataTypes.STRING(20),
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
    tableName: 't_ywxx',
    timestamps: false,
    freezeTableName: true
  });
};
