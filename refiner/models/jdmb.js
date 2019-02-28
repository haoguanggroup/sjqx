/* jshint indent: 2 */

var utils = require('../utils/utils');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jdmb', {
    lsh: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    csdm: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    zdm: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    csmc: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    zmc: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    sxh: {
      type: DataTypes.INTEGER(11),
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
    tableName: 's_jdmb',
    timestamps: false,
    freezeTableName: true
  });
};
