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
    //TODO:
    /**
     * patient
     * tests
     */
    Visit.belongsTo(models.Patient, {foreignKey: 'patient_id'});


  };
  return Visit;
};