'use strict';
module.exports = (sequelize, DataTypes) => {
  const visits_test = sequelize.define('visits_tests', {
    visit_id: DataTypes.INTEGER,
    test_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  visits_test.associate = function(models) {
    // associations can be defined here


  };
  return visits_test;
};