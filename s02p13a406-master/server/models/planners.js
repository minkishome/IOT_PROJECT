module.exports = (sequelize, DataTypes) => (
    sequelize.define('planners', {
        p_id:{
            type : DataTypes.INTEGER,
            allowNull:false,
            primaryKey : true,
        },
        m_id : {
          type:DataTypes.INTEGER,
          allowNull:false,
        },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      info:{
          type : DataTypes.STRING(45),
      }
  
    }, {
      timestamps: false,
      paranoid: false,
    })
  );