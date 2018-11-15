'use strict';
module.exports = (sequelize, DataTypes) => {
  const TestItem = sequelize.define('tests_items', {
    name: DataTypes.STRING,
    normal_range: DataTypes.STRING,
    test_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    freezeTableName: true,
    timestamps: false
  });
  TestItem.associate = function(models) {
    // associations can be defined here
    TestItem.Test = TestItem.belongsTo(models.tests, {foreignKey: 'test_id'});

  };
  return TestItem;
};