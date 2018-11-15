'use strict';
module.exports = (sequelize, DataTypes) => {
  const Visit = sequelize.define('visits', {
    patient_id: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  Visit.associate = function(models) {
    // associations can be defined 
    
    // Patient
    Visit.belongsTo(models.Patient, {foreignKey: 'patient_id'});

    // Tests
    Visit.belongsToMany(models.tests, {through: models.visits_tests, foreignKey: 'visit_id'});
  };
  return Visit;
};