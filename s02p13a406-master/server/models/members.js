module.exports = (sequelize, DataTypes) => (
    sequelize.define('members', {
        m_id:{
            type : DataTypes.INTEGER,
            allowNull:false,
            primaryKey : true,
            autoIncrement:true,
        },
      bcnt: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      pw: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
  
    }, {
      timestamps: false,
      paranoid: false,
    })
  );
