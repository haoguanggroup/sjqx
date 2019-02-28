/* jshint indent: 2 */

var utils = require('../utils/utils');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ywhj', {
    lsh: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    ywbm: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    bm: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    sjbm: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mc: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sfby: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    hjxh: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    qzhjbh: {
      type: DataTypes.STRING(20),
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
    tableName: 't_ywhj',
    timestamps: false,
    freezeTableName: true
  });
};
