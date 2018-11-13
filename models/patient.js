'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    prossion: DataTypes.STRING,
    mobile: DataTypes.STRING
  }, {});
  Patient.associate = function(models) {
    // associations can be defined here
  };
  return Patient;
};