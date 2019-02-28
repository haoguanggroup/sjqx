/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zxcl', {
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
    clwjbm: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    cjr: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cjsj: {
      type: DataTypes.DATE,
      allowNull: true
    },
    yxbz: {
      type: DataTypes.STRING(2),
      allowNull: true
    }
  }, {
    tableName: 't_zxcl',
    timestamps: false,
    freezeTableName: true
  });
};
