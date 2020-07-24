module.exports = (sequelize, DataTypes) => (
    sequelize.define('livestock', {
        ls_id:{
            type : DataTypes.INTEGER,
            allowNull:false,
            primaryKey : true,
            autoIncrement:true,
        },
        m_id: {
          type : DataTypes.STRING(45),
          allowNull:false,
          primaryKey : true,
        },
        b_id: {
          type : DataTypes.INTEGER,
          allowNull:false,
          primaryKey : true,
        },
      kinds: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      body_temperature: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      heart_rate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      step_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    }, {
      timestamps: false,
      paranoid: false,
    })
  );