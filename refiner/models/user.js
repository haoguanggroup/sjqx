/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    lsh: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    xm: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    sjh: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    zzjg: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    zw: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    yhm: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    mm: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    scdlsj: {
      type: DataTypes.DATE,
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
    tableName: 't_user',
    timestamps: false,
    freezeTableName: true
  });
};
