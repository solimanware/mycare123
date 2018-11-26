'use strict';
module.exports = (sequelize, DataTypes) => {
  const items_results_value = sequelize.define('items_results_value', {
    item_id: DataTypes.INTEGER,
    visit_test_id: DataTypes.INTEGER,
    value: DataTypes.TEXT
  }, {});
  items_results_value.associate = function(models) {
    // associations can be defined here
  };
  return items_results_value;
};