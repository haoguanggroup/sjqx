/* jshint indent: 2 */

var utils = require('../utils/utils');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ywbqdxBq', {
    lsh: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      field: 'lsh'
    },
    glbm: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      field: 'glbm'
    },
    sjydm: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'sjydm'
    },
    bqywdx: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'bqywdx'
    },
    zdlx: {
      type: DataTypes.STRING(2),
      allowNull: false,
      field: 'zdlx'
    },
    zdm: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'zdm'
    },
    zdsjlx: {
      type: DataTypes.STRING(2),
      allowNull: false,
      field: 'zdsjlx'
    },
    zdsjcd1: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'zdsjcd1'
    },
    zdsjcd2: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'zdsjcd2'
    },
    bqbm: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: 'bqbm'
    },
    zdzj: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'zdzj'
    },
    sxh: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'sxh'
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
    tableName: 't_ywbqdx_bq',
    timestamps: false,
    freezeTableName: true
  });
};
