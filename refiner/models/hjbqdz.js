/* jshint indent: 2 */
var utils = require('../utils/utils');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hjbqdz', {
    lsh: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    dzlx: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    dzlxbm: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    bqbm: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    cjr: {
      type: DataTypes.STRING(20),
      allowNull: true
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
      type: DataTypes.STRING(2),
      allowNull: true
    }
  }, {
    tableName: 't_hjbqdz',
    timestamps: false,
    freezeTableName: true
  });
};
