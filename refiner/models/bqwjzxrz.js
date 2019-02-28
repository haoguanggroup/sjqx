/* jshint indent: 2 */

var utils = require('../utils/utils');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bqwjzxrz', {
    lsh: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    clwjbm: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    zxkssj: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
          return utils.formatDateTime(this.getDataValue('zxkssj'));
      }
    },
    zxjssj: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      get() {
        return utils.formatDateTime(this.getDataValue('zxjssj'));
      }
    },
    zxzt: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    zxxx: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    zxrzwjlj: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    yxbz: {
      type: DataTypes.STRING(2),
      allowNull: true
    }
  }, {
    tableName: 't_bqwjzxrz',
    timestamps: false,
    freezeTableName: true
  });
};
