'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    mobile_number: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};