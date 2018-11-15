'use strict';
module.exports = (sequelize, DataTypes) => {
  const TestCategory = sequelize.define('tests_categories', {
    name: DataTypes.STRING,
    parent_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    freezeTableName: true,
    timestamps: false
  });
  TestCategory.associate = function(models) {
    // associations can be defined here
    TestCategory.hasMany(models.tests, {foreignKey: 'category_id'});

  };
  return TestCategory;
};