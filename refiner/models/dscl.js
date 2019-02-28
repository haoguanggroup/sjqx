/* jshint indent: 2 */
var utils = require('../utils/utils');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dscl', {
    lsh: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    clbh: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    clmc: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    kssj: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
          return utils.formatDateTime(this.getDataValue('kssj'));
      }
    },
    jssj: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
          return utils.formatDateTime(this.getDataValue('jssj'));
      }
    },
    seconds: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    minute: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    hour: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    day: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    month: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    week: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    year: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    task: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    parameter: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    isworkday: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(60),
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
    tableName: 't_dscl',
    timestamps: false,
    freezeTableName: true
  });
};
