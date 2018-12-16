'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('tests', {
    name: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    price: DataTypes.DOUBLE
  }, {
    freezeTableName: true,
    timestamps: false
  });
  Test.associate = function(models) {
    // associations can be defined here
    Test.hasMany(models.tests_items, {foreignKey: 'test_id'});
      
    Test.belongsTo(models.tests_categories, {foreignKey: 'category_id'});

    Test.belongsToMany(models.visits, {through: models.visits_tests, foreignKey: 'test_id'});

  };
  return Test;
};