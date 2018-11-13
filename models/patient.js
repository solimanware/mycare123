'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    profession: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    timestamps: false
  });
  Patient.associate = function(models) {
    // associations can be defined here
  };
  return Patient;
};