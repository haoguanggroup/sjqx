/* jshint indent: 2 */

var utils = require('../utils/utils');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bqk', {
    lsh: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    bqbm: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    bqmc: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    bqms: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    dywh: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    dycsdm: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    bqlx: {
      type: DataTypes.STRING(60),
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
    tableName: 't_bqk',
    timestamps: false,
    freezeTableName: true
  });
};
