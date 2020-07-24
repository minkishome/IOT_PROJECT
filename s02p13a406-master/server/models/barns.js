module.exports = (sequelize, DataTypes) => (
    sequelize.define('barns', {
        b_id:{
            type : DataTypes.INTEGER,
            allowNull:false,
            primaryKey : true,
        },
      m_id : {
        type : DataTypes.INTEGER,
        allowNull:false,
        primaryKey : true,
      },
      temperature: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      humidity: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      ch4: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      co2: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      count :{
        type : DataTypes.INTEGER,
        allowNull:true,
      },
    }, {
      timestamps: false,
      paranoid: false,
    })
  );