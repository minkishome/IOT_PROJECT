module.exports = (sequelize, DataTypes) => (
    sequelize.define('faq', {
        q_id:{
            type : DataTypes.INTEGER,
            allowNull:false,
            primaryKey : true
        },
      title: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
     
    }, {
      timestamps: false,
      paranoid: false,
    })
  );