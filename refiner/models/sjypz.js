/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('sjypz', {
      lsh: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true
      },
      sjydm: {
          type: DataTypes.STRING(100),
          allowNull: false
      },
      sjymc: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true
      },
      sjylx: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      csdm: {
        type: DataTypes.STRING(60),
        allowNull: true
      },
      csz: {
        type: DataTypes.STRING(1000),
        defaultValue: null
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
      tableName: 'ty_sjypz',
      timestamps: false,
      freezeTableName: true
    });
  };