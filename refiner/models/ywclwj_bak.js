/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ywclwj', {
    lsh: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    clwjbm: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    clwjlx: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    sslxbm: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    sfqdwj: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    zxlx: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    zxsx: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    bqwj: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    htbqwjm: {
      type: DataTypes.STRING(500),
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
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    yxbz: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 't_ywclwj',
    timestamps: false,
    freezeTableName: true
  });
};
